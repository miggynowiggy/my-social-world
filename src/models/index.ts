export interface IUser {
  id: number;
  fullName: string;
  email: string;
  password?: string;
  created_at: Date | string;
  updated_at: Date | String;
  authId?: string;
}

export interface IPost {
  id: number;
  user: IUser;
  content: string;
  created_at: Date | string;
  updated_at: Date | string;
}

export interface IComment {
  id: number;
  post: IPost;
  user: IUser;
  content: string;
  created_at: Date | string;
  updated_at: Date | string;
}

export interface IConversation {
  id: number;
  name: string;
  creator: IUser;
  created_at: Date | string;
}

export interface IMessage {
  id: IUser;
  content: string;
  sender: IUser;
  conversation: IConversation;
  created_at: Date | string;
}