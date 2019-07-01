'use strict'

const Logger = use('Logger')
const Event = use('Event')

class PedidoController {
  constructor ({ socket, request }) {
    this.socket = socket
    this.request = request

    Logger.info('user joined with %s socket id in channel %s', this.socket.id, this.socket.topic)

    this.socket.on('status', status => {
      this.socket.toEveryone().emit('status', status)
      Logger.info('recebeu o status do emiter: ', status)
    })
  }
}

module.exports = PedidoController
