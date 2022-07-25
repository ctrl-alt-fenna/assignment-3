import { Component, OnInit } from '@angular/core';
import { PokemonCatalogueService } from 'src/app/services/pokemon-catalogue.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

    loadFirst():void {

        this.pokemonCatalogueService.firstPage()
    }
    loadPrev(): void {
        this.pokemonCatalogueService.prevPage()
    }
    loadNext(): void {
        this.pokemonCatalogueService.nextPage()
    }
    loadLast():void {
        this.pokemonCatalogueService.lastPage()
    }

  constructor(private readonly pokemonCatalogueService: PokemonCatalogueService) { }

  ngOnInit(): void {
  }

}
