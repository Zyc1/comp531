## Backend
We will have separate frontend and backend applications.

# Setting up your backend server
Your backend will be in it's own repo separate from your frontend repo. Some of the backend has already been developed through inclass exercises. "node index.js" should spin up your server at http://localhost:3000 and you can use your browser, a browser extension (such as Advanced REST Client or Postman), or use curl on the command line to test your server.

# Stubbing the Backend
Stubs are "pieces of code used to stand in for some other programming functionality." For this assignment we will create stubs for all of the desired endpoints of our API. After the stubs are created, then we will implement selected functionality in this assignment.

Here is the recommended breakout by endpoint for each source file in your backend server

endpoint	verbs	source file
/login	POST	auth.js
/logout	PUT	auth.js
/register	POST	auth.js
/password	PUT	auth.js
/articles	GET, PUT	articles.js
/article	POST	articles.js
/headline	PUT	profile.js
/headlines	GET	profile.js
/email	GET, PUT	profile.js
/dob	GET	profile.js
/zipcode	GET, PUT	profile.js
/avatars	GET	profile.js
/avatar	PUT	profile.js
/following	GET, PUT, DELETE	following.js
Start by creating "stubs" for all endpoints. A stub returns dummy data, for example
// this is profile.js which contains all user profile 
// information except passwords which is in auth.js

const profile = {
        username: 'DLeebron',
        headline: 'This is my headline!',
        email: 'foo@bar.com',
        zipcode: 12345,
        dob: '128999122000',
        avatar: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/4e/DWLeebron.jpg/220px-DWLeebron.jpg',
    }

const getHeadlines = (req, res) => {

    const users = [ profile[username] ]; 

    // this returns only one headline, but we want to send
    // an array of all the requested user's headlines

    res.send({ headlines: [ 
        { username: users[0], headline: headlines[ profile[headline] ] } 
    ] })

    // Implement the logic to return headlines for all requested users
}

module.exports = (app) => {
    app.get('/headlines/:users?', getHeadlines)
} The API for the server endpoints is found here
Backend API list of endpoints
Deploying your Back-End
When you have completed the implementation of the required pieces of your backend server you are ready to publish your server to Heroku. Be sure you have node_modules excluded from your git repo but by adding it to the gitignore file (Heroku will automatically install these libraries for us because they are in our package.json file). In the example below I have named my server "ricebookserver" -- you will want to pick your own name, or omit and Heroku will supply a name for you

git init
heroku create ricebookserver
echo web: node index.js > Procfile
echo node_modules >> .gitignore
echo npm-debug.log >> .gitignore
git add .gitignore Procfile package.json index.js
git commit -m 'initial commit'
git push heroku master
Heroku should automatically recognize that we have a NodeJS application.

#Requirements
Similar to before, create a file README.json that has contents similar to what is below (we will read this programmatically so make sure you follow this style and it is proper json)

{ 
     "netid": "mrj1",
  "frontend": "https://ricebookapp.surge.sh",
   "backend": "https://ricebookserver.herokuapp.com"
}
replace "ricebookapp" and "ricebookserver" with the names of your frontend and backend applications, and replace "mrj1" with your netID.
