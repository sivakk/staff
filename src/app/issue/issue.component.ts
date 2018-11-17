import { Component, OnInit } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Issue } from "./issue";
import { IssuesService } from "../issues.service";

@Component({
  selector: "app-issue",
  templateUrl: "./issue.component.html",
  styleUrls: ["./issue.component.css"],
  providers: [IssuesService]
})
export class IssueComponent implements OnInit {
  issues: Issue[] = [];
  selectedissue: Issue;

  constructor(public postsService: IssuesService) { }

  ngOnInit() { }

  getissues() {
    this.postsService.getIssues().subscribe(items => {
      this.issues = items;
    });
  }
  addIssues(form) {
    let newIssue: Issue = {
      issuename: form.value.issuename,
      issuecontent: form.value.issuecontent
    };
    this.postsService.addIssue(newIssue).subscribe(item => {
      this.getissues();
    });
  }
}
