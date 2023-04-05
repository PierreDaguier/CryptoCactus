
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
          @click="dialog = true" >Upload</v-btn>

        <v-dialog v-model="dialog" persistent>
    <v-card
    class="h-50 w-50 md:h-50 md:w-50 mx-auto my-auto choose-plant"
    min-height=700
    min-width="700"
    v-click-outside="onClickOutside"

  
    >
    
    <v-card-text>
      <v-row class="mx-0 justify-center">
        <v-col cols="6" class="text-center">
          <v-btn class="my-5 choose-button" size="large" @click="onClickOption1">Deploy a new plant</v-btn>
        </v-col>
        <v-col cols="6" class="text-center">
          <v-btn class="my-5 choose-button" size="large" @click="onClickOption2">Update a plant</v-btn>
        </v-col>
      </v-row>
    </v-card-text>
    <div class="plant-form secondary" v-if="showForm1">
    <v-row align="center" >
      <v-col cols="12"  >
    <v-form  v-model="form1" class="px-3 ">
    <v-text-field class="form-text" label="Specie/Variety" v-model="species" ></v-text-field>
    <v-text-field class="form-text" label="Name" v-model="Name" ></v-text-field>
    <v-text-field class="form-text" label="Symbol" v-model="Symbol" ></v-text-field>
    <v-text-field class="form-text" label="Owner" v-model="owner" ></v-text-field>
    <v-text-field class="form-text" label="Location" v-model="plantLocation" ></v-text-field>
    <v-text-field class="form-text" label="Any Comment" v-model="comment" ></v-text-field>
  </v-form>
  </v-col>
</v-row> 
  

  <v-row class="justify-center">
  <v-col cols="3"  >
  <v-btn class="upload-button2 mb-4 "
         rounded="lg" 
         size="x-large"
         prepend-icon="mdi-cloud-upload"
         v-bind:class="{ active: isHovering }" 
          v-on:mouseover="isHovering = true" 
          v-on:mouseout="isHovering = false"  
         label="Upload"
         @click="deployNFT">Upload</v-btn>
  </v-col>
</v-row>  
  
</div>

      
    
<div class="plant-form secondary" v-if="showForm2">
    <v-row align="center" >
      <v-col cols="12"  >
    <v-form  v-model="form1" class="px-3 ">
    <v-text-field class="form-text" label="Smartcontract address" v-model="smartcontract" ></v-text-field>
    <v-text-field class="form-text" label="Specie/Variety" v-model="species" ></v-text-field>
    <v-text-field class="form-text" label="Owner" v-model="owner" ></v-text-field>
    <v-text-field class="form-text" label="Location" v-model="plantLocation" ></v-text-field>
    <v-text-field class="form-text" label="Any Comment" v-model="comment" ></v-text-field>
  </v-form>
  </v-col>
</v-row> 
  

  <v-row class="justify-center">
  <v-col cols="3"  >
  <v-btn class="upload-button2 mb-4 "
         v-bind:class="{ active: isHovering }" 
         v-on:mouseover="isHovering = true" 
         v-on:mouseout="isHovering = false"
         rounded="lg" 
         size="x-large"  
         label="Upload"
         prepend-icon="mdi-cloud-upload"
         @click="deployNFT">Upload</v-btn>
  </v-col>
</v-row>  
  
</div>
    <v-card-actions class="justify-end">
      <v-btn @click="onClickOutside" color="white">Close</v-btn>
    </v-card-actions>
  </v-card>

</v-dialog>

        </div>
      </v-card>
      </v-col>
    </v-row>
  </v-container>

  <v-dialog v-model="showMetaMaskOverlay" persistent max-width="400">
    <v-card>
      <v-card-title>Connexion à MetaMask requise</v-card-title>
      <v-card-text>
        <p>Pour utiliser cette application, vous devez vous connecter à MetaMask.</p>
        <p>
          <a href="https://metamask.io/" target="_blank" rel="noopener noreferrer">
            Cliquez ici pour installer ou accéder à MetaMask
          </a>
        </p>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="connectMetaMask">Réessayer</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-footer class="pa-6 bg-black">
      <p class="subtitle-2 text-center white">Copyright &copy; {{ currentYear }} Pierre Daguier. All rights reserved.</p>
    </v-footer>
  </v-app>
</template>




<script>

import deploy from "./deploynft.js";

export default {
  data: () => ({
    showMetaMaskOverlay: false,
    currentYear: new Date().getFullYear(),
    showLoginModal: false,
    showRegisterModal: false,
    isHovering: false,
    dialog: false,
    showForm1: false,
    showForm2: false,
    Name: "",
    Symbol: "", 
    form1: {
      species: '',
      date: new Date(),
      owner: '',
      plantLocation: '',
      comment:''
    },
    form2: {
      species: '',
      date: new Date(),
      owner: '',
      plantLocation: '',
      smartcontract: '',
      comment:''
    }
  }),
  methods: {
    async deployNFT() {
      const nftName = this.Name;
      const nftSymbol = this.Symbol;
      if (nftName.length == 0 || nftSymbol.length == 0 ) {
        console.log("The NFT must have a name and a symbol !")
      }
      else {
        try {
        const receipt = await deploy(nftName, nftSymbol);
        console.log("Contrat déployé à l'adresse", receipt.contractAddress);
      } catch (error) {
        console.error("Erreur lors du déploiement", error);
      }
      }


    },
    async connectMetaMask() {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });

      if (accounts.length === 0) {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
      }

      // Si l'utilisateur se connecte avec succès, fermez l'overlay
      this.showMetaMaskOverlay = false;
    } catch (error) {
      console.error("Erreur lors de la connexion à MetaMask", error);
      this.showMetaMaskOverlay = true;
    }
  },
    openLoginModal() {
      this.showLoginModal = true
    },
    openRegisterModal() {
      this.showRegisterModal = true
    },
    closeModal() {
      this.showLoginModal = false
      this.showRegisterModal = false
    },
    onClickOutside () {
      if (this.showForm1 == true) {
        this.showForm1 = false
      } else if (this.showForm2 == true) {
        this.showForm2 = false
      }
        else {
        this.dialog = false
      }
    },
    onClickOption1() {
        this.showForm1 = true
        this.showForm2 = false
    },
    onClickOption2() {
        this.showForm2 = true
        this.showForm1 = false
    }
    },
    mounted() {
  this.connectMetaMask();
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

.upload-button2 {
  font-family: 'Amiri', serif;
  font-size: 1.6rem;
  color: black;
  height: 1rem;
  letter-spacing: 0.03rem;
  text-transform:none !important;
  background-color: rgb(58,138,96);
  border: 3px solid rgba(24, 67, 49, 0.8);
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
  height: 1rem;
  letter-spacing: 0.03rem;
  text-transform:none !important;
  background-color: rgb(58,138,96);
  border: 3px solid rgba(24, 67, 49, 0.8);
}

.choose-button {
  font-family: 'Amiri', serif;
  letter-spacing: 0.03rem;
  text-transform:none !important;
  font-size: 1.55rem;
  max-width: 15rem;
  color: white;
  background-color: rgba(24, 67, 49, 0.8);
  border: 3px solid rgb(142,114,81);
}

.choose-plant {
  background-image: url("./assets/choose-plant-background.png");
  border: 3px solid rgba(24, 67, 49, 0.8);
  background-size: cover;
  margin:10px;
  
 
}
.plant-form {
  color: white;
  border: black;
  background-color: rgba(0, 0, 0, 0.8);
  margin:10px;
  padding-top: 10px;
}

.form-text {

  letter-spacing: 0.03rem;
  font-family: 'Amiri', serif;
}

.upload-button:hover {
  background-color: rgb(58,138,96);
  border: 3px solid rgb(24, 67, 49);
}

.upload-button2:hover {
  background-color: rgb(58,138,96);
  border: 3px solid rgb(24, 67, 49);
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
