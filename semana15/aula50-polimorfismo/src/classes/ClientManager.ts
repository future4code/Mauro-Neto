import {Client} from './Client'

export class ClientManager{
    private clients: Client[] = []

    public getClientsQuantity(): number{
        return this.clients.length;
    }

    public registerClient(client: Client): void{
        this.clients.push(client);
    }

    public calculateBillOfClient(registrationNumber: number): number{
        const foundClient = this.clients.find((client) => {
            return client.registrationNumber === registrationNumber;
        })
        if(foundClient){
            return foundClient.calculateBill();
        }

        return 0;
    }

    public calculateTotalIncome(): number{
        let totalValue: number = 0;
        for(const client of this.clients){
            totalValue += client.calculateBill();
        }
        return totalValue;
    }

    public deleteUser(registrationNumber: number): void{
        const clientToDelete = this.clients.findIndex((client) => {client.registrationNumber === registrationNumber})
        if(clientToDelete >= -1){
            this.clients.splice(clientToDelete, 1);
        }
    }

    public printClients(): void{
        for(const client of this.clients){
            console.log(`${client.name} - ${client.registrationNumber} - ${client.consumedEnergy} - ${client.calculateBill()}`)
        }
    }
}