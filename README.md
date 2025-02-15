# pa_tree_selector

this repository holds two versions of our project: `react_app` and `version1`.

## how to run

### development mode

1. download and open this project folder
2. open a new terminal
3. cd into `react_app` folder
4. run `npm install` to install all dependencies (this will generate a node_modules folder)
5. run `npm start` to view the app in your browser

### production mode

first-time setup:

1. cd into `react_app` folder
2. run `npm install -g serve` to install serve command

creating a production build:

1. cd into `react_app` folder
2. run `npm run build` to create a build folder
3. run `serve -s build` to serve the build

## about `react_app`

- `package.json` - describes this Node.js project and lists all dependencies
- `package-lock.json` - locks specific versions of each dependency to ensure consistent installations across all environments
- `src` - holds app's source code
  - `components` - holds React components, which are JavaScript files that describe UI logic and structure
  - `App.js` - first React component that gets rendered, root of the app
  - `App.css` - styles all elements and components inside `App.js`
- `public` - holds all static assets (resources used by the app that do not change during runtime)

## about `version1`

- `index.html` - website's structure
- `styles.css` - controls appearance of elements on the website
- `app.js` - provides interactivity and functionality to the website
- `trees.json` - tree data file used by `app.js`
- `filters.json` - used by `app.js` to generate filters
- `hardiness.json` - dictionary used by `app.js` that maps zip codes to USDA hardiness zones
