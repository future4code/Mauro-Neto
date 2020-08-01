import { createTicketDTO, buyTicketDTO } from "../model/Ticket";
import { InvalidParameterError } from "../error/InvalidParameterError";
import { Authenticator } from "../service/Authenticator";
import { UserRole, User } from "../model/User";
import { UnauthorizedError } from "../error/UnauthorizedError";
import { TicketDatabase } from "../data/TicketDatabase";

export class TicketBusiness{
    constructor(
        private authenticator: Authenticator,
        private ticketDatabase: TicketDatabase
    )
    {}

    public async createTicket(token: string, input: createTicketDTO){
        const userData = this.authenticator.getData(token)

        if(User.stringToRole(userData.role) !== UserRole.ADMIN){
            throw new UnauthorizedError("You must be an admin to create a ticket")
        }

        if(!input.show_id || !input.ticket_type || (!input.value && input.value !== 0) || !input.tickets_quantity){
            throw new InvalidParameterError("Missing input")
        }

        if(input.show_id.trim()==="" || input.ticket_type.trim()===""){
            throw new InvalidParameterError("You can't send parameters with blank characters")
        }

        if((input.tickets_quantity <= 0) || (input.tickets_quantity % 1 !== 0)){
            throw new InvalidParameterError("Invalid ticket quantity, must be an integer greater than 0")
        }

        if(input.value < 0){
            throw new InvalidParameterError("Invalid ticket value, must be positive")
        }

        await this.ticketDatabase.createTicket(input.show_id, input.ticket_type, input.value, input.tickets_quantity)
    }

    public async buyTicket(token: string, input: buyTicketDTO){
        this.authenticator.getData(token)

        if(!input.show_id || !input.ticket_type){
            throw new InvalidParameterError("Missing input")
        }

        if(input.show_id.trim()==="" || input.ticket_type.trim()===""){
            throw new InvalidParameterError("You can't send parameters with blank characters")
        }

        if(input.quantity <=0 && (input.quantity % 1 !== 0)){
            throw new InvalidParameterError("Invalid ticket quantity, must be an integer greater than 0")
        }

        const availableTickets = await this.ticketDatabase.getAvailableTickets(input.show_id, input.ticket_type)

        if(!availableTickets && availableTickets!==0){
            throw new InvalidParameterError("Invalid show_id or ticket_type")
        }

        if(availableTickets === 0){
            throw new Error(`We don't have tickets for this show`)
        }

        if(input.quantity > availableTickets){
            throw new Error(`We only have ${availableTickets} tickets for this show`)
        }

        await this.ticketDatabase.buyTicket(input.show_id, input.ticket_type, input.quantity)
    }
}