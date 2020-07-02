/// <reference path="../../../../node_modules/@types/googlemaps/index.d.ts"/>

import { Component, OnInit, ViewChild , ElementRef, NgZone} from '@angular/core';
import {MapInfoWindow, MapMarker} from '@angular/google-maps';
import { MouseEvent } from '@agm/core';
import { Fablocation } from '../bottom-bar/bottom-bar.component';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import { MapsAPILoader } from '@agm/core';
import { Observable } from 'rxjs';
declare var google: any;



import PlaceResult = google.maps.places.PlaceResult;
import { NgIf } from '@angular/common';
import { callbackify } from 'util';
import { ClientesComponent } from './clientes/clientes.component';

@Component({
  selector: 'mat-bottom-bar',
  templateUrl: './app-pedidos.component.html',
  styleUrls: ['./app-pedidos.component.css']
})
export class AppPedidosComponent implements OnInit {


//NUEVO MAPS


constructor(private _bottomSheet: MatBottomSheet) {}

public destinofinal;
public direccionLlegada;
public distancia;
public cargando=true;

  directionsService
  directionsDisplay = new google.maps.DirectionsRenderer({draggable: true,});
  autocomplete
  request = 
  {
    
    origin:  { lat: -16.392966, lng:  -71.555398 },
    destination:  { lat: -16.40624, lng: -71.557189 },
    travelMode: 'DRIVING',
  }


//costos
COSTO_V_GASOLINA=0.3;
COSTO_V_DESGASTE=0.15;
COSTO_F_ALCOHOL=0.38;
COSTO_V_MOTORIZADO=0.6;
COSTO_F_GANANCIA=3.00;

totalsuma=0.0;


  ngOnInit(): void {
      this.cargarMapa();
        
    }
    cargarMonto(){
     
      let distancia= this.directionsDisplay.directions.routes[0].legs[0].distance.value/1000;
      this.totalsuma= this.COSTO_F_ALCOHOL+this.COSTO_F_GANANCIA+(this.COSTO_V_GASOLINA*distancia) + (this.COSTO_V_DESGASTE*distancia)  + (this.COSTO_V_MOTORIZADO*distancia) 
      
      return true;
    }
    cargarMapa(){
      let input = document.getElementById('pac-input');
      this.autocomplete = new google.maps.places.Autocomplete(input);
      this.autocomplete.setComponentRestrictions({'country': ['pe']});
  
      this.autocomplete.setFields(['address_components', 'geometry', 'icon', 'name']);
  
      this.directionsService = new google.maps.DirectionsService;
      

      google.maps.event.addListener(this.autocomplete, 'place_changed', () => { // arrow function
        console.log('ALGO HACE AQUI');
        this.cargando=true;
        
        

          this.calculateAndDisplayRoute(this.directionsService, this.directionsDisplay, this.distancia);
          this.destinofinal = this.autocomplete.getPlace();
          this.request.destination.lat=this.destinofinal.geometry.location.lat();
          this.request.destination.lng=this.destinofinal.geometry.location.lng();
          
          this.directionsDisplay.setMap(map);    
        });
  
  

      
      //config mapa       
      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: { lat: -16.406317, lng: -71.557189 },
        mapTypeControl: false
        
      });
      
      this.directionsDisplay.setMap(map);
    }

    calculateAndDisplayRoute(directionsService, directionsDisplay, distancia) {
      this.cargando=true;
      var waypts = [];
      var checkboxArray:any[] = [ 'Arequipa Peru', 'Lima Peru','calgary'];
       
        directionsService.route(this.request, function(result, status) {
          if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(result);
            distancia = directionsDisplay.directions.routes[0].legs[0].distance.value/1000;      
            
          }
        
      });

  
}

openBottomSheet(): void {
  this._bottomSheet.open(ClientesComponent);
}

solicitarMotorizado(){
  alert('Motorizado en camino... Juan Alberto Placa EHS-541, llegara en 12 minutos aprox.')
}


}
