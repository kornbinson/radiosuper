import { Component }                from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Wpapi }                    from '../../providers/wpapi';
import { IndexPage }                from '../index/index';


/*
  Generated class for the Category page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-category',
  templateUrl: 'category.html'
})
export class CategoryPage {

  datas: any[];
  category:string = "";  

  constructor(public navCtrl: NavController, public navParams: NavParams, private api: Wpapi) {
    api.categories().subscribe(datas => {
      console.log(datas)      ;
      this.datas = datas;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoryPage');
  }

  goBackAction() {    
    console.log("Category Back");
    this.navCtrl.setRoot(IndexPage);
  }

  openCategory(category) {        
    this.navCtrl.push(IndexPage, {
      category : category.id     
    });
  }

}
