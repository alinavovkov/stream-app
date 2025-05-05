import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { HomeComponent } from './pages/home/home.component';
import { StreamComponent } from './pages/stream/stream.component';
import { ArchiveComponent } from './pages/archive/archive.component';
// import { NotificationsComponent } from './pages/notifications/notifications.component';
// import { SettingsComponent } from './pages/settings/settings.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'stream', component: StreamComponent },
  { path: 'archive', component: ArchiveComponent }, // 👈 Додаємо тут
  // { path: 'notifications', component: NotificationsComponent },
  // { path: 'settings', component: SettingsComponent },
  { path: '**', redirectTo: '' }, // редірект на головну для всіх невідомих маршрутів
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
