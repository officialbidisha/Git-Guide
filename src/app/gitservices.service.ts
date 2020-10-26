import { Injectable } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class GitservicesService {
   public username:string;
   public clientId='__';
   public clientSecret='__';
  constructor(private http:HttpClient) { 
    console.log("Service is now ready");
    this.username='officialbidisha';
  }
  getProfileDetails(){
    return this.http.get("http://api.github.com/users/"+this.username+"?client_id="+this.clientId+"&client_secret="+this.clientSecret);
  }
  getRepoDetails(){
    return this.http.get("http://api.github.com/users/"+this.username+"/repos?client_id="+this.clientId+"client_secret="+this.clientSecret);
  }
  updateProfile(username:string){
    this.username=username;
  }
  getWeekelyDetails(reponame){
    return this.http.get("https://api.github.com/repos/"+this.username+"/"+reponame+"/stats/contributors")
  }
}
