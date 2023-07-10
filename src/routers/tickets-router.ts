import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { getAllTickets, getTicketById, postTicket } from '@/controllers/tickets-controller';
import { ticketSchema } from '@/schemas/tickets-schemas';

const ticketsRouter = Router();

ticketsRouter
  .get('/types',authenticateToken, getAllTickets)
  .get('/', authenticateToken, getTicketById)
  .post('/', authenticateToken ,validateBody(ticketSchema), postTicket);

export { ticketsRouter };
