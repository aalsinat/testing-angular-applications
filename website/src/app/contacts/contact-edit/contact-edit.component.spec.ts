import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';
import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {RouterTestingModule} from '@angular/router/testing';
import {DebugElement} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {InvalidEmailModalComponent, InvalidPhoneNumberModalComponent} from '../shared';
import {FavoriteIconDirective} from '../shared/favorite-icon';
import {ContactEditComponent} from './contact-edit.component';
import {AppMaterialModule} from '../../app.material.module';
import {ContactService} from '../shared/services';
import {Contact} from '../shared/models';
import {By} from '@angular/platform-browser';

describe('ContactEditComponent tests', () => {
  let fixture: ComponentFixture<ContactEditComponent>;
  let component: ContactEditComponent;
  let contactService: ContactService;
  let rootElement: DebugElement;
  const contactServiceStub = {
    contact: {
      id: 1,
      name: 'Janet'
    },

    save: async function (contact: Contact) {
      component.contact = contact;
    },

    getContact: async function () {
      component.contact = this.contact;
    },

    updateContact: async function (contact: Contact) {
      component.contact = contact;
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ContactEditComponent,
        FavoriteIconDirective,
        InvalidEmailModalComponent,
        InvalidPhoneNumberModalComponent
      ],
      imports: [
        AppMaterialModule,
        FormsModule,
        NoopAnimationsModule,
        RouterTestingModule
      ],
      providers: [{provide: ContactService, useValue: contactServiceStub}]
    });

    TestBed.overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [InvalidEmailModalComponent, InvalidPhoneNumberModalComponent]
      }
    });

    contactService = TestBed.get(ContactService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    rootElement = fixture.debugElement;
  });

  describe('saveContact()', () => {
    it('should display contact name after contact set', fakeAsync(() => {
      const contact = {
        id: 1,
        name: 'lorace'
      };

      component.isLoading = false;
      component.saveContact(contact);
      fixture.detectChanges();
      const nameInput = rootElement.query(By.css('.contact-name'));
      tick();
      expect(nameInput.nativeElement.value).toBe('lorace');
    }));
  });

  describe('loadContact()', () => {
    it('should load contact', fakeAsync(() => {
      component.isLoading = false;
      component.loadContact();
      fixture.detectChanges();
      const nameInput = rootElement.query(By.css('.contact-name'));
      // testing
      tick();
      expect(nameInput.nativeElement.value).toBe('Janet');
    }));
  });

  describe('updateContact()', () => {
    it('should update the contact', fakeAsync(() => {
      const newContact = {
        id: 1,
        name: 'London',
        email: 'london@example.com',
        number: '12345678901'
      };

      component.contact = {
        id: 2,
        name: 'Chauncey',
        email: 'chauncey@example.com',
        number: '1234567890'
      };

      component.isLoading = false;
      fixture.detectChanges();
      const nameInput = rootElement.query(By.css('.contact-name'));
      tick();
      expect(nameInput.nativeElement.value).toBe('Chauncey');

      component.updateContact(newContact);
      fixture.detectChanges();
      tick(100);
      expect(nameInput.nativeElement.value).toBe('Chauncey');
    }));
  });
});
