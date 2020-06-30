import {Employee} from './Employee'

export class Seller extends Employee{
    static SELLING_COMMISSION:number = 5

    private salesQuantity:number = 0

    public setSalesQuantity(sales: number): void{
        this.salesQuantity = sales;
    }

    public getSalesQuantity(): number{
        return this.salesQuantity;
    }

    public calculateTotalSalary(): number{
        return (this.baseSalary + 400 + (Seller.SELLING_COMMISSION * this.salesQuantity))
    }
}