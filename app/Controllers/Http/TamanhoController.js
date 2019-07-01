'use strict'

const Tamanho = use('App/Models/Tamanho')

class TamanhoController {
  async index () {
    const tamanhos = await Tamanho.all()

    return tamanhos
  }

  async store ({ request }) {
    const data = request.only(['nome', 'descricao'])

    const tamanho = await Tamanho.create(data)

    return tamanho
  }

  async show ({ params }) {
    const tamanho = await Tamanho.findOrFail(params.id)

    return tamanho
  }

  async update ({ params, request, response }) {
    const tamanho = await Tamanho.findOrFail(params.id)
    const data = request.only(['nome', 'descricao'])

    tamanho.merge(data)

    await tamanho.save()

    return tamanho
  }

  async destroy ({ params }) {
    const tamanho = await Tamanho.findOrFail(params.id)
    tamanho.delete()
  }
}

module.exports = TamanhoController
