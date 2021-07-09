import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

/*
  Generated class for the Wpapi provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Wpapi {

  other:any = [];

  constructor(public http: Http) {
    // console.log('Hello Wpapi Provider');
  }

  /*  Id's from categories which should not be taken into account and childs
   *  Podcast = 5784
   */  
  dos() {     
    return this.http.get('http://radiosuperpopayan.com/wp-json/wp/v2/posts/?_embed&categories=5793&categories_exclude=5784&order=desc&per_page=4&page=1')
    .map(data =>{                 
      this.other[0] = this.other[0].concat(data.json());      
      return this.other[0];
    }); 
  }
  
  index(id, category) {    
    if (category != null) {      
      return this.http.get('http://radiosuperpopayan.com/wp-json/wp/v2/posts/?_embed&categories='+category+'&order=desc&per_page=10&page='+id)
      .map(data => data.json());
    } else {      
      if (id == 1) {                                                   
        return this.http.get('http://radiosuperpopayan.com/wp-json/wp/v2/posts/?_embed&categories=5819&categories_exclude=5784&order=desc&per_page=1&page=1')
        .map(data =>{             
          this.other.push(data.json());          
          return this.other;
        })
        .flatMap(() => this.dos());        
      } else {
        return this.http.get('http://radiosuperpopayan.com/wp-json/wp/v2/posts/?_embed&categories=5818&categories_exclude=5784&order=desc&per_page=10&page='+(id-1))
        .map(data => data.json()); 
      }
            
    }
    
  }

  get_post(id) {    
    return this.http.get('http://radiosuperpopayan.com/wp-json/wp/v2/posts/'+id+"/?_embed")
    .map(data => data.json());
  }

  categories() {
    return this.http.get('http://radiosuperpopayan.com/wp-json/wp/v2/categories')
    .map(data => data.json());
  }

  posts_category(id, page) {    
    return this.http.get("http://radiosuperpopayan.com/wp-json/wp/v2/posts?_embed&categories="+id+"&filter[order]=DESC&filter[posts_per_page]=5&page="+page)
    .map(data => data.json());
  }

  related_post(post_exclude, category) {
    return this.http.get("http://radiosuperpopayan.com/wp-json/wp/v2/posts?_embed&per_page=3&page=2&categories="+category+"&exclude="+post_exclude)
    .map(data => data.json());
  }

  search(keyword,id){
    return this.http.get("http://radiosuperpopayan.com/wp-json/wp/v2/posts?_embed&?filter[order]=DESC&categories_exclude=5784&filter[posts_per_page]=5&search=" + keyword + "&page="+id)
    .map(data => data.json());
  }

}
