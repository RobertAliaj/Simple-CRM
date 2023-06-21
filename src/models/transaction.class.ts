export class Transaction {
    firstName!: string;
    lastName!: string;
    usdAmount!: number;
    btcAmount!: string;
    date!: string;
    timeStamp!: number;
    isNew!: boolean;

    constructor(obj?: any) {
        this.firstName = obj ? obj.firstName : '',
            this.lastName = obj ? obj.lastName : '',
            this.usdAmount = obj ? obj.usdAmount : '',
            this.btcAmount = obj ? obj.btcAmount : '',
            this.date = obj ? obj.date : '',
            this.timeStamp = obj ? obj.timeStamp : '',
            this.isNew = obj ? obj.isNew : ''
    }

    public toJson() {
        return {
            firstName: this.firstName,
            lastName: this.lastName,
            usdAmount: this.usdAmount,
            btcAmount: this.btcAmount,
            date: this.date,
            timeStamp: this.timeStamp,
            isNew: this.isNew

        }
    }
}
