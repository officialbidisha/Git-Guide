import { Component, OnInit } from '@angular/core';
import { GitservicesService } from '../gitservices.service';
import { ThemeService } from 'src/app/theme/theme.service';
import {
  faLightbulb as faSolidLightbulb,
  faDollarSign,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { faLightbulb as faRegularLightbulb } from '@fortawesome/free-regular-svg-icons';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [MessageService],
})
export class ProfileComponent implements OnInit {
  public profile: string = null;
  public error: boolean = false;
  public repos;
  public username: string;
  public repository: string;
  public faLightbulb: IconDefinition;
  public faDollarSign = faDollarSign;
  public lineData;
  public isLoading: boolean = false;
  text: string;

  constructor(
    private gitService: GitservicesService,
    private themeService: ThemeService,
    private messageService: MessageService
  ) {}

  public findProfile(): void {
    this.error = false;
    this.isLoading = true;
    this.profile= null;
    setTimeout(() => {
      this.gitService.updateProfile(this.username);
      this.gitService.getProfileDetails().subscribe(
        (profile) => {
          this.profile = profile;
          this.isLoading = false;
        },
        (err) => {
          console.log(err);
          this.isLoading = false;
          this.error = true;
          if (err.error.message === 'Not Found') {
            this.messageService.add({
              severity: 'error',
              summary: err.error.message,
              detail: 'Username invalid',
            });
          }
          if (err.status === 0) {
            this.messageService.add({
              severity: 'error',
              summary: 'Network connectivity issue',
              detail: 'Check your internet connection',
            });
          }
          if(err.error.status===500){
            this.messageService.add({
              severity: 'error',
              summary: 'Server Error',
              detail: 'Internal Server Error',
            });
          }
        }
      );
      this.gitService.getRepoDetails().subscribe((repos) => {
        console.log(repos);
        this.repos = repos;
      });
    }, 5000);
  }
  public onChange(): void {
    this.gitService
      .getWeekelyDetails(this.repository)
      .subscribe((result: any) => {
        console.log(result);
        const datew: Array<number> = [];
        const add: Array<number> = [];
        const del: Array<number> = [];
        const commit: Array<number> = [];
        for (let i = 0; i < result[0]?.weeks.length; i++) {
          datew.push(i);
          add.push(result[0]?.weeks[i].a);
          del.push(result[0]?.weeks[i].d);
          commit.push(result[0]?.weeks[i].c);
        }
        console.log(add);
        console.log(del);
        console.log(commit);
        this.lineData = {
          labels: datew,

          datasets: [
            {
              label: 'addition',
              data: add,
              backgroundColor: '#00a8eb',
              borderColor: '#FF1493',
              pointBackgroundColor: '#007bff',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#ffc600',
              pointHoverBorderColor: 'rgba(179,181,198,1)',
              fill: false,
            },
            {
              label: 'deletion',
              data: del,
              backgroundColor: '#00a8eb',
              borderColor: '#F19A3E',
              pointBackgroundColor: '#007bff',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#ffc600',
              pointHoverBorderColor: 'rgba(179,181,198,1)',
              fill: false,
            },
            {
              label: 'commits',
              data: commit,
              backgroundColor: '#00a8eb',
              borderColor: '#dcfe00',
              pointBackgroundColor: '#007bff',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#ffc600',
              pointHoverBorderColor: 'rgba(179,181,198,1)',
              fill: false,
            },
          ],
        };
      });
  }
  ngOnInit(): void {
    this.toggleTheme();
    this.toggleTheme();
  }

  public setLightbulb(): void {
    if (this.themeService.isDarkTheme()) {
      this.faLightbulb = faRegularLightbulb;
    } else {
      this.faLightbulb = faSolidLightbulb;
    }
  }

  public toggleTheme(): void {
    if (this.themeService.isDarkTheme()) {
      this.themeService.setLightTheme();
    } else {
      this.themeService.setDarkTheme();
    }

    this.setLightbulb();
  }
}
