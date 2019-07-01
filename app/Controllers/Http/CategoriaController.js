'use strict'

const Categoria = use('App/Models/Categoria')

class CategoriaController {
  async index () {
    const categorias = await Categoria.query().with('file').fetch()
    return categorias
  }

  async store ({ request }) {
    const data = request.only(['nome', 'descricao', 'tempo'])
    data.file_id = request.file_id

    const categoria = await Categoria.create(data)

    return categoria
  }

  async show ({ params }) {
    const categoria = await Categoria.findOrFail(params.id)
    await categoria.load('file')

    return categoria
  }

  async update ({ params, request }) {
    const categoria = await Categoria.findOrFail(params.id)
    const data = request.only(['file_id', 'nome', 'descricao', 'tempo'])

    categoria.merge(data)

    await categoria.save()

    return categoria
  }

  async destroy ({ params }) {
    const categoria = await Categoria.findOrFail(params.id)
    categoria.delete()
  }
}

module.exports = CategoriaController
