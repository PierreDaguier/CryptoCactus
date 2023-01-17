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