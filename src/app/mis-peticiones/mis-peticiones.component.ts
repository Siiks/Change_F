import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PeticionService } from '../services/peticion.service';

@Component({
  selector: 'app-mis-peticiones',
  templateUrl: './mis-peticiones.component.html',
  styleUrls: ['./mis-peticiones.component.css']
})
export class MisPeticionesComponent implements OnInit {
  idUsuario: string;
  peticiones: any[] = [];

  constructor(public readonly peticioneService: PeticionService, private cdr: ChangeDetectorRef, private activatedRoute: ActivatedRoute) {
    this.idUsuario = window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1);
  }

  ngOnInit() {
    this.getPeticionesByIdUsuario(Number(this.idUsuario));
  }

  getPeticionesByIdUsuario(idUsuario: number) {
    this.peticioneService.getPeticionesByIdUsuario(idUsuario).subscribe((peticion: any) => {
      this.peticiones = peticion;
      console.log(this.peticiones);

    })
  }
}
