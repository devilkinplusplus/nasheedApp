export class LoginResponse {
    succeeded:Boolean;
    token:Token;
    errors:string[]
}

export class Token {
    accessToken:string;
    expiration:Date;
}

export class LoginDto {
    usernameOrEmail:string;
    password:string;
}