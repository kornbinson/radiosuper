import { Component }                                  from '@angular/core';
import { NavController, NavParams, AlertController,
         LoadingController }                          from 'ionic-angular';
import { Location }                                   from '@angular/common';
import { Http }                                       from '@angular/http';
import { Wpapi }                                      from '../../providers/wpapi';
import { CommentPage }                                from '../comment/comment';
import {MomentModule}                                 from 'angular2-moment/moment.module';
import * as moment                                    from 'moment';
import                                                'moment/locale/es';
import { SocialSharing }                              from '@ionic-native/social-sharing';

// Set locale Spanish
moment.locale('es')



/*
  Generated class for the SinglePost page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({ 
  selector: 'page-single-post',
  templateUrl: 'single-post.html',  
  
})
export class SinglePostPage {

  datas:any = [];
  comments:any = [];
  related_posts:any = [];
  idPost:any = [];
  loading = null;
  isChecked:boolean = false;
 
  constructor (public navCtrl: NavController, public navParams: NavParams, 
              private location: Location, private http: Http, private api: Wpapi,
              private sharing:SocialSharing, public alert: AlertController, 
              public loadingController: LoadingController)
  {     
      this.idPost = navParams.get('id_post');
      api.get_post(this.idPost).subscribe(datas => {
        this.datas = [datas];          
        this.comments = datas._embedded;                   
        api.related_post (this.datas[0].id, this.datas[0].categories[0]).subscribe(related_posts => {                    
          this.related_posts = related_posts;        
        })
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SinglePostPage');
  }

  goBackAction() {    
    this.navCtrl.pop();
  }

  openSingle(url, idPost){        
    this.navCtrl.push(SinglePostPage, {
      url: url,
      id_post: idPost
    });
  }

  openComments(){    
    this.navCtrl.push(CommentPage, {      
      id_post: this.idPost
    });
  } 

  googlePlusShare(data) {
    var title = data.title.rendered;    
    var image = data._embedded['wp:featuredmedia'][0].source_url;
    var link  = data.link;   
    var excerpt = data.excerpt.rendered;
    var div = document.createElement('div');
    div.innerHTML = excerpt;   
    this.myLoadingPresent();

    if (image) {
      this.sharing.shareViaEmail(div.innerText + link, title, [''], [''], null, image)
      .then(() => {
        console.log("Whatsapp sharing");
        this.loading.dismiss();   
      })
      .catch((error) => {
        console.log(error);
        this.loading.dismiss();
        let alert = this.alert.create({
          title: 'Gmail no esta diponible!',
          subTitle: 'Lo sentimos, no se pudo conectar con Gmail!',
          buttons: [
          {
            text: 'Salir'            
          }]
        });
        alert.present();
      });
    } else {
      this.sharing.shareViaEmail(div.innerText + link, title, [''], [''], null, null)
      .then(() => {
        console.log("Whatsapp without image - sharing");
        this.loading.dismiss();
      })
      .catch((error) => {
        console.log(error);
        this.loading.dismiss();
        let alert = this.alert.create({
          title: 'Gmail no esta diponible!',
          subTitle: 'Lo sentimos, no se pudo conectar con Gmail!',
          buttons: [
          {
            text: 'Salir'            
          }]
        });
        alert.present();
      });
    }

  }

  whatsappShare(data) {
    var title = data.title.rendered;    
    var image = data._embedded['wp:featuredmedia'][0].source_url;
    var link  = data.link;
    // var excerpt = data.excerpt.rendered;
    // var div = document.createElement('div');
    // div.innerHTML = excerpt;
    // console.log(div.innerText);
    this.myLoadingPresent();

    if (image) {
      this.sharing.shareViaWhatsApp(title, image, link)
      .then(() => {
        this.loading.dismiss();
        console.log("Whatsapp sharing");
      })
      .catch((error) => {
        console.log(error);
        this.loading.dismiss();
        let alert = this.alert.create({
          title: 'Whatsapp no esta diponible!',
          subTitle: 'Lo sentimos, no se pudo conectar con Whatsapp!',
          buttons: [
          {
            text: 'Salir'            
          }]
        });
        alert.present();
      });
    } else {
      this.sharing.shareViaWhatsApp(title, null, link)
      .then(() => {  
        this.loading.dismiss();      
        console.log("Whatsapp without image - sharing");
      })
      .catch((error) => {
        console.log(error);
        this.loading.dismiss();
        let alert = this.alert.create({
          title: 'Whatsapp no esta diponible!',
          subTitle: 'Lo sentimos, no se pudo conectar con Whatsapp!',
          buttons: [
          {
            text: 'Salir'            
          }]
        });
        alert.present();
      });
    }    
  }

  facebookShare(data) {
    var title = data.title.rendered;    
    var image = data._embedded['wp:featuredmedia'][0].source_url;
    var link  = data.link;
    this.myLoadingPresent();
    
    if (image) {
      this.sharing.shareViaFacebook(title, null, link)
      .then(() => {        
        console.log("Facebook sharing");
        this.loading.dismiss();
      })
      .catch((error) => {
        console.log(error);
        this.loading.dismiss();
        let alert = this.alert.create({
          title: 'Facebook no esta diponible!',
          subTitle: 'Lo sentimos, no se pudo conectar con Facebook!',
          buttons: [
          {
            text: 'Salir'            
          }]
        });
        alert.present();
      });
    } else {
      this.sharing.shareViaFacebook(title, null, link)
      .then(() => {
        console.log("Facebook without image - sharing");
        this.loading.dismiss();
      })
      .catch((error) => {
        console.log(error);
        this.loading.dismiss();
        let alert = this.alert.create({
          title: 'Facebook no esta diponible!',
          subTitle: 'Lo sentimos, no se pudo conectar con Facebook!',
          buttons: [
          {
            text: 'Salir'            
          }]
        });
        alert.present();
      });
    }    
  }

  twitterShare(data) {
    var title = data.title.rendered;    
    var image = data._embedded['wp:featuredmedia'][0].source_url;
    var link  = data.link;
    this.myLoadingPresent();
   
    if (image) {
      this.sharing.shareViaTwitter(title, image, link)
      .then(() => {
        console.log("Whatsapp sharing");
        this.loading.dismiss();
      })
      .catch((error) => {
        console.log(error);
        this.loading.dismiss();
        let alert = this.alert.create({
          title: 'Twitter no esta diponible!',
          subTitle: 'Lo sentimos, no se pudo conectar con Twitter!',
          buttons: [
          {
            text: 'Salir'            
          }]
        });
        alert.present();
      });
    } else {
      this.sharing.shareViaTwitter(title, null, link)
      .then(() => {
        console.log("Whatsapp without image - sharing");
        this.loading.dismiss();
      })
      .catch((error) => {
        console.log(error);
        this.loading.dismiss();
        let alert = this.alert.create({
          title: 'Twitter no esta diponible!',
          subTitle: 'Lo sentimos, no se pudo conectar con Twitter!',
          buttons: [
          {
            text: 'Salir'            
          }]
        });
        alert.present();
      });
    }    
  }

  myLoadingPresent() {
    this.loading = this.loadingController.create({
      spinner: 'ios',
      content: 'Un momento, por favor'
    });
    this.loading.present();
  }

  changeCheckBox() {   
    this.isChecked = !this.isChecked;    
  }

}
