import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

@IonicPage()
@Component({
  selector: 'page-video-player',
  templateUrl: 'video-player.html',
})
export class VideoPlayerPage {

  selectedVideo;
  videoUrl;
  constructor(public navCtrl: NavController, public navParams: NavParams,private domSanitizer: DomSanitizer) {
    this.selectedVideo = this.navParams.get('video');
    this.videoUrl =this.domSanitizer.bypassSecurityTrustResourceUrl(`http://www.youtube.com/embed/${this.selectedVideo.id.videoId}?autoplay=1`) 
    console.log(this.selectedVideo);
  }

  ionViewDidLoad() {
  }

}
