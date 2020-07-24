/// <reference path="../../../../node_modules/@types/googlemaps/index.d.ts"/>

import { Component, OnInit, ViewChild , ElementRef, NgZone} from '@angular/core';
import {MapInfoWindow, MapMarker} from '@angular/google-maps';
import { MouseEvent } from '@agm/core';
import { Fablocation } from '../bottom-bar/bottom-bar.component';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import { MapsAPILoader } from '@agm/core';
import { Observable, interval } from 'rxjs';
declare var google: any;

declare var $ : any;

import {Md5} from 'ts-md5/dist/md5';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

//model
import { AppClientes, AppClienteLocales, AppCfinal, AppServicios } from 'src/app/model/models';

import PlaceResult = google.maps.places.PlaceResult;
import { NgIf } from '@angular/common';
import { callbackify } from 'util';
import { ClientesComponent } from './clientes/clientes.component';
import { AppClientesService, AppClienteLocalesService, AppServiciosService, AppCfinalService, AppDriversService } from 'src/app/api/api';
import { MatDialog } from '@angular/material/dialog';
import { SolicitarComponent } from './solicitar/solicitar.component';
import { HistorialComponent } from './historial/historial.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'mat-bottom-bar',
  templateUrl: './app-pedidos.component.html',
  styleUrls: ['./app-pedidos.component.css']
})
export class AppPedidosComponent implements OnInit {


//NUEVO MAPS

  md5 = new Md5();
  constructor(private _bottomSheet: MatBottomSheet,
    protected appClientesService:AppClientesService,
    protected appCfinalService:AppCfinalService,
    private _snackBar: MatSnackBar,
    protected appClienteLocalesService:AppClienteLocalesService,
    protected appServiciosService:AppServiciosService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    protected appDriversService:AppDriversService,
    private toastr: ToastrService
    ) {}
  
  public destinofinal;
  public direccionLlegada;
  public distancia;
  public cargando=true;
  public alertalist;
  totalsuma=0.0;
  ganaciaMotosuma=0.0;

  public pedidosactivos:any[]=[];
  appCfinal:AppCfinal={}
  appServicio:AppServicios={};
  
  //localstores
  store; //id local
  token; //token de local
  userlocal //usercreate
  appClientes: AppClientes={}
  appClienteLocales: AppClienteLocales[]=[];
  appClienteLocalSelect:AppClienteLocales={};
  marketsList:any[]=[];
  cantidadDriverDisponibles=4;
  tiempollegada='';
  
  infowindow = new google.maps.InfoWindow();
    directionsService
    directionsDisplay = new google.maps.DirectionsRenderer({draggable: true, suppressMarkers: true});
    autocomplete
    request = 
    {
      
      origin:  { lat: -16.392966, lng:  -71.555398 },
      destination:  { lat: 0, lng: 0 },
      travelMode: 'DRIVING',
  
    }
  


         //config mapa       
     map;
  //costos
  COSTO_V_GASOLINA=0.3;
  COSTO_V_DESGASTE=0.15;
  COSTO_F_ALCOHOL=0.38;
  COSTO_V_MOTORIZADO=0.6;
  COSTO_F_GANANCIA=3.00;
  



  ngOnInit(): void {
      
    $('#exampleModal').modal('show', function(){
      $('.modal-backdrop.in').css('opacity', '0.1')
    });
   
      this.store = localStorage.getItem('store');

      //Cargando Parametros
      this.route.queryParams.subscribe(params => {
        this.userlocal = params['cliente'];
      });

      
      this.token = localStorage.token;
      if(this.store != undefined && this.store != null && this.token!=null && this.token != undefined ) {
        this.validarUsuario();
          this.cargarMapa();
          this.map = new google.maps.Map(document.getElementById('map'), {
            zoom: 13,
            center: { lat: -16.406317, lng: -71.557189 },
            mapTypeControl: false
          });

      }else{
        localStorage.clear();
        this.router.navigate(['/'])
      }

      
      
}
  
    validarUsuario(){
      
      this.appClientesService.appClientesGet('eq.'+this.store,null,null,null,null,null,'eq.'+this.token).subscribe(data => {
        if(data.length > 0 &&  (data[0].usercreate == this.userlocal || this.userlocal == null || this.userlocal == undefined)){
          this.appClientes= data[0];
          this.cargarLocales();
        }else{
          localStorage.clear();
          this.router.navigate(['/'])
        }
        
      })
    }

    cargarLocales(){
      this.appClienteLocalesService.appClienteLocalesGet(null,'eq.'+this.appClientes.idcliente).subscribe(data => {
        this.seleccionarLocal(data[0]);

        interval(7000).subscribe(x =>  {
          this.listaPedidos();
          this.estadoDrivers();
        })
        
        this.appClienteLocales=data;

        for (const local of data) {
          
          let start = new google.maps.LatLng(local.lat,local.lng);
          this.createMarker(start, local.nombre, false,'origin.png');
        }
    
      })
    }

    estadoDrivers(){
      

      this.appDriversService.appDriversGet(null,null,null,null,null,null,null,'neq.13').subscribe(data => {
        this.cantidadDriverDisponibles=0;
        for (const driver of data) {
          if(driver.idestadoservicio == 10 || driver.idestadoservicio == 5){
            this.cantidadDriverDisponibles++;
          }
        }
      })
    }

    seleccionarLocal(applocal:AppClienteLocales){
      this.request.origin.lat=Number(applocal.lat);
      this.request.origin.lng=Number(applocal.lng);
      this.appClienteLocalSelect=applocal;

      //Cargar mapa si cambia local
      if(this.request.destination.lat != 0 && this.request.destination.lng !=0)
      {
        this.calculateAndDisplayRoute(this.directionsService, this.directionsDisplay, this.distancia);
        this.destinofinal = this.autocomplete.getPlace();
        this.directionsDisplay.setMap(this.map);   
      }

    }

    cerrarSesion(){
      localStorage.clear();
      this.router.navigate(['/'])
    }


    cargarMonto(){
      
      this.tiempollegada=this.directionsDisplay.directions.routes[0].legs[0].duration.text;
      let distancia= this.directionsDisplay.directions.routes[0].legs[0].distance.value/1000;
      this.totalsuma= this.COSTO_F_ALCOHOL+this.COSTO_F_GANANCIA+(this.COSTO_V_GASOLINA*distancia) + (this.COSTO_V_DESGASTE*distancia)  + (this.COSTO_V_MOTORIZADO*distancia) 
      this.ganaciaMotosuma= this.COSTO_F_ALCOHOL+(this.COSTO_V_GASOLINA*distancia) + (this.COSTO_V_DESGASTE*distancia)  + (this.COSTO_V_MOTORIZADO*distancia) 
      this.totalsuma =  Math.round(this.totalsuma);
      
      return true;
    }


    cargarMapa(){
      let input = document.getElementById('pac-input') ;
        var defaultBounds = new google.maps.LatLngBounds(
          new google.maps.LatLng(-16.404543, -71.538583),
          new google.maps.LatLng(-16.379719, -71.511997));
      var options = {
          bounds:defaultBounds
      };


    

      this.autocomplete = new google.maps.places.Autocomplete(input,options);
      this.autocomplete.setComponentRestrictions({'country': ['pe']});
      
    
      this.autocomplete.setFields(['address_components', 'geometry', 'icon', 'name']);
  
      this.directionsService = new google.maps.DirectionsService;
      

      google.maps.event.addListener(this.autocomplete, 'place_changed', () => { // arrow function
        this.DeleteMarkers();
        this.cargando=true;       
          this.calculateAndDisplayRoute(this.directionsService, this.directionsDisplay, this.distancia);
          this.destinofinal = this.autocomplete.getPlace();
          this.request.destination.lat=this.destinofinal.geometry.location.lat();
          this.request.destination.lng=this.destinofinal.geometry.location.lng();



          let end = new google.maps.LatLng(this.destinofinal.geometry.location.lat(), this.destinofinal.geometry.location.lng());
          
          
          this.createMarker(end, 'Cliente Destino', true,'destination.png');
          
          this.directionsDisplay.setMap(this.map);    


        });
  
  

      
 
      
      this.directionsDisplay.setMap(this.map);
    }

    calculateAndDisplayRoute(directionsService, directionsDisplay, distancia) {
      this.cargando=true;
      var waypts = [];
      
       
        directionsService.route(this.request, function(result, status) {
          if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(result);
            distancia = directionsDisplay.directions.routes[0].legs[0].distance.value/1000;      
            
          }
        
      });



  
}


 DeleteMarkers() {
  //Loop through all the markers and remove
  for (var i = 0; i < this.marketsList.length; i++) {
      if(this.marketsList[i]=='Cliente Destino'){
        this.marketsList[i].setMap(null);
      }
  }
  this.marketsList = [];
};


createMarker(latlng, title, drag, ico) {

  let marker = new google.maps.Marker({
      position: latlng,
      title: title,
      map: this.map,
      draggable:drag,
      icon: './../../../assets/ico/'+ico
  });

  this.marketsList.push(marker);
  
  this.infowindow.setContent(title);
  this.infowindow.open(this.map, marker);


      //Evento click
  google.maps.event.addListener(marker, 'click', function () {
    this.infowindow.setContent(title);
    this.infowindow.open(this.map, marker);
  });




  google.maps.event.addListener(marker, 'dragend', () => { // arrow function
    
    this.request.destination.lat=marker.position.lat();
    this.request.destination.lng=marker.position.lng();
      this.calculateAndDisplayRoute(this.directionsService, this.directionsDisplay, this.distancia);
      this.destinofinal = this.autocomplete.getPlace();
      this.directionsDisplay.setMap(this.map);    
    });
    
}


openBottomSheet(): void {
  this._bottomSheet.open(ClientesComponent,{
    data: {appClienteLocale: this.appClienteLocalSelect,  appServicio: this.appServicio}
  });




  
  
}


historialPedidos(){
  
  const dialogRef = this.dialog.open(HistorialComponent, {
    width: window.innerWidth+'px',
    data: {appClienteLocale: this.appClienteLocalSelect,  appServicio: this.appServicio}
  });

  dialogRef.afterClosed().subscribe(result => {
    if(result){
      
      this.appCfinal =  result
      this.guardarSolicitar();
      this.listaPedidos();
    }else{
      console.log('cancelar');
    }

  });
//alert('Motorizado en camino... Juan Alberto Placa EHS-541, llegara en 12 minutos aprox.')
}



solicitarMotorizado(){
  
    const dialogRef = this.dialog.open(SolicitarComponent, {
      data: {appClienteLocale: this.appClienteLocalSelect,  appServicio: this.appServicio}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        
        this.appCfinal =  result
        this.guardarSolicitar();
        this.listaPedidos();
      }else{
        console.log('cancelar');
      }

    });
  //alert('Motorizado en camino... Juan Alberto Placa EHS-541, llegara en 12 minutos aprox.')
}



solicitarMotorizadoRapido(){
  let appServicios:AppServicios={
    idlocal: this.appClienteLocalSelect.idlocal,
    idcliente: this.appClienteLocalSelect.idcliente,
    idcfinal: '123',

  }
  
 this.appServiciosService.appServiciosPost(appServicios,null,'return=representation').subscribe(response => {
    this.openSnackBar('Solicitud de driver realizada','Cerrar');
 });
}

openSnackBar(texto, titulo) {
  this._snackBar.open(texto, titulo, {

    duration: 900,
    horizontalPosition: 'start',
    verticalPosition: 'bottom'
  });
}


/*
*
* Guardar pedido solicitado
* Solocita crear un cliente final en caos no exista
*/

guardarSolicitar(){
  console.log(this.appCfinal);
  if(this.appCfinal.ferecharegistro == null || this.appCfinal.ferecharegistro == undefined){
    
    //Agregarmos cliente final
    this.appCfinalService.appCfinalPost(this.appCfinal,null,'return=representation').subscribe(response => {
      this.guardarServicio();
    }, error => {
      console.log(error.error);
      alert('Algo ocurrio en su proceso. verifique todos los datos');
      }
    )
    //
  }else{
    this.guardarServicio();
  }  
}



guardarServicio(){
  
      this.appServicio.idcfinal= this.appCfinal.idcfinal;
      this.appServicio.idcliente = this.appClienteLocalSelect.idcliente;
      this.appServicio.idlocal  = this.appClienteLocalSelect.idlocal;
      this.appServicio.destinolat = this.request.destination.lat+'';
      this.appServicio.destinolng = this.request.destination.lng+'';
      this.appServicio.tiempotext = this.tiempollegada;
      this.appServicio.costoentrega = this.ganaciaMotosuma;
      this.appServicio.costototal = this.totalsuma;

      this.appServicio.distancia = this.directionsDisplay.directions.routes[0].legs[0].distance.value/1000;
      


      this.appServiciosService.appServiciosPost(this.appServicio, null,'return=representation').subscribe(response => {
      console.log('todo correcto');
//        this.openSnackBar('Se envió su solicitud', 'correcto');


      }, error => {
        console.log(error.error);
        alert('Algo ocurrio en su proceso. vuelva a intentar');
      })
 
}




  listaPedidos(){
    

    this.toastr.clear();
    this.appServiciosService.appServiciosGet(null,'eq.'+this.appClienteLocalSelect.idcliente,'eq.'+this.appClienteLocalSelect.idlocal,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,'idservicio,idestado,tiempoval,fechahorarecojo,costoentrega,app_cfinal(nombre)&idestado=eq.9 or idestado=eq.8 ').subscribe(data => {
      this.pedidosactivos=data;  
      
    
      for (const pedido of this.pedidosactivos) {
        if(pedido.idestado=='8'){
          this.toastr.info('<span style="font-size: 10px"> Pedido (#P-0'+pedido.idservicio+') de <b>'+pedido.app_cfinal.nombre+'</b></span> ', '⏳ Driver por confirmar',
          {
            timeOut: 3000,
            enableHtml: true,
            disableTimeOut: true,
            closeButton:true,
          });
        }
        if(pedido.idestado=='9'){

          let frecojo= new Date(pedido.fechahorarecojo);
          let horaactual = new Date(Date.now());
         
          let resta = frecojo.getTime() - horaactual.getTime()
          let tiempo = 'llegará a las '+frecojo.getHours()+':'+frecojo.getMinutes();




          this.toastr.success('<span style="font-size: 8px"> Pedido (#P-0'+pedido.idservicio+') de <b>'+pedido.app_cfinal.nombre+'</b></span>', 'Driver confirmado '+tiempo,
          {
            timeOut: 10000,
            enableHtml: true,
            disableTimeOut: true,
            closeButton:true,
          });
        }
        
     
      }
    });
  }



}
