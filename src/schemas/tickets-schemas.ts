import { TicketTypeId } from '@/controllers/tickets-controller';
import Joi from 'joi';


export const ticketSchema = Joi.object<TicketTypeId>({
ticketTypeId: Joi.number().required(),
}); 