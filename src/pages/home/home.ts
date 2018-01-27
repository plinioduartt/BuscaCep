import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CepProvider } from '../../providers/cep/cep';
import { classeCep } from '../../providers/historico/historico';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { HistoricoProvider } from '../../providers/historico/historico';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	
  cep = new classeCep();
  constructor(
  	public navCtrl: NavController,
  	private cepProvider: CepProvider,
    private historicoProvider: HistoricoProvider
  	) {

}

  insertend(){
    this.historicoProvider.insert(this.cep)
       .catch((e) => console.error(e));


  }

//MÉTODO PARA BUSCAR OS RESULTADOS DA API
  buscar(){
  	this.cepProvider.buscar(this.cep.cep)
  			.then((cep:classeCep) => {
          this.cep = cep;
          this.insertend();
        }).catch(() =>{
  				let cep = this.cep.cep;
  				this.cep = new classeCep();
  				this.cep.cep = cep;
  				alert('Não foi possível fazer a busca');
  			})
  }


}
