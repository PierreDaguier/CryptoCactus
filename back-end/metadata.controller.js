import bearer from './secrets.json' 
const axios = require('axios');





const file = './selectedFile'

const uploadMetadata = async(description, plantName, species, comment, dateTimestamped) => {
    let firstResponse = await axios.post(
        'https://api.nft.storage/upload',
        `${file}`,
        {
            headers: {
                'accept': 'application/json',
                'Content-Type': 'image/*',
                'Authorization': `Bearer ${bearer}`
            }
        }
    );
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
    let secondResponse = await axios.post(
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
    return secondResponse
}


