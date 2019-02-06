// /following/:user GET PUT DELETE finished

const Profile = require('./model.js').Profile

const getFollowing = (req, res) => {
    const username = req.params.user?req.params.user:req.username
    Profile.find({username: username}).exec(function(err,profile){
        if(!profile||profile.length==0){
            res.status(400).send('No profile followings found')
        }
        res.status(200).send({username: username, following: profile[0].following})
    })
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