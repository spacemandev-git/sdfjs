import { Card } from "./card"

export class Deck {
  cardlist: Card[]
  meta:YML_Deck["meta"]

  discard: Card[]
  current: Card[]
  isInfinite: Boolean

  /**
   * @constructor 
   * @param deck_yaml This is the parsed document for the deck.yaml file as it appears in SDF v0.2
   */ 
  constructor(deck_yaml:YML_Deck, _cardlist:Card[]){
    this.cardlist = _cardlist
    this.meta = deck_yaml.meta
  }

  public Shuffle(){
    let currIndex = this.current.length, tempValue, randomIndex;
    while(currIndex != 0){
      //Pick a remaining element
      randomIndex = Math.floor(Math.random() * currIndex);
      currIndex -= 1;
      //And swap it with the current element
      tempValue = this.current[currIndex];
      this.current[currIndex] = this.current[randomIndex];
      this.current[randomIndex] = tempValue;
    }
  }

  public ResetDeck(){
    this.current = this.cardlist
    this.discard = []
  }

  /**
   * Draws the top card in the current cards list
   */
  public DrawCard(){
    return this.current.pop()
  }

  /**
   * Adds the card to the discard pile. Does not check if the card belongs to this deck or not
   */
  public Discard(card:Card){
    return this.discard.push(card)
  }

}

export interface YML_Deck{
  cardlist: string[],
  meta: {
    deck_name: string,
    game: string,
    sdf_version: number
  }
}
