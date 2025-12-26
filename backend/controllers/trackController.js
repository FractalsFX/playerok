const { tracks } = require("../data/tracks");
const User = require("../models/User");

const getTracks = (req, res) => {
  res.json(tracks);
};

const addToFavorites = (req, res) => {
  const { trackId } = req.body;
  const username = req.user.username;

  User.addFavorite(username, trackId);
  res.json({ message: "композиция добавлена в избранное" });
};

const removeFromFavorites = (req, res) => {
  const { trackId } = req.body;
  const username = req.user.username;

  User.removeFavorite(username, trackId);
  res.json({ message: "композиция убрана из избранного" });
};

const getFavorites = (req, res) => {
  const username = req.user.username;
  const favoriteTracks = User.getFavorites(username);
  
  // Преобразуем все ID в строки для консистентного сравнения
  const favoriteTrackDetails = favoriteTracks
                                              .map(trackId => tracks.find(track => String(track.id) === String(trackId)))
                                              .filter(track => track !== undefined);

  res.json(favoriteTrackDetails);
};

module.exports = {
  getTracks,
  addToFavorites,
  removeFromFavorites,
  getFavorites,
};
