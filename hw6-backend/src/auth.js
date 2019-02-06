
/*
/login POST finished
/logout PUT finished
/register POST finished
/password **stub
*/
const md5 = require('md5')
const cookieParser = require('cookie-parser')
const cookieKey = 'sid'
var loggedInUser = ''
var testUser = [
    {
        username: 'yz141',
        salt: 'yz14161',
        hash: 'cf24ae7838ebd3ca881b6ca5cf114c7b'
    }
]
//password: yz141

const User = require('./model.js').User
const Profile = require('./model.js').Profile
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
            console.log(md5(password + userObj.salt))
            console.log(userObj.hash)
            if(md5(password + userObj.salt) != userObj.hash){
                res.status(401).send('Unauthorized User')
                return
            }
            loggedInUser = username
            var sessionKey = md5(userObj.username + new Date().getTime())
            sessionUser[sessionKey] = username
            console.log(sessionUser)
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
                res.status(401).send('User already registered')
            }
            var salt = generateSalt(username)
            var hash = md5(password + salt)
            var newUser = new User({username: username, salt: salt, hash: hash})
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
    console.log('cookieKey:'+req.cookies[cookieKey])
    delete(sessionUser[req.cookies[cookieKey]])
    console.log('after deleter user:'+JSON.stringify(sessionUser))
    res.clearCookie(cookieKey)
    res.status(200).send({result:'OK'})
}

function isLoggedIn(req, res, next){
    console.log('path:'+req.path)
    console.log(req.cookies)
    if(req.path.indexOf("/login") === 0 || req.path.indexOf("/register") === 0){
        console.log("login/register")
        return next()
    }
    var sid = req.cookies[cookieKey]
    console.log('sid:'+sid)
    if(!sid){
        return res.sendStatus(401)
    }
    var username = sessionUser[sid]
    if(username) {
        req.username = username
        console.log('username:'+username)
        next()
    } else {
        res.sendStatus(401)
    }
}

/*const login = (req, res) => {
    var username = req.body.username;
    var password = req.body.password;
    if(!username||!password){
        res.status(400).send('Missing username or password')
        return;
    }
    var userObj = User.filter((res) => {return res.username == username})[0]
    console.log('hash from input:'+md5(password + userObj.salt))
    console.log('user real hash:' + userObj.hash)
    if(!userObj||md5(password + userObj.salt) != userObj.hash){
        res.status(401).send('Unauthorized User')
        return
    }

    loggedInUser = username
    var sessionKey = md5(userObj.username + new Date().getTime())
    res.cookie(cookieKey, sessionKey,
        {maxAge: 3600*1000, httpOnly: true})

    var msg = { username: username, result: 'success'}
    res.send(msg)

}

const register = (req, res) => {
    var username = req.body.username
    var password = req.body.password
    if(!username||!password){
        res.sendStatus(400).send('Missing username or password');
        return;
    }
    var salt = generateSalt(username)
    var hash = md5(password + salt)
    console.log('salt:'+salt)
    console.log('hash:'+hash)
    User.push({
        username: username,
        salt: salt,
        hash: hash
    })
    res.status(200).send({
        result: 'success',
        username: username
    })
}

const logout = (req, res) => {
    loggedInUser = ''
    res.cookie(cookieKey, null, {maxAge: -1, httpOnly: true})
    res.status(200).send('OK')
}*/

const setPassword = (req, res) => {
    var newPassword = req.body.password
    var userObj = testUser.filter((res) => {return res.username == loggedInUser})[0]
    userObj.hash = md5(newPassword + userObj.salt)
    console.log('new hash:'+userObj.hash)
    res.status(200).send({
        username: loggedInUser,
        result: 'success'
    })


}

module.exports = (app) => {
    app.use(cookieParser())
    app.post("/login", login)
    app.post("/register", register)
    app.use(isLoggedIn)
    app.put("/logout", isLoggedIn, logout)
    app.put("/password", setPassword)
}