import { Router } from 'express';
import multer from 'multer';

import { CreateColaboradorController } from '../controllers/Colaborador/CreateColaboradorController';
import { AuthColaboradorController } from '../controllers/Colaborador/AuthColaboradorController';
import { DetailUserController } from '../controllers/Colaborador/DetailUserController';
import { DetailColaboradorController } from '../controllers/Colaborador/DetailColaboradorController';
import { ListColaboradorController } from '../controllers/Colaborador/ListColaboradorController';
import { EditColaboradorController } from '../controllers/Colaborador/EditColaboradorController';

import { CreateClienteController } from '../controllers/Cliente/CreateClienteController';
import { DetailClienteController } from '../controllers/Cliente/DetailClienteController';
import { EditClienteController } from '../controllers/Cliente/EditClienteController';
import { ListClienteController } from '../controllers/Cliente/ListClienteController';

import { CreateRepresentanteController } from '../controllers/Representante/CreateRepresentanteController';
import { ListRepresentanteController } from '../controllers/Representante/ListRepresentanteController';
import { EditRepresentanteController } from '../controllers/Representante/EditRepresentanteController';
import { DetailRepresentanteController } from '../controllers/Representante/DetailRepresentanteController';

import { CreateFabricaController } from '../controllers/Fabrica/CreateFabricaController';
import { EditFabricaController } from '../controllers/Fabrica/EditFabricaController';
import { DetailFabricaController } from '../controllers/Fabrica/DetailFabricaController';

import { isAuthenticated } from '../middlewares/isAuthenticated';
import uploadConfig from '../config/multer';

const router = Router();

const upload = multer(uploadConfig.upload("./tmp"));

// -- ROTAS COLABORADOR --
router.post('/colaborador', upload.single('file'), new CreateColaboradorController().handle);
router.get('/colaborador', isAuthenticated, new ListColaboradorController().handle);
router.get('/colaborador/detail', isAuthenticated, new DetailColaboradorController().handle);
router.put('/colaborador/edit', isAuthenticated, upload.single('file'), new EditColaboradorController().handle);

// -- ROTAS LOGIN --
router.post('/login', new AuthColaboradorController().handle);
router.get('/me', isAuthenticated, new DetailUserController().handle);

// -- ROTAS CLIENTE --
router.post('/cliente', isAuthenticated, upload.single('file'), new CreateClienteController().handle);
router.get('/cliente', isAuthenticated, new ListClienteController().handle);
router.get('/cliente/detail', isAuthenticated, new DetailClienteController().handle);
router.put('/cliente/edit', isAuthenticated, upload.single('file'), new EditClienteController().handle);

// -- ROTAS REPRESENTANTE --
router.post('/representante', isAuthenticated, upload.single('file'), new CreateRepresentanteController().handle);
router.get('/representante', isAuthenticated, new ListRepresentanteController().handle);
router.get('/representante/detail', isAuthenticated, new DetailRepresentanteController().handle);
router.put('/representante/edit', isAuthenticated, upload.single('file'), new EditRepresentanteController().handle);

// -- ROTAS FABRICA --
router.post('/fabrica', isAuthenticated, new CreateFabricaController().handle);
router.put('/fabrica/edit', isAuthenticated, new EditFabricaController().handle);
router.get('/fabrica/detail', isAuthenticated, new DetailFabricaController().handle);

export { router };
