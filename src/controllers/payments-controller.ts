import { PaymentType } from '@/protocols';
import paymentService from '@/services/payments-service';
import { Request, Response } from 'express';
import httpStatus from 'http-status';

export async function getPayment(req: Request, res: Response) {
  const { ticketId } = req.query as Record<string, string>;
  const { userId } = res.locals;
  try {
    if (!ticketId) return res.sendStatus(httpStatus.BAD_REQUEST);
    const payment = await paymentService.getPaymentService(ticketId, userId);
    res.status(httpStatus.OK).send(payment);
  } catch (error) {
    if (error.name === 'NotFoundError') {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    if (error.name === 'UnauthorizedError') {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }

    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}


export async function postPayment(req: Request, res: Response) {
    const { ticketId, cardData } = req.body as PaymentType
    const { userId } = res.locals;
    try {
      const payment = await paymentService.postPaymentService({ticketId, cardData}, userId);
      res.status(httpStatus.OK).send(payment);
    } catch (error) {
      if (error.name === 'NotFoundError') {
        return res.sendStatus(httpStatus.NOT_FOUND);
      }
      if (error.name === 'UnauthorizedError') {
        return res.sendStatus(httpStatus.UNAUTHORIZED);
      }
  
      return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
  }