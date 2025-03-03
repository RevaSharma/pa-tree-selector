# Pennsylvania Native Tree Selector

## Video Link
https://youtu.be/8FoFjkFL28U

This repository contains two versions of the project: `react_app` and `version1`.

- [How to Run](#how-to-run)
  - [Development Mode](#development-mode)
  - [Production Mode](#production-mode)
- [Testing PWA Functionality](#testing-pwa-functionality)
- [Project Structure](#project-structure)

## How to Run

### Development Mode

1. Navigate to the `react_app` folder:

   ```sh
   cd react_app
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Start the development server:

   ```sh
   npm start
   ```

   The app will open in your browser.

### Production Mode

> **Note:** Service workers only function in production mode. *To test PWA functionality, you must be in production mode.*

#### First-Time Setup

1. Navigate to the `react_app` folder:

   ```sh
   cd react_app
   ```

2. Install the `serve` package globally:

   ```sh
   npm install -g serve
   ```

#### Creating and Serving a Production Build

1. Navigate to the `react_app` folder:

   ```sh
   cd react_app
   ```

2. Create a production build:

   ```sh
   npm run build
   ```

3. Serve the build locally:

   ```sh
   serve -s build
   ```

If the `serve` command cannot be found despite installing it correctly, you may need to run `npx serve -s build` instead.

## Testing PWA Functionality

1. [Create and serve a production build.](#creating-and-serving-a-production-build)
2. Open your browser's Developer Tools.
3. In Developer Tools, click the Application tab. Under Service Workers, check that the service worker is **registered** and **running.**
4. Turn off your Wi-Fi. Refresh the page.
5. If the app still shows trees and filters them correctly, then PWA caching is working.
6. In Developer Tools, click the Storage tab. Under Cache Storage, `trees-cache` should be listed.

## Project Structure

- **`package.json`** - Defines the project and its dependencies.
- **`package-lock.json`** - Locks dependency versions for consistency.
- **`src/`** - Contains the application's source code.
  - **`components/`** - Contains React components.
  - **`App.js`** - The root component that initializes the app.
  - **`App.css`** - Styles for components inside `App.js`.
- **`public/`** - Holds static assets that do not change at runtime.
