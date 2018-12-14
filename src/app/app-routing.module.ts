import { UsersComponent } from './posts/users/users.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";

import { PostListComponent } from "./posts/post-list/post-list.component";
import { PostCreateComponent } from "./posts/post-create/post-create.component";
import { IssueComponent } from "./issue/issue.component";

const routes: Routes = [
  { path: "", component: PostListComponent },
  // { path: "create", component: PostCreateComponent },
  // { path: "edit/:postId", component: PostCreateComponent },
  { path: "create1", component: UsersComponent },
  { path: "edit/:userId", component: UsersComponent },
  { path: "issues", component: IssueComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
