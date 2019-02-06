/*
/headline PUT finished
/headlines/:users GET multiple users finished
/avatars/:user? GET **stub finished
/avatar PUT **stub finished
/email/:user? GET **stub finished
/email PUT **stub finished
/dob/:user? GET date of birth **stub finished
/zipcode/:user? GET **stub finished
/zipcode PUT  **stub finished
*/

const profile = [
    {
        username: 'yz141',
        headline: 'Kristy is an art director living in New York',
        email: 'yz141@rice.edu',
        zipcode: 77005,
        dob: '1992-11-08',
        avatar: 'Kristy.jpg',
    },
    {
        username: 'mh12',
        headline: 'Matthew is an interior designer living in New York',
        email: 'mh12@rice.edu',
        zipcode: 77005,
        dob: '1988-12-18',
        avatar: 'matthew.png',
    },
    {
        username: 'm7',
        headline: 'Molly is a personal assistant living in Paris',
        email: 'm7@rice.edu',
        zipcode: 77005,
        dob: '1982-03-05',
        avatar: 'molly.png',
    },
    {
        username: 'el64',
        headline: 'Elyse is a copywriter working in New York',
        email: 'el64@rice.edu',
        zipcode: 77005,
        dob: '1993-04-09',
        avatar: 'elyse.png',
    }
]

const Profile = require('./model.js').Profile

const getProfile = (req, res) => {
    const username = req.params.user? req.params.user: req.username
    Profile.find({username: username}).exec(function(err, profile){
        if(!profile||profile.length==0){
            res.status(400).send('No profile found')
        }
        res.status(200).send({profile: profile})
    })
}

const getHeadlines = (req, res) => {
    const users = req.params.users?req.params.users.split(','):req.username
    Profile.find({username: {$in: users}}).exec(function(err,profiles){
        if(!profiles||profiles.length==0){
            res.status(400).send('No headline found')
        }
        var headlines = []
        console.log('profile length:'+profiles.length)
        profiles.forEach(profile => {
            headlines.push({username:profile.username, headline: profile.headline})
        })
        console.log('headlines length:'+headlines.length)
        res.status(200).send({headlines: headlines})
    })
}

const setHeadline = (req, res) => {
    var newHeadline = req.body.headline
    var username = req.username
    if(!newHeadline){
        res.status(400).send('Missing headline input')
        return
    }
    Profile.update({username:username}, {$set:{headline: newHeadline}}, function(err, profile){
        if(err){
            return console.log(err)
        }
        res.status(200).send({
            username: username,
            headline: newHeadline
        })
    })
}

/*const getHeadlines = (req, res) => {
    if(!req.user) req.user = 'yz141'
    const users = req.params.users?req.params.users.split(','):[req.user]
    var headlines = []
    users.forEach(function(user){
        var userProfile = profile.filter((res) => {return res.username == user})
        headlines.push({
            username: user,
            headline: userProfile[0].headline
        })
    })
    res.status(200).send({headlines: headlines})
}

const setHeadline = (req, res) => {
    console.log('setheadline')
    if(!req.user) req.user = 'yz141'
    var newHeadline = req.body.headline
    profile.forEach((function (user) {
        if(user.username == req.user){
            user.headline = newHeadline
            res.status(200).send({
                username: user.username,
                headline: user.headline
            })
        }
    }))
}*/

const getAvatar = (req, res) => {
    const users = req.params.user?req.params.user.split(','):req.username
    Profile.find({username: {$in: users}}).exec(function(err,profiles){
        if(!profiles||profiles.length==0){
            res.status(400).send('No avatars found')
        }
        var avatars = []
        profiles.forEach(profile => {
            avatars.push({username:profile.username, avatar: profile.avatar})
        })
        res.status(200).send({avatars: avatars})
    })
    /*if(!req.username) req.username = 'yz141'
    const users = req.params.user?req.params.user.split(','):[req.username]
    var avatars = []
    users.forEach(function (user) {
        var userProfile = profile.filter((res) => {return res.username == user})
        avatars.push({
            username: user,
            avatar: userProfile[0].avatar
        })
    })
    res.status(200).send({avatars: avatars})*/
}

const setAvatar = (req, res) => {
    var newAvatar = req.body.avatar
    var username = req.username
    if(!newAvatar){
        res.status(400).send('Missing avatar input')
        return
    }
    Profile.update({username:username}, {$set:{avatar: newAvatar}}, function(err, profile){
        if(err){
            return console.log(err)
        }
        res.status(200).send({
            username: username,
            avatar: newAvatar
        })
    })
    /*if(!req.username) req.username = 'yz141'
    var newAvatar = req.body.avatar
    profile.forEach((function (user) {
        if(user.username == req.username){
            user.avatar = newAvatar
            res.status(200).send({
                username: user.username,
                avatar: user.avatar
            })
        }
    }))*/
}

const getEmail = (req, res) => {
    const username = req.params.user?req.params.user:req.username
    Profile.find({username: username}).exec(function(err,profile){
        if(!profile||profile.length==0){
            res.status(400).send('No email found')
        }
        res.status(200).send({username: username, email: profile[0].email})
    })
    /*if(!req.username) req.username = 'yz141'
    var username = req.params.user? req.params.user: req.username
    var userInfo = profile.filter((res) => {return res.username == username})
    res.status(200).send({
        username: userInfo[0].username,
        email: userInfo[0].email
    })*/
}

const setEmail = (req, res) => {
    var newEmail = req.body.email
    var username = req.username
    if(!newEmail){
        res.status(400).send('Missing email input')
        return
    }
    Profile.update({username:username}, {$set:{email: newEmail}}, function(err, profile){
        if(err){
            return console.log(err)
        }
        res.status(200).send({
            username: username,
            email: newEmail
        })
    })
    /*if(!req.username) req.username = 'yz141'
    var newEmail = req.body.email
    profile.forEach(function (user) {
        if(user.username == req.username){
            user.email = newEmail
            res.status(200).send({
                username: user.username,
                email: user.email
            })
        }
    })*/
}

const getDob = (req, res) => {
    const username = req.params.user?req.params.user:req.username
    Profile.find({username: username}).exec(function(err,profile){
        if(!profile||profile.length==0){
            res.status(400).send('No birth date found')
        }
        res.status(200).send({username: username, dob: Date.parse(profile[0].dob)})
    })
    /*if(!req.username) req.username = 'yz141'
    var username = req.params.user? req.params.user: req.username
    var userInfo = profile.filter((res) => {return res.username == username})
    res.status(200).send({
        username: userInfo[0].username,
        dob: Date.parse(userInfo[0].dob)
    })*/
}

const getZipcode = (req, res) => {
    const username = req.params.user?req.params.user:req.username
    Profile.find({username: username}).exec(function(err,profile){
        if(!profile||profile.length==0){
            res.status(400).send('No zipcode found')
        }
        res.status(200).send({username: username, zipcode: profile[0].zipcode})
    })
    /*if(!req.username) req.username = 'yz141'
    var username = req.params.user? req.params.user: req.username
    var userInfo = profile.filter((res) => {return res.username == username})
    res.status(200).send({
        username: userInfo[0].username,
        zipcode: userInfo[0].zipcode
    })*/
}

const setZipcode = (req, res) => {
    var newZipcode = req.body.zipcode
    var username = req.username
    if(!newZipcode){
        res.status(400).send('Missing zipcode input')
        return
    }
    Profile.update({username:username}, {$set:{zipcode: newZipcode}}, function(err, profile){
        if(err){
            return console.log(err)
        }
        res.status(200).send({
            username: username,
            zipcode: newZipcode
        })
    })
    /*if(!req.username) req.username = 'yz141'
    var newZip = req.body.zipcode
    profile.forEach(function (user) {
        if(user.username == req.username){
            user.zipcode = newZip
            res.status(200).send({
                username: user.username,
                zipcode: user.zipcode
            })
        }
    })*/
}

const getTelNum = (req, res) => {
    const username = req.params.user?req.params.user:req.username
    Profile.find({username: username}).exec(function(err,profile){
        if(!profile||profile.length==0){
            res.status(400).send('No telephone number found')
        }
        res.status(200).send({username: username, tel: profile[0].tel})
    })
}

const setTelNum = (req, res) => {
    var newTelNum = req.body.tel
    var username = req.username
    if(!newTelNum){
        res.status(400).send('Missing telephone number input')
        return
    }
    Profile.update({username:username}, {$set:{tel: newTelNum}}, function(err, profile){
        if(err){
            return console.log(err)
        }
        res.status(200).send({
            username: username,
            tel: newTelNum
        })
    })
}

module.exports = (app) => {
    app.get('/profile/:user?', getProfile)
    app.get('/headlines/:users?', getHeadlines)
    app.put('/headline', setHeadline)
    app.get('/avatars/:user?', getAvatar)
    app.put('/avatar', setAvatar)
    app.get('/email/:user?', getEmail)
    app.put('/email', setEmail)
    app.get('/dob/:user?', getDob)
    app.get('/zipcode/:user?', getZipcode)
    app.put('/zipcode', setZipcode)
    app.get('/tel/:user?', getTelNum)
    app.put('/tel', setTelNum)
}
