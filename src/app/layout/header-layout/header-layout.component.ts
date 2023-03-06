import { Component, OnInit } from '@angular/core';
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
  constructor(private userService: AuthService, private peticionService: PeticionService, private router: Router) {

  }
  ngOnInit(): void {
    this.getDatos();
  }

  async login() {
    const user: any = {
      email: this.email,
      password: this.password
    }
    console.log(user);


    this.res = await this.userService.login(user);

  }

  async register() {
    const user: any = {
      name: this.name,
      email: this.email,
      password: this.password,
    }

    this.res = await this.userService.register(user);

    console.log(user);

  }
  async logout() {
    this.userService.logout(localStorage.getItem('token'));
    
  }

  async getDatos() {
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
    this.res = await this.peticionService.crear(peticion)
    console.log(this.res);
  }

}
