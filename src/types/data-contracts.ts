/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export enum CoinKey {
  ETH = 'ETH',
  MATIC = 'MATIC',
  BNB = 'BNB',
  DAI = 'DAI',
  FTM = 'FTM',
  OKT = 'OKT',
  AVAX = 'AVAX',
  HT = 'HT',
  ONE = 'ONE',
  FSN = 'FSN',
  MOVR = 'MOVR',
  EXP = 'EXP',
  TCH = 'TCH',
  UBQ = 'UBQ',
  META = 'META',
  DIODE = 'DIODE',
  CELO = 'CELO',
  FUSE = 'FUSE',
  TLOS = 'TLOS',
  CRO = 'CRO',
  SHIB = 'SHIB',
  L1 = 'L1',
  RBTC = 'RBTC',
  TBG = 'TBG',
  VLX = 'VLX',
  GLMR = 'GLMR',
  METIS = 'METIS',
  SOL = 'SOL',
  EVM = 'EVM',
  USDT = 'USDT',
  USDC = 'USDC',
  TEST = 'TEST',
  KAL = 'KAL',
  SDIODE = 'SDIODE',
  SPARK = 'SPARK',
  TRBTC = 'TRBTC',
  WBTC = 'WBTC',
  WETH = 'WETH',
  SUSHI = 'SUSHI',
  DODO = 'DODO',
  MCB = 'MCB',
  CELR = 'CELR',
  IF = 'IF',
}

export interface Token {
  address: string
  symbol: string
  /** @format double */
  decimals: number
  /** @format double */
  chainId: number
  name: string
  coinKey?: CoinKey
  priceUSD?: string
  logoURI?: string
}

export interface LifiChain {
  nativeToken: Token
  metamask: {
    rpcUrls: string[]
    nativeCurrency: {
      /** @format double */
      decimals: number
      symbol: string
      name: string
    }
    chainName: string
    blockExplorerUrls: string[]
    chainId: string
  }
  multicallAddress: string
  tokenlistUrl: string
  logoURI: string
  mainnet: boolean
  /** @format double */
  id: number
  coin: string
  name: string
  chainType: string
  key: string
}

export type LifiChainsResponseDTO = LifiChain[]

/** Construct a type with a set of properties K of type T */
export type RecordStringTokenArray = object

export type LifiTokensResponseDTO = RecordStringTokenArray

export interface LifiConnections {
  toTokens: Token[]
  fromTokens: Token[]
  /** @format double */
  toChainId: number
  /** @format double */
  fromChainId: number
}

export type LifiConnectionsResponseDTO = LifiConnections[]

export enum TransactionType {
  LIFI = 'LIFI',
  APPROVE = 'APPROVE',
  NATIVE = 'NATIVE',
  ERC20 = 'ERC20',
}

export interface LifiRouteRecord {
  id: string
  /** @format double */
  fromChainId: number
  fromAmountUSD: string
  fromAmount: string
  fromToken: Token
  fromAddress?: string
  /** @format double */
  toChainId: number
  toAmountUSD: string
  toAmount: string
  toAmountMin: string
  toToken: Token
  toAddress?: string
  gasCostUSD?: string
  containsSwitchChain?: boolean
  infiniteApproval?: boolean
  steps: any[]
  tags?: any[]
}

export interface CrossifyQuote {
  route?: LifiRouteRecord
  transactionRequest?: {
    gasLimit: string
    gasPrice: string
    /** @format double */
    chainId: number
    from: string
    value: string
    to: string
    data: string
  }
  transactionType: TransactionType
  estimate: {
    gasCost: {
      /** @format double */
      amountUSD: number
    }
    /** @format double */
    fromAmountUSD: number
    /** @format double */
    executionDuration: number
  }
  action: {
    fromAddress: string
    toAddress?: string
    /** @format double */
    slippage: number
    toToken: Token
    /** @format double */
    toChainId: number
    fromToken: Token
    fromAmount: string
    /** @format double */
    fromChainId: number
  }
  toolDetails: {
    logoURI: string
    name: string
    key: string
  }
}

export interface ExchangeRate {
  base: string
  date: string
  rates: Record<string, number>
  success: boolean
  /** @format double */
  timestamp: number
}

export enum PaymentType {
  POS = 'POS',
  PRODUCT = 'PRODUCT',
  DONATION = 'DONATION',
}

export enum PaymentStatus {
  AWAITING = 'AWAITING',
  OPEN = 'OPEN',
  COMPLETED = 'COMPLETED',
  CANCELED = 'CANCELED',
  DELETED = 'DELETED',
}

export enum PaymentCurrency {
  FIAT = 'FIAT',
  TOKEN = 'TOKEN',
}

export interface PaymentResponseDTO {
  uid: string
  creatorAddress: string
  type: PaymentType
  title?: string
  status: PaymentStatus
  currency: {
    /** @format double */
    amount: number
    fiat?: string
    currencyType: PaymentCurrency
  }
  /** @format double */
  chainId: number
  tokenAddress: string
  receiverAddress?: string
  fields?: {
    quantityEnd?: boolean
    quantityStart?: boolean
    country?: boolean
    billingAddress?: boolean
    shippingAddress?: boolean
    email?: boolean
    name?: boolean
  }
  /** @format double */
  visitCount?: number
  /** @format double */
  date: number
  token: Token
}

export interface PaymentCreationParams {
  type: PaymentType
  title?: string
  currency: {
    /** @format double */
    amount: number
    fiat?: string
    currencyType: PaymentCurrency
  }
  /** @format double */
  chainId: number
  tokenAddress: string
  receiverAddress?: string
  fields?: {
    quantityEnd?: boolean
    quantityStart?: boolean
    country?: boolean
    billingAddress?: boolean
    shippingAddress?: boolean
    email?: boolean
    name?: boolean
  }
}

export interface PaymentUpdateParams {
  type?: PaymentType
  title?: string
  currency?: {
    /** @format double */
    amount: number
    fiat?: string
    currencyType: PaymentCurrency
  }
  /** @format double */
  chainId?: number
  tokenAddress?: string
  receiverAddress?: string
  fields?: {
    quantityEnd?: boolean
    quantityStart?: boolean
    country?: boolean
    billingAddress?: boolean
    shippingAddress?: boolean
    email?: boolean
    name?: boolean
  }
  status?: PaymentStatus
}

export interface IPayment {
  uid: string
  creatorAddress: string
  type: PaymentType
  title?: string
  status: PaymentStatus
  currency: {
    /** @format double */
    amount: number
    fiat?: string
    currencyType: PaymentCurrency
  }
  /** @format double */
  chainId: number
  tokenAddress: string
  receiverAddress?: string
  fields?: {
    quantityEnd?: boolean
    quantityStart?: boolean
    country?: boolean
    billingAddress?: boolean
    shippingAddress?: boolean
    email?: boolean
    name?: boolean
  }
  /** @format double */
  visitCount?: number
  /** @format double */
  date: number
}

export interface PagedPaymentResponseDTO {
  /** @format double */
  page: number
  /** @format double */
  totalPages: number
  /** @format double */
  total: number
  items: IPayment[]
}

export enum TransactionStatus {
  FAILED = 'FAILED',
  SUCCESS = 'SUCCESS',
  PENDING = 'PENDING',
}

export interface ReceiptResponseDTO {
  uid: string
  paymentId: string
  txHash: string
  /** @format double */
  fromChainId: number
  /** @format double */
  toChainId: number
  fromAddress: string
  toAddress: string
  fromTokenAddress: string
  toTokenAddress: string
  status: TransactionStatus
  senderFiat?: string
  receiverFiat?: string
  /** @format double */
  fromTokenAmount: number
  /** @format double */
  toTokenAmount: number
  /** @format double */
  amountUSD: number
  /** @format double */
  amountSenderFiat?: number
  /** @format double */
  amountReceiverFiat?: number
  /** @format double */
  percentagePlatformFee: number
  /** @format double */
  gasFeeUSD: number
  /** @format double */
  gasFeeSenderFiat?: number
  fields?: {
    /** @format double */
    quantity?: number
    country?: string
    billingAddress?: string
    shippingAddress?: string
    email?: string
    name?: string
    title?: string
  }
  /** @format double */
  date: number
  toToken: Token
  fromToken: Token
}

export interface PagedReceiptResponseDTO {
  /** @format double */
  page: number
  /** @format double */
  totalPages: number
  /** @format double */
  total: number
  items: ReceiptResponseDTO[]
}

export enum TransactionScenario {
  APPROVE = 'APPROVE',
  SWAP = 'SWAP',
  PAY = 'PAY',
}

export interface ReceiptPostDTO {
  /** @format double */
  fromChainId: number
  /** @format double */
  toChainId: number
  fields?: {
    /** @format double */
    quantity?: number
    country?: string
    billingAddress?: string
    shippingAddress?: string
    email?: string
    name?: string
    title?: string
  }
  paymentId: string
  txHash: string
  fromTokenAddress: string
  toTokenAddress: string
  senderFiat?: string
  receiverFiat?: string
  /** @format double */
  fromTokenAmount: number
  /** @format double */
  toTokenAmount: number
  /** @format double */
  amountUSD: number
  /** @format double */
  amountSenderFiat?: number
  /** @format double */
  amountReceiverFiat?: number
  /** @format double */
  percentagePlatformFee: number
  /** @format double */
  gasFeeUSD: number
  /** @format double */
  gasFeeSenderFiat?: number
  txScenario: TransactionScenario
  txType: TransactionType
  route?: LifiRouteRecord
}

export interface TransactionPostDTO {
  toAddress?: string
  type: TransactionType
  /** @format double */
  chainId: number
  txHash: string
  receiptId?: string
  description?: string
  toDescription?: string
  scenario: TransactionScenario
  address: string
  route?: LifiRouteRecord
}

export interface TransactionResponseDTO {
  uid: string
  receiptId?: string
  /** @format double */
  date: number
  txHash: string
  /** @format double */
  chainId: number
  description?: string
  toDescription?: string
  status: TransactionStatus
  type: TransactionType
  scenario: TransactionScenario
  address: string
  toAddress?: string
  idle: boolean
  route?: LifiRouteRecord
}

export interface PagedTransactionResponseDTO {
  /** @format double */
  page: number
  /** @format double */
  totalPages: number
  /** @format double */
  total: number
  items: TransactionResponseDTO[]
}

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  DELETED = 'DELETED',
  BLOCKED = 'BLOCKED',
}

export enum UserRoles {
  USER = 'USER',
  ADMIN = 'ADMIN',
  SUPER = 'SUPER',
}

export interface UserResponseDTO {
  status: UserStatus
  uid: string
  /** @format double */
  date: number
  currency: PaymentCurrency
  /** @format double */
  chainId?: number
  receiverAddress?: string
  address: string
  role: UserRoles
  name?: string
  email?: string
  token?: Token
}

export interface UserUpdateParams {
  status?: UserStatus
  currency?: PaymentCurrency
  /** @format double */
  chainId?: number
  receiverAddress?: string
  address?: string
  apiKey?: string
  name?: string
  email?: string
  token?: Token
}

export interface PagedUserResponseDTO {
  /** @format double */
  page: number
  /** @format double */
  totalPages: number
  /** @format double */
  total: number
  items: UserResponseDTO[]
}

export type SessionResponseDTO = {
  role?: string
  uid?: string
  address?: string
} | null
