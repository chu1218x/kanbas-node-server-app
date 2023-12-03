import model from "./model.js";

export const findAllLikes = () => model.find();

export const createUserLikesMovie = (userId, imdbId) =>
    model.create({ user: userId, imdbID: imdbId });

export const deleUserLikesMovie = (userId, imdbId) =>
    model.deleteOne({ user: userId, imdbID: imdbId });

export const findUsersThatLikeMovie = (imdbId) =>
    model.find({ imdbID: imdbId }).populate("user");

export const findMoviesLikedByUser = (userId) =>
    model.find({ user: userId });