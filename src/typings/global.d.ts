export {}

declare global {
  // API

  interface IStockItem {
    setor: string
    max52semanas: number
    roe: number
    CAGRLucros5Anos: number
    'p/vp': number
    'p/ativo': number
    'p/l': number
    margemEbit: number
    liquidezMediaDiaria: number
    liquidezCorrente: number
    psr: number
    dividendYield: number
    liquidez2Meses: number
    'ev/ebit': number
    CAGRReceitas5Anos: number
    margemBruta: number
    lucroLiquido: number
    'dividaBruta/pl': 0
    subsetor: string
    cotacao: number
    'ev/ebitda': number
    valorDeMercado: number
    lpa: number
    papel: string
    roic: number
    'p/ebit': number
    ROA: number
    'p/capitalDeGiro': number
    vpa: number
    margemLiquida: number
    'p/acl': number
    nome: string
    patrimonioLiquido: number
    'dividaLíquida/patrimônio': number
    min52semanas: number
    giroAtivos: number
    'pl/ativos': number
    'dividaLiquida/ebit': number
    'passivo/ativo': number
    numeroAcoes: number
    crescimento5Anos: number
  }

  type IUserStockItem = IStockItem & {
    quantity: string
  }

  interface IStockItemResponse {
    status: number
    message: string
    items: IStockItem[]
  }

  // INTERNAL STATE
  interface IStatement {
    checked: boolean
    statement: string
    weight: string
  }

  interface IDropdownItem {
    value: string
    label: string
  }

  interface IUser {
    uid: string
    email: string
  }

  interface IAuthUserContext {
    authUser: User | null
    loading: boolean
  }

  export interface IWalletResistancePoints {
    [key: string]: number
  }

  // FIRESTORE

  interface IFirebaseAssetStrategy {
    [key: string]: IStatement[]
  }

  interface IFirebaseAssets {
    [key: string]: IStockItem
  }

  export interface IFirestoreGetAllUserAssets {
    [key: string]: IUserStockItem
  }

  interface IFirebaseStrategyStatements {
    [key: number | string]: IStatement
  }
  interface IFirebaseWatchList {
    shares: string[]
  }
}
