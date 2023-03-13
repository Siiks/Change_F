import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';
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
  constructor(private userService: AuthService, private peticionService: PeticionService, private router: Router, private cdr: ChangeDetectorRef) {

  }
  ngOnInit() {
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
      // Actualiza la vista de la componente después de hacer login
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
      // Actualiza la vista de la componente después de hacer login
      this.userLogged = null;
      this.cdr.detectChanges();
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

  async crearPeticion(){
    const peticion = {
      titulo: this.titulo,
      descripcion: this.descripcion,
      destinatario: this.destinatario,
      category: this.idCategoria
    }
    this.res = this.peticionService.crear(peticion).subscribe(() => {
      this.router.navigate(['/'])
    })
    console.log(this.res);
  }

}
