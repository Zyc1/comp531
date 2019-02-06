
/*
/login POST finished
/logout PUT finished
/register POST finished
/password finished
*/
const md5 = require('md5')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy;
const users = {}
const config = {
    clientID: '499674683879437',
    clientSecret: 'ab31210e3498e5d5cf3a13d450f3406e',
    callbackURL: 'https://hw7server.herokuapp.com/facebook/callback',
    profileFields: ['emails']
};
const cookieKey = 'sid'
var loggedInUser = ''

const User = require('./model.js').User
const Profile = require('./model.js').Profile
const Article = require('./model.js').Article
const defaultHeadline = 'Hello World!'
const defaultAvatar = 'https://www.limestone.edu/sites/default/files/user.png'
const sessionUser = {}

const generateSalt = (username) => {
    return username + Math.floor(Math.random()*100 + 1)
}

const login = (req, res) => {
    var username = req.body.username
    var password = req.body.password
    if(!username||!password){
        res.status(400).send('Missing username or password')
        return
    }
    User.find({username: username}).exec(function(err, user){
        if(err){
            return console.log(err)
        }
        else{
            if(!user || user.length == 0){
                res.status(401).send('User not registerd')
                return
            }
            var userObj = user[0]
            if(md5(password + userObj.salt) != userObj.hash){
                res.status(401).send('Unauthorized User')
                return
            }
            loggedInUser = username
            var sessionKey = md5(userObj.username + new Date().getTime())
            sessionUser[sessionKey] = username
            res.cookie(cookieKey, sessionKey,
                {maxAge: 1800*1000, httpOnly: true})
            var msg = { username: username, result: 'success'}
            res.send(msg)
        }
    })
}

const register = (req, res) => {
    var username = req.body.username
    var password = req.body.password
    var tel = req.body.tel
    var email = req.body.email
    var dob = req.body.dob
    var zipcode = req.body.zipcode
    if(!username||!password){
        res.sendStatus(400).send('Missing username or password');
        return;
    }
    User.find({username: username}).exec(function(err, user){
        if(err){
            return console.log(err)
        }
        else{
            if(user.length!=0){
                return res.status(200).send({result:'registered'})
            }
            var salt = generateSalt(username)
            var hash = md5(password + salt)
            var newUser = new User({username: username, salt: salt, hash: hash, auth: []})
            newUser.save(function (err, user) {
                if(err){
                    return console.log(err)
                }
            })
            var newProfile = new Profile({
                username: username,
                headline: defaultHeadline,
                following: [],
                tel: tel,
                email: email,
                dob: dob,
                zipcode: zipcode,
                avatar: defaultAvatar
            })
            newProfile.save(function (err, profile) {
                if(err){
                    return console.log(err)
                }
            })
            res.status(200).send({result: 'success', username: username})
        }
    })
}

const logout = (req, res) => {
    delete(sessionUser[req.cookies[cookieKey]])
    res.clearCookie(cookieKey)
    res.status(200).send({result:'OK'})
}

passport.serializeUser(function(user, done){
    users[user.id] = user;
    done(null, user.id)
});

passport.deserializeUser(function(id, done){
    var user = users[id]
    done(null, user)
})

passport.use(new FacebookStrategy(config,
    function(token, refreshToken, profile, done){
        process.nextTick(function(){
            return done(null, profile)
        })
    })
)

const fbLogin = (req, res) => {
    const fbProfile = req.user
    const fbId = fbProfile.id
    const fbUsername = fbId + '@' + fbProfile.provider
    const fbUserEmail = fbProfile.emails? fbProfile.emails[0].value: ''
    User.find({username: fbUsername}).exec(function(err, user){
        if(!user || user.length == 0) {
            var salt = generateSalt(fbUsername)
            var hash = md5(fbUsername + salt)
            var newUser = new User({username: fbUsername, salt: salt, hash: hash, auth: []})
            newUser.save(function (err, user) {
                if(err){
                    return console.log(err)
                }
            })
            var newProfile = new Profile({
                username: fbUsername,
                headline: defaultHeadline,
                following: [],
                tel: '000-000-0000',
                email: fbUserEmail,
                dob: '1996-10-31',
                zipcode: '00000',
                avatar: defaultAvatar
            })
            newProfile.save(function (err, profile) {
                if (err) {
                    return console.log(err)
                }
            })
            generateCookie(fbUsername, res);
        } else {
            generateCookie(fbUsername, res);
        }
    })
}

function generateCookie(fbUsername, res) {
    var sessionKey = md5(fbUsername + new Date().getTime())
    sessionUser[sessionKey] = fbUsername
    res.cookie(cookieKey, sessionKey,
        {maxAge: 1800*1000, httpOnly: true})
    res.redirect('http://hw7frontend.surge.sh/#/main')
}

const fail = (req, res) => {
    res.redirect('http://hw7frontend.surge.sh')
}

function isLoggedIn(req, res, next){
    if(req.path.indexOf("/login") === 0 || req.path.indexOf("/register") === 0){
        return next()
    }
    var sid = req.cookies[cookieKey]
    if(!sid){
        return res.sendStatus(401)
    }
    var username = sessionUser[sid]
    if(username) {
        req.username = username
        next()
    } else {
        res.sendStatus(401)
    }
}


const setPassword = (req, res) => {
    const newPassword = req.body.password
    const username = req.username;
    const newSalt = generateSalt(username)
    const newHash = md5(newPassword + newSalt)

    User.update({username:username}, {$set:{salt: newSalt, hash: newHash}}, function(err, profile) {
        if(err) {
            return console.log(err);
        }
        res.status(200).send({
            username: username,
            result: 'success'
        })
    })

}

const link = (req, res) => {
    const fbUsername = req.username
    const username = req.body.username
    const password = req.body.password

    User.findOne({username: username}).exec(function (err, normalUser) {
        if(!normalUser||normalUser.length==0) {
            res.status(400).send('no such user')
        } else {
            if(md5(password + normalUser.salt) == normalUser.hash) {
                if (!normalUser.auth||normalUser.auth.length == 0) {
                    User.findOne({username: fbUsername}).exec(function (err, user) {
                        if (user) {
                            updateDatabase(username, fbUsername, res)
                        } else {
                            res.status(400).send('no facebook login')
                        }
                    })
                } else {
                    res.status(200).send('already linked')
                }
            } else {
                res.status(400).send('wrong password')
            }
        }
    })

}

function updateDatabase(username, fbUsername, res) {
    Profile.findOne({username: fbUsername}).then((profile) => {
        if(profile){
            const fbFollowings = profile.following;
            Profile.findOne({username: username}).then((normalProfile) => {
                Article.update({ 'comments.name': fbUsername }, { $set: { 'comments.$.name': username, 'comments.$.img': normalProfile.avatar } }, { new: true, multi: true }).then(() => {});
                Article.update({ author: fbUsername}, { $set: { 'author': username, 'avatar': normalProfile.avatar } }, { new: true, multi: true }).then(() => {});
                if(normalProfile){
                    const normalFollowings = normalProfile.following;
                    let mergeFollowings = merge(normalFollowings, fbFollowings, username);
                    Profile.findOneAndUpdate({username: username}, {$set: {following: mergeFollowings}}, {new: true}, function(err, updatedProfile){
                        User.findOneAndUpdate({username: username}, {$addToSet: {auth: {'facebook':fbUsername}}}, {new: true}, function (err, updatedUser) {
                            User.deleteOne({username: fbUsername}).then(() => {
                                Profile.deleteOne({username: fbUsername}).then(() => {
                                    res.status(200).send({result: 'success'});
                                });
                            });
                        });
                    })
                }else{
                    res.status(400).send('normal user profile does not exist');
                }
            })
        }else{
            res.status(400).send('Facebook user profile does not exist!');
        }
    })
}

function merge(normalFollowings, fbFollowings, username) {
    let res = []
    for(let i=0;i<normalFollowings.length;i++) {
        res.push(normalFollowings[i])
    }
    for(let i=0;i<fbFollowings.length;i++){
        let exist = false;
        for(let j=0;j<normalFollowings.length;j++){
            if(fbFollowings[i] == normalFollowings[j] || fbFollowings[i] == username) {
                exist = true;
                break;
            }
        }
        if(!exist){
            res.push(fbFollowings[i])
        }
    }
    return res;
}

const unlink = (req, res) => {
    const username = req.username;
    User.findOne({username: username}).exec(function(err, user){
        if(user){
            if(user.auth && user.auth.length > 0){
                User.findOneAndUpdate({username: username}, {$set : {auth : []}}, {new : true}, function(err, updatedUser){
                    res.status(200).send({result:'success'})
                })
            }else{
                res.status(400).send('unlink failed');
            }
        }else{
            res.status(400).send('no user found');
        }
    })
}

module.exports = (app) => {
    app.use(cookieParser())
    app.post("/login", login)
    app.post("/register", register)
    app.use(session({secret: 'thisIsMySecretMessageHowWillYouGuessIt'}));
    app.use(passport.initialize())
    app.use(passport.session())
    app.use("/facebook/login", passport.authenticate('facebook', {scope: ['email']}))
    app.use("/facebook/callback", passport.authenticate('facebook', {successRedirect: '/fbLogin', failureRedirect: '/fail'}))
    app.use("/fbLogin", fbLogin)
    app.use("/fail", fail)
    app.use(isLoggedIn)
    app.put('/link', link)
    app.get('/unlink', unlink)
    app.put("/logout", isLoggedIn, logout)
    app.put("/password", setPassword)
}