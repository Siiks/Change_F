import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { PeticionService } from '../services/peticion.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  peticiones: any;
  user: any;
  listPeticiones: any[] = [];

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {

  }


}
