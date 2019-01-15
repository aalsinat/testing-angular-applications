import {TestBed, inject} from '@angular/core/testing';

import {PreferencesService} from './preferences.service';
import {BrowserStorageService} from './browser-storage.service';

class BrowserStorageServiceMock {
  getItem = (property: string) => ({key: 'testProp', value: 'testValue'});
  setItem = ({key: key, value: value}) => {
    console.log('I\'ve been called');
  };
}

describe('PreferencesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PreferencesService, {provide: BrowserStorageService, useClass: BrowserStorageServiceMock}]
    });
  });

  it('should be created', inject([PreferencesService], (service: PreferencesService) => {
    expect(service).toBeTruthy();
  }));

  describe('save preferences', () => {
    it('should save a preference', inject([PreferencesService, BrowserStorageService],
      (service: PreferencesService, browserStorage: BrowserStorageService) => {
        spyOn(browserStorage, 'setItem').and.callThrough();
        service.saveProperty({key: 'myProperty', value: 'myValue'});
        expect(browserStorage.setItem).toHaveBeenCalledWith('myProperty', 'myValue');
      }));

    it('saveProperty should require a non-zero length key', inject([PreferencesService], (service: PreferencesService) => {
      const fn = () => service.saveProperty({key: '', value: 'foo'});
      expect(fn).toThrowError();
    }));
  });

});
