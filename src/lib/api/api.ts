import type { APIResponse, RequestMethod } from './';

export default class API {
  protected async get<T>(url: string): APIResponse<T> {
    const response = await this.fetch<T>('GET', url);
    return response;
  }

  protected async post<T>(url: string): APIResponse<T> {
    const response = await this.fetch<T>('POST', url);
    return response;
  }

  private fetch<T>(method: RequestMethod, url: string, params: Record<string, any> = {}): APIResponse<T> {
    return new Promise((resolve) => {
      switch (method) {
        case 'GET': {
          return fetch(url)
            .then((response) => {
              if (response.status === 200) {                
                response
                  .json()
                  .then((data: T) =>
                    resolve({
                      success: true,
                      data,
                    })
                  )
              } else {
                const message = `Request failed with code: ${response.status}, and message: ${response.statusText}`;
                resolve({
                  success: false,
                  message,
                });
              }
            })
            .catch((error: Error) => {
              resolve({
                success: false,
                message: error.message
              });
            });
        }
        case 'POST': {
          return fetch(url, {
            ...params,
            method: 'POST',
          })
            .then((response) => {
              if (response.status === 200) {
                response
                  .json()
                  .then((data: T) =>
                    resolve({
                      success: true,
                      data,
                    })
                  )
              } else {
                const message = `Request failed with code: ${response.status}, and message: ${response.statusText}`;
                resolve({
                  success: false,
                  message,
                });
              }
            })
            .catch((error: Error) => {
              resolve({
                success: false,
                message: error.message
              })
            });
        }
      }
    });
  }
}
