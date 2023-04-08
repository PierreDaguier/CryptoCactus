# CryptoCactus


To run it, go at root project and type : 
```
sudo sh ./start.sh
```

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