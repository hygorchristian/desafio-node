'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PedidoProdutoSchema extends Schema {
  up () {
    this.create('pedido_produtos', (table) => {
      table.increments()
      table.integer('pedido_id').unsigned().index()
      table.foreign('pedido_id').references('id').on('pedidos').onDelete('cascade')
      table.integer('produto_tamanho_id').unsigned().index()
      table.foreign('produto_tamanho_id').references('id').on('produto_tamanhos').onDelete('cascade')
      table.integer('quantidade').notNullable()
      table.string('status')
      table.timestamps()
    })
  }

  down () {
    this.drop('pedido_produtos')
  }
}

module.exports = PedidoProdutoSchema
