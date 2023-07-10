import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { ticketSchema } from '@/schemas/tickets-schemas';
import { getPayment } from '@/controllers/payments-controller';

const paymentsRouter = Router();

paymentsRouter
  .get('/', authenticateToken, getPayment)
  .post('/process', authenticateToken, validateBody(ticketSchema));

export { paymentsRouter };
