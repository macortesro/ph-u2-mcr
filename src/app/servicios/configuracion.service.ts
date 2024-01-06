import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';


@Injectable({
  providedIn: 'root'
})

export class ConfiguracionService {

  private readonly KEY_BORRAR = "BORRAR"

  constructor() { }

  async permitirBorrar():Promise<boolean> {
    const resultado =  await Preferences.get({key: this.KEY_BORRAR})
    return resultado?.value == "true" ?? false
  }

  async setPermitirBorrar(permitirBorrar:boolean):Promise<void> {
    await Preferences.set({
      key: this.KEY_BORRAR,
      value: permitirBorrar ? "true" : "false"
    })
  }
  
}