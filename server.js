const axios = require('axios');
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults();

const PORT = process.env.PORT || 3001;
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
        //LOG FAILURES TO SERVICE....
        return res.status(500).jsonp({ error: e, message: e.message})
    }

})

//GET - USER -> NOT FRIENDS
server.get('/user/:userid/not-friends', async (req, res) => {

    const subjectId = req.params.userid;

    try {

        const {data} = await axios.get(`${API_URL}/friendships?_expand=user&ownerId=${subjectId}`);

        const friendsIds = [...new Set(data.map(friend => friend.userId))];

        const excludedUsersIdQueryString =  [subjectId, ...friendsIds].map(id => `id_ne=${id}`).join('&');

        const notFriendsResponse = await axios.get(`${API_URL}/users?${excludedUsersIdQueryString}`);

        return res.jsonp(notFriendsResponse.data);

    } catch(e){
        //LOG FAILURES TO SERVICE....
        return res.status(500).jsonp({ error: e})
    }

})

//POST - USER CREATE (DUPLICATE CHECK + FRIENDSHIPS CREATION)
server.post('/user/create', async (req, res) => {

    const {newFriendsIds, ...newUser} = req.body;
    const timestamp = Date.now();
    let createdUser = {};

    try {

        const {data: existingUsersWithName} = await axios.get(`${API_URL}/users?name_like=${req.body.name}`);

        if(existingUsersWithName.length > 0){
            return res.status(403).jsonp({ error: 'Duplicate names not permitted'});
        }

        const {data : createdUserData} = await axios.post(`${API_URL}/users`, {...newUser, createdAt: timestamp, updatedAt: timestamp});

        createdUser = createdUserData;

    } catch (e){
        //for the sake of brevity just rejecting
        //it would be good to handle edge cases:
        // ---> one of friendships promises fails
        return res.status(500).jsonp({ error: e})
    }

    //at this point user is created anyway so friendships create failure should not trigger a bad request response
    //for the sake of brevity - just attempting friendships create in groups and respond with created user

    if(newFriendsIds) {
        try {
            //for the sake of brevity just posting
            //it would be good to handle edge cases:
            // ---> prevent existing friendship re-post (do not blindly trust client)
            await Promise.all(
                [...new Set(newFriendsIds)].map(id =>
                    axios.post(`${API_URL}/friendships`, {ownerId: createdUser.id, friendId: id, createdAt: timestamp})
                )
            );

        } catch (e) {
            //LOG FAILURES TO SERVICE....
        }
    }
    return res.jsonp(createdUser);
})

//PUT - USER EDIT (DUPLICATE CHECK)
server.put('/user/:userid/edit', async (req, res) => {

    const {userid} = req.params;
    const {name, newFriendsIds, deletingFriendshipsIds} = req.body;
    let updatedUser = {};
    const timestamp = Date.now();

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
            updatedAt: timestamp
        }

        const {data} = await axios.put(`${API_URL}/users/${userid}`, userUpdates);
        updatedUser = data;

    } catch (e){
        return res.status(500).jsonp({ error: e })
    }

    //at this point user is updated anyway so friendships create-delete  failure should not trigger a bad request response
    //for the sake of brevity - just attempting friendships create-delete in groups and respond with updated user

    if(newFriendsIds) {
        try {
            //for the sake of brevity just posting
            //it would be good to handle edge cases:
            // ---> prevent existing friendship re-post (do not blindly trust client)
            await Promise.all(
                [...new Set(newFriendsIds)].map(id =>
                    axios.post(`${API_URL}/friendships`, {ownerId: updatedUser.id, friendId: id, createdAt: timestamp})
                )
            );

        } catch (e) {
            //LOG FAILURES TO SERVICE....
        }
    }

    if(deletingFriendshipsIds){

        try {
            //for the sake of brevity just deleting
            //it would be good to handle edge cases:
            // ---> delete friendship where editing user is not correct (do not blindly trust client)
            await Promise.all(
                [...new Set(deletingFriendshipsIds)].map(id =>
                    axios.delete(`${API_URL}/friendships/${id}`)
                )
            );

        } catch (e) {
            //LOG FAILURES TO SERVICE....
        }
    }

    return res.jsonp(updatedUser);
})

//DELETE - FRIENDSHIP (regular json server -> friendships/:friendshipid )

server.use(jsonServer.rewriter({
    '/user/:userid/unfriend/:friendid': `/friendships?_expand=user&ownerId=:userid`
}))

server.use(router)

server.listen(PORT, () => {
    console.log('JSON Server is running on PORT ', PORT)
})