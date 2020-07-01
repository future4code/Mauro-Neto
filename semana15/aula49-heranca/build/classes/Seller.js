"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Seller = void 0;
const Employee_1 = require("./Employee");
class Seller extends Employee_1.Employee {
    constructor() {
        super(...arguments);
        this.salesQuantity = 0;
    }
    setSalesQuantity(sales) {
        this.salesQuantity = sales;
    }
    getSalesQuantity() {
        return this.salesQuantity;
    }
    calculateTotalSalary() {
        return (this.baseSalary + 400 + (Seller.SELLING_COMMISSION * this.salesQuantity));
    }
}
exports.Seller = Seller;
Seller.SELLING_COMMISSION = 5;
//# sourceMappingURL=Seller.js.map