'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class PedidoProduto extends Model {
  static boot () {
    super.boot()
    this.addHook('beforeCreate', produto => {
      const dados = produto.produto_tamanho_id
      const { produto_tamanho_id, quantidade } = dados
      produto.quantidade = quantidade
      produto.produto_tamanho_id = produto_tamanho_id
    })
  }
}

module.exports = PedidoProduto
