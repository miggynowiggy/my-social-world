import { observable, makeObservable, action } from "mobx";
import RootStore from './rootStore'
import { User } from '@supabase/supabase-js'
import { supabase } from "configs/supabase";
import { IUser } from "models";

export default class GlobalStore {
  public rootStore: RootStore;

  constructor(root: RootStore) {
    this.rootStore = root;
    makeObservable(this)
  }

  // declare variables here if you want to expose it to store
  @observable.ref isLoggedIn: boolean = supabase.auth.user()?.id ? true : false
  @observable authUser: User | null = supabase.auth.user()
  @observable user: IUser | null = null;


  // declare below your methods / functions that will act as 
  // your getters, setters, and other methods that will tinker the variables declared above
  @action
  public setIsLoggedIn (state: boolean) {
    this.isLoggedIn = state;
  }

  @action
  public setAuthUser (user: any) {
    this.authUser = user;
  }

  @action
  public setUser (user: IUser | null) {
    this.user = user;
  }
}