export interface IAssetQuantities {
  [key: string]: string
}

export interface ISelectedAsset {
  value: string
  label: string
}

export interface IAssetsToInvest {
  [key: string]: IStatement[]
}
