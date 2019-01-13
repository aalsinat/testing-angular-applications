import {Component} from '@angular/core';
import {ComponentFixture, TestBed, TestModuleMetadata} from '@angular/core/testing';
import {constants} from './favorite-icon.constants';

@Component({
  template: `
    <i [appFavoriteIcon]="true"></i> <i [appFavoriteIcon]="false"></i>
    <i [appFavoriteIcon]="true" [color]="'blue'"></i>
    <i [appFavoriteIcon]="true" [color]="'cat'"></i>
  `
})
class FavoriteIconDirectiveTestComponent {
}

describe('Directive: FavoriteIconDirective', () => {
  let fixture: ComponentFixture<any>;
  const expectedSolidStarList = constants.classes.SOLID_STAR_STYLE_LIST;
  const expectedOutlineStarList = constants.classes.OUTLINE_STAR_STYLE_LIST;


  beforeEach(() => {
    const testModuleMetadata: TestModuleMetadata = {
      declarations: [FavoriteIconDirective, FavoriteIconDirectiveTestComponent]
    };
    fixture = TestBed
      .configureTestingModule(testModuleMetadata)
      .createComponent(FavoriteIconDirectiveTestComponent);

    fixture.detectChanges();
  });
});
