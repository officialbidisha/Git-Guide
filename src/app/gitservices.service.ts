import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GitservicesService {
  public username: string;
  public clientId = 'ed1c379ecbdfb4f7cf88';
  public clientSecret = 'f7ff42188f369a3aa48cfa3601817f8144585efb';
  public headerDict = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  public requestOptions = {
    headers: new HttpHeaders(this.headerDict),
  };
  constructor(private http: HttpClient) {
    console.log('Service is now ready');
    this.username = 'officialbidisha';
  }
  public getProfileDetails(): Observable<any> {
    return this.http.get(
      'http://api.github.com/users/' +
        this.username +
        '?client_id=' +
        this.clientId +
        '&client_secret=' +
        this.clientSecret,
        this.requestOptions
    );
  }
  public getRepoDetails(): Observable<any> {
    return this.http.get(
      'http://api.github.com/users/' +
        this.username +
        '/repos?client_id=' +
        this.clientId +
        'client_secret=' +
        this.clientSecret,
        this.requestOptions
    );
  }
  public updateProfile(username: string): void {
    this.username = username;
  }
  public getWeekelyDetails(reponame): Observable<any> {
    return this.http.get(
      'https://api.github.com/repos/' +
        this.username +
        '/' +
        reponame +
        '/stats/contributors',
        this.requestOptions
    );
  }
}
