import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToggleChangeEventDetail } from '@ionic/angular';
import { ConfiguracionService } from 'src/app/servicios/configuracion.service';
import { Router } from '@angular/router';
import { CitaService } from 'src/app/servicios/cita.service';
import { IonToggleCustomEvent } from '@ionic/core';


@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.page.html',
  styleUrls: ['./configuracion.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})

export class ConfiguracionPage implements OnInit {

permitirBorrar: boolean = false;


  constructor(
    private configuracionService: ConfiguracionService,
    private CitaService: CitaService,
    private router: Router
    ) {
    }
    

    async ngOnInit() {
      this.permitirBorrar = await this.configuracionService.permitirBorrar()
    }

    ionChange($event: IonToggleCustomEvent<ToggleChangeEventDetail<any>>) {
      this.configuracionService.setPermitirBorrar(this.permitirBorrar)
      }

  }
