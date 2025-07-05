import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAddress } from './list-address';

describe('ListAddress', () => {
  let component: ListAddress;
  let fixture: ComponentFixture<ListAddress>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListAddress]
    }).compileComponents();

    fixture = TestBed.createComponent(ListAddress);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
