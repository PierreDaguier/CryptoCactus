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

var metadata = {
    "description": `${plantDescription}`, 
    "image": `${imageURL}`, 
    "name": `${plantName}`,
    "attributes": [    {
        "display_type": "date", 
        "trait_type": "birth", 
        "value": `${dateofBirth}`
      } ] 
}