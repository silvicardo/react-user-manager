const axios = require('axios');
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults();

const PORT = process.env.PORT || 3000;
const API_URL = `http://localhost:${PORT}`;

server.use(middlewares)
server.use(jsonServer.bodyParser)

server.use((req, res, next) => {

    if(req.method === 'PUT'){
        req.body.updatedAt = Date.now();
    }
    next();
})

//GET - USER -> NOT FRIENDS
server.get('/user/:userid/not-friends', async (req, res) => {

    const subjectId = req.params.userid;

    try {

        const {data} = await axios.get(`${API_URL}/friendships?_expand=user&ownerId=${subjectId}`);

        const friendsIds = [...new Set(data.map(friend => friend.id))];

        const excludedUsersIdQueryString =  [subjectId, ...friendsIds].map(id => `id_ne=${id}`).join('&');

        const notFriendsResponse = await axios.get(`${API_URL}/users?${excludedUsersIdQueryString}`);

        res.jsonp(notFriendsResponse.data);

    } catch(e){

        res.status(500).jsonp({ error: e})
    }

})

//POST - USER CREATE (DUPLICATE CHECK)
server.post('/user/create', async (req, res) => {
    try {

        const {data} = await axios.get(`${API_URL}/users?name_like=${req.body.name}`);

        if(data.length > 0){
            res.status(403).jsonp({ error: 'Duplicates not permitted'});
        } else {
            req.body.createdAt = Date.now();
            req.body.createdAt = Date.now();
            const createdUserResponse = await axios.post(`${API_URL}/users`, req.body);
            res.jsonp(createdUserResponse.data);
        }

    } catch (e){
        res.status(500).jsonp({ error: e})
    }
})


server.use(jsonServer.rewriter({
    '/user/:userid' : '/user/:userid',
    '/user/:userid/friends': `/friendships?_expand=user&ownerId=:userid`,
    '/user/:userid/update' : `/users/:userid`,
    '/user/:userid/unfriend/:friendid': `/friendships?_expand=user&ownerId=:userid`
}))


router.render = (req, res, next) => {

  if(req.method == 'GET') {

      if(req.url.indexOf('/friendships?_expand=user&ownerId=') != -1){//FRIENDS
            console.log('friendssss')
            if (res.locals.data.length > 0) {

                res.jsonp(res.locals.data.map(friendship => ({
                    friendshipId: friendship.id,
                    ownerId: friendship.ownerId,
                    ...friendship.user
                })));
            }

        } else {
            res.jsonp(res.locals.data)
        }
    } else {
        res.jsonp(res.locals.data)
    }
}

server.use(router)

server.listen(PORT, () => {
    console.log('JSON Server is running')
})