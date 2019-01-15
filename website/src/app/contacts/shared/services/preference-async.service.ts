import { Injectable } from '@angular/core';
import {BrowserStorageAsyncService} from './browser-storage-async.service';
import {ContactPreference} from './preferences.service';

@Injectable()
export class PreferenceAsyncService {

  constructor(private browserStorage: BrowserStorageAsyncService) { }

  getPropertyAsync(key: string): Promise<ContactPreference> {
    if (!(key.length)) {
      return Promise.reject('getPropertyAsync requires a property name');
    } else {
      return this.browserStorage.getItem(key);
    }
  }
}
