import ticketsService from "@/services/tickets-service";
import { Request, Response } from "express";
import httpStatus from "http-status";
import { JwtPayload } from "jsonwebtoken";

export async function getAllTickets(req:Request, res:Response) {
    try {
        const tickets = await ticketsService.allTicketsService()
        res.status(200).send(tickets)
    } catch (error) {
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR)

    }
}
export type TicketTypeId = {
    ticketTypeId: number
}
export async function postTicket(req:Request, res:Response) {
    const ticketTypeId = req.body as TicketTypeId
    const {userId} = res.locals as JwtPayload
    try {
        const tickets = await ticketsService.createTicket(ticketTypeId, userId)
        res.status(200).send(tickets)
    } catch (error) {
        if (error.name === 'NotFoundError') {
            return res.sendStatus(httpStatus.NOT_FOUND);
          }
        if (error.name === 'InvalidDataError') {
            return res.sendStatus(httpStatus.BAD_REQUEST);
        }
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR)

    }
}
export async function getTicketById(req:Request, res:Response) {
    const {userId} = res.locals as JwtPayload
    try {
        const ticket = await ticketsService.userTicket(userId)
        res.status(200).send(ticket)
    } catch (error) {
        
        return res.sendStatus(httpStatus.NOT_FOUND);
    }
}
