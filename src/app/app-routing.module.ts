import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { TicketCreateEditComponent } from './ticket-create-edit/ticket-create-edit.component';

const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'dashboard',component:TicketListComponent},
  {path:'create',component:TicketCreateEditComponent},
  {path:'',redirectTo:'/login',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
