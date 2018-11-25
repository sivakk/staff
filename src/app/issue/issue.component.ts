import { Component, OnInit } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Issue } from "./issue";
import { IssuesService } from "../issues.service";
import * as moment from "moment";

@Component({
  selector: "app-issue",
  templateUrl: "./issue.component.html",
  styleUrls: ["./issue.component.css"],
  providers: [IssuesService]
})
export class IssueComponent implements OnInit {
  issues: Issue[] = [];
  selectedissue: Issue;
  today5: any;

  constructor(public postsService: IssuesService) { }

  ngOnInit() { }



}
