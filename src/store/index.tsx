// No need to touch this file
import React from "react";
import RootStore, {  IStore } from './rootStore'

export function createStore() {
  const rootStore = new RootStore();
  return rootStore;
}

const StoreContext = React.createContext<IStore | null>(null);

export interface IStoreProvider {
  store: IStore
  children?: any
}

export const StoreProvider = ({ store, children }: IStoreProvider) => (
  <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
)

export function useStores() {
  const store = React.useContext(StoreContext);
  if (!store) {
    throw new Error('useStore must be used within a StoreProvider.')
  }

  return store;
}