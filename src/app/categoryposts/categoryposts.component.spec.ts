import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorypostsComponent } from './categoryposts.component';

describe('CategorypostsComponent', () => {
  let component: CategorypostsComponent;
  let fixture: ComponentFixture<CategorypostsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategorypostsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategorypostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
