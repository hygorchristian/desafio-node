'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProdutoTamanhoSchema extends Schema {
  up () {
    this.create('produto_tamanhos', (table) => {
      table.increments()
      table.integer('produto_id').unsigned().index()
      table.foreign('produto_id').references('id').on('produtos').onDelete('cascade')
      table.integer('tamanho_id').unsigned().index()
      table.foreign('tamanho_id').references('id').on('tamanhos').onDelete('cascade')
      table.decimal('valor', 2).notNullable()
      table.integer('quantidade')
      table.timestamps()
    })
  }

  down () {
    this.drop('produto_tamanhos')
  }
}

module.exports = ProdutoTamanhoSchema
