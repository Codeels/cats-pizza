import { APIRequestContext } from '@playwright/test';

export class CleanupApi {
  constructor(
    private request: APIRequestContext,
    private apiUrl: string = 'http://localhost:5173',
  ) {
    this.request = request;
    this.apiUrl = apiUrl;
  }

  async deleteOrderByEmail(email: string) {
    await this.request.delete(`${this.apiUrl}/api/orders/by-email`, {
      data: { email: email },
    });
  }

  async deleteUserByEmail(email: string) {
    await this.request.delete(`${this.apiUrl}/api/users/by-email`, {
      data: { email: email },
    });
  }
}
