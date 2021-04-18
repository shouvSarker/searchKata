# Search Interface

This solves [Automatic Search Operation](kata.pdf) task. It is implemented with a lambda function as the backend and a create react app on the frontend.

## Running the application

First, if not configured, configure node version.

```
nvm use 15
```

First, start the backend service:

```
cd search-backend
yarn install
yarn start
```

This will start the backend lambda on port 3000.

Then start the frontend application:

```
cd ../search-frontend
yarn install
yarn start
```

Testing instructions (separate for backend and frontend) are in the readme of respective folders.
