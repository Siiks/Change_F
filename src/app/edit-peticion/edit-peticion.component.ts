import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PeticionService } from '../services/peticion.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-peticion',
  templateUrl: './edit-peticion.component.html',
  styleUrls: ['./edit-peticion.component.css']
})
export class EditPeticionComponent implements OnInit{

  peticion: any;
  idPeticion: number;
  form!: FormGroup;
  selectedImage!: any;

  constructor(private router: Router, private route: ActivatedRoute, private peticionService: PeticionService, private fb: FormBuilder){
    this.idPeticion = this.route.snapshot.params['idPeticion'];
  }
  ngOnInit(): void {
    this.getPeticion()
  }

  getPeticion(): void {
    this.peticionService.getPeticionById(this.idPeticion).subscribe(peticion => {
      this.peticion = peticion;
      console.log(this.peticion);
    });
  }

  editPeticion(): void {
    const formData = new FormData();
    formData.append('id', this.peticion.id);
    formData.append('titulo', this.peticion.titulo);
    formData.append('category', String(this.peticion.category_id));
    formData.append('descripcion', this.peticion.descripcion);
    formData.append('destinatario', this.peticion.destinatario);
    formData.append('file', this.selectedImage ? this.selectedImage : this.peticion.file.substring(this.peticion.file.indexOf('/')));

    this.peticionService.editPeticion(formData, this.idPeticion).subscribe(() => {
      this.router.navigate(['/peticiones'])
    })
  }

  onSelectImage(event: any) {
    this.selectedImage = event.target.files[0];
  }
  
}
