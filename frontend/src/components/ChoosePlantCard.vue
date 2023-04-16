<template>
<v-dialog :modelValue="dialog" @update:modelValue="dialog = $event" persistent>
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
    <v-form  class="px-3 ">
    <v-text-field class="form-text" label="Specie/Variety*" v-model="species" :rules="[rules.required]"></v-text-field>
    <v-text-field class="form-text" label="Name*" v-model="plantName" :rules="[rules.required]"></v-text-field>
    <v-text-field class="form-text" label="Description*" v-model="description" :rules="[rules.required]"></v-text-field>
    <v-text-field class="form-text" label="Symbol*" v-model="symbol" :rules="[rules.required]"></v-text-field>
    <v-text-field class="form-text" label="Owner*" v-model="owner" :rules="[rules.required]"></v-text-field>
    <v-text-field class="form-text" label="Location*" v-model="plantLocation" :rules="[rules.required]"></v-text-field>
    <v-text-field class="form-text" label="Any Comment" v-model="comment" :rules="[rules.required]" ></v-text-field>    
    <v-file-input
      v-model="uploadedImage"
      label="Upload your plant's picture"
      accept="image/*">
    </v-file-input>

  </v-form>
  </v-col>
</v-row> 
  

  <v-row class="justify-center">
  <v-col cols="3"  >
  <v-btn class="upload-button2 mb-4 "
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

      
    
<div class="plant-form secondary" v-if="showForm2">
    <v-row align="center" >
      <v-col cols="12"  >
    <v-form class="px-3 ">
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
  

  <v-row class="justify-center">
  <v-col cols="3"  >
  <v-btn class="upload-button2 mb-4 "
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

    <v-card-actions class="justify-end">
      <v-btn @click="onClickOutside" color="white">Close</v-btn>
    </v-card-actions>
  </v-card>
    </v-dialog>
    <v-dialog v-model="isLoading" persistent max-width="290">
  <v-card class="loading-dialog">
    <v-card class="card3-class rounded-shaped" outlined variant="tonal">
    <v-card-text class="text-center">
      <img class="loading-icon" src="../assets/loading-animation.svg" alt="Loading Icon" v-bind:class="{ spin: isLoading }">
      <div class="mt-4 loadingText">{{ loadingText }}</div>
    </v-card-text>
    
    <v-card-actions v-if="showCloseButton">
    <v-spacer></v-spacer>
    <v-btn  text @click="isLoading = false">Close</v-btn>
  </v-card-actions>
</v-card>
  </v-card>
</v-dialog>
  </template>
  
<script>
import NFTStorage_API_Key from "../../secrets.json";
import { NFTStorage, File } from 'nft.storage';
import deploy from "./../deploynft.js";
import NFTContract from "../assets/NFT.json";
import { inject, reactive, toRefs } from 'vue';





const apiKey = NFTStorage_API_Key.NFTStorage_API_Key
const nftStorageClient = new NFTStorage({ token: apiKey });



export default {
    name: "ChoosePlantCard",
    props: {
    dialog: {
      type: Boolean,
      required: true
    }
  },
    data: () => ({
        showForm1:false,
        showForm2:false,
        rules: {
            required: value => !!value || 'This field must be filled.',
        },
        species:'',
        plantName:'',
        description:'',
        symbol:'',
        owner:'',
        uploadedImage:null,
        plantLocation:'',
        comment:'',
        isHovering1:false,
        isHovering2:false,
        smartcontractAddress:'',
        isLoading:false,
        loadingStep: 0,
        loadingText:'',
        stepsUpload: [
            'metadata loading 1/2',
            'metadata loading 2/2',
            'contract deployment',
            'mint',
        ],
        stepsUpdatePlant: [
            'metadata loading 1/2',
            'metadata loading 2/2',
            'minting',
        ],
        contractAddress:'',
        showCloseButton: false,

    }),
    setup() {
        const web3 = inject('web3');
        const state = reactive({
            web3: web3,
        });
        return { ...toRefs(state) };
    },
    computed: {

        allFieldsFilledUpload() {
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
        allFieldsFilledUpdate() {
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
    methods: {
        onClickOutside() {
            if (this.showForm1 == true) {
                this.showForm1 = false
            } else if (this.showForm2 == true) {
                this.showForm2 = false
            }
                else {
                this.$emit("close-dialog");
            }
        },
        onClickOption1() {
            this.showForm1 = true
            this.showForm2 = false
        },
        onClickOption2() {
            this.showForm2 = true
            this.showForm1 = false
        },
        async uploadImage(imageFile) {
            const file = new File(imageFile, imageFile.name, { type: imageFile.type });
            console.log(imageFile, 'imageFile')
            console.log(imageFile[0].name, 'imageFile.name')
            console.log(imageFile[0].type, 'imageFile.type')
            const cid = await nftStorageClient.storeBlob(file);
            console.log(this.nftStorageUrl(cid), 'url image');
            return this.nftStorageUrl(cid);
        },
        async UploadPlant() {
            this.isLoading = true;
            this.loadingText = this.stepsUpload[0];
            console.log(apiKey, 'apiKey')
            const json = await this.generateJSON();
            console.log(json, 'step 1')
            this.loadingText = this.stepsUpload[1];
            const jsonUri = await this.uploadJSON(json);
            console.log(jsonUri, 'step 2')
            this.loadingText = this.stepsUpload[2];
            await this.deployNFT();
            console.log(this.contractAddress, 'step 3') 
            const accounts = await this.web3.eth.getAccounts();
            const account = accounts[0];
            const to = account;
            this.loadingText = this.stepsUpload[3];
            const mint = await this.mint(to,jsonUri);
            console.log(mint, 'step 4')
            const endProcess = [mint,this.loadingText = `Copy this address somewhere !\n
            This is your plant address.\n
            Smart contract address: ${this.contractAddress}`,this.showCloseButton = true];
            return endProcess  
        },
        async UpdatePlant() {
            this.isLoading = true;
            this.loadingText = this.stepsUpdatePlant[0];
            console.log(apiKey, 'apiKey')
            const json = await this.generateJSON();
            console.log(json, 'step 1')
            this.loadingText = this.stepsUpdatePlant[1];
            const jsonUri = await this.uploadJSON(json);
            console.log(jsonUri, 'step 2')
            this.loadingText = this.stepsUpdatePlant[2];
            this.contractAddress = this.smartcontractAddress
            console.log(this.contractAddress, 'step 3') 

            const accounts = await this.web3.eth.getAccounts();
            const account = accounts[0];
            const to = account;
            const mint = await this.mint(to,jsonUri);
            console.log(mint, 'step 4')
            this.isLoading = false;
            return mint
        },
        async generateJSON() {
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
        async uploadJSON(json) {
            const jsonString = JSON.stringify(json);
            const file = new File([jsonString], 'metadata.json', { type: 'application/json' });
            const metadata = await nftStorageClient.storeBlob(file);
            console.log(this.nftStorageUrl(metadata), 'json url')
            return this.nftStorageUrl(metadata);
        },
        nftStorageUrl(cid) {
            return `https://${cid}.ipfs.nftstorage.link/`;
        },

        async deployNFT() {
            const nftName = this.plantName;
            const nftSymbol = this.symbol;
            if (nftName.length == 0 || nftSymbol.length == 0 ) {
                console.log("The NFT must have a name and a symbol !")
            }
            else {
                try {
                    const receipt = await deploy(nftName, nftSymbol);
                    console.log(receipt, 'receipt')
                    console.log(receipt._address, 'receipt address')
                    console.log("Contract deployed on this address:", receipt._address);
                    this.contractAddress = receipt._address;
                } catch (error) {
                    console.error("Error occured during deployment", error);
                }
            }
        },
        async mint(to, uri) {
            const abi = NFTContract.abi;
            const contractAddress = this.contractAddress;
            console.log(contractAddress, 'mint contract address')
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

            console.log(receipt, 'receipt');

            return receipt;
        },
        async simulateLoading() {
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
    font-size: 1.6rem;
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
  