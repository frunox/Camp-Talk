# Camp-Talk

## Description

A Yelp-like application to provide discussion of favorite campgrounds, with comments.

## Getting Started

This application was originally developed on goorm-ide, and was transferred to GitHub after the original deployment. Recent updates are reflected in the Github repository.

The Github repository holds the code as deployed.

To use:

- Clone the repository
- Run npm install
- Type "node app.js" to run from the command line
- In local environmental, browse to 'localhost:3000'

This application is deployed on heroku at: https://camp-talk.herokuapp.com

## Prerequisites

This application is built using:

- Node.js
- Express.js
- MongDB and Mongoose
- Ejs
- Passport and Passport-local
- Passport-local-mongoose
- Connect-flash (for flash error messages)

## Usage

Camp Talk opens to a landing page with a slideshow of campsite images.

<img src="public\images\camp-talk-landing.png" alt="camp talk landing page">

The user then proceeds to the home page.
<img src="public\images\camp-talk-home.png" alt="camp talk home page">

The must sign up, or log in if already registered.
<img src="public\images\camp-talk-signin.png" alt="camp talk sign-in page">

After sign-up/log in, the user is directed back to the home page, where camp sites may be viewed or added. The campground can only be deleted, or have the description edited, by the user that created it. Comments can be added to any site by any user.
<img src="public\images\camp-talk-cg-comment.png" alt="camp talk sign-in page">

Comments can be edited or deleted by the user who created them.

## Deployment

The app is ready for deployment to heroku. The code in server.js is written to allow the app to run in both a local environment and in a production environment on heroku. Add mLab as a resource to host the production version of the Mongo database.

### Author

John Cannon  
<a href="https://github.com/frunox/" alt="John Cannon's GitHub Projects">John's GitHub Projects</a>

### License

This source code is available under the standard <a href="https://opensource.org/licenses/MIT">MIT license</a>
