<template>
  <!-- Main dialog container -->
  <v-dialog :modelValue="dialog" @update:modelValue="dialog = $event" persistent>
    <!-- Card with choose plant options -->
    <v-card
      class="h-50 w-50 md:h-50 md:w-50 mx-auto my-auto choose-plant"
      min-height="700"
      min-width="700"
      v-click-outside="onClickOutside"
    >
      <!-- Two options: Deploy a new plant and Update a plant -->
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
      <!-- Plant form for deploying a new plant -->
      <div class="plant-form secondary" v-if="showForm1">
        <v-row align="center">
          <v-col cols="12">
            <v-form class="px-3">
              <!-- Plant input fields -->
              <v-text-field class="form-text" label="Specie/Variety*" v-model="species" :rules="[rules.required]"></v-text-field>
              <v-text-field class="form-text" label="Name*" v-model="plantName" :rules="[rules.required]"></v-text-field>
              <v-text-field class="form-text" label="Description*" v-model="description" :rules="[rules.required]"></v-text-field>
              <v-text-field class="form-text" label="Symbol*" v-model="symbol" :rules="[rules.required]"></v-text-field>
              <v-text-field class="form-text" label="Owner*" v-model="owner" :rules="[rules.required]"></v-text-field>
              <v-text-field class="form-text" label="Location*" v-model="plantLocation" :rules="[rules.required]"></v-text-field>
              <v-text-field class="form-text" label="Any Comment" v-model="comment" :rules="[rules.required]"></v-text-field>
              <!-- File input for plant's picture -->
              <v-file-input
                v-model="uploadedImage"
                label="Upload your plant's picture"
                accept="image/*"
              >
              </v-file-input>
            </v-form>
          </v-col>
        </v-row>
        <!-- Upload button -->
        <v-row class="justify-center">
          <v-col cols="3">
            <v-btn class="upload-button2 mb-4"
                   rounded="lg"
                   size="x-large"
                   prepend-icon="mdi-cloud-upload"
                   v-bind:class="{ active1: isHovering1 }"
                   v-on:mouseover="isHovering1 = true"
                   v-on:mouseout="isHovering1 = false"
                   label="Upload"
                   :disabled="!allFieldsFilledUpload"
                   @click="UploadPlant">Upload</v-btn>
          </v-col>
        </v-row>
      </div>
  <!-- Plant form for updating a plant -->
  <div class="plant-form secondary" v-if="showForm2">
    <v-row align="center">
      <v-col cols="12">
        <v-form class="px-3">
          <v-text-field class="form-text" label="Smartcontract address*" v-model="smartcontractAddress" :rules="[rules.required]"></v-text-field>
          <v-text-field class="form-text" label="Name*" v-model="plantName" :rules="[rules.required]"></v-text-field>
          <v-text-field class="form-text" label="Description*" v-model="description" :rules="[rules.required]"></v-text-field>
          <v-text-field class="form-text" label="Specie/Variety*" v-model="species" :rules="[rules.required]"></v-text-field>
          <v-text-field class="form-text" label="Owner*" v-model="owner" :rules="[rules.required]"></v-text-field>
          <v-text-field class="form-text" label="Location*" v-model="plantLocation" :rules="[rules.required]"></v-text-field>
          <v-text-field class="form-text" label="Any Comment*" v-model="comment" :rules="[rules.required]"></v-text-field>
          <v-file-input
            :rules="[rules.required]"
            v-model="uploadedImage"
            label="Upload your plant's picture"
            accept="image/*">
          </v-file-input>
        </v-form>
      </v-col>
    </v-row>

    <!-- Upload button for updating a plant -->
    <v-row class="justify-center">
      <v-col cols="3">
        <v-btn class="upload-button2 mb-4"
               v-bind:class="{ active2: isHovering2 }"
               v-on:mouseover="isHovering2 = true"
               v-on:mouseout="isHovering2 = false"
               rounded="lg"
               size="x-large"
               label="Upload"
               prepend-icon="mdi-cloud-upload"
               :disabled="!allFieldsFilledUpdate"
               @click="UpdatePlant">Update</v-btn>
      </v-col>
    </v-row>
  </div>

  <!-- Close button -->
  <v-card-actions class="justify-end">
    <v-btn @click="onClickOutside" color="white">Close</v-btn>
  </v-card-actions>
</v-card>
</v-dialog>

<!-- Loading dialog -->
<v-dialog v-model="isLoading" persistent max-width="290">
  <v-card class="loading-dialog">
    <v-card class="card3-class rounded-shaped" outlined variant="tonal">
      <v-card-text class="text-center">
        <img class="loading-icon" src="../assets/loading-animation.svg" alt="Loading Icon" v-bind:class="{ spin: isLoading }">
        <div class="mt-4 loadingText">{{ loadingText }}</div>
      </v-card-text>

      <!-- Close button for the loading dialog -->
      <v-card-actions v-if="showCloseButton">
        <v-spacer></v-spacer>
        <v-btn text @click="isLoading = false">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-card>
</v-dialog>
</template>
<script>
import { NFTStorage, File } from 'nft.storage';  // import NFTStorage and File from nft.storage
import deploy from "./../deploynft.js";  // import the deploy function from a local file
import NFTContract from "../assets/NFT.json";  // import NFTContract from a local JSON file
import { inject, reactive, toRefs } from 'vue';  // import inject, reactive, and toRefs from vue

const apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDczQmJEZTYyM0YxNUYyMDUyN0RFNjViNjE1OTc0OEUwM0VGNzcyOTgiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY4MDc0OTgzMjk0NCwibmFtZSI6ImNyeXB0b2NhY3R1cyJ9.ihf0q-ghevhkZDdKd3SXOaXAkJ9NkYD6hAyDexR5u-s";  // define apiKey variable with the imported API key
const nftStorageClient = new NFTStorage({ token: apiKey });  // create a new instance of NFTStorage with the API key


export default {
  name: "ChoosePlantCard",
  props: {
    dialog: {
      type: Boolean,
      required: true
    }
  },
  data: () => ({  // define data for the component
    showForm1: false,
    showForm2: false,
    rules: {
      required: value => !!value || 'This field must be filled.',  // validation rules for form fields
    },
    species: '',
    plantName: '',
    description: '',
    symbol: '',
    owner: '',
    uploadedImage: null,
    plantLocation: '',
    comment: '',
    isHovering1: false,
    isHovering2: false,
    smartcontractAddress: '',
    isLoading: false,
    loadingStep: 0,
    loadingText: '',
    stepsUpload: [  // array of steps for plant upload process
      'Metadata Loading 1/2',
      'Metadata Loading 2/2',
      'Contract Deployment',
      'NFT Minting',
    ],
    stepsUpdatePlant: [  // array of steps for plant update process
      'Metadata Loading 1/2',
      'Metadata Loading 2/2',
      'NFT Minting',
    ],
    contractAddress: '',
    showCloseButton: false,
  }),
  setup() {  // define configuration for the component
    const web3 = inject('web3');  // inject the 'web3' variable into the component
    const state = reactive({  // create a reactive state object containing the 'web3' variable
      web3: web3,
    });
    return { ...toRefs(state) };  // return a copy of the state object with its properties transformed into reactive references
  },
  computed: {  // define computed properties for the component
    allFieldsFilledUpload() {  // check if all fields are filled for plant upload process
      return (
        this.symbol !== "" &&
        this.plantName !== "" &&
        this.description !== "" &&
        this.species !== "" &&
        this.owner !== "" &&
        this.plantLocation !== "" &&
        this.comment !== "" &&
        this.uploadedImage !== null
      );
    },
    allFieldsFilledUpdate() {  // check if all fields are filled for plant update process
      return (
        this.smartcontractAddress !== "" &&
        this.plantName !== "" &&
        this.description !== "" &&
        this.species !== "" &&
        this.owner !== "" &&
        this.plantLocation !== "" &&
        this.comment !== "" &&
        this.uploadedImage !== null
      );
    },
  },

  methods: {  // define methods for the component
    onClickOutside() {  // close dialog or form if clicked outside
      if (this.showForm1 == true) {
        this.showForm1 = false;
      } else if (this.showForm2 == true) {
        this.showForm2 = false;
      } else {
        this.$emit("close-dialog");
      }
    },
    onClickOption1() {  // show form 1 and hide form 2 when option 1 is clicked
      this.showForm1 = true;
      this.showForm2 = false;
    },
    onClickOption2() {  // show form 2 and hide form 1 when option 2 is clicked
      this.showForm2 = true;
      this.showForm1 = false;
    },
    async uploadImage(imageFile) {  // upload image to NFT storage and return URL
      const file = new File(imageFile, imageFile.name, { type: imageFile.type });
      const cid = await nftStorageClient.storeBlob(file);
      return this.nftStorageUrl(cid);
    },
    async UploadPlant() {  // upload plant to NFT storage and mint NFT
      this.isLoading = true;
      this.loadingText = this.stepsUpload[0];
      const json = await this.generateJSON();
      this.loadingText = this.stepsUpload[1];
      const jsonUri = await this.uploadJSON(json);
      this.loadingText = this.stepsUpload[2];
      await this.deployNFT();
      const accounts = await this.web3.eth.getAccounts();
      const account = accounts[0];
      const to = account;
      this.loadingText = this.stepsUpload[3];
      const mint = await this.mint(to, jsonUri);
      const endProcess = [
        mint,
        this.loadingText = `Copy this address somewhere !\n
        This is your plant address.\n
        Smart contract address: ${this.contractAddress}`,
        this.showCloseButton = true
      ];
      return endProcess;
    },
    async UpdatePlant() {  // update plant on NFT storage and mint NFT
      this.isLoading = true;
      this.loadingText = this.stepsUpdatePlant[0];
      const json = await this.generateJSON();
      this.loadingText = this.stepsUpdatePlant[1];
      const jsonUri = await this.uploadJSON(json);
      this.loadingText = this.stepsUpdatePlant[2];
      this.contractAddress = this.smartcontractAddress;

      const accounts = await this.web3.eth.getAccounts();
      const account = accounts[0];
      const to = account;
      const mint = await this.mint(to, jsonUri);
      this.isLoading = false;
      return mint;
    },
    async generateJSON() {  // generate metadata JSON for plant
      const description = this.description;
        const imageInput = this.uploadedImage;
        const imageUrl = await this.uploadImage(imageInput);
        const plantName = this.plantName;
        const species = this.species;
        const plantLocation = this.plantLocation;
        const Owner = this.Owner;
        const comment = this.comment;
        const dateTimestamped = Date.now();

        const jsonTemplate = {
          "description": description,
          "image": imageUrl,
          "name": plantName,
          "attributes": [
            { "trait_type": "Species", "value": species },
            { "trait_type": "Location", "value": plantLocation },
            { "trait_type": "Owner", "value": Owner },
            { "trait_type": "Comment", "value": comment },
            { "display_type": "date", "trait_type": "uploadDate", "value": dateTimestamped }
          ]
        };
        return jsonTemplate;
      },
      async uploadJSON(json) {  // upload JSON to NFT storage and return URL
        const jsonString = JSON.stringify(json);
        const file = new File([jsonString], 'metadata.json', { type: 'application/json' });
        const metadata = await nftStorageClient.storeBlob(file);
        return this.nftStorageUrl(metadata);
      },
      nftStorageUrl(cid) {  // format URL for NFT storage
        return `https://${cid}.ipfs.nftstorage.link/`;
      },
      async deployNFT() {  // deploy NFT contract to Ethereum network
        const nftName = this.plantName;
        const nftSymbol = this.symbol;
        if (nftName.length == 0 || nftSymbol.length == 0) {
          // do nothing
        } else {
          try {
            const receipt = await deploy(nftName, nftSymbol);
            this.contractAddress = receipt._address;
          } catch (error) {
            console.error("Error occured during deployment", error);
          }
        }
      },
      async mint(to, uri) {  // mint NFT and return receipt
        const abi = NFTContract.abi;
        const contractAddress = this.contractAddress;
        const contract = new this.web3.eth.Contract(abi, contractAddress);

        const accounts = await this.web3.eth.getAccounts();
        const account = accounts[0];

        if (!account) {
          throw new Error("No Metamask account is connected.");
        }

        const gasPrice = await this.web3.eth.getGasPrice();
        const gasEstimate = await contract.methods.mint(to, uri).estimateGas({ from: account });

        const receipt = await contract.methods.mint(to, uri).send({
          from: account,
          gas: gasEstimate,
          gasPrice: gasPrice,
        });

        return receipt;
      },
      async simulateLoading() {  // simulate loading for testing purposes
        return new Promise(resolve => setTimeout(resolve, 1000));
      },    
  }
};
</script>
  
  <style scoped>
.active1 {
    transform: scale(1.1);
}
.active2 {
    transform: scale(1.1);
}
.choose-plant {
    background-image: url("../assets/choose-plant-background.png");
    border: 3px solid rgba(24, 67, 49, 0.8);
    background-size: cover;
    margin:10px; 
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
.plant-form {
    color: white;
    border: black;
    background-color: rgba(0, 0, 0, 0.8);
    margin:10px;
    padding-top: 10px;
}
.secondary {
    font-size: 1.35rem;
    font-family: 'Amiri', serif;
    color: white;
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
.upload-button2:hover {
    background-color: rgb(58,138,96);
    border: 3px solid rgb(24, 67, 49);
}

.form-text {
  letter-spacing: 0.03rem;
  font-family: 'Amiri', serif;
}

.loadingText {
    font-family: 'Amiri', serif;
    color: white !important;
    font-weight: bold;
    font-size: 1.4rem;
}
.loading-dialog {
  background-image: url("../assets/background-loading.png");
  border: 3px solid rgba(24, 67, 49, 0.8);
  background-size: cover;
}
.card3-class {
  background-color: rgba(24, 67, 49, 0.8);
  border: 3px solid rgb(142,114,81);

}

.loading-icon {
  width: 64px;
  height: 64px;
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.spin {
  animation: spin 1s linear infinite;
}


  </style>
  