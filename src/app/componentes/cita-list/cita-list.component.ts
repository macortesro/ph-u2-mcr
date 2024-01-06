import { Input, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CitaFormComponent } from '../cita-form/cita-form.component';
import { Cita } from 'src/app/clases/cita';
import { CitaService } from 'src/app/servicios/cita.service';
import { IonicModule } from '@ionic/angular';
import { ConfiguracionService } from 'src/app/servicios/configuracion.service';

@Component({
  selector: 'app-cita-list',
  templateUrl: './cita-list.component.html',
  styleUrls: ['./cita-list.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule] 
})
export class CitaListComponent  implements OnInit {
  
  @Input() citas:Cita[] = []
  
  constructor(
    private citaService:CitaService,
    private configuracionService:ConfiguracionService
  ) {}

  ngOnInit(): void {
    this.cargarCitas();
  }

  cargarCitas() {
    this.citas = this.citaService.getCitas();
  }

  eliminarCita(index: number) {
    this.citaService.eliminarCita(index);
    this.cargarCitas(); 
  }

}

