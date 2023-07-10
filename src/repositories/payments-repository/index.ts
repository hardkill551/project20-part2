import { prisma } from "@/config";
import { TicketTypeId } from "@/controllers/tickets-controller";
import { notFoundError, unauthorizedError } from "@/errors";
import { PaymentType } from "@/protocols";

async function findPayment(ticketId:number) {
    return prisma.payment.findFirst({
        where:{
            ticketId:ticketId
        }
    })
}

async function createPayment(paymentData:PaymentType, userId:number) {
    const value = await prisma.ticket.findFirst({
        where:{
            id:paymentData.ticketId
        },
        include:{
            TicketType:{
                select:{
                    price:true
                }
            }
        }
    })

    if(!value) throw notFoundError()
    const ticket = await findTicket(paymentData.ticketId)
    if(ticket.Enrollment.userId !== userId) throw unauthorizedError()
    const cardLastDigits = String(paymentData.cardData.number).slice(-4)
    await prisma.ticket.update({
        data:{
            status:"PAID",
        },
        where:{
            id:paymentData.ticketId
        }
    })
    return await prisma.payment.create({
        data: {
            ticketId: paymentData.ticketId,
            cardIssuer: paymentData.cardData.issuer,
            value: value.TicketType.price,
            cardLastDigits,
          }
    })
}
async function findTicket(ticketId:number) {
    return await prisma.ticket.findFirst({
        where: {
            id:ticketId
        },
        include:{
            Enrollment: true
        }
    })
}
const paymentsRepository = {
    findPayment,
    findTicket,
    createPayment
  };
  
  export default paymentsRepository;