import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { Usuario } from 'src/app/models/usuario/usuario.module';
import { NgxSpinnerService } from 'ngx-spinner';
import { JwtHelperService } from "@auth0/angular-jwt";


//import ".../ruta1/ruta2/ruta n";
import { Router, Params } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
public usuario:Usuario;
  constructor(
    public autenticacionServicio: AutenticacionService,
    private router: Router,
    private spinner: NgxSpinnerService
    ) {
      
      this.usuario  = new Usuario(6000,'','');
    }

  ngOnInit(): void {
   // console.log(this.usuario);
  }

  onSubmit(formularioLogin:NgForm){
    
    /*Servicio que obtiene el token */

    if (formularioLogin.invalid){
      Object.values(formularioLogin.controls).forEach(control => {
control.markAsTouched();
      });

      return ;
    }else{

      this.autenticacionServicio.autenticarse(this.usuario.nombreUsuario,this.usuario.password).subscribe( respuesta =>{
        this.spinner.show();
     console.log(respuesta);
           if(respuesta){
             const helper = new JwtHelperService();
 
             let token = JSON.stringify(respuesta);
             sessionStorage.setItem('access_token',token);
 
             let tk= JSON.parse(sessionStorage.getItem('access_token'));
             const decodedToken = helper.decodeToken(tk.access_token);
 
             console.log(decodedToken);
             setTimeout(() => {
               this.router.navigate(['inicio']);
             }, 1500);
    
            
             
           }
       },
       error=>{
         console.log(<any>error);
       }
     );
 

    }
   
 
    /*FIN SERVICIO PARA obtener token*/

  }

  // ngAfterViewInit(){
  //   (window as any).initialize();
  // }

}
