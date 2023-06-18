import { Router } from 'express';

import { CreateColaboradorController } from '../controllers/Colaborador/CreateColaboradorController';

const router = Router();

// -- ROTAS COLABORADOR --
router.post('/colaborador', new CreateColaboradorController().handle);

export { router };