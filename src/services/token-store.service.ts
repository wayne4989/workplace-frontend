
export class TokenStore {
  public static expungeData (): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('peersview-token');
  }

  public static setAccessToken (token): void {
    // Set the time that the access token will expire at
    localStorage.setItem('peersview-token', token);
  }

  public static getAccessToken (): string {
    return localStorage.getItem('peersview-token');
  }
}
