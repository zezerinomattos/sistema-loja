import { Router } from 'express';
import multer from 'multer';

import { CreateColaboradorController } from '../controllers/Colaborador/CreateColaboradorController';
import { AuthColaboradorController } from '../controllers/Colaborador/AuthColaboradorController';
import { DetailUserController } from '../controllers/Colaborador/DetailUserController';
import { DetailColaboradorController } from '../controllers/Colaborador/DetailColaboradorController';
import { ListColaboradorController } from '../controllers/Colaborador/ListColaboradorController';
import { EditColaboradorController } from '../controllers/Colaborador/EditColaboradorController';
import { ListByNomeColabController } from '../controllers/Colaborador/ListByNomeColabController';

import { CreateClienteController } from '../controllers/Cliente/CreateClienteController';
import { DetailClienteController } from '../controllers/Cliente/DetailClienteController';
import { EditClienteController } from '../controllers/Cliente/EditClienteController';
import { ListClienteController } from '../controllers/Cliente/ListClienteController';
import { ListByClienNomeController } from '../controllers/Cliente/ListByClienNomeController';

import { CreateRepresentanteController } from '../controllers/Representante/CreateRepresentanteController';
import { ListRepresentanteController } from '../controllers/Representante/ListRepresentanteController';
import { EditRepresentanteController } from '../controllers/Representante/EditRepresentanteController';
import { DetailRepresentanteController } from '../controllers/Representante/DetailRepresentanteController';
import { ListRepresentanteBynomeController } from '../controllers/Representante/ListRepresentanteBynomeController';

import { CreateFabricaController } from '../controllers/Fabrica/CreateFabricaController';
import { EditFabricaController } from '../controllers/Fabrica/EditFabricaController';
import { DetailFabricaController } from '../controllers/Fabrica/DetailFabricaController';
import { ListFabricaController } from '../controllers/Fabrica/ListFabricaController';
import { DeleteFabricaController } from '../controllers/Fabrica/DeleteFabricaController';
import { ListByNomeFabricaController } from '../controllers/Fabrica/ListByNomeFabricaController';
import { ListByRepresentanteFabricaController } from '../controllers/Fabrica/ListByRepresentanteFabricaController';

import { CreateSecaoController } from '../controllers/Secao/CreateSecaoController';
import { ListSecaoController } from  '../controllers/Secao/ListSecaoController';

import { CreateCategoriaController } from '../controllers/Categoria/CreateCategoriaController';
import { ListCategoriaController } from '../controllers/Categoria/ListCategoriaController';

import { CreateProdutoController } from '../controllers/Produto/CreateProdutoController';
import { ListProdutosController } from '../controllers/Produto/ListProdutosController';
import { DetailProdutoController } from '../controllers/Produto/DetailProdutoController';
import { EditProdutoController } from '../controllers/Produto/EditProdutoController';
import { DeleteProdutoController } from '../controllers/Produto/DeleteProdutoController';
import { ListByCategoriaController } from '../controllers/Produto/ListByCategoriaController';
import { ListBySecaoController } from '../controllers/Produto/ListBySecaoController';
import { ListByNomeProdutoController } from '../controllers/Produto/ListByNomeProdutoController';
import { ListByMarcaController } from '../controllers/Produto/ListByMarcaController';
import { ListByRepresentanteController } from '../controllers/Produto/ListByRepresentanteController';

import { CreateOrderController } from '../controllers/Order/CreateOrderController';
import { DeleteOrderController } from '../controllers/Order/DeleteOrderController';
import { AddItemOrderController } from '../controllers/Order/AddItemOrderController';
import { DeleteItemController } from '../controllers/Order/DeleteItemController';

import { isAuthenticated } from '../middlewares/isAuthenticated';
import uploadConfig from '../config/multer';

const router = Router();

const upload = multer(uploadConfig.upload("./tmp"));

// -- ROTAS COLABORADOR --
router.post('/colaborador', upload.single('file'), new CreateColaboradorController().handle);
router.get('/colaborador', isAuthenticated, new ListColaboradorController().handle);
router.get('/colaborador/detail', isAuthenticated, new DetailColaboradorController().handle);
router.put('/colaborador/edit', isAuthenticated, upload.single('file'), new EditColaboradorController().handle);
router.get('/nome/colaborador', isAuthenticated, new ListByNomeColabController().handle);

// -- ROTAS LOGIN --
router.post('/login', new AuthColaboradorController().handle);
router.get('/me', isAuthenticated, new DetailUserController().handle);

// -- ROTAS CLIENTE --
router.post('/cliente', isAuthenticated, upload.single('file'), new CreateClienteController().handle);
router.get('/cliente', isAuthenticated, new ListClienteController().handle);
router.get('/cliente/detail', isAuthenticated, new DetailClienteController().handle);
router.put('/cliente/edit', isAuthenticated, upload.single('file'), new EditClienteController().handle);
router.get('/nome/cliente', isAuthenticated, new ListByClienNomeController().handle);

// -- ROTAS REPRESENTANTE --
router.post('/representante', isAuthenticated, upload.single('file'), new CreateRepresentanteController().handle);
router.get('/representante', isAuthenticated, new ListRepresentanteController().handle);
router.get('/representante/detail', isAuthenticated, new DetailRepresentanteController().handle);
router.put('/representante/edit', isAuthenticated, upload.single('file'), new EditRepresentanteController().handle);
router.get('/representante/detail', isAuthenticated, new DetailRepresentanteController().handle);
router.get('/mome/representante', isAuthenticated,  new ListRepresentanteBynomeController().handle);

// -- ROTAS FABRICA --
router.post('/fabrica', isAuthenticated, new CreateFabricaController().handle);
router.get('/fabrica', isAuthenticated, new ListFabricaController().handle);
router.put('/fabrica/edit', isAuthenticated, new EditFabricaController().handle);
router.get('/fabrica/detail', isAuthenticated, new DetailFabricaController().handle);
router.delete('/fabrica/delete', isAuthenticated, new DeleteFabricaController().handle);
router.get('/nome/fabrica', isAuthenticated, new ListByNomeFabricaController().handle);
router.get('/representante/fabrica', isAuthenticated, new ListByRepresentanteFabricaController().handle);

// -- ROTAS SECAO --
router.post('/secao', isAuthenticated, new CreateSecaoController().handle);
router.get('/secao', isAuthenticated, new ListSecaoController().handle);

// -- ROTAS CATEGORIA --
router.post('/categoria', isAuthenticated, new CreateCategoriaController().handle);
router.get('/categoria', isAuthenticated, new ListCategoriaController().handle);

// -- ROTAS PRODUTO --
router.post('/produto', isAuthenticated, upload.single('file'), new CreateProdutoController().handle);
router.get('/produto', isAuthenticated, new ListProdutosController().handle);
router.get('/produto/detail', isAuthenticated, new DetailProdutoController().handle);
router.put('/produto/edit', isAuthenticated, upload.single('file'), new EditProdutoController().handle);
router.delete('/produto/delete', isAuthenticated, new DeleteProdutoController().handle);
router.get('/categoria/produto', isAuthenticated, new ListByCategoriaController().handle);
router.get('/secao/produto', isAuthenticated, new ListBySecaoController().handle);
router.get('/nome/produto', isAuthenticated, new ListByNomeProdutoController().handle);
router.get('/marca/produto', isAuthenticated, new ListByMarcaController().handle);
router.get('/representante/produto', isAuthenticated, new ListByRepresentanteController().handle);

// -- ROTAS ORDER --
router.post('/order', isAuthenticated, new CreateOrderController().handle);
router.delete('/delete/order', isAuthenticated, new DeleteOrderController().handle);
router.post('/add/order', isAuthenticated, new AddItemOrderController().handle);
router.delete('/delete/item', isAuthenticated, new DeleteItemController().handle);

export { router };
