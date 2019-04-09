import axios, {AxiosResponse} from 'axios';
import {Observable} from "rxjs";

export class ApiClient {

    private apiHost: string = "http://localhost:8080";

    public isUserLoggedIn() {
        return !!localStorage.getItem("X-Auth-Token");
    }

    public get(path: string): Observable<any> {
        return Observable
            .fromPromise(axios.get(this.apiHost + path, this.buildHeader()))
            .map((response: AxiosResponse) => response.data);
    }

    public login(path: string, payload: any): Observable<any> {
        return Observable
            .fromPromise(axios.post(this.apiHost + path, payload))
            .map((response: AxiosResponse) => response.data)
            .do((response: any) => this.saveToken(response.authToken));
    }

    public post(path: string, payload: any): Observable<any> {
        return Observable
            .fromPromise(axios.post(this.apiHost + path, payload, this.buildHeader()))
            .map((response: AxiosResponse) => response.data);
    }

    public put(path: string, payload: any): Observable<any> {
        return Observable
            .fromPromise(axios.put(this.apiHost + path, payload, this.buildHeader()))
            .map((response: AxiosResponse) => response.data);
    }

    public delete(path: string): Observable<any> {
        return Observable
            .fromPromise(axios.delete(this.apiHost + path, this.buildHeader()))
            .map((response: AxiosResponse) => response.data);
    }

    private buildHeader() {
        return {headers: {'X-Auth-Token': localStorage.getItem('auth-token')}};
    }

    private saveToken(authToken: string) {
        localStorage.setItem('X-Auth-Token', authToken);
    }
}