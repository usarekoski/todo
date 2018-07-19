# Todo app

This is a learning project for creating a web app.
It uses react, redux and styled-components for frontend and node, express and sqlite for backend. Written in Typescript.

User can create tasks, delete them or mark them done. Clicking **save** saves created tasks to server and generates url where them can be accessed later.

## Usage
`$ npm start` to start development server with webpack-dev-server. Webpack-dev-server will proxy all requests to api adressess to express server runnign on different port.

`$ npm run build-client` builds all files in `./client` directory and outputs to `./public`.
`$ npm run build-server` builds all files in `./server` directory and outputs to `./dist`.

- `NODE_ENV="production"` changes server to production mode. Static files are then served from `./public` directory.
- `PORT` changes server's port.

For example:

`$ NODE_ENV="production" PORT="8000" npm start` starts node server in production mode.


