import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppPedidosComponent } from './components/app-pedidos/app-pedidos.component';
import {GoogleMapsModule} from '@angular/google-maps';
import { AgmCoreModule } from '@agm/core'; 
import { AgmDirectionModule } from 'agm-direction';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

 
import { ToastrModule } from 'ngx-toastr';


import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { BottomBarComponent } from './components/bottom-bar/bottom-bar.component';
import { PuntosComponent } from './components/app-pedidos/puntos/puntos.component';
import { ClientesComponent } from './components/app-pedidos/clientes/clientes.component';


//models propios
import { Configuration } from './configuration';
import { AppCfinalService } from './api/appCfinal.service';
import { AppClienteLocalesService } from './api/appClienteLocales.service';
import { AppClientesService } from './api/appClientes.service';
import { AppDmarcacionesService } from './api/appDmarcaciones.service';
import { AppDriversService } from './api/appDrivers.service';
import { AppEstadoService } from './api/appEstado.service';
import { AppMetodopagoService } from './api/appMetodopago.service';
import { AppServiciosService } from './api/appServicios.service';
import { AppUnidadService } from './api/appUnidad.service';
import { AppUsersService } from './api/appUsers.service';
import { IntrospectionService } from './api/introspection.service';
import { LoginComponent } from './components/login/login.component';
import { SolicitarComponent } from './components/app-pedidos/solicitar/solicitar.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HistorialComponent } from './components/app-pedidos/historial/historial.component';
import { ViewClientesFrecuentesService } from './api/api';



@NgModule({
  declarations: [
    AppComponent,
    AppPedidosComponent,
    BottomBarComponent,
    PuntosComponent,
    ClientesComponent,
    LoginComponent,
    SolicitarComponent,
    HistorialComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    MatFormFieldModule,
    AgmCoreModule.forRoot({ // @agm/core
      apiKey: 'AIzaSyDrNEY8RsIuCLxvKRdKdGKb2PwuE4me6VQ',
      language: 'es',
      libraries: ["places", "geometry"]
    }),
    AgmDirectionModule,      // agm-direction
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    GoogleMapsModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    

  ],
  providers: [
    AppCfinalService,
    AppClienteLocalesService,
    AppClientesService,
    AppDmarcacionesService,
    AppDriversService,
    AppEstadoService,
    AppMetodopagoService,
    AppServiciosService,
    AppUnidadService,
    AppUsersService,
    ViewClientesFrecuentesService,
    IntrospectionService 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
