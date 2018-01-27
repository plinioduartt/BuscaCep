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

  constructor(private dbProvider: DatabaseProvider) {
    
  }
//MÉTODO INSERT
  public insert(classeCep: classeCep){
  	return this.dbProvider.getDB()
  		.then((db: SQLiteObject) => {
  			let sql = 'insert into historico (cep, logradouro, bairro, cidade, estado) values (?, ?, ?, ?, ?)';
  			let data = [classeCep.cep, classeCep.logradouro, classeCep.bairro, classeCep.cidade, classeCep.estado];


  			return db.executeSql(sql, data)
  			.catch((e) => console.error(e));

  		})
  		.catch((e) => console.error(e));
  }

//MÉTODO DE EXCLUIR REGISTROS/HISTÓRICOS

   public remove(){
  	return this.dbProvider.getDB()
  		.then((db: SQLiteObject) => {
  			let sql = 'delete from historico';
  			


  			return db.executeSql(sql, {})
  			.catch((e) => console.error(e));

  		})
  		.catch((e) => console.error(e));
  }

//MÉTODO DE EXCLUIR REGISTROS POR ID
  public removeId(id: number){
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'delete from historico where id = ?';
        let data = [id];
        return db.executeSql(sql, data)
       

      })
      .catch((e) => console.error(e));
  }
//MÉTODO DE SELECT - GET REGISTROS

     public get(){
  	return this.dbProvider.getDB()
  		.then((db: SQLiteObject) => {
  			let sql = 'select * from historico';


  			return db.executeSql(sql, {});

  		}).then(data => {
			if (data.rows.length > 0){

				let enderecos = new Array<classeCep>();
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
