import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagpostsComponent } from './tagposts.component';

describe('TagpostsComponent', () => {
  let component: TagpostsComponent;
  let fixture: ComponentFixture<TagpostsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagpostsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagpostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
