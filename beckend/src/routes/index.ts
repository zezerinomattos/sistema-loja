import { Router } from 'express';
import multer from 'multer';

import { CreateColaboradorController } from '../controllers/Colaborador/CreateColaboradorController';
import { AuthColaboradorController } from '../controllers/Colaborador/AuthColaboradorController';
import { DetailUserController } from '../controllers/Colaborador/DetailUserController';
import { DetailColaboradorController } from '../controllers/Colaborador/DetailColaboradorController';
import { ListColaboradorController } from '../controllers/Colaborador/ListColaboradorController';
import { EditColaboradorController } from '../controllers/Colaborador/EditColaboradorController';
import { EditPasswordColaboradorController } from '../controllers/Colaborador/EditPasswordColaboradorController';
import { ListByNomeColabController } from '../controllers/Colaborador/ListByNomeColabController';
import { CreateHoleriteController } from '../controllers/Colaborador/CreateHoleriteController';
import { ListFullHoleriteController } from '../controllers/Colaborador/ListFullHoleriteController';
import { ListHoleriteColaboradorFilterController } from '../controllers/Colaborador/ListHoleriteColaboradorFilterController';
import { DetailHoleriteController } from '../controllers/Colaborador/DetailHoleriteController';

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
import { DeleteSecaoController } from '../controllers/Secao/DeleteSecaoController';

import { CreateCategoriaController } from '../controllers/Categoria/CreateCategoriaController';
import { ListCategoriaController } from '../controllers/Categoria/ListCategoriaController';
import { DeleteCategoriaController } from '../controllers/Categoria/DeleteCategoriaController';

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
import { EditItemOrderController } from '../controllers/Order/EditItemOrderController';
import { DeleteItemController } from '../controllers/Order/DeleteItemController';
import { EditOrderController } from '../controllers/Order/EditOrderController';
import { SendOrderController } from '../controllers/Order/SendOrderController';
import { ListOrderController } from '../controllers/Order/ListOrderController';
import { ListDraftOrderController } from '../controllers/Order/ListDraftOrderController';
import { DetailOrderController } from '../controllers/Order/DetailOrderController';
import { ListFullOrderController } from '../controllers/Order/ListFullOrderController';
import { ListFullOrderDateController } from '../controllers/Order/ListFullOrderDateController';
import { ListFullOrderFilterDraftDateController } from '../controllers/Order/ListFullOrderFilterDraftDateController';
import { ListOrderColaboradorController } from '../controllers/Order/ListOrderColaboradorController';
import { ListOrderColaboradorDateController } from '../controllers/Order/ListOrderColaboradorDateController';

import { CreateCaixaController } from '../controllers/Caixa/CreateCaixaController';
import { CloseCaixaController } from '../controllers/Caixa/CloseCaixaController';
import { DetailCaixaController } from '../controllers/Caixa/DetailCaixaController';
import { DetailClosedCaixaController } from '../controllers/Caixa/DetailClosedCaixaController';
import { CreateRegistroCaixaController } from '../controllers/Caixa/CreateRegistroCaixaController';
import { CancelarRegistroCaixaController } from '../controllers/Caixa/CancelarRegistroCaixaController';
import { CreateEntradaCartaoController } from '../controllers/Caixa/CreateEntradaCartaoController';
import { CrateRetiradaCaixaController } from '../controllers/Caixa/CrateRetiradaCaixaController';
import { CreateEntradaCaixaController } from '../controllers/Caixa/CreateEntradaCaixaController';
import { CreateQuebraCaixaController } from '../controllers/Caixa/CreateQuebraCaixaController';
import { EditQuebraCaixaController } from '../controllers/Caixa/EditQuebraCaixaController';
import { ListQuebraCaixaController } from '../controllers/Caixa/ListQuebraCaixaController';
import { ListCaixaController } from '../controllers/Caixa/ListCaixaController';

import { ListRelatorioFluxoCaixaController } from '../controllers/Caixa/ListRelatorioFluxoCaixaController';
import { ListRelatorioFluxoCaixaMesController } from '../controllers/Caixa/ListRelatorioFluxoCaixaMesController';
import { ListRelatorioFluxoCaixaFullController } from '../controllers/Caixa/ListRelatorioFluxoCaixaFullController';
import { ListRelatorioFluxoCaixaFullDateController } from '../controllers/Caixa/ListRelatorioFluxoCaixaFullDateController';
import { ListRelatorioFluxoMesDateController } from '../controllers/Caixa/ListRelatorioFluxoMesDateController';
import { ListRegistroCaixaController } from '../controllers/Caixa/ListRegistroCaixaController';
import { ListRegistroCaixaColaboradorController } from '../controllers/Caixa/ListRegistroCaixaColaboradorController';
import { ListRegistroCaixaColaboradorNomeController } from '../controllers/Caixa/ListRegistroCaixaColaboradorNomeController';
import { ListRegistroCaixaColaboradorNomeDateController } from '../controllers/Caixa/ListRegistroCaixaColaboradorNomeDateController';
import { ListRegistroCaixaColaboradorDateController } from '../controllers/Caixa/ListRegistroCaixaColaboradorDateController';

import { CreateCrediarioController } from '../controllers/Crediario/CreateCrediarioController';
import { DetailCrediarioController } from '../controllers/Crediario/DetailCrediarioController';
import { EditParcelasCrediarioController } from '../controllers/Crediario/EditParcelasCrediarioController';
import { ListParcelasAtrasadasController } from '../controllers/Crediario/ListParcelasAtrasadasController';
import { ListCrediarioController } from '../controllers/Crediario/ListCrediarioController';
import { ListCrediarioDateController } from '../controllers/Crediario/ListCrediarioDateController';
import { ListParcelasAtrasatasFullController } from '../controllers/Crediario/ListParcelasAtrasatasFullController';
import { ListParcelasAtrasadasDateController } from '../controllers/Crediario/ListParcelasAtrasadasDateController';

import { CreateNewContaController } from '../controllers/ContasPagar/CreateNewContaController';
import { DetailContaController } from '../controllers/ContasPagar/DetailContaController';
import { ListFullContaController } from '../controllers/ContasPagar/ListFullContaController';
import { ListContasByDateController } from '../controllers/ContasPagar/ListContasByDateController';
import { ListContasByStatusController } from '../controllers/ContasPagar/ListContasByStatusController';
import { ListContasByCategoriaController } from '../controllers/ContasPagar/ListContasByCategoriaController';

import { isAuthenticated } from '../middlewares/isAuthenticated';
import uploadConfig from '../config/multer';

const router = Router();

const upload = multer(uploadConfig.upload("./tmp"));

// -- ROTAS COLABORADOR --
router.post('/colaborador', isAuthenticated, upload.single('file'), new CreateColaboradorController().handle);
router.get('/colaborador', isAuthenticated, new ListColaboradorController().handle);
router.get('/colaborador/detail', isAuthenticated, new DetailColaboradorController().handle);
router.put('/colaborador/edit', isAuthenticated, upload.single('file'), new EditColaboradorController().handle);
router.put('/colaborador/edit/pass', isAuthenticated, new EditPasswordColaboradorController().handle); //editar password
router.get('/nome/colaborador', isAuthenticated, new ListByNomeColabController().handle);
router.post('/holerite', isAuthenticated, new CreateHoleriteController().handle);
router.get('/holerite', isAuthenticated, new ListFullHoleriteController().handle);
router.get('/holerite/filter/colaborador', isAuthenticated, new ListHoleriteColaboradorFilterController().handle);
router.get('/holerite/detail', isAuthenticated, new DetailHoleriteController().handle);

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
router.delete('/secao', isAuthenticated, new DeleteSecaoController().handle); 

// -- ROTAS CATEGORIA --
router.post('/categoria', isAuthenticated, new CreateCategoriaController().handle);
router.get('/categoria', isAuthenticated, new ListCategoriaController().handle);
router.delete('/categoria', isAuthenticated, new DeleteCategoriaController().handle);

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
router.post('/edit/item', isAuthenticated, new EditItemOrderController().handle);
router.delete('/delete/item', isAuthenticated, new DeleteItemController().handle);
router.put('/edit/order', isAuthenticated, new EditOrderController().handle);
router.put('/send/order', isAuthenticated, new SendOrderController().handle);
router.get('/order', isAuthenticated, new ListOrderController().handle);
router.get('/draft/order', isAuthenticated, new ListDraftOrderController().handle);
router.get('/detail/order', isAuthenticated, new DetailOrderController().handle);
router.get('/full/order', isAuthenticated, new ListFullOrderController().handle);
router.get('/full/order/date', isAuthenticated, new ListFullOrderDateController().handle);
router.get('/full/order/draft/date', isAuthenticated, new ListFullOrderFilterDraftDateController().handle);
router.get('/order/colaborador', isAuthenticated, new ListOrderColaboradorController().handle);
router.get('/order/colaborador/date', isAuthenticated, new ListOrderColaboradorDateController().handle);

// -- ROTAS CAIXA --
router.post('/caixa', isAuthenticated, new CreateCaixaController().handle);
router.get('/caixa', isAuthenticated, new ListCaixaController().handle);
router.get('/detail/caixa', isAuthenticated, new DetailCaixaController().handle);
router.get('/detail/closed/caixa', isAuthenticated, new DetailClosedCaixaController().handle);
router.put('/close/caixa', isAuthenticated, new CloseCaixaController().handle);
router.post('/registro/caixa', isAuthenticated, new CreateRegistroCaixaController().handle);
router.put('/cancelar/registro', isAuthenticated, new CancelarRegistroCaixaController().handle);
router.get('/registro/caixa', isAuthenticated, new ListRegistroCaixaController().handle);
router.get('/registro/caixa/colaborador', isAuthenticated, new ListRegistroCaixaColaboradorController().handle);
router.get('/registro/caixa/colaborador/date', isAuthenticated, new ListRegistroCaixaColaboradorDateController().handle);
router.get('/registro/caixa/colaborador/nome', isAuthenticated, new ListRegistroCaixaColaboradorNomeController().handle);
router.get('/registro/caixa/colaborador/nome/date', isAuthenticated, new ListRegistroCaixaColaboradorNomeDateController().handle);
router.post('/entrada/cartao', isAuthenticated, new CreateEntradaCartaoController().handle);
router.post('/retirada/caixa', isAuthenticated, new CrateRetiradaCaixaController().handle);
router.post('/entrada/caixa', isAuthenticated, new CreateEntradaCaixaController().handle);
router.post('/quebra/caixa', isAuthenticated, new CreateQuebraCaixaController().handle);
router.put('/edit/quebra/caixa', isAuthenticated, new EditQuebraCaixaController().handle);
router.get('/quebra/caixa', isAuthenticated, new ListQuebraCaixaController().handle);
router.get('/fluxo/caixa/day', isAuthenticated, new ListRelatorioFluxoCaixaController().handle);
router.get('/fluxo/caixa/mes', isAuthenticated, new ListRelatorioFluxoCaixaMesController().handle);
router.get('/fluxo/caixa/full', isAuthenticated, new ListRelatorioFluxoCaixaFullController().handle);
router.get('/fluxo/caixa/full/dates', isAuthenticated, new ListRelatorioFluxoCaixaFullDateController().handle);
router.get('/fluxo/caixa/mes/dates', isAuthenticated, new ListRelatorioFluxoMesDateController().handle); // Rota de para caixa do colaborador.

// -- ROTAS CREDIÁRIO --
router.post('/crediario', isAuthenticated, new CreateCrediarioController().handle);
router.get('/detail/crediario', isAuthenticated, new DetailCrediarioController().handle);
router.put('/parcela', isAuthenticated, new EditParcelasCrediarioController().hadle);
router.get('/atrasada/parcelas', isAuthenticated, new ListParcelasAtrasadasController().handle);
router.get('/crediario', isAuthenticated, new ListCrediarioController().handle);
router.get('/date/crediario', isAuthenticated, new ListCrediarioDateController().handle);
router.get('/parcelas', isAuthenticated, new ListParcelasAtrasatasFullController().handle);
router.get('/date/parcelas', isAuthenticated, new ListParcelasAtrasadasDateController().handle);

// -- ROTAS CONTAS A PAGAR --
router.post('/conta/pagar', isAuthenticated, new CreateNewContaController().handle);
router.get('/detail/conta', isAuthenticated, new DetailContaController().handle);
router.get('/conta', isAuthenticated, new ListFullContaController().handle);
router.get('/date/conta', isAuthenticated, new ListContasByDateController().handle);
router.get('/status/conta', isAuthenticated, new ListContasByStatusController().handle);
router.get('/categoria/conta', isAuthenticated, new ListContasByCategoriaController().handle);


export { router };
