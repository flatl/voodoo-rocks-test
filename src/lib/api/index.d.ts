export type ErrorResponse = {
  success: false
  message: string
};

export type SuccessResponse<T> = {
  data: T
  success: true
};

export type APIResponse<T> = Promise<SuccessResponse<T> | ErrorResponse>; 

export type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export interface Post {
  userId: number
  id: number
  title: string
  body: string
}

export interface User {
  id: number
  name: string
  username: string
  email: string
  address: Record<string, any>
  phone: string
  website: string
  company: Record<string, any>
}

export interface JSONPlaceholderAPI {
  getPosts(): APIResponse<Post[]>;
  getUsers(): APIResponse<User[]>;
}

