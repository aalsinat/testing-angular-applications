import {Injectable} from '@angular/core';

@Injectable()
export class BrowserStorageAsyncService {
  getItem: (property: string) => Promise<any>;
  setItem: (property: string, value: string | object) => Promise<boolean>;
}
