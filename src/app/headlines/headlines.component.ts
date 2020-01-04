import { Component, OnInit } from '@angular/core';
import { NewsService } from '../services/news.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-headlines',
  templateUrl: './headlines.component.html',
  styleUrls: ['./headlines.component.scss']
})
export class HeadlinesComponent implements OnInit {
  news;
  categories = [
    'World',
    'India',
    'Business',
    'Technology',
    'Entertainment',
    'Sports',
    'Science'
  ];

  constructor(private newsService: NewsService, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.getCategoryData(this.categories[0]);
  }

  onGetCategoryData(category) {
    console.log(category);
    this.getCategoryData(category);
  }

  getCategoryData(category) {
    this.newsService
      .getData(`everything?q=${category.toLowerCase()}`)
      .subscribe(data => {
        this.news = data;
      });
  }

  onFavorite(article) {
    console.log(article);

    let items = [];
    const val = localStorage.getItem('items');

    if (val !== null) {
      items = JSON.parse(val);
    }
    items.push(article);
    localStorage.setItem('items', JSON.stringify(items));
    this.snackBar.open('Favorite Added', 'Ok', {
      duration: 3000
    });
  }

  readMore(url) {
    window.open(url);
  }
}
