'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Pedido extends Model {
  usuario () {
    return this.belongsTo('App/Models/User')
  }

  itens () {
    return this.belongsToMany('App/Models/ProdutoTamanho')
      .pivotModel('App/Models/PedidoProduto')
      .withPivot(['quantidade'])
  }
}

module.exports = Pedido
