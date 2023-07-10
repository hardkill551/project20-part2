import { notFoundError, unauthorizedError } from "@/errors";
import paymentsRepository from "@/repositories/payments-repository";
import ticketsRepository from "@/repositories/tickets.repository";

async function getPaymentService(ticketId:string, userId:number) {
    const ticket = await paymentsRepository.findTicket(Number(ticketId))
    if (!ticket) throw notFoundError()
    if(ticket.Enrollment.userId !== userId) throw unauthorizedError()
    const payment = await paymentsRepository.findPayment(Number(ticketId))
    return payment
}

const paymentService = {
    getPaymentService,
  };
  
  export default paymentService;