import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { environment } from '../environments/environments';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragonsComponent } from './dragons/dragons.component';
import { AngularFireAuth } from '@angular/fire/auth';
import { ListComponent } from './dragons/list/list.component';
import { OrderByPipe } from './pipes/order-by/order-by.pipe';

@NgModule({
	declarations: [AppComponent, LoginComponent, DragonsComponent, ListComponent, OrderByPipe],
	imports: [
		BrowserModule,
		AppRoutingModule,
		AngularFireModule.initializeApp(environment),
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule
	],
	providers: [AngularFireAuth],
	bootstrap: [AppComponent]
})
export class AppModule {}
