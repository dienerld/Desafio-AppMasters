import axios from 'axios';
import express from 'express';
import { getRepository } from 'typeorm';
import cache from 'memory-cache';
import Favorite from './models/Favorite';

const router = express.Router();

interface ModelFavorite {
  id: string;
  appId: number;
  token: string;
  rating: number;
}

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
        'https://api.steampowered.com/ISteamApps/GetAppList/v0002/?format=json',
      );
      fullData = data.applist.apps;
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

    const model = {
      ...request.body,
      token: request.headers.token,
    };
    let res = await repo.find({ where: model });
    console.log(res.length);

    if (res.length === 0) {
      res = await repo.save(model);
      console.log('if resSave');
      return response.status(201).json(res);
    }
    return response.status(200).json(res);
  } catch (error) {
    console.log(error);

    return response.status(404).send();
  }
});

router.get('/favorite', async (request, response) => {
  try {
    const { token } = request.headers;
    const repo = getRepository(Favorite);
    const vecFavorites: ModelFavorite[] = await repo.find({ where: { token } });
    if (vecFavorites.length === 0) {
      return response.status(404).send();
    }
    const res = [];
    for (let i = 0; i < vecFavorites.length; i++) {
      res[i] = await getGameDetails(vecFavorites[i].appId);
    }
    return response.status(200).json(res);
  } catch (error) {
    return response.status(404).send();
  }
});

router.delete('/favorite/:appid', async (request, response) => {
  try {
    const appId = request.params.appid;
    const { token } = request.headers;
    const model = {
      appId,
      token,
    };
    const repo = getRepository(Favorite);
    const object = await repo.find({ where: model });
    if (!object) {
      return response.status(204);
    }
    const res = await repo.remove(object);
    return response.status(202).json(res);
  } catch (error) {
    return response.status(404).send();
  }
});

export { router, getFullGames };
