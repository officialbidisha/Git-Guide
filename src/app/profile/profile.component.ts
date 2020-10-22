import { Component, OnInit } from '@angular/core';
import { GitservicesService} from '../gitservices.service';
import { ThemeService } from "src/app/theme/theme.service";
import {
  faLightbulb as faSolidLightbulb,
  faDollarSign,
  IconDefinition
} from "@fortawesome/free-solid-svg-icons";
import { faLightbulb as faRegularLightbulb } from "@fortawesome/free-regular-svg-icons";
import { ResourceLoader } from '@angular/compiler';
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
      let datew:Array<number>=[]
      let add: Array<number>=[];
      let del: Array<number>=[];
      let commit:Array<number>=[];
      for(var i=0;i<(result[0].weeks.length);i++){
        //  console.log("Hey additon ");
        //  console.log(typeof(result[0].weeks[i].a));
          datew.push(i);
          add.push(result[0].weeks[i].a);
          del.push(result[0].weeks[i].d);
          commit.push(result[0].weeks[i].c);
      }
      // console.log(add);
      // console.log(del);
      // console.log(commit);
      this.lineData = {

       labels: datew,
        
        datasets: [
          {
            label:'addition',    
            data: add,
            backgroundColor: '#00a8eb',
            borderColor: '#FF1493',
            pointBackgroundColor: '#007bff',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#ffc600',
            pointHoverBorderColor: 'rgba(179,181,198,1)',
            fill: false
          },
          {
            label:'deletion',
            data: del,
            backgroundColor: '#00a8eb',
            borderColor: '#F19A3E',
            pointBackgroundColor: '#007bff',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#ffc600',
            pointHoverBorderColor: 'rgba(179,181,198,1)',
            fill: false
          },
          {
            label:'commits',
            data: commit,
            backgroundColor: '#00a8eb',
            borderColor: '#dcfe00',
            pointBackgroundColor: '#007bff',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#ffc600',
            pointHoverBorderColor: 'rgba(179,181,198,1)',
            fill: false
          }

          
        ]

      };
     })
     
   }
  ngOnInit(): void {
    this.toggleTheme();
    this.toggleTheme();
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
 


