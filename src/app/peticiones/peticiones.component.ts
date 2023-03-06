import { Component, OnInit } from '@angular/core';
import { PeticionService } from '../services/peticion.service';

@Component({
  selector: 'app-peticiones',
  templateUrl: './peticiones.component.html',
  styleUrls: ['./peticiones.component.css']
})
export class PeticionesComponent implements OnInit {
  peticiones: any[] = [];

  constructor(private peticioneService: PeticionService){}

  ngOnInit(): void {
    this.getPeticiones();
  }


  getPeticiones() {
    this.peticioneService
      .index()
      .subscribe((peticiones: any) =>{
        this.peticiones = peticiones.data
       });
      
  }
}
