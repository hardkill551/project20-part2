import { prisma } from "@/config";
import { TicketTypeId } from "@/controllers/tickets-controller";

async function findPayment(ticketId:number) {
    return prisma.payment.findFirst({
        where:{
            ticketId:ticketId
        }
    })
}

async function createTicket({ticketTypeId}:TicketTypeId, enrollmentId:number) {
    return prisma.ticket.create({
        data: {
            ticketTypeId,
            status: "RESERVED",
            enrollmentId
          },
          include: {
            TicketType: true
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
    createTicket
  };
  
  export default paymentsRepository;