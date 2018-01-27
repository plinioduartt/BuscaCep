import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { classeCep, HistoricoProvider } from '../../providers/historico/historico';

/**
 * Generated class for the HistoricoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-historico',
  templateUrl: 'historico.html',
})
export class HistoricoPage {

	enderecos: classeCep[];


  constructor(
  	public navCtrl: NavController,
  	 public navParams: NavParams, 
  	 private historicoProvider: HistoricoProvider,
     private toast: ToastController
  	 ) {
		console.log("HistoricoPage carregou");

		this.getAllHistoricos();
  }


  getAllHistoricos(){
  	this.historicoProvider.get()
  		.then((result: any) => {
			  
			  this.enderecos = result;
			  console.log("getAllHistoricos", "Teste");
			  console.log(this.enderecos);
  		});
  }

   removeHistoricos(){
  	this.historicoProvider.remove()
 	.then(() => {
 		this.enderecos = new Array<classeCep>();
  		 this.toast.create({message: 'Histórico removido.', duration: 3000, position: 'botton'}).present();
    		
  	})
   }


}
