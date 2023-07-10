import { notFoundError, unauthorizedError } from "@/errors";
import { PaymentType } from "@/protocols";
import paymentsRepository from "@/repositories/payments-repository";
async function getPaymentService(ticketId:string, userId:number) {
    const ticket = await paymentsRepository.findTicket(Number(ticketId))
    if (!ticket) throw notFoundError()
    if(ticket.Enrollment.userId !== userId) throw unauthorizedError()
    const payment = await paymentsRepository.findPayment(Number(ticketId))
    return payment
}
async function postPaymentService(paymentInfo:PaymentType, userId:number) {
    const payment = await paymentsRepository.createPayment(paymentInfo, userId)
    return payment
}
const paymentService = {
    getPaymentService,
    postPaymentService
  };
  
  export default paymentService;