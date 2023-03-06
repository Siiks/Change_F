import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header-layout',
  templateUrl: './header-layout.component.html',
  styleUrls: ['./header-layout.component.css']
})
export class HeaderLayoutComponent {
    name!: string;
    email!: string;
    password!: string;
    confirm_password!: string;
    res: any;

    constructor(private userService: AuthService){

    }

    async login(){
      const user: any = {
        email: this.email,
        password: this.password
      }
      console.log(user);


      this.res = await this.userService.login(user);

      console.log(this.res);

    }

    async register(){
      const user: any = {
        name: this.name,
        email: this.email,
        password: this.password,
      }

      this.res = await this.userService.register(user);

      console.log(this.res);

    }

}
