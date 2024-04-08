export class LoginInterface {
     email: string;
     pwd: string;

    constructor(email: string, pwd: string) {
        this.email = email;
        this.pwd = pwd;
    }

    public setEmail(email:string){
        this.email = email;
    }

    public getEmail(){
        return this.email;
    }

    public setPwd(pwd:string){
        this.pwd = pwd;
    }

    public getPwd(){
        return this.pwd;
    }

}
