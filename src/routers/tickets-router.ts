import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { getEnrollmentByUser, postCreateOrUpdateEnrollment, getAddressFromCEP } from '@/controllers';
import { createEnrollmentSchema } from '@/schemas';
import { getAllTickets } from '@/controllers/tickets-controller';

const ticketsRouter = Router();

ticketsRouter
  .get('/types',authenticateToken, getAllTickets)
  .get('/', authenticateToken)
  .post('/', validateBody(createEnrollmentSchema), postCreateOrUpdateEnrollment);

export { ticketsRouter };
