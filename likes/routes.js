import * as dao from './dao.js'

function LikesRoutes(app){

    const findAllLikes = async (req,res) => {}

    const createUserLikesMovie = async (req,res) => {
        const userId = req.params.userId;
        const imdbId = req.params.imdbId;   
        const likes = await dao.createUserLikesMovie(userId, imdbId);
        res.json(likes);
    }

    const deleteUserLikesMovie = async (req,res) => {}

    const findUsersThatLikeMovie = async (req,res) => {
        const imdbId = req.params.imdbId;
        const likes = await dao.findUsersThatLikeMovie(imdbId);
        res.json(likes);
    }

    const findMoviesLikedByUser = async (req,res) => {
        const userId = req.params.userId;
        const likes = await dao.findMoviesLikedByUser(userId);
        res.json(likes);
    }


    app.get('/api/likes', findAllLikes);
    app.post('/api/users/:userId/likes/:imdbId', createUserLikesMovie);
    app.delete('/api/users/:userId/likes/:imdbId', deleteUserLikesMovie);
    app.get('/api/likes/:imdbId/users', findUsersThatLikeMovie);
    app.get('/api/users/:userId/likes', findMoviesLikedByUser);


}

export default LikesRoutes;