# Application!

This implements a simple user interface for searching by keyword and finding occurrence of a specified string.

## Running the application

Install packages and run the application with:

```
nvm use
yarn install
yarn start
```

This will open the react application on port 3001.

## Testing

Following commands can run tests on this application. Integration test with cypress and tests with react-scripts were added:

```
yarn sanity-test
yarn cypress-run
```

Please note: For cypress tests to run as expected, both frontend and backend service should already be running. Check [backend's readme](../search-backend/README.md) for how to start the serverless lambda offline.
