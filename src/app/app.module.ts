import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { enableProdMode } from '@angular/core';
import { Observable } from "rxjs";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpModule } from "@angular/http";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { MatDialog } from "@angular/material";
import { ToastrModule } from "ngx-toastr";
import * as moment from "moment";

import {
  MatInputModule,
  MatSelect,
  MatOption,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatExpansionModule,
  MatProgressSpinnerModule
} from "@angular/material";
import { HeaderComponent } from './header/header.component';
import { IssueComponent } from './issue/issue.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { AppRoutingModule } from "./app-routing.module";
import { UsersComponent } from './posts/users/users.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    IssueComponent,
    PostCreateComponent,
    PostListComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule, BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    HttpModule
  ],
  providers: [{ provide: "moment", useFactory: (): any => moment }],
  bootstrap: [AppComponent]
})
export class AppModule { }
