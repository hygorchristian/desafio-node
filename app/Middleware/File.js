'use strict'

const FileModel = use('App/Models/File')
const Helpers = use('Helpers')

class File {
  async handle ({ request }, next) {
    try {
      if (!request.file('file')) {
        await next()
        return
      }

      const upload = request.file('file', { size: '2mb' })
      const filename = `${Date.now()}.${upload.subtype}`

      await upload.move(Helpers.tmpPath('uploads'), {
        name: filename
      })

      if (!upload.moved()) {
        throw upload.error()
      }

      const file = await FileModel.create({
        file: filename,
        name: upload.clientName,
        type: upload.type,
        subtype: upload.subtype
      })

      request.file_id = file.id
      request.file = file

      await next()
    } catch (err) {
      request.file_error = err
      await next()
    }
  }
}

module.exports = File
