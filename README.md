# YouTube Clone with RapidAPI ▶

This web application is a simple clone of [YouTube](https://www.youtube.com/) that uses [Youtube v31](https://rapidapi.com/ytdlfree/api/youtube-v31/) api from Rapid API. It has **end to end** tests using ***[Cypress Framework](https://www.cypress.io/)*** that can be run in local environment or on continuous integration using the official [Cypress GitHub Action](https://github.com/marketplace/actions/cypress-io).

Visit the **deployed** app at: **[YouTube Clone](https://youtubecloneappa.netlify.app/)**

## Tech stack

This project was created using [Create React App](https://github.com/facebook/create-react-app).

- **Frontend library -** [react.js](https://reactjs.org/)
- **End to end tests -** [Cypress Framework](https://www.cypress.io/)
- **Continuous Integration -** [GitHub Actions](https://github.com/features/actions), check [e2e.yml](.github/workflows/e2e.yml) file
- **Styles and UI -** [Material UI](https://mui.com/)
- **Build tool -** [Create React App](https://github.com/facebook/create-react-app)
- **Routes -** [React Router](https://reactrouter.com/en/main)

### Dependencies

Check other project dependencies and versions in the [package.json](package.json) file.

## How to use this project

### Development

1. Clone the project ```git clone git@github.com:augusticor/youtube-clone.git```
2. Install the project dependencies using ```npm install```
3. Rename [.env.example](.env.example) file to ***.env.local***
4. Create a [Rapid API](https://rapidapi.com/hub) account to consume the api
5. Subscribe to [Youtube v31](https://rapidapi.com/ytdlfree/api/youtube-v31/) api
6. Copy and paste your *X-RapidAPI-Key* in the ***REACT_APP_RAPIDAPI_KEY*** environment variable located in the file from step 3
7. Start the project using [npm start](#npm-start)

### Testing

1. Follow steps 1 to 6 from development mode ⬆
2. Open cypress running [npm cypress:open](#npm-cypressopen) on your CLI and click on E2E testing on [testing type](https://docs.cypress.io/guides/getting-started/opening-the-app#Choosing-a-Testing-Type)
3. Select a browser and the spec file you want to run

### Live Deployment

Just visit the **deployed** app at: **[YouTube Clone](https://youtubecloneappa.netlify.app/)**

## Available Scripts

### `npm start`

Runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm cypress:open`

Opens cypress on local testing, allowing to choose the testing type, in this case end-to-end tests. More information on official [documentation](https://docs.cypress.io/guides/guides/command-line#cypress-open).

### `npm cypress:run`

Runs cypress tests, use it for continuous integration. More information on official [documentation](https://docs.cypress.io/guides/guides/command-line#cypress-run).

### `npm run build`

Builds the app for production to the `build` folder.