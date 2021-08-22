import axios from 'axios';
import express from 'express';
import { getRepository } from 'typeorm';
import cache from 'memory-cache';
import Favorite from './entity/Favorite';

const router = express.Router();

const getGameDetails = async (appId: string) => {
  try {
    let details = cache.get(appId);
    if (!details) {
      const { data } = await axios(`https://store.steampowered.com/api/appdetails?appids=${appId}`);
      details = data[appId].data;
      cache.put(appId, details);
    }
    return details;
  } catch (error) {
    console.log(error);
    return error;
  }
};
const getFullGames = async () => {
  try {
    let fullData = cache.get('fullData');
    if (!fullData) {
      const { data } = await axios('https://api.steampowered.com/ISteamApps/GetAppList/v0002/?format=json');
      fullData = data.applist.apps;
      cache.put('fullData', fullData);
      return fullData;
    }
    return fullData;
  } catch (error) {
    console.log(error);
    return null;
  }
};

router.get('/', async (request, response) => {
  const fullData = await getFullGames();
  if (fullData) {
    return response.send(fullData);
  }
  return response.status(404);
});

router.get('/:id', async (request, response, next) => {
  const appId = request.params.id;
  if (appId.match('\\d')) {
    const gameDetails = await getGameDetails(appId);
    if (gameDetails) {
      response.send(gameDetails);
    } else {
      response.status(404).send(gameDetails);
    }
  } else {
    next();
  }
});

router.post('/favorite', async (request, response) => {
  try {
    // const res = request.body;
    const repo = getRepository(Favorite);

    const model = {
      ...request.body,
      token: request.headers.token,
    };
    console.log(model);

    const res = await repo.save(model);
    return response.status(201).json(res);
  } catch (error) {
    console.log(error);

    return response.status(404).send();
  }
});

router.get('/favorite', async (request, response) => {
  try {
    const { token } = request.headers;
    const repo = getRepository(Favorite);
    const res = await repo.find({ where: { token } });
    return response.status(200).json(res);
  } catch (error) {
    return response.status(400).send();
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
    const res = await repo.remove(object);
    return response.send(res);
  } catch (error) {
    return response.status(400).send();
  }
});

export default router;
