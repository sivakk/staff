import { IssuesService } from './../../issues.service';
import { PostsService } from './../../posts.service';
import { Post } from "../post.model";
import { Component, OnInit, OnDestroy, OnChanges, AfterContentInit } from "@angular/core";
import { Issue } from "./issue";
import { Subscription, interval } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { Time } from "./time";
import { Times } from "./times";
import * as moment from "moment";
import {
  FormGroup,
  FormsModule,
  FormControl,
  Validators,
  AbstractControl
} from "@angular/forms";

export interface Food {
  value: string;
  viewValue: string;
}

export interface Car {
  value: string;
  viewValue: string;
}

@Component({
  selector: "app-post-list",
  templateUrl: "./post-list.component.html",
  styleUrls: ["./post-list.component.css"],
  providers: [IssuesService]
})
export class PostListComponent implements OnInit, OnDestroy {
  private postsSub: Subscription;
  posts: Post[] = [];
  times: Times[] = [];
  issues: Issue[] = [];
  selectedValue: string;
  selectedCar: string;
  selectedissue: Issue;
  isLoading = false;
  today1: any = new Date().getTime();
  today3: string = moment().format("MMMM Do YYYY");
  day: any = moment().format("hh:mm:ss");
  today5: any = moment().format('MMMM Do YYYY,h:mm:ss ');
  today: any = moment().format("hh:mm:ss");
  time5: any = moment().format("hh:mm:ss");
  today4: any = moment().format("hh:mm:ss");
  exacttime: any = new Date().getTime();
  form: FormGroup;
  disableButton: any;
  jobstarted: any;
  disableButton1: any;
  jobupdatetime: string;
  imagePreview: any;
  jobstarttime: any;
  jobupdatedtimes: any;
  item: any;
  list: any;
  options = [1, 2, 3];
  optionSelected: any;
  foods: Food[] = [
    { value: "steak-0", viewValue: "Steak" },
    { value: "pizza-1", viewValue: "Pizza" },
    { value: "tacos-2", viewValue: "Tacos" }
  ];
  cars: Car[] = [
    { value: "volvo", viewValue: "Volvo" },
    { value: "saab", viewValue: "Saab" },
    { value: "mercedes", viewValue: "Mercedes" }
  ];

  constructor(
    private toastService: ToastrService,
    public postsService: PostsService,
    public IssuesService: IssuesService
  ) { }



  ngOnInit() {

    this.getonloadcopy();
    this.onloadcopy();
    this.form = new FormGroup({
      image: new FormControl(null, {
        validators: [Validators.required]
      })
    });
    this.isLoading = true;
    this.postsService.getPosts();
    this.postsSub = this.postsService
      .getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
        this.isLoading = false;
      });
  }

  async getonloadcopy() {
    return await this.IssuesService.getonload().subscribe(ele1 => {
      this.times = ele1;
      let currentime: any = moment().format("hh:mm:ss");
      this.jobstarttime = this.times[0].jobstarttime;
      this.jobstarted = this.times[0].jobstarted;
      var start = moment.utc(this.jobstarttime, "HH:mm");
      var end = moment.utc(currentime, "HH:mm");
      if (end.isBefore(start)) end.add(1, "day");
      var d = moment.duration(end.diff(start));
      d.subtract(0, "minutes");
      this.jobupdatetime = moment.utc(+d).format("H:mm");
      this.times[0].jobupdatetime = this.jobupdatetime;
      this.jobupdatedtimes = this.times[0].jobupdatetime;
      return this.jobupdatedtimes, this.jobstarttime;
    });
  }


  async onloadcopy() {
    let now = moment().format("LLLL");
    this.IssuesService.onload(now, this.jobstarted, this.jobupdatetime).subscribe(ele => { this.list = ele; });
  }


  imagetime() {
    var interval = setInterval(() => {
      this.getissues();

      clearInterval(interval);
      console.log("hai");
    }, 5000);
  }


  addIssues(form) {
    var newIsssue1 = form.value;
    this.IssuesService.addIssue(newIsssue1).subscribe(item => { this.getissues(); });
  }



  onEdit(postId: string, posttitle: string, postcontent: string, postimg: File | string) {
    this.postsService.Editimage(
      postId,
      this.form.value.title,
      this.form.value.content,
      this.form.value.image
    );
  }


  startClick() {
    this.disableButton = true;
    this.jobstarted = true;


    this.IssuesService.updateonload(

      this.today3,
      this.jobstarted,
      this.day,
      this.exacttime,
    ).subscribe(result => {
      console.log("original item to be update with old values" + result);
    });
    return (this.jobstarted = true), this.jobupdatetime;
  }


  stopClick() {
    this.disableButton1 = true;
    let now = moment().format("MMMM Do YYYY");
    let exacttime2: string = new Date().getTime().toString();

    this.IssuesService.addstoptime(now, exacttime2).subscribe(result => {
      console.log("original item to be update with old values" + result);
    });
    console.log(exacttime2);

    return (this.jobstarted = true), this.jobupdatetime;
  }



  showSuccess() {
    this.toastService.success("post", "Thank you");
  }

  showInfo() {
    this.toastService.info("Not Added.");
  }
  onDelete(postId: string) {
    this.postsService.deletePost(postId);
  }
  onOptionSelected(event) {
    console.log(event); //option value will be sent as event
  }

  onImagePicked1(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get("image").updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };

    reader.readAsDataURL(file);
  }

  getissues() {
    this.IssuesService.getIssues().subscribe(items => {
      if (items) {
        this.issues = items;
        this.item = this.issues.length;
        this.showSuccess();
      } else {
        this.showInfo();
      }
    });
  }
  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
}
