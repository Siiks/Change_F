import { Component, OnInit, ChangeDetectorRef, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { PeticionService } from 'src/app/services/peticion.service';

@Component({
  selector: 'app-header-layout',
  templateUrl: './header-layout.component.html',
  styleUrls: ['./header-layout.component.css']
})
export class HeaderLayoutComponent implements OnInit {
  name!: string;
  email!: string;
  password!: string;
  confirm_password!: string;
  res: any;
  userLogged: any;
  titulo!: string;
  descripcion!: string;
  destinatario!: string;
  idCategoria!: number;
  imagen!: any;
  selectedImage!: any;
  form!: FormGroup;
  @Output() miFuncion!: EventEmitter<void>;

  constructor(private userService: AuthService, private peticionService: PeticionService, private router: Router, private cdr: ChangeDetectorRef, private fb: FormBuilder) {

  }
  ngOnInit() {
    this.form = this.fb.group({
      id: '',
      titulo: '',
      descripcion: '',
      destinatario: '',
      category_id: '',
      file: ''
    });

    this.getDatos();
    this.cdr.detectChanges();
  }

  login() {
    const user: any = {
      email: this.email,
      password: this.password
    }


    this.res = this.userService.login(user).subscribe(() => {
      this.getDatos();
      this.cdr.detectChanges();
      window.location.reload();
    });

    this.name = '';
    this.email = '';
    this.password = '';
    this.confirm_password = '';
  }

  register() {
    const user: any = {
      name: this.name,
      email: this.email,
      password: this.password,
    }

    this.res = this.userService.register(user).subscribe(() => {
      this.userService.login(user).subscribe(() => {
        window.location.reload();
      });
      this.getDatos();
      this.cdr.detectChanges();
    });

    this.name = '';
    this.email = '';
    this.password = '';
    this.confirm_password = '';
    

  }

  logout() {
    this.userService.logout(localStorage.getItem('token')).subscribe(() => {
      // Actualiza la vista de la componente después de hacer logout
      this.userLogged = null;
      this.cdr.detectChanges();
      window.location.reload();
    });

    localStorage.removeItem('token');
  }

  getDatos() {
    this.userService
      .getUser()
      .subscribe((user) => (this.userLogged = user));
  }

  usuarioLogeado() {
    if (this.userLogged) {
      return true;
    } else {
      return false;
    }
  }

  async crearPeticion() {
    const formData = new FormData();
    formData.append('titulo', this.titulo);
    formData.append('category', String(this.idCategoria));
    formData.append('descripcion', this.descripcion);
    formData.append('destinatario', this.destinatario);
    formData.append('file', this.selectedImage);

    this.res = this.peticionService.crear(formData).subscribe(() => {
      this.peticionService.index().subscribe((pet: any) => {
        this.peticionService.rellenarPeticiones(pet)
      })
    });


    this.titulo = '';
    this.descripcion = '';
    this.destinatario = '';
    this.idCategoria = 0;
  }

  misPeticiones(idUsuario: any) {
    this.router.navigate([`misPeticiones/${idUsuario}`]);
  }
  onSelectImage(event: any) {
    this.selectedImage = event.target.files[0];
  }

}
