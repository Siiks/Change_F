import { ChangeDetectorRef, Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Route } from '@angular/router';
import { Subject } from 'rxjs';
import { PeticionService } from '../services/peticion.service';

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

  constructor(public readonly peticioneService: PeticionService, private cdr: ChangeDetectorRef, private activatedRoute: ActivatedRoute, private fb: FormBuilder) {
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
  }

  getPeticiones() {
    this.peticioneService
      .index()
      .subscribe((peticiones: any) => {
        this.peticioneService.rellenarPeticiones(peticiones)
      });
  }
}
