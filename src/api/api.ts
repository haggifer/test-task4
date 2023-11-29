import axios from "axios";
import { ICurrency } from "../typescript/entities";

export const apiProvider = axios.create({
  baseURL: 'https://api.privatbank.ua/p24api',
})

export const fetcher = () => currenciesData;
// export const fetcher = (url: string) => apiProvider.get(url).then((res) => res.data);

const currenciesData: ICurrency[] = [
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
  }
]