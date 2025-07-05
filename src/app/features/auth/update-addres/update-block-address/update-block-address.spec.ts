import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBlockAddress } from './update-block-address';

describe('UpdateBlockAddress', () => {
  let component: UpdateBlockAddress;
  let fixture: ComponentFixture<UpdateBlockAddress>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateBlockAddress]
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateBlockAddress);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
