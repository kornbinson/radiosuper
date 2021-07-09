import { Component }                from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Wpapi }                    from '../../providers/wpapi';

/*
  Generated class for the Comment page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-comment',
  templateUrl: 'comment.html'
})
export class CommentPage {

  datas: any[];
  idPost:any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private api: Wpapi) {
      this.idPost = navParams.get('id_post');
      api.get_post(this.idPost).subscribe(datas => {        
        this.datas = [datas];                           
      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommentPage');
  }

  goBackAction() {    
    this.navCtrl.pop();
  }
  

}
