// /following/:user GET PUT DELETE **stub

const following = [
    {
        username: 'yz141',
        following: ['mh12','m7']
    },
    {
        username: 'mh12',
        following: ['yz141', 'el64']
    },
    {
        username: 'm7',
        following: ['yz141', 'mh12', 'el64']
    }
]

const Profile = require('./model.js').Profile

const getFollowing = (req, res) => {
    const username = req.params.user?req.params.user:req.username
    Profile.find({username: username}).exec(function(err,profile){
        if(!profile||profile.length==0){
            res.status(400).send('No profile followings found')
        }
        res.status(200).send({username: username, following: profile[0].following})
    })
    /*if(!req.username) req.username = 'yz141'
    const user = req.params.user?req.params.user:req.username
    var userFollowing = following.filter((res) => {return res.username == user})
    res.status(200).send({
        username: userFollowing[0].username,
        following: userFollowing[0].following
    })*/
}

const follow = (req, res) => {
    var newFollowing = req.params.user
    Profile.find({username: req.username}).exec(function(err,profile){
        if(!profile||profile.length==0){
            res.status(400).send('No profile followings found')
            return
        }
        Profile.find({username: newFollowing}).exec(function(err, newFollowingPro){
            console.log('newFollowing:'+newFollowing)
            if(!newFollowingPro|| newFollowingPro.length==0){
                res.status(400).send('No profile followings found')
                return
            }
            profile[0].following.push(newFollowing)
            const newFollowingList = profile[0].following
            console.log(newFollowingList)
            Profile.update({username:req.username}, {$set:{following: newFollowingList}}, function(err, updateProfile){
                if(err){
                    return console.log(err)
                }
                res.status(200).send({
                    username: req.username,
                    following: newFollowingList
                })
            })
        })
    })
    /*if(!req.username) req.username = 'yz141'
    var newFollowing = req.params.user
    var record = following.filter((res) => {return res.username == req.username})
    var followingList = record[0].following
    if(!followingList.includes(newFollowing)){
        followingList.push(newFollowing)
    }
    res.status(200).send({
        username: req.username,
        following: followingList
    })*/
}

const unfollow = (req, res) => {
    var newUnFollowing = req.params.user
    Profile.find({username: req.username}).exec(function(err,profile){
        if(!profile||profile.length==0){
            res.status(400).send('No profile followings found')
        }
        const newFollowingList = profile[0].following.filter(res => res != newUnFollowing)
        Profile.update({username:req.username}, {$set:{following: newFollowingList}}, function(err, profile){
            if(err){
                return console.log(err)
            }
            res.status(200).send({
                username: req.username,
                following: newFollowingList
            })
        })
    })
    /*if(!req.username) req.username = 'yz141'
    var unfollowName = req.params.user
    var record = following.filter((res) => {return res.username == req.username})
    var followingList = record[0].following
    if(followingList.includes(unfollowName)){
        followingList = followingList.filter((res) => {
            return res != unfollowName
        })
    }
    res.status(200).send({
        username: req.user,
        following: followingList
    })*/
}

const getFollowingsProfile = (req, res) => {
    Profile.find({username: req.username}).exec(function(err,profile){
        if(!profile||profile.length==0){
            res.status(400).send('No profile followings found')
        }
        const following = profile[0].following
        Profile.find({username: {$in: following}}).exec(function (err, profiles) {
            res.status(200).send({profiles: profiles})
        })

    })
}

module.exports = (app) => {
    app.get('/following/:user?', getFollowing)
    app.put('/following/:user', follow)
    app.delete('/following/:user', unfollow)
    app.get('/followingProfile', getFollowingsProfile)
}