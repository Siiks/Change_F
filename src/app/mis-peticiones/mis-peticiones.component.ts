import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PeticionService } from '../services/peticion.service';

@Component({
  selector: 'app-mis-peticiones',
  templateUrl: './mis-peticiones.component.html',
  styleUrls: ['./mis-peticiones.component.css']
})
export class MisPeticionesComponent implements OnInit {
  idUsuario: string;
  peticiones: any[] = [];

  constructor(public readonly peticioneService: PeticionService, private cdr: ChangeDetectorRef, private activatedRoute: ActivatedRoute, private router: Router) {
    this.idUsuario = window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1);
  }

  ngOnInit() {
    this.getPeticionesByIdUsuario(Number(this.idUsuario));
  }

  getPeticionesByIdUsuario(idUsuario: number) {
    this.peticioneService.getPeticionesByIdUsuario(idUsuario).subscribe((peticion: any) => {
      this.peticiones = peticion;
    });
  }
  deletePeticiones(idPeticion: number) {
    this.peticioneService.deletePeticion(idPeticion).subscribe(() => {
      this.getPeticionesByIdUsuario(Number(this.idUsuario));
    });
  }

  editPeticion(idPeticion: number) {
    this.router.navigate([`peticion/${idPeticion}`])
  }
}
