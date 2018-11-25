import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

import { User } from "./posts/user.model";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private users: User[] = [];
  private img: User[] = [];
  private usersUpdated = new Subject<User[]>();

  constructor(private http: HttpClient, private router: Router) { }
  getPosts() {
    this.http
      .get<{ message: string; users: any }>("http://localhost:3000/api/users")
      .pipe(
        map(userData => {
          return userData.users.map(user => {
            console.log(userData);
            return {
              name: user.name,
              username: user.username,
              id: user._id,
              imagedisplay: user.imagedisplay
            };
          });
        })
      )
      .subscribe(transformedPosts => {
        this.users = transformedPosts;
        this.usersUpdated.next([...this.users]);
      });
  }

  getPostUpdateListener() {
    return this.usersUpdated.asObservable();
  }

  getPost(id: string) {
    return this.http.get<{
      _id: string;
      name: string;
      username: string;
      imagedisplay: string;
    }>("http://localhost:3000/api/users/" + id);
  }

  addPost(name: string, username: string, image: File) {
    const userData = new FormData();
    userData.append("name", name);
    userData.append("username", username);
    userData.append("image", image, name);
    this.http
      .post<{ message: string; user: User }>(
        "http://localhost:3000/api/users",
        userData
      )
      .subscribe(responseData => {
        const user: User = {
          id: responseData.user.id,
          name: name,
          username: username,
          imagedisplay: responseData.user.imagedisplay
        };
        this.users.push(user);
        this.usersUpdated.next([...this.users]);
        this.router.navigate(["/"]);
      });
  }

  Editimage(id: string, name: string, username: string, image: File | string) {
    let userData: User | FormData;
    if (typeof image === "object") {
      userData = new FormData();
      userData.append("id", id);

      userData.append("image", image);
    } else {
      userData = {
        id: id,
        name: name,
        username: username,
        imagedisplay: image
      };
    }
    this.http
      .put("http://localhost:3000/api/users/" + id, userData)
      .subscribe(response => {
        const updatedUsers = [...this.users];
        const oldUserIndex = updatedUsers.findIndex(p => p.id === id);
        const img: User = {
          id: id,
          name: name,
          username: username,
          imagedisplay: ""
        };
        updatedUsers[oldUserIndex] = img;
        this.users = updatedUsers;
        this.usersUpdated.next([...this.users]);
        this.router.navigate(["/"]);
      });
  }

  updatePost(id: string, name: string, username: string, image: File | string) {
    let userData: User | FormData;
    if (typeof image === "object") {
      userData = new FormData();
      userData.append("id", id);
      userData.append("name", name);
      userData.append("username", username);
      userData.append("image", image, name);
    } else {
      userData = {
        id: id,
        name: name,
        username: username,
        imagedisplay: image
      };
    }
    this.http
      .put("http://localhost:3000/api/users/" + id, userData)
      .subscribe(response => {
        const updatedUsers = [...this.users];
        const oldUserIndex = updatedUsers.findIndex(p => p.id === id);
        const user: User = {
          id: id,
          name: name,
          username: username,
          imagedisplay: ""
        };
        updatedUsers[oldUserIndex] = user;
        this.users = updatedUsers;
        this.usersUpdated.next([...this.users]);
        this.router.navigate(["/"]);
      });
  }

}


