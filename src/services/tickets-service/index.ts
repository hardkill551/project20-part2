import { prisma } from "@/config";
import { TicketTypeId } from "@/controllers/tickets-controller";
import { invalidDataError, notFoundError } from "@/errors";
import ticketsRepository from "@/repositories/tickets.repository";
import { Enrollment } from "@prisma/client";

async function allTicketsService() {
    return await ticketsRepository.allTicketsRepository()
}

async function createTicket(ticketTypeId:TicketTypeId, userId:number) {
    const enrollment = await ticketsRepository.findEnrollment(userId)
    if(!enrollment) throw notFoundError()
    const details:string[] = ["ticketTypeId not Found"]
    if(!ticketTypeId) throw invalidDataError(details)
    
    await ticketsRepository.createTicket(ticketTypeId, enrollment.id)
    return userTicket(userId)
}

async function userTicket(userId:number) {
    const enrollment = await ticketsRepository.findEnrollment(userId)
    const ticket = await ticketsRepository.findTicket(enrollment.id)
    const ticketType = await ticketsRepository.findTicketType(ticket.id)

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
    userTicket,
    createTicket,
  };
  
  export default ticketsService;