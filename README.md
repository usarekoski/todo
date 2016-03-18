# Todo app

This is a learning project for creating a web app.
It uses react + flux (flux/utils) for frontend and node, express and mongoose for backend.

User can create tasks, delete them or mark them done. Clicking **save** saves created tasks to server and generates url where
them can be accessed later.

You can try the application [here](http://frozen-brook-74175.herokuapp.com/).

## Usage
`$ npm start` to start development server with webpack-dev-server and react-hot-reloading. Webpack-dev-server will proxy all requests to api adressess to another express server runnign on different port.

`$ npm run build` builds all files in `./client` directory and outputs to `./public` directory.

***There are different enviroment variables for configuring the node server:***

- `NODE_ENV="production"` changes server to production mode. Static files are then served from `./public` directory.
- `PORT` changes server's port.
- `MONGO_URL` is used for connecting to mongodb. If no value is specified, it will try connecting to localhost.

For example:

`$ NODE_ENV="production" PORT="8000" npm start` starts node server in production mode.

## Deployment

For deplyoing in Heroku you will need to set an url for Mongodb in Heroku: `$ heroku config:set MONGO_URL=<your_url>`.
