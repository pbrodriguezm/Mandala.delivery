import { Component, OnInit, Inject } from '@angular/core';
import { ViewClientesFrecuentesService, AppServiciosService } from 'src/app/api/api';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { AppServicios } from 'src/app/model/models';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  constructor(protected viewClientesFrecuentesService: ViewClientesFrecuentesService,
    private _snackBar: MatSnackBar,
    protected appServiciosService:AppServiciosService,
   private _bottomSheetRef: MatBottomSheetRef<ClientesComponent>,
   @Inject(MAT_BOTTOM_SHEET_DATA) public dato: any
    ) { }

  ngOnInit(): void {
    this.cargarClientes();
  }
  listClientesFrecuentes:any[]=[]
  cargarClientes(){
   
    this.viewClientesFrecuentesService.viewClientesFrecuentesGet('idlocal,idcliente,nombre,direccion,count,idcfinal').subscribe(data => {
      
        this.listClientesFrecuentes=data;

        this.listClientesFrecuentes = this.listClientesFrecuentes.filter(
          datas => datas.idcliente === this.dato.appClienteLocale.idcliente);


          
    })
  }

  guardarPedidoFrecuente(idcliente){

    let appServicios:AppServicios={
      idlocal: this.dato.appClienteLocale.idlocal,
      idcliente: this.dato.appClienteLocale.idcliente,
      idcfinal: idcliente,
  
    }
    
   this.appServiciosService.appServiciosPost(appServicios,null,'return=representation').subscribe(response => {
      this.openSnackBar('Solicitud de driver realizada','Cerrar');
   });

  }

  openSnackBar(texto, titulo) {
    this._snackBar.open(texto, titulo, {
  
      duration: 1400,
      horizontalPosition: 'start',
      verticalPosition: 'bottom'
    });
  }

}
