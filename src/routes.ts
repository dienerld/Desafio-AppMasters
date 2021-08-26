import axios from 'axios';
import express from 'express';
import cache from 'memory-cache';
import { getRepository } from 'typeorm';
import Favorite from './models/Favorite';

const router = express.Router();

const getGameDetails = async (appId: number) => {
  try {
    let details = cache.get(appId);
    if (!details) {
      const { data } = await axios(
        `https://store.steampowered.com/api/appdetails?appids=${appId}`,
      );
      details = data[appId].data;
      cache.put(appId, details);
    }
    return details;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

const getFullGames = async () => {
  console.log('get games API steam >>', new Date(Date.now()));

  try {
    let fullData = cache.get('fullData');
    if (!fullData) {
      const { data } = await axios(
        'https://simple-api-selection.herokuapp.com/list-games/?title=race',
      );
      fullData = data.applist.apps.app;
      const minute = 1000 * 60;
      cache.put('fullData', fullData, minute * 120);
    }

    return fullData;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

router.get('/', async (request, response) => {
  const fullData = await getFullGames();
  if (fullData) {
    return response.json(fullData);
  }
  return response.status(404).send();
});

router.get('/:id', async (request, response, next) => {
  const appId = request.params.id;
  if (appId.match('\\d')) {
    const gameDetails = await getGameDetails(parseInt(appId, 10));
    if (gameDetails) {
      response.json(gameDetails);
    } else {
      response.status(404).send();
    }
  } else {
    next();
  }
});

router.post('/favorite', async (request, response) => {
  try {
    const repo = getRepository(Favorite);
    const userHash = request.headers['user-hash'];
    const model = {
      ...request.body,
      userHash,
    };
    let res = await repo.find({ where: model });
    if (res.length > 0)
      return response.status(200).send({ message: 'Favorito já salvo' });
    res = await repo.save(model);
    return response.status(201).json(res);
  } catch (error) {
    console.log(error);

    return response.status(404).send();
  }
});

router.get('/favorite', async (request, response) => {
  try {
    const userHash = request.headers['user-hash'];
    const repo = getRepository(Favorite);
    const vecFavorites: Favorite[] = await repo.find({
      where: { userHash },
    });
    const res = [];

    for (let i = 0; i < vecFavorites.length; i++) {
      res[i] = await getGameDetails(vecFavorites[i].appId);
    }
    return response.status(200).json(res);
  } catch (error) {
    console.log(error);

    return response.status(404).send();
  }
});

router.delete('/favorite/:appid', async (request, response) => {
  try {
    const appId = request.params.appid;
    const userHash = request.headers['user-hash'];
    const model = {
      appId,
      userHash,
    };
    const repo = getRepository(Favorite);
    const object = await repo.find({ where: model });
    console.log(object);

    if (object.length === 0) {
      return response.status(404).send({ message: 'ID não encontrado' });
    }
    const res = await repo.remove(object);
    return response.status(202).json(res);
  } catch (error) {
    return response.status(404).send();
  }
});

export { router, getFullGames };
