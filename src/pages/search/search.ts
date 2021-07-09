import { Component }                from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Wpapi }                    from '../../providers/wpapi';
import { SinglePostPage }           from '../single-post/single-post'



/*
  Generated class for the Search page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {  

  searchKeyword:string = "";
  searchType:boolean = false;
  datas:any = [];
  pagination:number = 1;
  loading = null;
  
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private api: Wpapi, public loadingController: LoadingController) {
    
    api.index(1, null).subscribe(datas => {       
      console.log(datas);
      this.datas = datas;
    })
  }


  search(keyword) {
    this.searchType = true;
    this.myLoadingPresent();
    this.api.search(keyword, 1).subscribe(datas => {
      this.datas = datas;  
      this.loading.dismiss();    
    })
  }

  onCancel(ev) {
    if(!ev.target.value) {
      this.api.index(1, null).subscribe(datas => {
        this.datas = datas;
        this.searchType = false;
      });
    }
  }

  doInfinite(ev) {
    this.pagination++;
    if (this.searchType === true){
      this.api.search(this.searchKeyword, this.pagination).subscribe(datas =>{
        ev.complete();
        if(datas.length !== 0){
          for(let i of datas) {
            this.datas.push(i);
          }
        }
      })
    }     
  }

  openSingle(url, idPost){        
    this.navCtrl.push(SinglePostPage, {
      url: url,
      id_post: idPost
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

  myLoadingPresent() {
    this.loading = this.loadingController.create({
      spinner: 'ios',
      content: 'Buscando'
    });
    this.loading.present();
  }


}
