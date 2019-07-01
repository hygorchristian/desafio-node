'use strict'

const Pedido = use('App/Models/Pedido')
const ProdutoTamanho = use('App/Models/ProdutoTamanho')
const Produto = use('App/Models/Produto')
const Tamanho = use('App/Models/Tamanho')
const File = use('App/Models/File')
const User = use('App/Models/User')
const Database = use('Database')
const Ws = use('Ws')

class PedidoController {
  async index ({ request }) {
    const { user_id } = request.get()

    let pedidos = null;

    if(user_id){
      pedidos = await Database
        .select('*')
        .from('pedidos')
        .where('user_id', user_id)
    }else{
      pedidos = await Database
        .select('*')
        .from('pedidos')
    }

    for (let i = 0; i < pedidos.length; i++) {
      const pedido = pedidos[i]
      const itens = await Database
        .select(['id', 'quantidade', 'produto_tamanho_id'])
        .from('pedido_produtos')
        .where('pedido_id', pedido.id)

      const usuario = await User.findByOrFail('id', pedido.user_id)

      for (let j = 0; j < itens.length; j++) {
        const item = itens[j]
        const produtoTamanho = await ProdutoTamanho.findByOrFail('id', item.produto_tamanho_id)
        const produto = await Produto.findByOrFail('id', produtoTamanho.produto_id)
        const tamanho = await Tamanho.findByOrFail('id', produtoTamanho.tamanho_id)
        const file = await File.findByOrFail('id', produto.file_id)

        item.titulo = produto.nome
        item.image = file
        item.tamanho = `${produtoTamanho.quantidade ? produtoTamanho.quantidade + ' ' : ''}${tamanho.nome}`
      }

      pedido.usuario = usuario.username
      pedido.itens = itens
    }

    return pedidos
  }

  async store ({ request, auth }) {
    const { itens, ...data } = request.only(['valor_total', 'itens', 'observacoes'])

    const pedido = await Pedido.create({ ...data, status: 'Recebido', user_id: auth.user.id })
    await pedido.itens().sync(itens)

    const socket = Ws.getChannel('pedido:*').topic(`pedido:${pedido.id}`)

    if (socket) {
      socket.broadcast('status', pedido.status)
    }

    return pedido
  }

  async show ({ params }) {
    const pedido = await Pedido.findOrFail(params.id)
    await pedido.load('itens')

    return pedido
  }

  async update ({ params, request }) {
    const pedido = await Pedido.findOrFail(params.id)
    const data = request.only(['status'])

    pedido.merge(data)

    await pedido.save()

    const socket = Ws.getChannel('pedido:*').topic(`pedido:${pedido.id}`)

    if (socket) {
      socket.broadcast('status', pedido.status)
    }

    return pedido
  }

  async destroy ({ params }) {
    const pedido = await Pedido.findOrFail(params.id)
    pedido.delete()
  }
}

module.exports = PedidoController
