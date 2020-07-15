import { Component, OnInit } from '@angular/core';
import {Md5} from 'ts-md5/dist/md5';
import {Router} from '@angular/router'


//model
import { AppClientes } from 'src/app/model/models';


import { AppClientesService } from 'src/app/api/api';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  appClientes: AppClientes={}
  md5 = new Md5();
  labelerror='';

  constructor(
    private router: Router,
    protected appClientesService:AppClientesService
  ) { }

  ngOnInit(): void {
    let store = localStorage.getItem('store');
    if(store != undefined && store != null) {
      console.log('si existe');
      this.router.navigate(['/store'])
    }
  
  }

  validarUsuario(){
    let passcryp= this.md5.appendStr(this.appClientes.password).end();
    console.log(passcryp, this.appClientes.usercreate);
    this.appClientesService.appClientesGet(null,null,null,null,null,null,'eq.'+passcryp,'eq.'+this.appClientes.usercreate).subscribe(data => {
      console.log(data);
      if(data.length > 0){
        this.appClientes = data[0];
        localStorage.setItem('store', this.appClientes.idcliente);
        localStorage.token=passcryp;
        this.router.navigate(['/store'])

      }else{
        this.labelerror='*** Error de usuario y/o contraseña **';
      }
      
    })
  }

}
