# Cryptocactus

![Cryptocactus logo](/frontend/src/assets/logo.png)

Cryptocactus is a decentralized application that enables users to mint unique NFTs representing their plants on the Ethereum blockchain. The NFTs can be traded on marketplaces like OpenSea and will forever be a unique representation of the user's plant.

## Authentication

To use Cryptocactus, you need to connect to Metamask, a popular Ethereum wallet that enables users to interact with dApps like Cryptocactus.

## Usage

1. Click on "Upload Plant" button
2. Choose whether to upload or update a plant
3. Fill out the required information and upload an image of your plant
4. Your plant will be minted as an NFT and will be available to view on OpenSea

## Technologies

Cryptocactus is built with Vue.js and Vuetify for the front-end, and uses the NFT.Storage API for image and metadata storage. The smart contract is deployed on the Ethereum blockchain and was written in Solidity.

## Installation

1. Clone the repository
2. Install Docker: "https://www.docker.com/"
3. Start production frontend with Docker:
```bash
./start.sh
```
4. Open the app on the URL printed by the script (`http://localhost:8080` by default, auto-fallback to a free port up to `8090`).

If port `8080` is already used, override it:

```bash
FRONTEND_PORT=8081 ./start.sh
```

### Smartcontract checks

```bash
cd smartcontract
npm install
npm run compile
npm test
```

## Contributing

We welcome contributions to Cryptocactus! If you'd like to contribute, please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License


## Updates
 
### 13/01/2023

* In all dockers : dockerfile, docker-compose
* Vue installation in frontend
* GraphQL installation in api-graphql docker
* deployment script done


### 14/01/2023

* GraphQL repaired and working
* Upgraded all node versions to 17 in docker
* Switched old Vue framework for new @vue/cli framework in frontend 
* Apollo and Vuetify installed on frontend

### 15/01/2023

* Switched for Vuetify 3 framework
* Undockerized frontend
* Rewrited deployment script
* Added cactus icon
* Created app background with Midjourney AI
* Created app logo with Midjourney AI, Gimp and Inkscape
* frontend/src/App.vue modifications:
  - Title
  - Logo
  - Cards
  - Application description
  - Upload button
  - Footer
  - background image

### 16/01/2023
* Added a new overlay window in front-end, linked to the upload button
  - Added two conditionnal choices inside opening (...)
  - (..) two differents forms with string inputs
  - added current date timestamp as metadata
  - created background for new overlay window
  - Added a gridbox
  - Added functions so outside-click and close button closes forms first then window
  - changed buttons typos and hoverring

### 22/01/2023
* Front-end dockerized back
* pm2 installed and running front-end in the back
* docker-compose edited
* dockerfile edited
* pm2 config file edited
* start.sh edited

#### 05/04/2023
* Simplification of the app
  - No more backend and graphql dockers
  - docker-compose edited
  - start script edited
  - smartcontracts extracted and nft storage api
* Metamask implemented in the frontend with web3 and new connection window


#### 06/04/2023 
* Upload button script added with:
  - nft-storage metadata upload function
  - json generation function
  - contract deployment
* More fields added
* Bug fixes on ipfs into http url

#### 07/04/2023
* Mint function fixed and working
* Form improved with requested fields
* Metamask triggered at opening
* New loading animation triggered when upload button clicked
* nft-storage old folder cleaned from the repo
* Update plant working aswell
* smartcontract improved with auto-incremented tokenID

#### 08/04/2023
* Added background image for Metamask alert and loading
* Added spinning icon for loading and Metamask icon
* Beautified stuffs around
* Added smartcontract displayed at the end of the loading

#### 12/04/2023

* Added new overlay window for Metamask when the user doesn't identify himself
* Created new background and window

#### 15/04/2023 

* New branch for components
* Separated App.vue with new component ChoosePlantCard.vue
* Improved dialog value trigger from App.vue
* Improved index.js importation logic

#### 16/04/2023 

* Separated Metamask window into a component
* Added a function related to first Upload button to trigger Metamask window if the user isn't connected
* Added form field requirements in Upload and Update Form
* Deleted all console logs
* Merged components branch on main
* Commented code
