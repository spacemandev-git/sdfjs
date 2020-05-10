import { compile, TemplateDelegate } from 'handlebars'

export class Card {
  namespace: string
  data: {
    [attribute:string]: string
  } 
  assets: {
    [attribute:string]: string
  }
  cardType: string
  cardBack: string
  frontTemplate: TemplateDelegate
  backTemplate: TemplateDelegate

  /**
   * Builds a Card object from the card Yaml File
   * @param cardyaml The YAML object from the card file
   * @param _frontTemplate The string of the front template (HTML doc)
   * @param _backTemplate The string of the back template (HTML doc)
   */
  constructor(cardyaml:YML_Card, _frontTemplate:string, _backTemplate:string){
    this.namespace = cardyaml.namespace
    this.data = cardyaml.data
    this.assets = cardyaml.assets
    this.cardType = cardyaml.cardType
    this.cardBack = cardyaml.cardBack
    this.frontTemplate = compile(_frontTemplate)
    this.backTemplate = compile(_backTemplate)
  }


  public GetCardHTML(){
    return {
      front: this.frontTemplate({data: this.data, assets: this.assets}),
      back: this.backTemplate({data: this.data, assets: this.assets})
    }
  }

  public GetCardImage(){
  }
}

export interface YML_Card {
  assets: {
    [attribute:string] : string
  },
  data: {
    [attribute:string] : string
  },
  cardBack:string,
  cardType:string,
  namespace: string
}