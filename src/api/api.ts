import axios from "axios";

export const apiProvider = axios.create({
  baseURL: 'https://api.privatbank.ua/p24api',
})

export const fetcher = (url: string) => apiProvider.get(url).then((res) => res.data);