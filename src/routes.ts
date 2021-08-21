import axios from 'axios';
import express from 'express';

const router = express.Router();

interface jsonSteam {
  appid: number;
  name: string;
}

let fullData: jsonSteam[];
let gameDetails;

router.get('/', async (req, res) => {
  try {
    const { data } = await axios('https://api.steampowered.com/ISteamApps/GetAppList/v0002/?format=json');
    fullData = data.applist.apps;
    return res.send(fullData);
  } catch (error) {
    console.log(error);
    return null;
  }
});
router.get('/:id', async (req, res) => {
  try {
    const appId = req.params.id;
    console.log(appId);
    const { data } = await axios(`https://store.steampowered.com/api/appdetails?appids=${appId}`);
    gameDetails = data[appId].data;
    return res.send(gameDetails);
  } catch (error) {
    console.log(error);
    return res.status(404).send('Error');
  }
});

router.post('/favorite/:id', async (req, res) => {
  console.log(req.body);

  return res.send();
});

export default router;
