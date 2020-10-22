import { Component, OnInit } from '@angular/core';
import { GitservicesService} from '../gitservices.service';
import { ThemeService } from "src/app/theme/theme.service";
import {
  faLightbulb as faSolidLightbulb,
  faDollarSign,
  IconDefinition
} from "@fortawesome/free-solid-svg-icons";
import { faLightbulb as faRegularLightbulb } from "@fortawesome/free-regular-svg-icons";
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
  faLightbulb: IconDefinition;
  faDollarSign = faDollarSign;
  lineData;
  text: string;

  constructor(private gitService: GitservicesService,private themeService:ThemeService ) {
   
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
    this.faLightbulb = faRegularLightbulb;
  }

    
  setLightbulb() {
    if (this.themeService.isDarkTheme()) {
      this.faLightbulb = faRegularLightbulb;
    } else {
      this.faLightbulb = faSolidLightbulb;
    }
  }

  toggleTheme() {
    if (this.themeService.isDarkTheme()) {
      console.log("Theme Switch");
      this.themeService.setLightTheme();
    } else {
      this.themeService.setDarkTheme();
      console.log("Theme swithc to dark");
    }

    this.setLightbulb();
  }
  }
 


