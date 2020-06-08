import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import { tap, catchError,retry } from 'rxjs/operators';
import { MessageService } from 'primeng/api';



@Injectable({
  providedIn: 'root'
  
})

export class ErroresService implements HttpInterceptor {

  constructor(private messageService: MessageService ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(retry(3))
    .pipe(tap(event =>{
      if(event instanceof HttpResponse){

        if(event.body && event.body.error === true && event.body.errorMessage){

          throw new Error (event.body.errorMessage);

        }/*else{
        mensaje de exito algo solo si quieres que aparezca cada vez que se hace una petición correcta
        }*/

      }
    })).pipe(catchError((err) => {
     // console.log(err);

      if(err.status == 400){
      //  console.log("Hospital error 400");
        this.showSuccess();
  

      }else if (err.status == 401){
        console.log("Hospital error 401");

        //AQUI PODRIAS REDIRECCIONAR A UNA PAGINA PERSONALIZADA
      }else if (err.status == 500){
        console.log("Hospital error 500");
      }else{
        console.log("Hospital error XXXXXXX");
      }
      return EMPTY;

    }));
  }

  showSuccess() {
    this.messageService.add({severity:'success', summary: 'El usuario o Contraseña estan mal escritos',life:5000});
}//

}


