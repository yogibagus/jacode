import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        const currentUser = JSON.parse(localStorage.getItem('currentUser'))// you probably want to store it in localStorage or something
        const except = /login/;
        // Exclude interceptor for login request:
        if (request.url.search(except) === -1) {
            if (!currentUser.token) {
                return next.handle(request);
            }
            // set bearer token
            const req1 = request.clone({
                headers: request.headers.set('token', `${currentUser.token}`),

            });
            return next.handle(req1);
        }
        return next.handle(request);
    }

    alertToast(icon, title) {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })

        Toast.fire({
            icon: icon,
            title: title
        })
    }
}