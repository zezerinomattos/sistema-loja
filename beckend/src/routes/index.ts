import { Router } from 'express';

import { CreateColaboradorController } from '../controllers/Colaborador/CreateColaboradorController';
import { AuthColaboradorController } from '../controllers/Colaborador/AuthColaboradorController';

const router = Router();

// -- ROTAS COLABORADOR --
router.post('/colaborador', new CreateColaboradorController().handle);
router.post('/login', new AuthColaboradorController().handle);

export { router };
