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
          v-on:mouseout="isHovering = false"
          @click="checkMetaMaskConnection" >Upload </v-btn>

      <choose-plant-card 
        :dialog="dialog"   
        @update:modelValue="dialog = $event"
        @close-dialog="closeDialog">
      </choose-plant-card>


        </div>
      </v-card>
      </v-col>
    </v-row>
  </v-container>

  <!-- <v-dialog v-model="showMetaMaskOverlay" persistent max-width="400">
    <v-card class="metamask-dialog">
      <v-card-title class="dialog-title text-center">Connection to Metamask<br>needed</v-card-title>
      <img class="metamask-logo" src="./assets/MetaMask_Fox.svg" alt="MetaMask Logo" />
      <v-card class="card2-class rounded-shaped" outlined variant="tonal">
      <v-card-text class="dialog-text text-center" >
        
        <p>To use this app, you need to connect to Metamask</p>
        <p class="text-center">
          <a href="https://metamask.io/"  class="dialog-text" target="_blank" rel="noopener noreferrer">
            Click here to access or to install Metamask on your browser
          </a>
        </p>
        
      </v-card-text>
      </v-card>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn 
         class="try-again-btn" 
         @click="connectMetaMask"
         >Try again</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog> -->
  <metamask-overlay 
        :showMetaMaskOverlay="showMetaMaskOverlay"   
        @update:modelValue="showMetaMaskOverlay = $event"
        @close-showMetaMaskOverlay="closeShowMetaMaskOverlay">
    </metamask-overlay>



  <v-footer class="pa-6 bg-black">
      <p class="subtitle-2 text-center white">Copyright &copy; {{ currentYear }} Pierre Daguier. All rights reserved.</p>
    </v-footer>
  </v-app>
</template>
<script>
import ChoosePlantCard from "./components/ChoosePlantCard.vue";
import MetamaskOverlay from "./components/MetamaskOverlay.vue";


export default {
  components:{
    ChoosePlantCard,
    MetamaskOverlay
  },
  data: () => ({

    // userAddress: '',
    showMetaMaskOverlay: false,
    currentYear: new Date().getFullYear(),
    isHovering: false,
    dialog: false,
    date: new Date(),
  }),

  methods: {
    closeDialog() {
      this.dialog = false
    },

    closeShowMetaMaskOverlay() {
      this.showMetaMaskOverlay = false
    },
    async checkMetaMaskConnection() {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });

      if (accounts.length === 0) {
        this.showMetaMaskOverlay = true;
      } else {
        this.dialog = true;
      }
    } catch (error) {
      console.error("An error occured while checking Metamask connection", error);
      this.showMetaMaskOverlay = true;
    }
  },

  //   async connectMetaMask() {
  //   try {
  //     const accounts = await window.ethereum.request({ method: 'eth_accounts' });

  //     if (accounts.length === 0) {
  //       await window.ethereum.request({ method: 'eth_requestAccounts' });
  //     }
  //     this.userAddress = accounts[0];

  //     this.showMetaMaskOverlay = false;
  //   } catch (error) {
  //     console.error("An error occured while you connected to Metamask", error);
  //     this.showMetaMaskOverlay = true;
  //   }
  // },

  //   },
  //   mounted() {
  // this.connectMetaMask();
    },


}
</script>
<style scoped>
.v-footer {
  text-align: center;
}
.metamask-dialog {
  background-image: url("./assets/background-loading.png");
  border: 3px solid rgba(24, 67, 49, 0.9);
  background-size: cover;
}
.v-card-title, .v-card-text {
  font-family: 'Amiri', serif;
  color: white;
}
a {
  color: black;
  text-decoration: underline;
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
.dialog-title {
  font-family: 'Amiri', serif;
  font-size: 1.6rem;
  color: white;
  text-align: center;
  font-weight: bold;
}

.metamask-logo {
  margin:auto;
  padding: auto;
  max-width: 9rem;
}
/* .try-again-btn {
  font-family: 'Amiri', serif;
  font-size: 1.6rem;
  color: white;
  letter-spacing: 0.03rem;
  text-transform:none !important;
  background-color: rgb(58,138,96);
  border: 3px solid rgba(24, 67, 49, 0.8);
}
.try-again-btn:hover {
  background-color: rgb(58,138,96);
  border: 3px solid rgb(24, 67, 49);
} */
.upload-button {
  font-family: 'Amiri', serif;
  font-size: 1.6rem;
  color: black;
  letter-spacing: 0.03rem;
  text-transform:none !important;
  background-color: rgb(58,138,96);
  border: 3px solid rgba(24, 67, 49, 0.8);
}
.upload-button:hover {
  background-color: rgb(58,138,96);
  border: 3px solid rgb(24, 67, 49);
}

.dialog-text {
  font-family: 'Amiri', serif;
  font-size: 1rem;
  color: white;
  font-weight: bold;
}
/* .dialog-button {
  font-family: 'Amiri', serif;
  font-size: 1.2rem;
  background-color: rgba(24, 67, 49, 0.8);
  border: 3px solid rgb(142, 114, 81);
} */
.active {
  transform: scale(1.1);
}
@media (min-width: 600px) {
  .primary {
    font-size: 5rem;
  }
}

</style>
