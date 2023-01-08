# `📌 Getting Started with Delance`

## 💁 Available Scripts

In the project directory, you can run:

### `⛃ run backend`
To run the backend of our project, you need to open the terminal/command line in server folder and run the followig command:
`nodemon index.js`
After executing this command. Backend will be running on port `8080`

### `⛏ compile smart contract`
- To compile the smart contract, make sure you've truffle up and running.
- Now type the following commands:
- `truffle init` then `truffle compile`
- Before running these commands, make sure Ganache is running which is a private Ethereum blockchain environment that allows to you emulate the Ethereum blockchain so that you can interact with smart contracts.

### `✅ npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `♲ npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `💪 npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## 👑 Delance
* Delance is a decentralized freelance plateform, where you can post a project/job, browse jobs, search jobs and bid upon existing projects.
* You need to connect your metamask wallet to perform these operations.
* Once you bid on the project, attach the summary and some files with the bid.
* The employeer will choose from the list of bids.
* Project Owner has the option to see all the bids, and choose from them.
* In case you get luck enough, that you bid got accepted. Then you'll be able to see this project in My Projects field.
* After completing the project, you've an option to add the files. Once the owner made sure that the project is completed, you'll get you funds.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.
