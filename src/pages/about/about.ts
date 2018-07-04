import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { ApiServiceProvider } from '../../providers/api-service/api-service';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  playlists = [];
  private nextPageToken;
  constructor(public navCtrl: NavController, private apiService:ApiServiceProvider, private platform:Platform) {

  }

  ionViewDidLoad() {
    this.apiService.getPlaylistList().subscribe((response:any) => {
          console.log(response);
          this.playlists = response.items;
          this.nextPageToken = response.nextPageToken;
        }, (err) => {
          console.log(err);
        });
  }

  videoClicked(video) {
    console.log('selected video',video);
    if (this.platform.is('core')) {
      // this.navCtrl.push(VideoPlayerPage,{video});
    } else {
      // this.youtube.openVideo(video.id.videoId);
    }
  }

  loadMoreVideos() {
    this.apiService.getVideosList(this.nextPageToken).subscribe((response:any) => {
      console.log(response);
      this.playlists =  [...this.playlists,...response.items];
      this.nextPageToken = response.nextPageToken;
    }, (err) => {
      console.log(err);
    });
  }
}
