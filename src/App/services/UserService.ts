import axios, {AxiosResponse} from 'axios';
import {User} from "../models/User";
import {Observable} from "rxjs";

export class UserService {

    private domain: string = 'http://localhost:8080/users/';

    public getAllUsers(): Observable<User[]> {
        return Observable
            .fromPromise(axios.get(`${this.domain}`))
            .map((response: AxiosResponse) => response.data);
    }

    // TODO replace domain

    public getUser(userId: number): Observable<User> {
        return Observable
            .fromPromise(axios.get(`${this.domain}${userId}`))
            .map((response: AxiosResponse) => response.data);
    }

    // method that calls delete endopoint
    public deleteUser(userId: number): Observable<User> {
        return Observable
            .fromPromise(axios.delete(`${this.domain}${userId}`))
            .map((response: AxiosResponse) => response.data);
    }

    public addUser(user: User): Observable<User> {
        return Observable
            .fromPromise(axios.post(`${this.domain}`, user))
            .map((response: AxiosResponse) => response.data);
    }

    public updateUser(user: User): Observable<User> {
        return Observable
            .fromPromise(axios.post(`${this.domain}`, user))
            .map((response: AxiosResponse) => response.data);
    }

}