import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from '../model/user.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataSource } from '@angular/cdk/collections';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'Application/json' }),
};

const apiUrl = 'https://reqres.in/api/users/';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userForm!: FormGroup;
  public datas: User[] = [];

  constructor(
    private httpClient: HttpClient,
    private formBuilder: FormBuilder
  ) {
    this.userForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.required],
      avatar: ['https://i.pravatar.cc/150'],
      id: '',
    });
  }

  getUser(): Observable<User[]> {
    return this.httpClient.get<User[]>(apiUrl).pipe();
  }

  getAll() {
    this.getUser().subscribe((res: any) => {
      this.datas = res.data;
    });
  }

  postUser(data: any) {
    return this.httpClient.post<any>(apiUrl, data);
  }

  getNewUser() {
    this.datas.push(this.userForm.value);
    this.userForm.value.id = this.datas.length;
    console.log(this.datas);
  }

  removeUser(id: number) {
    this.datas = this.datas.filter((user) => user.id != id);
    console.log(this.datas);
    return this.httpClient.delete<any>(apiUrl + id);
  }

  putUser(data: any, id: number) {
    console.log(this.datas);
    this.datas = this.datas.map((user) => {
      if (user.id === this.userForm.value.id) {
        return (user = this.userForm.value);
      }

      return user;
    });
    console.log('asd', this.datas);
    return this.httpClient.put<any>(apiUrl + id, data);
  }
}
