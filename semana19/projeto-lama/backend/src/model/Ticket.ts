export interface createTicketDTO{
    show_id: string,
    ticket_type: string,
    value: number,
    tickets_quantity: number,
}

export interface buyTicketDTO{
    show_id: string,
    ticket_type: string,
    quantity: number
}