'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TamanhoSchema extends Schema {
  up () {
    this.create('tamanhos', (table) => {
      table.increments()
      table.string('nome', 80).notNullable()
      table.string('descricao', 80).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('tamanhos')
  }
}

module.exports = TamanhoSchema
