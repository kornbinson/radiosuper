import { Component }                from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { SinglePostPage }           from '../../pages/single-post/single-post';
import { Wpapi }                    from '../../providers/wpapi';
import { SearchPage }               from '../search/search'; 

/*
  Generated class for the Index page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-index',
  templateUrl: 'index.html'
})
export class IndexPage {

  datas:any = [];
  searchKeyword:string = "";
  searchType:boolean = false;
  pagination:number = 1;
  category:any = [];
  loading = null;

  constructor(public navCtrl: NavController, public navParams: NavParams, private api: Wpapi,  public loadingController: LoadingController) {
    this.category = navParams.get('category');
    this.myLoadingPresent();     
    api.index(1, this.category).subscribe(datas => {             
      this.datas = datas;  
      console.log(this.datas);
      this.loading.dismiss();    
    })  
  }

  ionViewDidLoad() { 
    console.log('ionViewDidLoad IndexPage');
  }

  openSingle(url, idPost){        
    this.navCtrl.push(SinglePostPage, {
      url: url,
      id_post: idPost
    });
  }   

  doInfinite(ev) {
    if (this.datas.length < 20) {
      this.pagination++;
      if(this.searchType === false) {
        this.api.index(this.pagination, this.category).subscribe(datas => {
          ev.complete();
          if(datas.length !== 0){
            for(let i of datas) {
              this.datas.push(i);
            }
          } 
        })
      } else if (this.searchType === true){
          this.api.search(this.searchKeyword, this.pagination).subscribe(datas =>{
            ev.complete();
            if(datas.length !== 0){
              for(let i of datas) {
                this.datas.push(i);
              }
            }
          })
        }
      } else {
        ev.complete();
      }
    }

    openSearchPage() {
      this.navCtrl.push(SearchPage);
    }

    myLoadingPresent() {
      this.loading = this.loadingController.create({
        spinner: 'ios',
        content: 'Buscando'
      });
      this.loading.present();
    }

}
