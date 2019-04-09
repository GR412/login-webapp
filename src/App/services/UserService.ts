import {User} from "../models/User";
import {LoginRequest} from "../models/LoginRequest";
import {LoginResponse} from "../models/LoginResponse";
import axios, {AxiosResponse} from 'axios';
import {Observable} from "rxjs";
import {ApiClient} from "./ApiClient";

/**
 * This class is what connects to the backend endpoint, specifically the Users and Authentication controllers. Each
 * method has an associated HTTP method and URL path, which matches to a method in the backend controllers, by which
 * the request is carried out on the backend.
 *
 * Each request (apart from login) also sends a header item as part of the request, containing an auth-token stored in
 * the browser. This auth-token is used for authorization whereby only certain requests will be accepted if the token
 * sent from the frontend is matched with an authorised token in the backend.
 */
export class UserService extends ApiClient {

    private readonly PATH_USERS: string = '/users';
    private readonly PATH_LOGIN: string = '/login';

    private users_domain: string = 'http://localhost:8080/users/';
    private auth_domain: string = 'http://localhost:8080/login';

    /**
     * This method calls a method in the backend Users controller that retrieves all users from the Users database
     * table.
     *
     * @return an observable array of Users
     */
    public getAllUsers(): Observable<User[]> {
        return super.get(this.PATH_USERS);
    }

    /*public getAllUsers(): Observable<User[]>
    {
        return Observable
            .fromPromise(axios.get(`${this.users_domain}`, this.buildHeader()))
            .map((response: AxiosResponse) => response.data);
    }*/

    /**
     * This method calls a method in the backend Users controller that retrieves a single user from the Users database
     * table.
     *
     * @param userId the supplied userID so the backend knows which user to fetch from the Users table.
     * @return the fetched observable User
     */
    public getUser(userId: number): Observable<User> {
        return super.get(this.PATH_USERS + `/${userId}`);
    }

    /*public getUser(userId: number): Observable<User>
    {
        return Observable
            .fromPromise(axios.get(`${this.users_domain}${userId}`, this.buildHeader()))
            .map((response: AxiosResponse) => response.data);
    }*/

    /**
     * This method calls a method in the backend Users controller that removes a single user from the Users database
     * table.
     *
     * @param userId the supplied userID so the backend knows which user to remove from the Users table.
     * @return the deleted observable User
     */
    public deleteUser(userId: number): Observable<User> {
        return super.delete(this.PATH_USERS + `/${userId}`);
    }

    /*public deleteUser(userId: number): Observable<User>
    {
        return Observable
            .fromPromise(axios.delete(`${this.users_domain}${userId}`, this.buildHeader()))
            .map((response: AxiosResponse) => response.data);
    }*/

    /**
     * This method calls a method in the backend Users controller that adds a new user to the Users database
     * table.
     *
     * @param user the supplied User that contains the inputted user details to be passed to the User table
     * @return the newly added observable User
     */
    public addUser(user: User): Observable<User> {
        return super.post(this.PATH_USERS, user);
    }

    /*public addUser(user: User): Observable<User>
    {
        return Observable
            .fromPromise(axios.post(`${this.users_domain}`, user, this.buildHeader()))
            .map((response: AxiosResponse) => response.data);
    }*/

    /**
     * This method calls a method in the backend Users controller that updates an existing user from the Users database
     * table.
     *
     * @param user the supplied User that contains the updated user details to be passed to the User table
     * @return the updated observable User
     */
    public updateUser(user: User): Observable<User> {
        return super.put(this.PATH_USERS, user);
    }

    /*public updateUser(user: User): Observable<User>
    {
        return Observable
            .fromPromise(axios.put(`${this.users_domain}${user.id}`, user, this.buildHeader()))
            .map((response: AxiosResponse) => response.data);
    }*/

    /**
     * This method calls a method in the backend Authentication controller that authenticates a user into the app
     * as well as setting an auth token which is stored into the Session database table.
     *
     * @param login contains the inputted username and password that is to be checked against entries in the Users
     * table.
     * @return an observable LoginResponse that contains the generated auth token.
     */
    public loginUser(login: LoginRequest): Observable<LoginResponse> {
        return super.login(this.PATH_LOGIN, login);
    }

    /*public loginUser (login: LoginRequest): Observable<LoginResponse>
    {
        return Observable
            .fromPromise(axios.post(`${this.auth_domain}`, login))
            .map((response: AxiosResponse) => response.data);
    }*/

    /*private buildHeader() {
        return {headers: {'X-Auth-Token': localStorage.getItem('auth-token')}};
    }

    private saveToken(authToken: string) {
        localStorage.setItem('X-Auth-Token', authToken);
    }

    public isUserLoggedIn() {
        return !!localStorage.getItem("authToken");
    }*/
}