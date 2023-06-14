export class Transaction {
    firstName!: string;
    lastName!: string;
    userId!: string;
    amount!: number;
    date!: number;

    constructor(obj?: any) {
        this.firstName = obj ? obj.firstName : '',           
        this.lastName = obj ? obj.lastName : '',               
        this.userId = obj ? obj.userId : '';
        this.amount = obj ? obj.amount : '';
        this.date = obj ? obj.date : '';
    }

    public toJson() {
        return {
            firstName: this.firstName,
            lastName: this.lastName,
            userId: this.userId,
            amount: this.amount,
            date: this.date,
        }
    }
}
