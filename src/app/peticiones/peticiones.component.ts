import { ChangeDetectorRef, Component, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { PeticionService } from '../services/peticion.service';

@Component({
  selector: 'app-peticiones',
  templateUrl: './peticiones.component.html',
  styleUrls: ['./peticiones.component.css']
})
export class PeticionesComponent implements OnInit {
  peticiones: any[] = [];
  @Output() funcion: (() => void) | undefined;

  constructor(public readonly peticioneService: PeticionService, private cdr: ChangeDetectorRef){}

  ngOnInit() {
    this.getPeticiones();
    console.log(this.peticioneService.peticiones);

  }

  getPeticiones() {
    this.peticioneService
      .index()
      .subscribe((peticiones: any) =>{
        this.peticioneService.rellenarPeticiones(peticiones)
       });

  }
}
