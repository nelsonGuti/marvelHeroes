import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateHeroFormComponent } from './create-hero-form.component';

describe('CreateHeroFormComponent', () => {
  let component: CreateHeroFormComponent;
  let fixture: ComponentFixture<CreateHeroFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateHeroFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateHeroFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
