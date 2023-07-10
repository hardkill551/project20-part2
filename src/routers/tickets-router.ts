import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { ticketSchema } from '@/schemas';
import { getAllTickets, getTicketById, postTicket } from '@/controllers/tickets-controller';

const ticketsRouter = Router();

ticketsRouter
  .get('/types',authenticateToken, getAllTickets)
  .get('/', authenticateToken, getTicketById)
  .post('/', validateBody(ticketSchema), authenticateToken, postTicket);

export { ticketsRouter };
