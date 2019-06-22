export interface userInterface {
    userName: string;
    email: string;
    firstName?: string;
    lastName?: string;
    dateOfBirth?: string;
    password: string;
    skills?: string;
    country?: string;
}

export class User {
    public userName: string;
    public email: string;
    public firstName?: string;
    public lastName?: string;
    public dateOfBirth?: string;
    public password: string;
    public skills?: string;
    public country?: string;

    constructor(obj?: userInterface) {
        this.userName = obj && obj.userName || '';
        this.email = obj && obj.email || '';
        this.firstName = obj && obj.firstName || '';
        this.lastName = obj && obj.lastName || '';
        this.dateOfBirth = obj && obj.dateOfBirth || '';
        this.password = obj && obj.password || '';
        this.skills = obj && obj.skills || '';
        this.country = obj && obj.country || '';
    }
}