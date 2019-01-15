import {Injectable} from '@angular/core';
import {BrowserStorageService} from './browser-storage.service';

export interface ContactPreference {
  key: string;
  value: string | object;
}

@Injectable()
export class PreferencesService {

  constructor(private browserStorage: BrowserStorageService) {
  }

  public saveProperty(preference: ContactPreference) {
    if (!(preference.key && preference.key.length)) {
      throw new Error('saveProperty requires a non-blank property name');
    }
    this.browserStorage.setItem(preference.key, preference.value);
  }

}
