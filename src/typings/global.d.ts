export {}

declare global {
  // API

  interface IStockItem {
    setor: string
    max52semanas: number
    roe: number
    CAGRLucros5Anos: number
    p_vp: number
    p_ativo: number
    p_l: number
    margemEbit: number
    liquidezMediaDiaria: number
    liquidezCorrente: number
    psr: number
    dividendYield: number
    liquidez2Meses: number
    ev_ebit: number
    CAGRReceitas5Anos: number
    margemBruta: number
    lucroLiquido: number
    dividaBruta_pl: 0
    subsetor: string
    cotacao: number
    ev_ebitda: number
    valorDeMercado: number
    lpa: number
    papel: string
    roic: number
    p_ebit: number
    ROA: number
    p_capitalDeGiro: number
    vpa: number
    margemLiquida: number
    p_acl: number
    nome: string
    patrimonioLiquido: number
    dividaLíquida_patrimônio: number
    min52semanas: number
    giroAtivos: number
    pl_ativos: number
    dividaLiquida_ebit: number
    passivo_ativo: number
    numeroAcoes: number
    crescimento5Anos: number
  }

  interface IReitItem {
    alguelM2: number
    capRate: number
    cota_cagr: number
    cotacao: number
    dividendYield: number
    'dividendo/cota': number
    'ffo/cota': number
    ffoYield: number
    gestao: string
    id: string
    liquidez: number
    liquidezMediaDiaria: number
    nome: string
    numeroCotas: number
    numeroCotistas: number
    'p/vp': number
    papel: string
    patrimonioLiquido: number
    percentualCaixa: number
    precoM2: number
    quantidadeDeImoveis: number
    quantidadeDeUnidades: number
    segmento: string
    ultimoDividendo: number
    vacanciaMedia: number
    valorDeMercado: number
    'valorPatrimonial/cota': number
  }

  type IUserStockItem = IStockItem & {
    quantity: string
  }

  interface IStockItemResponse {
    status: number
    message: string
    items: IStockItem[] | IReitItem[]
  }

  // INTERNAL STATE
  interface IStatement {
    checked: boolean
    statement: string
    weight: string
  }

  interface IDropdownList {
    [key: AssetTypes]: {
      value: string
      label: string
    }[]
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

  type AssetTypes = 'stocks' | 'reits' | 'bonds' | 'international' | 'overview'

  // FIRESTORE

  interface IFirebaseAssets {
    [key: string]: IStockItem
  }

  export interface IFirestoreGetAllUserAssets {
    [key: string]: IUserStockItem
  }

  interface IFirebaseUserAssetStrategy {
    [key: AssetTypes]: IStatement[]
  }

  interface IFirebaseAssetStrategy {
    [key: string]: IStatement[]
  }
  interface IFirebaseWatchList {
    shares: string[]
  }
}
