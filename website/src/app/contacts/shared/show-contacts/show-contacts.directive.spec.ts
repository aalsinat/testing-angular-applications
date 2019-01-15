import {Component} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ShowContactsDirective} from './show-contacts.directive';
import {getElement} from '../../testing';

@Component({
  template: `
    <div *appShowContacts="true">
      <p> This is shown</p>
    </div>
    <div *appShowContacts="false">
      <p>This is hidden</p>
    </div>
  `
})
class ShowContactsDirectiveSpecTestComponent {
}

describe('Directive: ShowContactDirective', () => {
  let fixture: ComponentFixture<any>;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [ShowContactsDirective, ShowContactsDirectiveSpecTestComponent]
    }).createComponent(ShowContactsDirectiveSpecTestComponent);
    fixture.detectChanges();
  });

  it('should be displayed when the input evaluates to true', () => {
    const element = getElement(fixture);
    expect(element.innerText).toContain('This is shown');
  });


  it('should be hidden when the input evaluates to false', () => {
    const element = getElement(fixture);
    expect(element.innerText).not.toContain('This is hidden');
  });

  afterEach(() => {
    fixture = null;
  });
});



