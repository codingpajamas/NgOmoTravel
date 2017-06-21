import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorpostsComponent } from './authorposts.component';

describe('AuthorpostsComponent', () => {
  let component: AuthorpostsComponent;
  let fixture: ComponentFixture<AuthorpostsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthorpostsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorpostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
