import { prisma } from "@/config";
import { notFoundError } from "@/errors";

async function allTicketsService() {
    return prisma.ticketType.findMany()
}
async function userTicket(userId:number) {
    const enrollment = await prisma.enrollment.findUnique({
        where: {
            userId
        }
    })
    const ticket = await prisma.ticket.findFirst({
        where: {
            enrollmentId: enrollment.id
        }
    })
    const ticketType = await prisma.ticketType.findUnique({
        where: {
            id: ticket.ticketTypeId
        }
    })
    if(!enrollment || !ticket) {
        throw notFoundError()
    }
    return {
        ticket,
        ticketType
    }
}
const ticketsService = {
    allTicketsService,
    userTicket
  };
  
  export default ticketsService;