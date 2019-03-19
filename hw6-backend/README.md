Frontend
For this assignment we will use Protractor and write end-to-end tests to validate functionality of our web app. 
Serve your frontend site locally and have Protractor run against your locally running frontend site. 
You should be able to run your end-to-end tests by running the command "npm run e2e" or "ng e2e". 
The required tasks for your end-to-end tests are listed in the requirements section below.

# End-to-End Tests
Your end-to-end tests will run against your web app running on your localhost. Here are the tasks for your end-to-end test

Register a new user named "realUser"
Log in as "realUser"
Create a new article and validate the article appears in the feed
Update the status headline and verify the change
Log out "realUser"
Log in as test user
Search for a keyword that matches only one of test user's articles (verify only one article shows and verify the author)
Log out test user
Include a XML juit report of your end-to-end tests: e2e/results.xml -- note that you are responsible for the file contents to receive credit for your tests.
