import { Component, OnInit, Inject } from '@angular/core';
import { Directive } from '@angular/core';
//Api
import { AppServiciosService, AppCfinalService } from 'src/app/api/api';

//modelos
import { AppServicios, AppCfinal } from 'src/app/model/models';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-solicitar',
  templateUrl: './solicitar.component.html',
  styleUrls: ['./solicitar.component.css']
})
export class SolicitarComponent implements OnInit {

  constructor(protected appServiciosService:AppServiciosService,
    protected appCfinalService:AppCfinalService,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<SolicitarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

   }

   appCfinal:any={};
  

  ngOnInit(): void {
  }


  verificarCliente(){
    this.appCfinalService.appCfinalGet('eq.'+this.appCfinal.idcfinal).subscribe(data => {
      if(data.length>0){
        this.appCfinal = data[0];
      }
    })
  }




  validaNumericos(event) {
    if(event.charCode >= 48 && event.charCode <= 57){
      return true;
     }
     return false;        


}

closeDialog(): void {
  this.dialogRef.close(this.appCfinal);
}

openSnackBar(texto, titulo) {
  this._snackBar.open(texto, titulo, {

    duration: 500,
    horizontalPosition: 'start',
    verticalPosition: 'bottom'
  });
}

}
