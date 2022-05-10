import { AuthService } from './auth.service';
import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { exhaustMap, map, take } from 'rxjs/operators'
import { Observable } from "rxjs";
import * as moment from "moment";

export interface Task {
    id?: string,
    title: string,
    date?: string
}

interface CreateResponse {
    name: string
}

@Injectable({
    providedIn: 'root'
})

export class TasksService {
    public static url = 'https://organizer-2f902-default-rtdb.firebaseio.com/'

    constructor(
        private http: HttpClient,
        private authService: AuthService
    ) {}

    load(date: moment.Moment): Observable<Task[]> {
        return this.authService.user.pipe(take(1), exhaustMap(user => {
            return this.http
                .get<Task[]>(`${TasksService.url}/${date.format('DD-MM-YY')}.json`,
                {
                    params: new HttpParams().set('auth', user.token)
                }
            )
        }), map(tasks => {
            if (!tasks) {
                return []
            }
            return Object.keys(tasks).map(key => ({...tasks[<any>key], id: key}))
        })

        )
    }

    create(task: Task): Observable<Task> {
        return this.http
            .post<CreateResponse>(`${TasksService.url}/${task.date}.json`, task)
            .pipe(map(res => {
                return {...task, id: res.name}
            }))
    }

    remove(task: Task): Observable<void> {
        return this.http.delete<void>(`${TasksService.url}/${task.date}/${task.id}.json`)
    }

}