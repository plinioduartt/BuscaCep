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

//MÉTODO PARA BUSCAR TODOS OS REGISTROS NA TABELA "Hhistorico" E ATUALIZAR A PÁGINA DE HISTÓRICOS
  getAllHistoricos(){
  	return this.historicoProvider.get()
  		     .then((result: any) => {
			      this.enderecos = result;
           	    console.log("getAllHistoricos", "Teste");
          		  console.log(this.enderecos);
             		});
  }
//MÉTODO PARA EXCLUIR TODOS OS REGISTROS DA TABELA "historico"
   removeHistoricos(){
  	this.historicoProvider.remove()
 	.then(() => {
 		this.enderecos = new Array<classeCep>();
  		 this.toast.create({message: 'Histórico removido.', duration: 3000, position: 'botton'}).present();
    		
  	})
   }
//CHAMANDO MÉTODO DE REMOVER CEP POR ID NA PAGE HISTÓRICO.TS
   removeCepId(id:number){
     this.historicoProvider.removeId(id)
         .then(() =>{
          return this.getAllHistoricos()
          })
            .then(() =>{
                this.toast.create({message: 'Histórico removido.', duration: 3000, position: 'botton'}).present();
             })
   }

   ionViewDidLoad() {
    return this.getAllHistoricos() 
}



}
