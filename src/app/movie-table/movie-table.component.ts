import { Component, OnInit } from '@angular/core';
import { PaginationInstance } from 'ngx-pagination';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
const APIKEY = '638472b7';

@Component({
  selector: 'app-movie-table',
  templateUrl: './movie-table.component.html',
  styleUrls: ['./movie-table.component.css'],
})
export class MovieTableComponent implements OnInit {
  movies: any[] = [];
  page: number = 1;
  config: PaginationInstance = {
    id: 'omdb',
    itemsPerPage: 10,
    currentPage: 1,
    totalItems: 0
  };
  searchMovie!: String ;
  searchMovieName: String ='movie';
  errorMessage!: String;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.fetchMovies();
  }

  fetchMovies() {
    this.http
      .get(
        `https://www.omdbapi.com/?s=${this.searchMovieName}&apikey=${APIKEY}&page=${this.config.currentPage}`
      )
      .subscribe((response: any) => {
        console.log('response === ', response);
        if(response.Response == 'True'){
          this.movies = response.Search;
          this.config.totalItems = response.totalResults;
          this.sortByReleaseDate();
          
        } else{
          this.movies=[];
          this.errorMessage = response.Error;
        }
        
      });
  }

  sortByReleaseDate() {
    this.movies.sort((a, b) => {
      const dateA = new Date(a.Year);
      const dateB = new Date(b.Year);
      return dateB.getTime() - dateA.getTime();
    });
  }

  onPageChange(page: number) {
    this.config.currentPage = page;
    this.fetchMovies();
  }

  applyFilter(search: String) {
    this.searchMovieName = search;
    this.fetchMovies();
  }

  clearFilter(){
    this.searchMovie ='';
    this.searchMovieName = 'movie';
    this.fetchMovies();
  }

  goToDetails(id: string) {
    // Navigate to the details page and store the ID in the router state
    console.log('id', id);
    this.router.navigate(['/movie-details']);
  }
}
