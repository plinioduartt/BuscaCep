import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { classeCep } from '../historico/historico';
import 'rxjs/add/operator/toPromise';
/*
  Generated class for the CepProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CepProvider {
//DECLARANDO O CONSTRUTOR NECESSÁRIO PARA FAZER O CONSUMO DO WEBSERVICE
  constructor(public http: HttpClient) {
    console.log('Hello CepProvider Provider');
  }


//DECLARANDO MÉTODO PARA A BUSCA DA API
  	buscar(cep:string){
  		return this.http.get(`https://viacep.com.br/ws/${cep}/json/`)
              .toPromise()
              .then(response =>{
              		return this.converterRespostaParaCep(response)
              });
 	 }

    
//CONVERSÃO DA VARIÁVEL DA CLASSECEP PARA QUE POSSA OCORRER O CONSUMO DA API DE ACORDO COM CADA CAMPO (CEP, LOGRADOURO, BAIRRO...)
 	 private converterRespostaParaCep(cepNaResposta):classeCep{
 	 	let cep = new classeCep();
 	 	cep.cep = cepNaResposta.cep;
 	 	cep.logradouro = cepNaResposta.logradouro;
 	 	cep.complemento = cepNaResposta.complemento;
 	 	cep.bairro = cepNaResposta.bairro;
 	 	cep.cidade = cepNaResposta.localidade;
 	 	cep.estado = cepNaResposta.uf;
 	 	return cep;

 	 }

}
