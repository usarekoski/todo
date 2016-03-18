# Todo app

This is a learning project for creating a web app.
It uses react + flux (flux/utils) for frontend and node, express and mongoose for backend.

User can create tasks and mark them done. Clicking **save** saves created tasks to server and generates url where
them can be accessed.

## Usage
`$ npm start` to start development server with webpack-dev-server and react-hot-reloading.

`$ npm run build` builds all files form `./client` to `./public` directory.

`$ NODE_ENV="prod" PORT="8000" npm start` Starts node server in production mode.
