import { ChangeDetectorRef, Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { PeticionService } from '../services/peticion.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-peticiones',
  templateUrl: './peticiones.component.html',
  styleUrls: ['./peticiones.component.css']
})
export class PeticionesComponent implements OnInit {
  @Output() funcion: (() => void) | undefined;

  form!: FormGroup;
  idUsuario: any;
  peticiones: any;
  loggedUser!: any;

  constructor(public readonly peticioneService: PeticionService, private cdr: ChangeDetectorRef, private activatedRoute: ActivatedRoute, private router: Router, private fb: FormBuilder, private actualUser: AuthService) {
  }

  async ngOnInit() {
    this.form = this.fb.group({
      id: '',
      titulo: '',
      descripcion: '',
      destinatario: '',
      category_id: '',
      file: ''
    })
    this.getPeticiones();
    this.getDatos()
  }

  getPeticiones() {
    this.peticioneService
      .index()
      .subscribe((peticiones: any) => {
        this.peticioneService.rellenarPeticiones(peticiones)
      });
  }

  getDatos() {
    this.actualUser
      .getUser()
      .subscribe((user) => (this.loggedUser = user));
  }

  deletePeticiones(idPeticion: number) {
    if (this.loggedUser.role == 2) {
      return;
    }
    this.peticioneService.deletePeticion(idPeticion).subscribe(() => {
      this.getPeticiones();
    });
  }
  editPeticion(idPeticion: number) {
      this.router.navigate([`peticion/${idPeticion}`])
  }
}
