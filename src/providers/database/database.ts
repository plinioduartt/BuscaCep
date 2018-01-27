import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseProvider {

  constructor(private sqlite: SQLite) {
  }

  public getDB(){
  	return this.sqlite.create({
  		name:'historico.db',
  		location: 'default'
  	});
  }

  public createDatabase(){
  	return this.getDB()
  	.then((db: SQLiteObject) =>{
  		this.createTables(db);
  	})
  	.catch(e => console.error(e));
  }


  private createTables(db: SQLiteObject){
  	db.sqlBatch([
  		['CREATE TABLE IF NOT EXISTS historico(id integer primary key AUTOINCREMENT NOT NULL, cep INTEGER, logradouro TEXT, bairro TEXT, cidade TEXT, estado TEXT)'],

  		])
  	.then(() => console.log('Tabela criada'))
  	.catch(e => console.error('Erro ao criar a tabela', e));
  }
}
