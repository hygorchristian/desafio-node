'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.post('/sessions', 'SessionController.store')

Route.post('/users', 'UserController.store')
Route.put('/users/:id', 'UserController.update').middleware('auth')

Route.get('files/:id', 'FileController.show')

// Categorias
Route.get('/categorias', 'CategoriaController.index')
Route.get('/categorias/:id', 'CategoriaController.show')
Route.post('/categorias', 'CategoriaController.store').middleware(['auth', 'file'])
Route.put('/categorias/:id', 'CategoriaController.update').middleware(['auth', 'file'])
Route.delete('/categorias/:id', 'CategoriaController.destroy').middleware('auth')

// Tamanhos
Route.get('/tamanhos', 'TamanhoController.index')
Route.get('/tamanhos/:id', 'TamanhoController.show')
Route.post('/tamanhos', 'TamanhoController.store').middleware(['auth'])
Route.put('/tamanhos/:id', 'TamanhoController.update').middleware(['auth'])
Route.delete('/tamanhos/:id', 'TamanhoController.destroy').middleware('auth')

// Produtos
Route.get('/produtos', 'ProdutoController.index')
Route.get('/produtos/:id', 'ProdutoController.show')
Route.post('/produtos', 'ProdutoController.store').middleware(['auth', 'file'])
Route.put('/produtos/:id', 'ProdutoController.update').middleware(['auth', 'file'])
Route.delete('/produtos/:id', 'ProdutoController.destroy').middleware('auth')

// Pedidos
Route.resource('/pedidos', 'PedidoController').apiOnly().middleware('auth')
