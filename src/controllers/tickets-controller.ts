import ticketsService from "@/services/tickets-service";
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function getAllTickets(req:Request, res:Response) {
    try {
        const tickets = await ticketsService.allTicketsService()
        res.status(200).send(tickets)
    } catch (error) {
        return res.status(httpStatus.NOT_FOUND).send({});

    }
}