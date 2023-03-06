import { Component, OnInit } from '@angular/core';
import { PeticionService } from '../services/peticion.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  listPeticiones: any[] = [];

  constructor(private peticioneService: PeticionService) { }

  ngOnInit(): void {
    this.getPeticiones();
  }


  getPeticiones() {
    console.log(this.peticioneService.getPeticiones());

  }

}
