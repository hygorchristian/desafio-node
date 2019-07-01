'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ProdutoTamanho extends Model {
  static boot () {
    super.boot()
    this.addHook('beforeCreate', tamanho => {
      const dados = tamanho.tamanho_id
      const { tamanho_id, valor, quantidade } = dados
      tamanho.valor = valor
      tamanho.quantidade = quantidade
      tamanho.tamanho_id = tamanho_id
    })
  }

  produto () {
    return this.belongsTo('App/Models/Produto')
  }
}

module.exports = ProdutoTamanho
