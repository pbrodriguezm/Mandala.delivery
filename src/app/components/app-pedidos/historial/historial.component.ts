import { Component, OnInit, Inject } from '@angular/core';
import { AppServiciosService } from 'src/app/api/api';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgIf } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';

import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { MatSnackBar } from '@angular/material/snack-bar';


const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {

  constructor(protected appServiciosService:AppServiciosService,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<HistorialComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
//data: {appClienteLocale: this.appClienteLocalSelect,  appServicio: this.appServicio}

  displayedColumns: string[] = ['codigo', 'cliente','direccion','solicitado', 'controlhora', 'monto','estado', 'acciones'];
  
  dataServicios:any[]=[];
  fechaFiltro = new Date(Date.now());
  nombreFiltro;
  ngOnInit(): void {
    this.cargarReporteVentas();

  }
  
  
  cargarReporteVentas(){
    
    let fechaFiltroini= this.fechaFiltro.getFullYear()+'-'+(this.fechaFiltro.getMonth()+1)+'-'+this.fechaFiltro.getDate()+' 00:00:00';
    let fechaFiltrofin= this.fechaFiltro.getFullYear()+'-'+(this.fechaFiltro.getMonth()+1)+'-'+(this.fechaFiltro.getDate()+1)+' 00:00:00';
    
      this.appServiciosService.appServiciosGet(null,'eq.'+this.data.appClienteLocale.idcliente,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,'gte.'+fechaFiltroini,'idservicio,costototal,distancia,tiempotext,fecharegistro,fechahorainicio,fechahorallegada, app_cfinal(nombre,direccion,telefono),app_estado(*)').subscribe( data => {

        this.dataServicios= data;
        

      })
  }
 

  public exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }


  anularPedido(appServicio){
    let tmpappServicio={idestado: 7}
    this.appServiciosService.appServiciosPatch('eq.'+appServicio.idservicio,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,tmpappServicio).subscribe(data => {
      this.openSnackBar('Solicitud anulada','Cerrar');
      this.cargarReporteVentas();

    })

  }
  openSnackBar(texto, titulo) {
    this._snackBar.open(texto, titulo, {
  
      duration: 1400,
      horizontalPosition: 'start',
      verticalPosition: 'bottom'
    });
  }

}
