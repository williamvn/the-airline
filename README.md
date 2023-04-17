# Getting Started with Create React App
This project is an educative Dapp over Ethereum network.

The project modelates a decentralized airline where you can:
- See available flights
- Buy flights (for each buy the user will be rewarded with loyalty points)
- See loyalty points
- See the flights that you have buyed.
- Exchange loyality points for ether (you must have 5 loyalty points to be able to reclaim)

The project is a monorepo using Truffle framework and solidity for the smart contracts and using React for the UI.

## Dependencies
- Install [truffle.js](https://trufflesuite.com/)
- Install [Metamask extension](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en)
- Node.js (14 - 16)
## Setup
After installed listed dependencies, you will need to first setup a local test ethereum blockchain where you can deploy the contracts. Suggestion use [Ganache](https://trufflesuite.com/ganache/)

Then using `truffle deploy` you will be able to deploy the contracts in your local network.

## How to run?
- Sing in in metamask, and add the test network being use (Ganache).
- Import the test accounts, which you want to interact in the app, in Ganache using their private keys.
- ```npm run start```
# If you encounter an error "cannot read properties of undefined (reading 'toLowerCase')" or "Ethereum provider not found" follow the next steps
- Run in your browser console the following command `window.ethereum.enable()`
- This may open metamask and ask you about what Accounts you want to connect to the app
- Select the accounts and run `npm run start`

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
