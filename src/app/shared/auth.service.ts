import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { onErrorResumeNextStatic } from 'rxjs/internal/operators/onErrorResumeNext';

export interface AuthResponseData {
    kind: string
    idToken: string	
    email: string	
    refreshToken: string
    expiresIn: string
    localId: string
    registered?: boolean
}

@Injectable({
    providedIn: 'root'
})

export class AuthService {

    constructor(private http: HttpClient) {}

    signup(email: string, password: string) {
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCxMZL-DlmeEFQ5DSi7qe4rto_L1WoCZAY',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe(catchError(this.handleError))
    }

    login(email: string, password: string) {
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCxMZL-DlmeEFQ5DSi7qe4rto_L1WoCZAY',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe(catchError(this.handleError))
        
    }

    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'An unknown error occured!'
            if (!errorRes.error || !errorRes.error.error) {
                return throwError(errorMessage)
            }
            switch (errorRes.error.error.message) {
                case 'EMAIL_EXISTS':
                    errorMessage = 'This email exists already'
                    break

                case 'INVALID_PASSWORD':
                    errorMessage = 'The password is not correct'
                    break

                case 'EMAIL_NOT_FOUND':
                    errorMessage = 'This email does not exist'
                    break
            }
            return throwError(errorMessage)
    }
}