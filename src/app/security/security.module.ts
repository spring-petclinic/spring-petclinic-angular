import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import {FormsModule} from '@angular/forms';
import {SecurityRoutingModule} from './security-routing.module';
import {SecurityService} from './security.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SecurityRoutingModule
  ],
  declarations: [LoginComponent],
  exports: [LoginComponent],
  providers: [SecurityService]
})
export class SecurityModule { }
