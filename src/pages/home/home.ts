import { VideoPlayerPage } from './../video-player/video-player';
import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { ApiServiceProvider } from '../../providers/api-service/api-service';
ApiServiceProvider;
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  videoList = [];
  private nextPageToken;
  constructor(public navCtrl: NavController, private apiService:ApiServiceProvider, private youtube:YoutubeVideoPlayer,private platform:Platform) {

  }

  ionViewDidLoad() {
    this.apiService.getVideosList().subscribe((response:any) => {
          console.log(response);
          this.videoList = response.items;
          this.nextPageToken = response.nextPageToken;
        }, (err) => {
          console.log(err);
        });
  }

  videoClicked(video) {
    console.log('selected video',video);
    if (this.platform.is('core')) {
      this.navCtrl.push(VideoPlayerPage,{video});
    } else {
      this.youtube.openVideo(video.id.videoId);
    }
  }

  loadMoreVideos() {
    this.apiService.getVideosList(this.nextPageToken).subscribe((response:any) => {
      console.log(response);
      this.videoList =  [...this.videoList,...response.items];
      this.nextPageToken = response.nextPageToken;
    }, (err) => {
      console.log(err);
    });
  }

}
