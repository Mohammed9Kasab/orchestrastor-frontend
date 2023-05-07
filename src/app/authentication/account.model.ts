export class Account {

  constructor(
    public id: number,
    public activated: boolean,
    public authorities: string[],
    public password: string[],
    public email: string,
    public firstName: string | null,
    public cui: string,
    public langKey: string,
    public lastName: string | null,
    public login: string,
    public imageUrl: string | null,
    public phoneNumber:string | null
  ) {}
}
