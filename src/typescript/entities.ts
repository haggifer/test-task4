export interface IRate {
  ccy: string,
  base_ccy: string,
  buy: string,
  sale: string,
}

export interface IExtendedRate extends IRate {
  initValues: {
    buy: string,
    sale: string,
  },
}