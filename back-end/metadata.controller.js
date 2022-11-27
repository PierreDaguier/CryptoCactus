import bearer from './secrets.json' 
const axios = require('axios');

/* This is the controller made to handle json Metadata to IPFS and Filecoin :
    This function uses axios to send a POST request to upload your NFT metadata to NFT.storage http API : https://nft.storage/api-docs/

    * description: any description you would want to associate to your NFT
    * plantName: the name of your plant
    * imageFile: the picture of your plant
    * species: the species of your plant
    * comment: any comment you would like to add
    * dateTime : date you entered at format DD/MM/YYYY
    
    Note : "bearer" variable is your NFT Storage API Key. To have one, create an account, then paste it in 
            a Json file named secrets.json in this current directory this way:
            {
                "bearer":"<bearer value>"
            }

*/


const uploadMetadata = async(description, plantName, imageFile, species, comment, dateTime) => {
    
    //First dateTime is converted from DD/MM/YYYY to timestamp format 
    dateTime = dateTime.split("/");
    var dateTimestamped = new Date( myDate[2], myDate[1] - 1, myDate[0]);

    //Your first POST request will actually upload your image file to IPFS
    try {
        var firstResponse = await axios.post(
            'https://api.nft.storage/upload',
            `${imageFile}`,
            {
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'image/*',
                    'Authorization': `Bearer ${bearer}`
                }
            }
        );
    } catch (error) {
        console.error("error in image upload", error)
    }

    //Bellow is the template used by many NFT marketplaces, it will add all the informations you want to the picture
    //You can find more about metadata structure here :  https://docs.opensea.io/docs/metadata-standards
    let Jsontemplate = {
        "description": `${description}`, 
        "image": `https://${firstResponse.value.cid}.ipfs.nftstorage.link/`, 
        "name": `${plantName}`,
        "attributes": [
            {
              "trait_type": "Species", 
              "value": `${species}`
            }, 
            {
              "trait_type": "Comment", 
              "value": `${comment}`
            }, 
            {
              "display_type": "date", 
              "trait_type": "uploadDate", 
              "value": `${dateTimestamped}`
            }
          ]
    }

    //Here is the second upload to IPFS, with the picture location added to the template, as all the data you provided.
    try {
        var secondResponse = await axios.post(
            'https://api.nft.storage/upload',
            `${Jsontemplate}`,
            {
                headers: {
                    'accept': 'application/json',
                    'Content-Type': '*/*',
                    'Authorization': `Bearer ${bearer}`
                }
            }
        );
    } catch(eroor) {
        console.error("error in json upload", error)
    }
    let URI = `https://${secondResponse.value.cid}.ipfs.nftstorage.link/`

    //The function will finally return the metadata URI, which we will add in our ERC721 as a string.
    return URI
}


