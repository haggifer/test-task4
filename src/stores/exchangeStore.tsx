import { create } from "zustand";
import { IExtendedRate } from "../typescript/entities";

export interface IExchangeStore {
  data: IExtendedRate[] | null,
  setData: (newData: IExchangeStore['data']) => void,
}

export const useExchangeStore = create<IExchangeStore>((set) => ({
  data: null,
  setData: newData => set(() => ({ data: newData })),
}))