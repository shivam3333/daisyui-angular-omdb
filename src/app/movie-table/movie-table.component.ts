import { Component, OnInit } from '@angular/core';
import { PaginationInstance } from 'ngx-pagination';
import { HttpClient } from '@angular/common/http';
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
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchMovies();
  }

  fetchMovies() {
    this.http
      .get(
        `https://www.omdbapi.com/?s=movie&apikey=${APIKEY}&page=${this.config.currentPage}`
      )
      .subscribe((response: any) => {
        this.movies = response.Search;
        this.config.totalItems = response.totalResults;
        this.sortByReleaseDate();
        console.log('response.Search', response);
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
}
