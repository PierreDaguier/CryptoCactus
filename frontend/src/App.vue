
<template>
  <v-app class="app-background">
    <v-responsive> 
      <link href="https://fonts.googleapis.com/css2?family=Amiri&family=Satisfy&display=swap" rel="stylesheet">
  </v-responsive>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="10" md="8">
        <h1 class="text-center primary" >CryptoCactus</h1>
        <v-card class="px-5 py-5 card1-class" outlined variant="tonal">
        <v-img class="mx-auto" src="./assets/logo.svg" max-width="550"></v-img>
        <v-card elevation="12" class="card2-class rounded-shaped" outlined variant="tonal">
          <p class="ma-3 text-center secondary">
          Welcome to CryptoCactus!
          Are you a plant enthusiast looking for a unique way to track the growth and development of your beloved greenery?
        Look no further! CryptoCactus allows you to upload NFTs of your plants onto the blockchain, creating a one-of-a-kind digital record of your botanical beauties.
        Not only will you be able to see your plants evolve over time, but you'll also be able to share and admire them with the wider plant community. 
        Come join us on CryptoCactus and let your plants reach new heights!</p>
        </v-card>

        <div class="d-flex justify-center align-self-center pt-5">
        <v-btn 
          rounded="lg" 
          size="x-large" 
          class="upload-button mb-1" 
          prepend-icon="mdi-cloud-upload" 
          v-bind:class="{ active: isHovering }" 
          v-on:mouseover="isHovering = true" 
          v-on:mouseout="isHovering = false" >Upload</v-btn>
        </div>
      </v-card>
      </v-col>
    </v-row>
  </v-container>
  <v-footer class="pa-6 bg-black">
      <p class="subtitle-2 text-center white">Copyright &copy; {{ currentYear }} Pierre Daguier. All rights reserved.</p>
    </v-footer>
  </v-app>
</template>




<script>
export default {
  data: () => ({
    currentYear: new Date().getFullYear(),
    showLoginModal: false,
    showRegisterModal: false,
    isHovering: false
  }),
  methods: {
    openLoginModal() {
      this.showLoginModal = true
    },
    openRegisterModal() {
      this.showRegisterModal = true
    },
    closeModal() {
      this.showLoginModal = false
      this.showRegisterModal = false
    }
  },
  apollo: {
    // Apollo queries and mutations go here
  }
}
</script>
<style scoped>
.v-footer {
  text-align: center;
}
.app-background {
  background-image: url("./src/assets/app-background.png");
  background-size: cover;}

.card1-class {
  background-color: rgba(110, 150, 120, 0.715);
  height: 100vh;
}

.card2-class {
  background-color: rgba(24, 67, 49, 0.8);
  border: 3px solid rgb(142,114,81);
  /* box-shadow: 100px 10px 20px 100px rgb(0, 0, 0); */

}
.primary {
  font-family: 'Satisfy', cursive;
  font-size: 3rem;
  text-shadow: -0.1rem 0 white, 0 0.1rem white, 0.1rem 0 white, 0 -0.1rem white;
  
}

.secondary {
  font-size: 1.35rem;
  font-family: 'Amiri', serif;
  color: white;
}

.upload-button {
  font-family: 'Amiri', serif;
  font-size: 1.6rem;
  color: black;
  /* text-shadow: -0.05rem 0 white, 0 0.05rem white, 0.05rem 0 white, 0 -0.05rem white; */
  height: 1rem;
  text-transform:none !important;
  background-color: rgb(58,138,96);
  border: 3px solid rgba(24, 67, 49, 0.8);

}

.active {
  transform: scale(1.1);
}

@media (min-width: 600px) {
  .primary {
    font-size: 5rem;
  }
}
</style>
