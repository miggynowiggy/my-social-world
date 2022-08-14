// import additional Stores below
import GlobalStore from "./globalStore";

export default class RootStore {
  // delcare the typings of your stores below
  globalStore: GlobalStore;

  constructor() {
    // include your other stores in the instantiation of the main store (rootStore)
    this.globalStore = new GlobalStore(this)
  }
}

export interface IStore {
  // declare the typings of your additional stores below
  globalStore: GlobalStore
}