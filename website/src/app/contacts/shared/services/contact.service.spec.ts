import {TestBed} from '@angular/core/testing';
import {ContactService} from './contact.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';


describe('ContactsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ContactService]
    });
  });

  describe('getContacts', () => {

    let contactService: ContactService;
    let httpTestingController: HttpTestingController;
    let mockContact: any;

    beforeEach(() => {
      contactService = TestBed.get(ContactService);
      httpTestingController = TestBed.get(HttpTestingController);
      mockContact = {id: 100, name: 'Erin Dee', email: 'edee@example.com'};
    });

    it('should GET a list of contacts', () => {

      contactService.getContacts().subscribe((contacts) => {
        expect(contacts[0]).toEqual(mockContact);
      });

      const request = httpTestingController.expectOne('app/contacts');

      request.flush([mockContact]);

      httpTestingController.verify();
    });
  });
});