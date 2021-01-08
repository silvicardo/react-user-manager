const axios = require('axios');
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults();

const PORT = process.env.PORT || 3000;
const API_URL = `http://localhost:${PORT}`;

server.use(middlewares)
server.use(jsonServer.bodyParser)

//GET - USER -> FRIENDS

server.get('/user/:userid/friends', async (req, res) => {

    try {

        const response = await axios.get(`${API_URL}/friendships?_expand=user&ownerId=${req.params.userid}`);

        return res.jsonp(response.data.map(friendship => ({
            friendshipId: friendship.id,
            ownerId: friendship.ownerId,
            ...friendship.user
        })));

    } catch (e) {
        return res.status(500).jsonp({ error: e, message: e.message})
    }

})

//GET - USER -> NOT FRIENDS
server.get('/user/:userid/not-friends', async (req, res) => {

    const subjectId = req.params.userid;

    try {

        const {data} = await axios.get(`${API_URL}/friendships?_expand=user&ownerId=${subjectId}`);

        const friendsIds = [...new Set(data.map(friend => friend.id))];

        const excludedUsersIdQueryString =  [subjectId, ...friendsIds].map(id => `id_ne=${id}`).join('&');

        const notFriendsResponse = await axios.get(`${API_URL}/users?${excludedUsersIdQueryString}`);

        return res.jsonp(notFriendsResponse.data);

    } catch(e){

        return res.status(500).jsonp({ error: e})
    }

})

//POST - USER CREATE (DUPLICATE CHECK)
server.post('/user/create', async (req, res) => {
    try {

        const {data} = await axios.get(`${API_URL}/users?name_like=${req.body.name}`);

        if(data.length > 0){
            return res.status(403).jsonp({ error: 'Duplicates not permitted'});
        }

        req.body.createdAt = Date.now();
        req.body.updatedAt = Date.now();

        const createdUserResponse = await axios.post(`${API_URL}/users`, req.body);

        return res.jsonp(createdUserResponse.data);

    } catch (e){
        return res.status(500).jsonp({ error: e})
    }
})

//PUT - USER EDIT (DUPLICATE CHECK)
server.put('/user/:userid/edit', async (req, res) => {

    const {userid} = req.params;
    const {name} = req.body;

    try {
        const userByIdResponse = await axios.get(`${API_URL}/users/${userid}`);

        console.log(userByIdResponse.data)

        if(!userByIdResponse.data.id){
          return res.status(400).jsonp({ error: 'Attempting to edit not existing user'});
        }

        const userWithSameNameResponse = await axios.get(`${API_URL}/users?name_like=${name}&id_ne=${userid}`);

        if(userWithSameNameResponse.data.length > 0) {
            return res.status(403).jsonp({error: 'Duplicates not permitted'});
        }

        const userUpdates = {
            name,
            createdAt: userByIdResponse.data.createdAt,
            updatedAt: Date.now()
        }

        const createdUserResponse = await axios.put(`${API_URL}/users/${userid}`, userUpdates);

        return res.jsonp(createdUserResponse.data);


    } catch (e){
        return res.status(500).jsonp({ error: e})
    }
})

//DELETE - FRIENDSHIP (regular json server -> friendships/5 )


server.use(jsonServer.rewriter({
    '/user/:userid/unfriend/:friendid': `/friendships?_expand=user&ownerId=:userid`
}))

server.use(router)

server.listen(PORT, () => {
    console.log('JSON Server is running')
})