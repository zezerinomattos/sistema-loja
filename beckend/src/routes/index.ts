import { Router } from 'express';

import { CreateColaboradorController } from '../controllers/Colaborador/CreateColaboradorController';
import { AuthColaboradorController } from '../controllers/Colaborador/AuthColaboradorController';
import { DetailColaboradorController } from '../controllers/Colaborador/DetailColaboradorController';

import { isAuthenticated } from '../middlewares/isAuthenticated';

const router = Router();

// -- ROTAS COLABORADOR --
router.post('/colaborador', new CreateColaboradorController().handle);
router.post('/login', new AuthColaboradorController().handle);
router.get('/me', isAuthenticated, new DetailColaboradorController().handle);

export { router };
