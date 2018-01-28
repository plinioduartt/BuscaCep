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
//DECLARANDO O CONSTRUTOR DO SQLITE
  constructor(private sqlite: SQLite) {
  }


//DECLARANDO UM MÉTODO PÚBLICO GETDB, RESPONSÁVEL PELA CRIAÇÃO DA CONEXÃO E DO DATABASE
  public getDB(){
  	return this.sqlite.create({
  		name:'historico.db',
  		location: 'default'
  	});
  }

  
//DECLARANDO UM MÉTODO PÚBLICO QUE RETORNA A CRIAÇÃO DO DATABASE E ENTÃO CHAMA O MÉTODO DE CRIAR TABELA
  public createDatabase(){
  	return this.getDB()
  	  .then((db: SQLiteObject) =>{
//CHAMANDO O MÉTODO DE CRIAR TABELA
  		  this.createTables(db);
  	  })
  	  .catch(e => console.error(e));
  }


//DECLARANDO UM MÉTODO PRIVADO DE CRIAÇÃO DE TABELA, ONDE SÃO CRIADOS TODOS OS CAMPOS DE ACORDO COM SEUS TIPOS
  private createTables(db: SQLiteObject){
  	db.sqlBatch([
  		['CREATE TABLE IF NOT EXISTS historico(id integer primary key AUTOINCREMENT NOT NULL, cep INTEGER, logradouro TEXT, bairro TEXT, cidade TEXT, estado TEXT)'],

  		])
  	  .then(() => console.log('Tabela criada'))
  	  .catch(e => console.error('Erro ao criar a tabela', e));
  }
}
