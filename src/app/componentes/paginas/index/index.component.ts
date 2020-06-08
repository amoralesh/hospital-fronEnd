import { Component, OnInit } from '@angular/core';
import { MorrisJsModule } from 'angular-morris-js';
import { ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import { PacienteService } from './../../../servicios/paciente.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  // public chartAreaData;
  // public chartAreaOptions;

  // public chartBarData;
  // public chartBarOptions;

  // public chartDonutData;
  // public chartDonutOptions;

  public cadenaGeneros;
  public cantidad;

  public pieChartOptions: ChartOptions;
  public pieChartLabels: Label[];
  public pieChartData: number[];
  public pieChartType: ChartType;
  public pieChartLegend;
  public pieChartColors;


  constructor(private pacienteServicio:PacienteService) { }

  ngOnInit(): void {

    this.pacienteServicio.getCountGenero().subscribe(resultado =>{
     //console.log(resultado);
        this.cadenaGeneros=[resultado[0].split(",",2),resultado[1].split(",",2)];
        //console.log(this.cadenaGeneros[0][1]);
        this.cantidad=parseInt(this.cadenaGeneros[0][1],10);
        console.log( this.cadenaGeneros);

        
        this.funcionAuxiliar();
      });/*FIN DE SERVICIO */

  
  }/*FIN ngOnInit*/

public funcionAuxiliar(){

  
  this.pieChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };

  this.pieChartLabels= [this.cadenaGeneros[0][0], this.cadenaGeneros[1][0], 'Otros'];
  this.pieChartData = [ this.cadenaGeneros[0][1], this.cadenaGeneros[1][1], 2];
  this.pieChartType= 'pie';
  this.pieChartLegend = true;
  
  this.pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)'],
    },
  ];


}

   // events
   public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  changeLabels() {
    const words = ['hen', 'variable', 'embryo', 'instal', 'pleasant', 'physical', 'bomber', 'army', 'add', 'film',
      'conductor', 'comfortable', 'flourish', 'establish', 'circumstance', 'chimney', 'crack', 'hall', 'energy',
      'treat', 'window', 'shareholder', 'division', 'disk', 'temptation', 'chord', 'left', 'hospital', 'beef',
      'patrol', 'satisfied', 'academy', 'acceptance', 'ivory', 'aquarium', 'building', 'store', 'replace', 'language',
      'redeem', 'honest', 'intention', 'silk', 'opera', 'sleep', 'innocent', 'ignore', 'suite', 'applaud', 'funny'];
    const randomWord = () => words[Math.trunc(Math.random() * words.length)];
    this.pieChartLabels = Array.apply(null, { length: 3 }).map(_ => randomWord());
  }

  addSlice() {
    this.pieChartLabels.push(['Line 1', 'Line 2', 'Line 3']);
    this.pieChartData.push(400);
    this.pieChartColors[0].backgroundColor.push('rgba(196,79,244,0.3)');
  }

  removeSlice() {
    this.pieChartLabels.pop();
    this.pieChartData.pop();
    this.pieChartColors[0].backgroundColor.pop();
  }

  changeLegendPosition() {
    this.pieChartOptions.legend.position = this.pieChartOptions.legend.position === 'left' ? 'top' : 'left';
  }


}
