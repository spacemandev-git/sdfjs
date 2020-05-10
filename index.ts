import * as jszip from 'jszip';
import * as yaml from 'js-yaml';
import { YML_Deck } from "./models/deck";
import { YML_Card } from './models/card';

export function handleFiles(files:FileList){
  //console.log(files)
  for(let i=0; i<files.length; i++){
    readDeck(files.item(i))
  }
}

/**
 * Reads a File object and adds it to the deck mapping
 * @param deckfile A zip file in SDF format
 * @returns A Deck Object
 */
export async function readDeck(deckfile:File){
  //Validate the file to make sure it has a deck.yaml, assests/, templates/, and cards/
  let deckzip = await jszip.loadAsync(deckfile);
  try {
    let deckyaml:YML_Deck = yaml.safeLoad(await deckzip.file('deck.yaml').async("text"))
    
    // Build Assets Object URI dictionary
    let assetURIMap:AssetURIMap = {} //assetname (including the filetype ('.png'))
    deckzip.folder('assets').forEach( async (file)=>{
      assetURIMap[file] = URL.createObjectURL(await deckzip.file(`assets/${file}`).async('blob'))
    })

    //For each card in deckyaml.cardlist, fetch that file from the zip
      // Build the Card Object
      // Fetch the template from zip

  }catch{
    console.log("Zip File doesn't match SDF Schema")
  }

}


// Read the Deck Yaml
// Read the Assets/ and Create Object URLS for them
// Read the Cards and add them card list, replace assets with asset urls
// Create a function to return the HTML of a given card from a deck

interface AssetURIMap {
  [attribute: string]: string
}