import { NgModule, ErrorHandler, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler }       from 'ionic-angular';
import { MyApp }                                          from './app.component';
import { LOCALE_ID }                                      from '@angular/core';
import { Network }                                        from '@ionic-native/network';

import { StatusBar }                                      from '@ionic-native/status-bar';
import { SplashScreen }                                   from '@ionic-native/splash-screen';

import { IndexPage }                                      from '../pages/index/index';
import { SinglePostPage }                                 from '../pages/single-post/single-post';
import { CategoryPage }                                   from '../pages/category/category';
import { SearchPage }                                     from '../pages/search/search';
import { CommentPage }                                    from '../pages/comment/comment';
import { Wpapi }                                          from '../providers/wpapi';

import { IonicAudioModule, AudioProvider, 
         WebAudioProvider, audioProviderFactory }         from 'ionic-audio';
import { MomentModule }                                   from 'angular2-moment/moment.module';

import { AdMob, AdMobOptions, AdSize, AdExtras }          from '@ionic-native/admob';//import

import { SocialSharing }                                  from '@ionic-native/social-sharing';


@NgModule({
  declarations: [
    MyApp,
    IndexPage,
    SinglePostPage,
    CategoryPage,
    SearchPage,
    CommentPage,               
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    IonicAudioModule.forRoot({ provide: AudioProvider, useFactory: audioProviderFactory }),
    MomentModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    IndexPage,
    SinglePostPage,
    CategoryPage,
    SearchPage,
    CommentPage
  ],
  providers: [
    Network,
    Wpapi,
    StatusBar,
    SplashScreen,   
    AdMob,
    { provide: ErrorHandler, useClass: IonicErrorHandler},
    SocialSharing   
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule {}
