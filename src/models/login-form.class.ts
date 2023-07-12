export class LoginForm {
    email!: string;
    password!: string;
    firstName!: string;
    lastName!: string;
    birthDate!: number;
    street!: string;
    zipCode!: number;
    city!: string;


    constructor(obj?: any) {
        this.email = obj ? obj.email : '';
        this.password = obj ? obj.password : '';
        this.firstName = obj ? obj.firstName : '';
        this.lastName = obj ? obj.lastName : '';
        this.birthDate = obj ? obj.birthDate : '';
        this.street = obj ? obj.street : '';
        this.zipCode = obj ? obj.zipCode : '';
        this.city = obj ? obj.city : '';
    }

    public toJson() {
        return {
            email: this.email,
            password: this.password,
            firstName: this.firstName,
            lastName: this.lastName,
            birthDate: this.birthDate,
            street: this.street,
            zipCode: this.zipCode,
            city: this.city,
        }
    }
}