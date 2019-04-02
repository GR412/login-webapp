
/**
 * This interface defines the shape of a User which is composed of an id, username, email and password.
 */

export interface User
{
    id?: number;
    email: string;
    username: string;
    password: string;
}