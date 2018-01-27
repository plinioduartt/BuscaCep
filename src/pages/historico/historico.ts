import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { classeCep, HistoricoProvider } from '../../providers/historico/historico';
import { AlertController } from 'ionic-angular';
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
     private toast: ToastController,
     public alertCtrl: AlertController
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

 //MÉTODO PARA CONFIRMAÇÃO DE REMOÇÃO DOS REGISTROS DA TABELA 
   showConfirmRemoveItem(id: number) {
    let confirm = this.alertCtrl.create({
      title: 'Confirmação',
      message: 'Deseja realmente excluir este endereço?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Excluir',
          handler: () => {
            this.removeCepId(id)
            console.log('Agree clicked');
          }
        }
      ]
    });
    confirm.present();
  }

  //MÉTODO PARA CONFIRMAÇÃO DE EXCLUSÃO DE TODOS OS REGISTROS DA TABELA "BOTÃO LIMPAR HISTÓRICO"
  showConfirmRemoveAll() {
    let confirm = this.alertCtrl.create({
      title: 'Confirmação',
      message: 'Deseja realmente excluir todos os registros?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Excluir',
          handler: () => {
            this.removeHistoricos()
            console.log('Agree clicked');
          }
        }
      ]
    });
    confirm.present();
  }
  

   
  




}
