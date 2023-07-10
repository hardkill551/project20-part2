import { prisma } from "@/config";

async function allTicketsService() {
    return prisma.ticketType.findMany()
}
const ticketsService = {
    allTicketsService
  };
  
  export default ticketsService;