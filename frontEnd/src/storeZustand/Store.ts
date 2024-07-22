import { create } from 'zustand'


type Store = {
    Loading:boolean,
    DataBlockchain: string[]
    AddInfo: (data:string) => void
    SwitchLoading: () => void
  }

const useStore = create<Store> ((set) => ({
  Loading:false,
  DataBlockchain:[],
  AddInfo: (data) => set((state:any) => ({ DataBlockchain: [...state.DataBlockchain, data] })),
  SwitchLoading:()=> set((state:any)=>({Loading: !state.Loading})),
}))
export const SwitchLoading = ()=> useStore.getState().SwitchLoading()
export const getStoreState = () => useStore.getState();
export const addInfoToStore = (data:string) => useStore.getState().AddInfo(data);

export default useStore