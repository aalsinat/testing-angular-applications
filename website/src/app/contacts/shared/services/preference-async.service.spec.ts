import {TestBed, inject, fakeAsync, flushMicrotasks, tick} from '@angular/core/testing';

import {PreferenceAsyncService} from './preference-async.service';
import {BrowserStorageAsyncService} from './browser-storage-async.service';
import {ContactPreference} from './preferences.service';

class BrowserStorageAsyncServiceMock {
  getItem = (property: string) => Promise.resolve({key: 'testProp', value: 'testValue'});
  setItem = ({key: key, value: value}) => Promise.resolve(true);
}

describe('PreferenceAsyncService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PreferenceAsyncService, {provide: BrowserStorageAsyncService, useClass: BrowserStorageAsyncServiceMock}]
    });
  });

  it('should get a value', fakeAsync(inject([PreferenceAsyncService, BrowserStorageAsyncService],
    (service: PreferenceAsyncService, browserStorage: BrowserStorageAsyncService) => {
      spyOn(browserStorage, 'getItem').and.callThrough();

      let results: ContactPreference, error;

      service.getPropertyAsync('testProp')
        .then(value => results = value)
        .catch(err => error = err);

      flushMicrotasks();

      expect(results.key).toEqual('testProp');
      expect(results.value).toEqual('testValue');
      expect(error).toBeUndefined();
      expect(browserStorage.getItem).toHaveBeenCalledWith('testProp');
    }))
  );

  it('should throw an error if the key is missing', fakeAsync(inject([PreferenceAsyncService],
    (service: PreferenceAsyncService) => {
      let result: ContactPreference, error;
      service.getPropertyAsync('')
        .then(value => result = value)
        .catch(reason => error = reason);

      flushMicrotasks();

      expect(result).toBeUndefined();
      expect(error).toEqual('getPropertyAsync requires a property name');
    }))
  );
});
