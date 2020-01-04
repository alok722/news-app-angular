import { Component, OnInit } from '@angular/core';
import { NewsService } from '../services/news.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sources',
  templateUrl: './sources.component.html',
  styleUrls: ['./sources.component.scss']
})
export class SourcesComponent implements OnInit {
  news;
  selected;

  sources = [
    {
      id: 'abc-news',
      name: 'ABC News'
    },
    {
      id: 'abc-news-au',
      name: 'ABC News (AU)'
    },
    {
      id: 'aftenposten',
      name: 'Aftenposten'
    },
    {
      id: 'al-jazeera-english',
      name: 'Al Jazeera English'
    }
  ];

  constructor(private newsService: NewsService, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.selected = this.sources[0].id;
    this.getData(this.selected);
  }

  onSourceChange() {
    this.getData(this.selected);
  }

  getData(selected) {
    this.newsService
      .getData(`top-headlines?sources=${selected}`)
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
