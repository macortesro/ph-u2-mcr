import { Component, OnInit } from '@angular/core';
import { CitaFormComponent } from '../cita-form/cita-form.component';
import { CitaListComponent } from '../cita-list/cita-list.component';
import { IonicModule } from '@ionic/angular';
import { CitaService } from 'src/app/servicios/cita.service';
import { Cita } from 'src/app/clases/cita';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aplicacion-cita',
  templateUrl: './aplicacion-cita.component.html',
  styleUrls: ['./aplicacion-cita.component.scss'],
  standalone: true,
  imports: [IonicModule, CitaFormComponent, CitaListComponent],
})
export class AplicacionCitaComponent  implements OnInit {


  listaCitas:Cita[] = []

  constructor(
    private citaService:CitaService,
    private router: Router
  ) { }

  ngOnInit() {

    this._actualizar
  }

  private _actualizar(){
    this.listaCitas = this.citaService.getCitas()
  }

  onCreateCita(nuevaCita: Cita) {
    this.citaService.agregarCita(nuevaCita)
    this._actualizar
    }



}
