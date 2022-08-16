export type IUser = {
  id: number;
  full_name: string;
  display_photo?: string;
  email: string;
  password?: string;
  created_at?: Date | string;
  updated_at?: Date | String;
  auth_id: string;
}

export type IPost = {
  id: number;
  user: IUser;
  content: string;
  likes: string[];
  user_id?: number;
  auth_id?: string;
  filename?: string;
  attachment_url?: string;
  created_at: Date | string;
  updated_at: Date | string;
}

export type IComment = {
  id: number;
  post: IPost;
  post_id: number;
  user: IUser;
  content: string;
  created_at: Date | string;
  updated_at: Date | string;
}

export type IConversation = {
  id: number;
  name: string;
  creator: IUser;
  created_at: Date | string;
}

export type IMessage = {
  id: IUser;
  content: string;
  sender: IUser;
  conversation: IConversation;
  created_at: Date | string;
}