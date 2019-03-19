# Hw5
In this assignment you will partially implement and test the frontend of your web application. We start with our draft frontend application that contains three views integrated into a single page application (SPA)

landing page with registration and login
main page with articles, followers, and headline message
profile page for a user to upload a new profile picture and edit their user data
Remember that when tackling any large task our best approach is to divide and conquer. For this assignment there are two major portions:
Writing unit tests of the desired functionality.
Implementing logic for our site to eventually connect to the backend server.
Test Driven Development
We will exercise test driven development instead of writing the implementation of our web app first and testing later. Therefore before we implement anything we will first write tests for our functionality. In this way the desired behavior will drive our implementation and design. Start by writing unit tests for the desired behavior and execute the test suite as we develop.

Unit Tests
Every user interaction point should be validated. For your final web app, most user interactions will actually involve making an AJAX call to the server to update data. In our test environment we will not want to contact the real server (not implemented yet), and therefore want to use the hardcoded data in our JSON files. Because there's no backend server yet, any persistent data must be stored using either cookies or localStorage.

Behavior Implementation
After you have implemented all of the tests listed below, we need to implement the desired functionality so that the tests pass. In this way we are assured that all of the code we write is covered by our test cases. I.e., we should get high marks for code coverage with no extra effort and no need to later refactor our code so that it will be testable -- this again is a benefit of test driven development. The list of functionality is provided below.

Requirements
Use Chrome as your standard supported browser. Whereas you can use any browser you like for development, your assignment will be accessed using Chrome by the grading staff and therefore it behooves you that it works.

Host your submission on Surge. Include the URL in a README.json file as before. The deployed version of your code on Surge may be used during grading. Therefore after you make your submission, please do not re-deploy to the same Surge domain until the next assignment.

Remember separation of concerns and write DRY (don't repeat yourself) modularized code.

Unit Tests
Use Jasmine and Karma to test your application. Note that in principle we only test "our" code and not "framework" code. We want to test our specific business logic that we wrote.

You should have tests for each of the following, with the "it" descriptions as given

Validate Authentication
should log in a previously registered user (not new users)
should not log in an invalid user
should update error message (for displaying login error mesage to user)
should log out a user (login state should be cleared)
Validate Article actions
should fetch articles for current logged in user
should update the search keyword
should filter displayed articles by the search keyword
should add articles when adding a follower
should remove articles when removing a follower
Validate Profile actions
should fetch the logged in user's profile information
Most of the above tests validate the logic code, i.e., your service code, not your component code. This implication is supported if we have simple Angular components for our view. The idea being that complex Angular components would require testing, and testing the DOM is more difficult than testing simple functions.

Implemented Functionality
Below are the functional requirements for this assignment. There will initially be only hardcoded data in your frontend. When someone logs in, you will update the main page to have the current user information. The current user is persistent while that user is logged in. An update to the status headline should be persistent while the current user is logged in. Note: for this assignment, only previously registered users (those in the profile.json file) can log in.

Landing view: Register a new user, but new users cannot log in
Landing view: Registered user can log in with netID and password, if successful then redirect to the Main view, otherwise inform user of incorrect login
Main view: ability to update headline for user, update is persistent
Main view: list of articles with newest article first
Main view: add registered user to followed users list (add that user's articles to feed)
Main view: remove registered user from followed users list (remove that users's articles from feed)
Main view: each article has a list of comments displayed (you may want to show/hide them or use some other means to make it user friendly)
Main view: search bar filters displayed articles by author or body, but not date or article id
Main view: ability to add new text-only articles
Profile view: update the user profile information after registration validation (update is not persistent)











This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.2.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
