import { Injectable } from "@angular/core";
import { Http, Response, Headers } from "@angular/http";
import { map, filter, scan } from "rxjs/operators";
import { Router } from "@angular/router";

import { Issue } from "./issue/issue";
import { Time } from "./posts/post-list/time";

@Injectable({
  providedIn: "root"
})
export class IssuesService {
  private issue: Issue[] = [];
  private time: Time[] = [];

  constructor(private http: Http, private router: Router) { }


  onload(values: any, jobstarted: any, jobupdatetime: string) {
    var obj = {
      values: values,
      jobstarted: jobstarted,
      jobupdatetime: jobupdatetime
    };
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    return this.http
      .post("http://localhost:3000/api/time/post_route", obj, {
        headers: headers
      })
      .pipe(map(res => res.json()));
  }

  updateonload(date: string, jobstarted: string, jobstarttime: string, exacttime: any) {
    console.log(date, exacttime, jobstarted);

    var obj = {
      date: date,
      jobstarted: jobstarted,
      jobstarttime: jobstarttime,
      exacttime: exacttime
    };
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    return this.http
      .put("http://localhost:3000/api/time/putroute/", obj, {
        headers: headers
      })
      .pipe(map(res => res.json()));
  }

  addstoptime(date: string, exacttime2: string) {
    console.log(exacttime2);

    var obj = {
      date: date,
      exacttime2: exacttime2

    };
    console.log(obj);

    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    return this.http
      .put("http://localhost:3000/api/time/putroutestoptime/", obj, {
        headers: headers
      })
      .pipe(map(res => res.json()));

  }

  getonload() {
    return this.http
      .get("http://localhost:3000/api/time/time")
      .pipe(map(res => res.json()));
  }



  addIssue(newIssue) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    return this.http
      .post("http://localhost:3000/api/issues/post_route", newIssue, {
        headers: headers
      })
      .pipe(map(res => res.json()));
  }


  getIssues() {
    return this.http
      .get("http://localhost:3000/api/issues/test")
      .pipe(map(res => res.json()));
  }









}
