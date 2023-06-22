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
router.get('/cliente/detail', isAuthenticated, new DetailClienteController().handle);
router.put('/cliente/edit', isAuthenticated, upload.single('file'), new EditClienteController().handle);

export { router };
