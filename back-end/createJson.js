var fs = require('fs');

let plantDescription = ""
let imageURL = ""
let plantName = ""


var stringDate = "JJ-MM-YYYY"

function toTimestamp(strDate){
    var datum = Date.parse(strDate);
    return datum/1000;
 }
//stringDate => JJ-MM-YYYY

let dateofBirth = toTimestamp(stringDate) 
var currentDate = new Date().toLocaleDateString()

var metadata = {
    "description": `${plantDescription}`, 
    "image": `${imageURL}`, 
    "name": `${plantName}`,
    "attributes": [    
        {
            "display_type": "date", 
            "trait_type": "birth", 
            "value": `${dateofBirth}`
        }
    ] 
}

function createMetadataFile() {
    fs.writeFile(`./assets/metadata/metadata_${plantName}_${currentDate}.json`, metadata);
}