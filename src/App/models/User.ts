
/**
 * This interface defines the shape of a User which is composed of an id, username, email and password.
 */
export interface User {

    id?: number; //The question mark makes this variable optional, this is Typescript syntax.
    email: string;
    username: string;
    password: string;
}