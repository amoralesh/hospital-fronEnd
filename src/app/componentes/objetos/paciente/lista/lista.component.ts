import { Component, OnInit, ViewChild } from '@angular/core';
import { PacienteService } from 'src/app/servicios/paciente.service';
import { NgxSpinnerService } from "ngx-spinner";
import { MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource} from '@angular/material/table';
import { Paciente } from 'src/app/models/paciente/paciente.module';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from'sweetalert2';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  dataSource:MatTableDataSource<Paciente>
  displayedColumns: string[] = ['posicion', 'nombre', 'apellidoP', 'apellidoM','telefonoCelular','acciones'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  listaPacientes;

  constructor(
    private pacienteServicio:PacienteService,
    private spinner: NgxSpinnerService,
    private route:ActivatedRoute,
    private router:Router) { 

  }

  ngOnInit(): void {
   /*Mostrar spinner*/ 
   this.spinner.show();

   /*Configuraciones para las leyendas del dataTable de angula material*/
   this.paginator._intl.itemsPerPageLabel="Resultados por página";
   this.paginator._intl.firstPageLabel="Primera página";
   this.paginator._intl.lastPageLabel="Última página";
   this.paginator._intl.nextPageLabel="Siguiente página";
   this.paginator._intl.previousPageLabel="Página anterior";
   this.paginator._intl.getRangeLabel=
   (page, pageSize, length) => {
    if (length == 0 || pageSize == 0) {
        return `0 de ${length}`;
    }
    length = Math.max(length, 0);
    /** @type {?} */
    const startIndex = page * pageSize;
    // If the start index exceeds the list length, do not try and fix the end index to the end.
    /** @type {?} */
    const endIndex = startIndex < length ?
        Math.min(startIndex + pageSize, length) :
        startIndex + pageSize;
    return `${startIndex + 1} – ${endIndex} de ${length}`;
    }
    /*FIN*/
    
      /*Servicio que obtiene la lista de todos los pacientes */
      this.pacienteServicio.getAllPacientes().subscribe(resultado=>{
      this.listaPacientes=resultado;
      this.dataSource= new MatTableDataSource(resultado);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
    /*FIN*/

    /*Ocultar spinner*/ 
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
    /*FIN*/
  
  }

  /*Función para filtrar los datos de la data de listado de pacientes */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  /*FIN*/

  eliminar (id){

    Swal.fire({
      title: '¿Está seguro?',
      text: "Que quiere eliminar a este paciente",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: "CANCELAR",
      confirmButtonText: 'Si,eliminar!'
    }).then((result) => {

      
      if (result.value) {

        this.pacienteServicio.eliminarPaciente(id).subscribe(resultado=>{

          Swal.fire(
            '¡Eliminado!',
            'El paciente fue eliminado',
            'success'
          )

            /*Servicio que obtiene la lista de todos los pacientes */
        this.pacienteServicio.getAllPacientes().subscribe(resultado=>{
        this.listaPacientes=resultado;
        this.dataSource= new MatTableDataSource(resultado);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
      /*FIN*/

           });
      }
    })
//Swal.fire('Registro exitoso...', 'eliminar', 'success');
  }


}
