import { Injectable } from '@angular/core';
import { SessionStorageService } from 'ngx-webstorage';

@Injectable({ providedIn: 'root' })
export class StateStorageService {
  private previousUrlKey = 'previousUrl';

  constructor(private sessionStorageService: SessionStorageService) {}

  storeUrl(url: string): void {
    sessionStorage.setItem(this.previousUrlKey, url);
  }

  getUrl(): string | null {
    return sessionStorage.getItem(this.previousUrlKey) as string | null;
  }

  clearUrl(): void {
    sessionStorage.removeItem(this.previousUrlKey);
  }
}
