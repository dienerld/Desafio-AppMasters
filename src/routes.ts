import axios from 'axios';
import express from 'express';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { data } = await axios('https://api.steampowered.com/ISteamApps/GetAppList/v0002/?format=json');
    return res.send(data.applist.apps);
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

    return res.send(data[appId].data);
  } catch (error) {
    console.log(error);
    return res.status(404).send('Error');
  }
});

export default router;
