<template>
    <v-dialog :modelValue="showMetaMaskOverlay" @update:modelValue="showMetaMaskOverlay = $event" persistent max-width="400">
      <!-- Metamask connection dialog -->
      <v-card class="metamask-dialog">
        <v-card-title class="dialog-title text-center">Connection to Metamask<br>needed</v-card-title>
        <img class="metamask-logo" src="../assets/MetaMask_Fox.svg" alt="MetaMask Logo" />
        <v-card class="metamask-card rounded-shaped" outlined variant="tonal">
          <v-card-text class="dialog-text text-center" >
            <!-- Message to connect to Metamask -->
            <p>To use this app, you need to connect to Metamask</p>
            <p class="text-center">
              <!-- Link to Metamask website -->
              <a href="https://metamask.io/"  class="dialog-text" target="_blank" rel="noopener noreferrer">
                Click here to access or to install Metamask on your browser
              </a>
            </p>
          </v-card-text>
        </v-card>
        <v-card-actions>
          <!-- Button to try again to connect to Metamask -->
          <v-spacer></v-spacer>
          <v-btn class="try-again-btn" @click="connectMetaMask">Try again</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  <script>
  export default {
    name: "MetamaskOverlay",
    props: {
      showMetaMaskOverlay: {
        type: Boolean,
        required: true
      }
    },
    data: () => ({
      userAddress: '',
    }),
    methods: {
      async connectMetaMask() {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
  
          if (accounts.length === 0) {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
          }
          this.userAddress = accounts[0];
  
          // Emit event to close the dialog
          this.$emit('update:modelValue', false);
        } catch (error) {
          console.error("An error occurred while you connected to Metamask", error);
  
          // Emit event to show the dialog again
          this.$emit('update:modelValue', true);
        }
      },
    },
    mounted() {
      this.connectMetaMask();
    },
  };
  </script>
  
  <style scoped>
.metamask-dialog {
    background-image: url("../assets/background-loading.png");
    border: 3px solid rgba(24, 67, 49, 0.9);
    background-size: cover;
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
.try-again-btn {
    font-family: 'Amiri', serif;
    font-size: 1.2rem;
    color: white;
    letter-spacing: 0.03rem;
    text-transform:none !important;
    background-color: rgba(24, 67, 49, 0.8);
    border: 3px solid rgb(142, 114, 81);
}
.try-again-btn:hover {
    background-color: rgb(58,138,96);
    border: 3px solid rgb(24, 67, 49);
}
.dialog-text {
  font-family: 'Amiri', serif;
  font-size: 1rem;
  color: white;
  font-weight: bold;
}
  .metamask-card {
  background-color: rgba(24, 67, 49, 0.8);
  border: 3px solid rgb(142,114,81);

}
  </style>
  