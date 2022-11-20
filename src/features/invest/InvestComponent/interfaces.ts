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

export interface IFirestoreGetAllUserAssets {
  //'abev3': {cotacao: '', l/p: '', papel: ''}
  [key: string]: IStockItem
}
