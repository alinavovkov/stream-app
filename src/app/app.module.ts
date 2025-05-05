import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StreamComponent } from './pages/stream/stream.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { ArchiveComponent } from './pages/archive/archive.component';

@NgModule({
  declarations: [
    AppComponent,
    StreamComponent,
    HomeComponent,
    HeaderComponent,
    ArchiveComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
