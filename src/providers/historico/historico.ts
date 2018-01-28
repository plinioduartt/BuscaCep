import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DatabaseProvider } from '../database/database';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

/*
  Generated class for the HistoricoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HistoricoProvider {
//DECLARANDO O CONSTRUTOR DO PROVEDOR ONDE FOI CRIADO A TABELA
  constructor(private dbProvider: DatabaseProvider) {   }


//DECLARANDO O MÉTODO RESPONSÁVEL POR INSERIR DADOS NA TABELA (INSERT)
  public insert(classeCep: classeCep){
  	return this.dbProvider.getDB()
  		.then((db: SQLiteObject) => {
  			let sql = 'insert into historico (cep, logradouro, bairro, cidade, estado) values (?, ?, ?, ?, ?)';
  			let data = [classeCep.cep, classeCep.logradouro, classeCep.bairro, classeCep.cidade, classeCep.estado];
//RETORNANDO OS PARÂMETROS
  			return db.executeSql(sql, data)
  		  .catch((e) => console.error(e));
  		})
   		  .catch((e) => console.error(e));
  }


//DECLARANDO MÉTODO RESPONSÁVEL POR EXCLUIR REGISTROS/HISTÓRICOS
   public remove(){
  	return this.dbProvider.getDB()
  		.then((db: SQLiteObject) => {
  			let sql = 'delete from historico';
  			return db.executeSql(sql, {})
  			.catch((e) => console.error(e));

  		})
  		.catch((e) => console.error(e));
  }


//DECLARANDO MÉTODO RESPONSÁVEL POR EXCLUIR REGISTROS ESPECÍFICOS (POR ID)
  public removeId(id: number){
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'delete from historico where id = ?';
        let data = [id];
        return db.executeSql(sql, data)
      })
      .catch((e) => console.error(e));
  }




//DECLARANDO O MÉTODO RESPONSÁVEL POR BUSCAR TODOS OS REGISTROS NA TABELA (SELECT)
    public get(){
  	return this.dbProvider.getDB()
  		.then((db: SQLiteObject) => {
  			let sql = 'select * from historico';
  			return db.executeSql(sql, {});
  		}) .then(data => {
//FAZENDO UMA VERIFICAÇÃO SE HÁ REGISTROS NA TABELA        
			if (data.rows.length > 0){
//INSTANCIANDO UMA NOVA VARIÁVEL DO TIPO ARRAY PARA A CLASSECEP PARA QUE POSSA SER EXIBIDO O RESULTADO DO MÉTODO GET (SELECT FROM TABLE)
				let enderecos = new Array<classeCep>();
//FAZENDO EXIBIÇÃO DO RESULTADO DO MÉTODO GET POR MEIO DE UM FOR				  
          for (let i = 0; i < data.rows.length; i++) {
				    	enderecos.push(data.rows.item(i));
				  }
    			return enderecos;
			}
			return null;
		  })
  		.catch((e) => console.error(`HistoricoProvider ${e.message}`));
  }

}


//DECLARANDO UMA CLASSE QUE RECEBE TODOS OS CAMPOS NECESSÁRIOS E SEUS TIPOS
export class classeCep{
  id:number;
	cep: string;
	logradouro: string;
	numero: string;
	complemento: string;
	cidade: string;
	bairro: string;
	estado: string;
}
