import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateListComponent } from './create-update-list.component';

describe('CreateUpdateListComponent', () => {
  let component: CreateUpdateListComponent;
  let fixture: ComponentFixture<CreateUpdateListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUpdateListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateUpdateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
