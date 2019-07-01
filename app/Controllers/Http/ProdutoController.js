'use strict'

const Produto = use('App/Models/Produto')

class ProdutoController {
  async index ({ request, response, view }) {
    const { categoria } = request.get()
    const query = Produto.query()

    if (categoria) {
      query.where('categoria_id', categoria)
    }

    const produtos = await query.with('file').with('tamanhos').fetch()
    return produtos
  }

  async store ({ request }) {
    const { tamanhos, ...data } = request.only(['nome', 'descricao', 'categoria_id', 'tamanhos'])
    data.file_id = request.file_id

    const produto = await Produto.create(data)

    if (tamanhos && tamanhos.length > 0) {
      produto.tamanhos().attach(tamanhos)
      produto.load('tamanhos')
    }

    return produto
  }

  async show ({ params }) {
    const produto = await Produto.findOrFail(params.id)
    await produto.load('categoria')
    await produto.load('tamanhos')

    return produto
  }

  async update ({ params, request, response }) {
    const produto = await Produto.findOrFail(params.id)
    const { tamanhos, ...data } = request.only(['nome', 'descricao', 'categoria_id', 'tamanhos'])
    data.file_id = request.file_id

    produto.merge(data)

    await produto.save()

    if (tamanhos && tamanhos.length > 0) {
      await produto.tamanhos().sync(tamanhos)
      await produto.load('tamanhos')
    }

    return produto
  }

  async destroy ({ params, request, response }) {
    const produto = await Produto.findOrFail(params.id)
    produto.delete()
  }
}

module.exports = ProdutoController
