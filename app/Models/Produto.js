'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Produto extends Model {
  categoria () {
    return this.belongsTo('App/Models/Categoria')
  }

  tamanhos () {
    return this.belongsToMany('App/Models/Tamanho')
      .pivotModel('App/Models/ProdutoTamanho')
      .withPivot(['valor', 'quantidade', 'id'])
  }

  file () {
    return this.belongsTo('App/Models/File')
  }
}

module.exports = Produto
