import axios from "axios";

export const apiProvider = axios.create({
  baseURL: `${process.env.API_URI}`,
})

export const fetcher = (url: string) => apiProvider.get(url).then((res) => res.data);