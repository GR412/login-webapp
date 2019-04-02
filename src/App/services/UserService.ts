import axios, {AxiosResponse} from 'axios';
import {User} from "../models/User";
import {LoginRequest} from "../models/LoginRequest";
import {LoginResponse} from "../models/LoginResponse";
import {Observable} from "rxjs";

/**
 * This class is what connects to the backend endpoint, specifically the Users and Authentication controllers. Each
 * method has an associated HTTP method and URL path, which matches to a method in the backend controllers, by which
 * the request is carried out on the backend.
 */

export class UserService
{
    private users_domain: string = 'http://localhost:8080/users/';
    private auth_domain: string = 'http://localhost:8080/login';

    /**
     * This method calls a method in the backend Users controller that retrieves all users from the Users database
     * table.
     *
     * @return an observable array of Users
     */

    public getAllUsers(): Observable<User[]>
    {
        return Observable
            .fromPromise(axios.get(`${this.users_domain}`))
            .map((response: AxiosResponse) => response.data);
    }

    /**
     * This method calls a method in the backend Users controller that retrieves a single user from the Users database
     * table.
     *
     * @param userId the supplied userID so the backend knows which user to fetch from the Users table.
     * @return the fetched observable User
     */

    public getUser(userId: number): Observable<User>
    {
        return Observable
            .fromPromise(axios.get(`${this.users_domain}${userId}`))
            .map((response: AxiosResponse) => response.data);
    }

    /**
     * This method calls a method in the backend Users controller that removes a single user from the Users database
     * table.
     *
     * @param userId the supplied userID so the backend knows which user to remove from the Users table.
     * @return the deleted observable User
     */

    public deleteUser(userId: number): Observable<User>
    {
        return Observable
            .fromPromise(axios.delete(`${this.users_domain}${userId}`))
            .map((response: AxiosResponse) => response.data);
    }

    /**
     * This method calls a method in the backend Users controller that adds a new user to the Users database
     * table.
     *
     * @param user the supplied User that contains the inputted user details to be passed to the User table
     * @return the newly added observable User
     */

    public addUser(user: User): Observable<User>
    {
        return Observable
            .fromPromise(axios.post(`${this.users_domain}`, user))
            .map((response: AxiosResponse) => response.data);
    }

    /**
     * This method calls a method in the backend Users controller that updates an existing user from the Users database
     * table.
     *
     * @param user the supplied User that contains the updated user details to be passed to the User table
     * @return the updated observable User
     */

    public updateUser(user: User): Observable<User>
    {
        return Observable
            .fromPromise(axios.put(`${this.users_domain}${user.id}`, user))
            .map((response: AxiosResponse) => response.data);
    }

    /**
     * This method calls a method in the backend Authentication controller that authenticates a user into the app
     * as well as setting an auth token which is stored into the Session database table.
     *
     * @param login contains the inputted username and password that is to be checked against entries in the Users
     * table.
     * @return an observable LoginResponse that contains the generated auth token.
     */

    public loginUser (login: LoginRequest): Observable<LoginResponse>
    {
        return Observable
            .fromPromise(axios.post(`${this.auth_domain}`, login))
            .map((response: AxiosResponse) => response.data);
    }
}