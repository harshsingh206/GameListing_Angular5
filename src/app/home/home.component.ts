import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { IGames } from './games';
import { GamesParameterService } from './games.paramter.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  response: any[] = [];
  errorMessage: any[] = [];
  canSearch = true;
  filtertext: string = '';
  currentYear: number;
  filteredGames: IGames[];
  games: IGames[];
  showcontent: boolean;



  key: string; //set default
  reverse: boolean = false;
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  constructor(private _homeService: HomeService, private gamesParameterService: GamesParameterService) {

  }


  get listFilter(): string {
    return this.gamesParameterService.filterBy;
  }
  set listFilter(value: string) {
    this.gamesParameterService.filterBy = value;
    this.filteredGames = this.performFilter(this.listFilter);
  }

  performFilter(filterBy: string): IGames[] {
    if (filterBy) {
      filterBy = filterBy.toLocaleLowerCase();
      return this.games.filter((game: IGames) =>
        game.title.toString().toLocaleLowerCase().indexOf(filterBy) !== -1);
    } else {
      return this.games;
    }
  }

  getGames(): void {
    this._homeService.getFormlyData()
      .subscribe(data => {
        this.games = data;
        this.filteredGames = this.performFilter(this.listFilter);
        this.showcontent = true;
      },
        error => this.errorMessage = <any>error);
  }

  ngOnInit(): void {
    this.showcontent = false;
    this.getGames();
    let date = new Date();
    this.currentYear = date.getFullYear();
    this.key = 'title';
    this.reverse = false;
  }

}
