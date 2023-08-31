import API from './api';

import type { APIResponse } from '.';
import type { JSONPlaceholderAPI, User, Post } from '.';

export default class JSONPlaceholderAPIImplementation extends API implements JSONPlaceholderAPI {
  private readonly BASE_URL = import.meta.env.VITE_JSON_PLACEHOLDER_API_BASE_URL;
  
  async getPosts(): APIResponse<Post[]> {
    const url = `${this.BASE_URL}/posts`;
    return await this.get(url);
  }

  async getUsers(): APIResponse<User[]> {
    const url = `${this.BASE_URL}/users`;
    return await this.get(url);
  }
}
