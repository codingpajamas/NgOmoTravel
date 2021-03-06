import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BloglistComponent } from './bloglist.component';

describe('BloglistComponent', () => {
  let component: BloglistComponent;
  let fixture: ComponentFixture<BloglistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BloglistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BloglistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
