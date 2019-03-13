import axios from 'axios';
import {User} from "../models/User";
import {Observable} from "rxjs";
import {fromPromise} from "rxjs/internal-compatibility";
import {map} from "rxjs/operators";

export class UserService {

    public getAllUsers(): Observable<User[]> {
        const response = fromPromise(axios.get("http://localhost:8080/users"))
            .pipe(map(response => response.data));
        return response;
    }

}