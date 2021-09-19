import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TurtlComponent } from './turtl/turtl.component';

const routes: Routes = [{ path: '', component: TurtlComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
