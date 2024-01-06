import { Output, Component, OnInit, EventEmitter } from '@angular/core';
import { IonCard, IonCardContent } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { Cita } from 'src/app/clases/cita';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cita-form',
  templateUrl: './cita-form.component.html',
  styleUrls: ['./cita-form.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class CitaFormComponent  implements OnInit {

  cita: Cita = {frase: '', autor: ''};
  mensajeErrorFrase: string = '';
  mensajeErrorAutor: string= '';

  @Output() onCreate = new EventEmitter<Cita>()

  constructor() { 

  }


  ngOnInit() {}

  onClick() {
    if (this.validarFormulario()) {
      this.onCreate.emit(this.cita);
      this.cita = { frase: '', autor: '' };
    }
  }

  validarFormulario(): boolean {
    this.mensajeErrorFrase = '';
    this.mensajeErrorAutor = '';

    if (this.cita.frase.trim().length < 5) {
      this.mensajeErrorFrase = 'La frase debe tener al menos 5 caracteres.';
    }

    if (this.cita.autor.trim().length < 2) {
      this.mensajeErrorAutor = 'El autor debe tener al menos 2 caracteres.';
    }

    return this.mensajeErrorFrase === '' && this.mensajeErrorAutor === '';
  }
}

