import { Component, ViewChild }                  from '@angular/core';
import { Nav, Platform, AlertController  }       from 'ionic-angular';
import { Network }                               from '@ionic-native/network';
import { StatusBar }                             from '@ionic-native/status-bar';
import { SplashScreen }                          from '@ionic-native/splash-screen';

import { Wpapi }                                 from '../providers/wpapi';
import { IndexPage }                             from '../pages/index/index';
import { CategoryPage }                          from '../pages/category/category';
import { SearchPage }                            from '../pages/search/search';
import { CommentPage }                           from '../pages/comment/comment';

import { AudioProvider }                         from 'ionic-audio';

import { AdMob, AdMobOptions, AdSize, AdExtras } from '@ionic-native/admob';//import


// Radio super stream:  http://192.99.203.81:9523/stream 



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

   rootPage: any = IndexPage;
   pages:any = [];
   isHome:boolean = false;  
   selectedTrack: number;   
   singleTrack: any;
   radioOn:boolean = false;  
   private admobId: any;

  constructor(public platform: Platform, public statusBar: StatusBar, 
              public splashScreen: SplashScreen, private _audioProvider: AudioProvider, 
              public alert: AlertController, private network: Network,                
              private admob: AdMob) 
  {
    this.radioOn = false;
    this.initializeApp();        
    this.singleTrack = {
      src: 'http://192.99.203.81:9523/stream'  
    };        
  }

  initializeApp() {
    this.platform.ready().then(() => {           
      // Check internet connection       
      if (this.network.type === 'none') {        
        this.closeApp();
      }
      this.network.onDisconnect().subscribe(() => {
        this.closeApp();
      });

      // Publicidad     
      let options:AdMobOptions={
        adId: 'ca-app-pub-1396961734382945/6984809710',
        adSize: 'SMART_BANNER',
        isTesting: false
       }
       if (AdMob) {
         this.admob.createBanner(options).then(()=>{
             this.admob.showBanner(8)
         })
       }
              
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      // this.nav.setRoot(IndexPage);
    });
  }


  closeApp() {
    let alert = this.alert.create({
      title: 'Sin conexion a internet!',
      subTitle: 'No fue posible conectar con el servidor!',
      buttons: [
      {
        text: 'Salir',
        handler: data => {
          this.platform.exitApp();
        }
      }]
    });
    alert.present();
  }
  


  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  openCategoryById(category_id) {        
    this.nav.push(IndexPage, {
      category : category_id     
    });
  }

  goToPodcast() {
      window.open('http://www.radiosuperpopayan.com/podcast/', '_system');
  }

  openCategory() {
    this.nav.setRoot(CategoryPage);    
  }

  openSearch() {
    this.nav.setRoot(SearchPage);
  }

  openComment() {
    this.nav.setRoot(CommentPage);
  }

  openHome() {
    this.nav.setRoot(IndexPage);
    this.isHome = false;
  }

  playRadio() {
    if (this.radioOn == false) {
      this.radioOn = true;
    } else {
      this.radioOn = false;
    }
  }
  
}
