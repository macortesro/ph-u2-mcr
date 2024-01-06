import { Component, OnInit } from '@angular/core';
import { IonItem, IonButtons, IonButton, IonCard, IonCardContent, IonFab, IonFabButton, IonIcon, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { AplicacionCitaComponent } from '../componentes/aplicacion-cita/aplicacion-cita.component';
import { CitaService } from '../servicios/cita.service';
import { Cita } from '../clases/cita';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ConfiguracionService } from '../servicios/configuracion.service';
import { addIcons } from 'ionicons';
import {settingsOutline }  from 'ionicons/icons';
import { addOutline } from 'ionicons/icons';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [RouterModule, IonItem, IonButtons, IonButton, IonCardContent, IonCard, IonFab, IonFabButton, IonIcon,CommonModule, AplicacionCitaComponent, IonHeader, IonToolbar, IonTitle, IonContent],
  
})
export class HomePage implements OnInit {
  citaAleatoria: string | undefined;
  permitirBorrar: boolean | undefined;

  constructor(
    private citaService: CitaService,
    public configuracionService: ConfiguracionService,
    private router: Router,
  ) {

    addIcons({
      settingsOutline,
      addOutline
    })
  }

  ngOnInit(): void {
    this.obtenerCitaAleatoria();
    this.configuracionService.permitirBorrar().then((permitir) => {
      this.permitirBorrar = permitir;
    });
  }

  obtenerCitaAleatoria() {
    const citas = this.citaService.getCitas();
    const indice = Math.floor(Math.random() * citas.length);
    this.citaAleatoria = `${citas[indice].frase} - ${citas[indice].autor}`;
  }

}