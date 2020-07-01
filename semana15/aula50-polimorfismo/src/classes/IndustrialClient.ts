import { Industry } from "./Industry";
import { Client } from "./Client";

export class IndustrialClient extends Industry implements Client{
    constructor(public name: string, 
        public registrationNumber: number,
        public consumedEnergy: number, 
        private industryRegister: string,
        machinesQuantity: number,
        cep: string
    ){
        super(machinesQuantity, cep);
    }

    public getIndustryRegister(): string{
        return this.industryRegister;
    }

    public getName(): string{
        return this.name;
    }

    public getConsumedEnergy(): number{
        return this.consumedEnergy;
    }

    public calculateBill(): number{
        return (this.consumedEnergy * 0.45) + (100 * this.machinesQuantity);
    }
}