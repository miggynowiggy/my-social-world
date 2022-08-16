import { observable, makeObservable, action } from "mobx";
import RootStore from './rootStore'
import { User } from '@supabase/supabase-js'
import { supabase } from "configs/supabase";
import { IUser } from "models";
import type { IPost } from 'models'
import { formatDate } from '../utils/dateFormat';

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
  @observable posts: IPost[] = []


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

  @action
  public setPosts (posts: IPost[] | []) {
    this.posts = [...posts]
  }

  @action
  public addPost (newPost: IPost) {
    this.posts.push(newPost);
  }

  @action
  public updatePost (post: IPost) {
    const index = this.posts.findIndex(p => p.id === post.id);
    if (index !== -1) {
      this.posts.splice(index, 1, post);
    }
  }

  @action
  public removePost (id: number) {
    const index = this.posts.findIndex(p => p.id === id)
    if (index !== -1) {
      this.posts.splice(index, 1)
    }
  }
}