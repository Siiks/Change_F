import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { PeticionService } from '../services/peticion.service';

@Component({
  selector: 'app-peticiones',
  templateUrl: './peticiones.component.html',
  styleUrls: ['./peticiones.component.css']
})
export class PeticionesComponent implements OnInit {
  peticiones: any[] = [];


  constructor(private peticioneService: PeticionService, private cdr: ChangeDetectorRef){}

  ngOnInit() {
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
