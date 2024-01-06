import { Injectable } from '@angular/core';
import { Cita } from '../clases/cita';
import { CapacitorSQLite, SQLiteConnection } from '@capacitor-community/sqlite';
import { Capacitor } from '@capacitor/core';

@Injectable({
  providedIn: 'root'
})
export class CitaService {

  private _citas:Cita[] = [

    new Cita("Pienso luego existo", "Descartes"),
    new Cita ("No hay caminos para la paz; la paz es el camino", "Mahatma Gandhi"),
    new Cita ("Haz el amor y no la guerra", "John Lennon"),
    new Cita ("Aprende a vivir y sabras morir bien", "Confucio")
  ]

  // SQL 

  sqlite:SQLiteConnection = new SQLiteConnection(CapacitorSQLite)
  db: any;
  
  plataforma:string = ""

  DB_NAME: string = "Citas"
  DB_ENCRIPTADA: boolean = false;
  DB_MODE: string = "no-encyption";
  DB_VERSION: number = 1;
  DB_READ_ONLY: boolean = false;
  DB_SQL_TABLAS: string = `
    CREATE TABLE IF NOT EXISTS Citas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      frase TEXT NOT NULL,
      autor TEXT NOT NULL
    );
  `;
  

  constructor() { }

  // SQL 

  private async _iniciarPluginWeb() : Promise<void> {
    await customElements.whenDefined('jeep-sqlite')
    const jeepSqliteEl = document.querySelector("jeep-sqlite")
    if (jeepSqliteEl != null ){
      await this.sqlite.initWebStore()
    }
  }

  async iniciarPlugin () {
    this.plataforma = Capacitor.getPlatform()
    if ( this.plataforma == "web") {
      await this._iniciarPluginWeb()
    }
    await this.abrirConexion() 
    await this.db.execute(this.DB_SQL_TABLAS)
  }

  async abrirConexion() {
    const ret = await this.sqlite.checkConnectionsConsistency() 
    const isConn = (await this.sqlite.isConnection(this.DB_NAME, this.DB_READ_ONLY)).result
    if(ret.result && isConn) {
      this.db = await this.sqlite.retrieveConnection(this.DB_NAME, this.DB_READ_ONLY)      
    } else {
      this.db = await this.sqlite.createConnection(
        this.DB_NAME,
        this.DB_ENCRIPTADA,
        this.DB_MODE,
        this.DB_VERSION,
        this.DB_READ_ONLY
      )
    }
  }


  // METODOS PARA AGREGAR CITAS, ELIMINAR Y GET.
  
  agregarCita(c:Cita){
    this._citas.push(c)
  }

  getCitas():Cita[]{
    return this._citas
  }

  eliminarCita(index: number) {
    if (index >= 0 && index < this._citas.length) {
      this._citas.splice(index, 1);
    }
  }

}
