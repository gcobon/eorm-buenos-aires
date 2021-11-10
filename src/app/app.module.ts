import { NgModule } from '@angular/core';
import { LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';


/** Configuración de idioma */
import esGT from '@angular/common/locales/es-GT';
import { registerLocaleData } from '@angular/common';
import { AuthInterceptor } from './shared/interceptors/auth.interceptor';




registerLocaleData(esGT, 'es');

@NgModule({
 
 
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule,ReactiveFormsModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    { provide: LOCALE_ID, useValue: 'es' },
  ],
  bootstrap: [AppComponent],
  declarations: [
   AppComponent
  ],
})
export class AppModule {}
