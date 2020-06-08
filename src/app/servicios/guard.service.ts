import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AutenticacionService } from './autenticacion.service';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate{

  constructor(private router:Router,
              private autenticacionServicio: AutenticacionService ) { }

  canActivate(route: ActivatedRouteSnapshot , state: RouterStateSnapshot){

    const helper = new JwtHelperService();


    let estaLogueado= this.autenticacionServicio.estaLogueado();


    //Comprobamos si no esta logueado
    if (!estaLogueado){
      sessionStorage.clear();
      this.router.navigate(['login']);
      return false;
       //Si esta logueado, pero ahora comprobamos si el toekn aun no expira
    }else{
      let tokenGuardado= JSON.parse(sessionStorage.getItem('access_token'));

      //preguntampos si el token aun no expira
        if (!helper.isTokenExpired(tokenGuardado.access_token)){

          const deodedToken = helper.decodeToken(tokenGuardado.access_token);
          let url = state.url;
          let permisos = deodedToken.authorities

        let r = permisos.indexOf(url);

       console.log(url);
  
        if(r>=0){
          return true;

        }else{
       
          this.router.navigate(['no','autorizado']);
          return false;

        }
       // return true;
      

          //Si ya expiro el token lo mandamos a loguin
        }else{
          sessionStorage.clear();
          this.router.navigate(['login']);
          return false;
        }

    }
     

  }
}
