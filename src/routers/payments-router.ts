import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { getPayment, postPayment } from '@/controllers/payments-controller';
import { paymentSchema } from '@/schemas/payments-schemas';

const paymentsRouter = Router();

paymentsRouter
  .get('/', authenticateToken, getPayment)
  .post('/process', authenticateToken, validateBody(paymentSchema), postPayment);

export { paymentsRouter };
