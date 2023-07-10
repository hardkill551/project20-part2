import { prisma } from "@/config";
import { TicketTypeId } from "@/controllers/tickets-controller";
import { notFoundError } from "@/errors";
import { Enrollment, Ticket } from "@prisma/client";

async function allTicketsRepository() {
    return prisma.ticketType.findMany()
}



async function findEnrollment(userId:number) {
    return await prisma.enrollment.findUnique({
        where: {
            userId
        }
    })
}
async function findTicket(enrollment:number) {
    return await prisma.ticket.findFirst({
        where: {
            enrollmentId: enrollment
        },
        include: {
            TicketType:true
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
const ticketsRepository = {
    allTicketsRepository,
    findEnrollment,
    findTicket,
    createTicket
  };
  
  export default ticketsRepository;