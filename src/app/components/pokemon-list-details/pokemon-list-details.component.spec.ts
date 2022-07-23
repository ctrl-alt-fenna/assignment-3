import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonListDetailsComponent } from './pokemon-list-details.component';

describe('PokemonListDetailsComponent', () => {
  let component: PokemonListDetailsComponent;
  let fixture: ComponentFixture<PokemonListDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokemonListDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonListDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
