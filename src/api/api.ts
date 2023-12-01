import axios, { AxiosError } from "axios";
import { IRate } from "../typescript/entities";
import { ls } from "../utils/helpers/localStorage";

export const apiProvider = axios.create({
  baseURL: 'https://api.privatbank.ua/p24api',
})

// will work if CORS is fixed
export const fetcher = async (url: string) => {
  const counter = ls.get('counter')

  if (Number(counter) === 4) {
    ls.set('counter', String(0))

    throw new AxiosError('Counter Error', 'ERR_NETWORK')
  } else {
    ls.set('counter', String(Number(counter) ? Number(counter) + 1 : 1))

    return apiProvider.get(url)
      .then((res) => res.data)
  }
}

export const mockFetcher = (): Promise<IRate[]> => new Promise((resolve, reject) => {
  setTimeout(() => {
    const counter = ls.get('counter')

    if (Number(counter) === 4) {
      ls.set('counter', String(0))

      reject(new Error('Counter error'));
    } else {
      ls.set('counter', String(Number(counter) ? Number(counter) + 1 : 1))

      resolve(exchangeData);
    }
  }, 1000);
});

export const exchangeData: IRate[] = [
  {
    "ccy": "CHF",
    "base_ccy": "UAH",
    "buy": "41.26220",
    "sale": "41.26220"
  },
  {
    "ccy": "CZK",
    "base_ccy": "UAH",
    "buy": "1.63420",
    "sale": "1.63420"
  },
  {
    "ccy": "GBP",
    "base_ccy": "UAH",
    "buy": "45.87550",
    "sale": "45.87550"
  },
  {
    "ccy": "ILS",
    "base_ccy": "UAH",
    "buy": "9.82400",
    "sale": "9.82400"
  },
  {
    "ccy": "JPY",
    "base_ccy": "UAH",
    "buy": "0.24485",
    "sale": "0.24485"
  },
  {
    "ccy": "NOK",
    "base_ccy": "UAH",
    "buy": "3.40140",
    "sale": "3.40140"
  },
  {
    "ccy": "PLZ",
    "base_ccy": "UAH",
    "buy": "9.15860",
    "sale": "9.15860"
  },
  {
    "ccy": "SEK",
    "base_ccy": "UAH",
    "buy": "3.48460",
    "sale": "3.48460"
  },
  {
    "ccy": "PLZ",
    "base_ccy": "EUR",
    "buy": "1.23456",
    "sale": "1.23456"
  },
]