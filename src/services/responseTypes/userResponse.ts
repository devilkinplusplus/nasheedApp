export class UserResponse {
    succeeded:Boolean;
    errors:string[];
}

export class CreateUserDto {
    firstName:string;
    lastName:string;
    email:string;
    userName:string;
    password:string;
}