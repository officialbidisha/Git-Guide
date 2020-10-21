import { Component, OnInit } from '@angular/core';
import { GitservicesService} from '../gitservices.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profile;
  repos;
  username:string;
  repository:string;
  lineData;
  constructor(private gitService: GitservicesService ) {
   
   }
   findProfile(){
     this.gitService.updateProfile(this.username);
     this.gitService.getProfileDetails().subscribe(profile=>{
      console.log(profile);
      this.profile = profile;
    })
    this.gitService.getRepoDetails().subscribe(repos=>{
      console.log(repos);
      this.repos=repos;
      
    })
   }
   onChange(){
     console.log(this.repository);
     this.gitService.getWeekelyDetails(this.repository).subscribe((result:any)=>{
      console.log(result);
      this.lineData = {
        //labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        
        datasets: [
          {
            label: 'Commits',
            data: result[result.length-1]?.days,
            backgroundColor: '#00a8eb',
            borderColor: 'rgba(179,181,198,1)',
            pointBackgroundColor: '#007bff',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#ffc600',
            pointHoverBorderColor: 'rgba(179,181,198,1)',
            fill: true
          }
        ]
      };
     })
     
   }
  ngOnInit(): void {
  }

}
