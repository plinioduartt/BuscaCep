import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CepProvider } from '../../providers/cep/cep';
import { classeCep } from '../../providers/historico/historico';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { HistoricoProvider } from '../../providers/historico/historico';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	
  cep = new classeCep();
  constructor(
  	public navCtrl: NavController,
  	private cepProvider: CepProvider,
    private historicoProvider: HistoricoProvider,
    public alertCtrl: AlertController
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
          this.showAlertBuscar();
          this.insertend();
        }).catch(() =>{
  				let cep = this.cep.cep;
  				this.cep = new classeCep();
  				this.cep.cep = cep;
  				alert('Não foi possível fazer a busca');
  			})
  }

//EXIBINDO O RESULTADO DA API EM UM ALERT
    showAlertBuscar() {
    let alert = this.alertCtrl.create({
      title: 'Endereço',
      message: `<div class="exibiralert"><ion-label stacked for="logradouro" ><strong>Cep:</strong></ion-label><br>${this.cep.cep} <br>
      <ion-label stacked for="logradouro" ><strong>Logradouro:</strong></ion-label><br>${this.cep.logradouro} <br>
      <ion-label stacked for="logradouro" ><strong>Bairro:</strong></ion-label><br>${this.cep.bairro} <br>
      <ion-label stacked for="logradouro" ><strong>Cidade:</strong></ion-label><br>${this.cep.cidade} <br>
      <ion-label stacked for="logradouro" ><strong>Estado:</strong></ion-label><br>${this.cep.estado}</div>`,
      buttons: ['OK']
    });
    alert.present();
  }




}
