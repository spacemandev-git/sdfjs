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
  console.log(deckzip)
  try {
    let deckyaml:YML_Deck = yaml.safeLoad(await deckzip.file('deck.yaml').async("text"))
    console.log(deckyaml)
  }catch{

  }

}


// Read the Deck Yaml
// Read the Assets/ and Create Object URLS for them
// Read the Cards and add them card list, replace assets with asset urls
// Create a function to return the HTML of a given card from a deck

