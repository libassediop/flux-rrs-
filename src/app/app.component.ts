import { Component } from '@angular/core';
import {IRssChannel, IRssItem, NewsRss} from "./model";
import {HttpClient} from "@angular/common/http";
import * as xml2js from 'xml2js';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  p: number = 1;
  RssData: NewsRss | undefined;
   title: string | undefined;
    mylistItem: any;
    lin= Array<IRssItem>();


  ngOnInit() {
  this.GetRssFeedData();
  }
  constructor(private http: HttpClient) {}


  GetRssFeedData() {
    const requestOptions: Object = {
      observe: 'body',
      responseType: 'text',
    };
    this.http
      .get<any>('https://www.lemonde.fr/rss/en_continu.xml', requestOptions)
      .subscribe((data) => {
        let parseString = xml2js.parseString;
        parseString(data, (err, result: NewsRss) => {
          this.RssData = result;
          this.title=this.RssData?.rss.channel[0].title[0].toString();
          this.mylistItem=this.RssData?.rss.channel[0].item;
          for(var i=0; i<this.mylistItem.length;i++){
            this.lin.push({
              id:i,
              title:this.mylistItem[i].title[0],
              image:this.mylistItem[i]['media:content'][0].$['url'],
              link:this.mylistItem[i].link[0]
            } )
          }

        });
      });
  }

  Modifier(linkElement: any) {
    console.log(linkElement)

  }
}

export interface IRssData {}
