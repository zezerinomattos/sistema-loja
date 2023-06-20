import { Router } from 'express';
import multer from 'multer';

import { CreateColaboradorController } from '../controllers/Colaborador/CreateColaboradorController';
import { AuthColaboradorController } from '../controllers/Colaborador/AuthColaboradorController';
import { DetailColaboradorController } from '../controllers/Colaborador/DetailColaboradorController';
import { ListColaboradorController } from '../controllers/Colaborador/ListColaboradorController';
import { CreateClienteController } from '../controllers/Cliente/CreateClienteController';

import { isAuthenticated } from '../middlewares/isAuthenticated';
import uploadConfig from '../config/multer';

const router = Router();

const upload = multer(uploadConfig.upload("./tmp"));

// -- ROTAS COLABORADOR --
router.post('/colaborador', upload.single('file'), new CreateColaboradorController().handle);
router.get('/colaborador', isAuthenticated, new ListColaboradorController().handle);

// -- ROTAS LOGIN --
router.post('/login', new AuthColaboradorController().handle);
router.get('/me', isAuthenticated, new DetailColaboradorController().handle);

// -- ROTAS CLIENTE --
router.post('/cliente', isAuthenticated, upload.single('file'), new CreateClienteController().handle);

export { router };
