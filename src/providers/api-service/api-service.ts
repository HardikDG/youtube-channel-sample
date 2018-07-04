import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ApiServiceProvider {

  googleApiKey = 'YOUR_API_KEY';
  constructor(public http: HttpClient) {
    console.log('Hello ApiServiceProvider Provider');
  }

  getVideosList(nextPageToken='') {
      if (navigator.onLine) {
        let requestUrl;

        if(nextPageToken.length > 0) {
          requestUrl = `https://www.googleapis.com/youtube/v3/search?key=${this.googleApiKey}&channelId=UCx2qMIoQIchX9o5x38hf1Bw&part=snippet,id&order=date&maxResults=50&pageToken=${nextPageToken}`;
        } else {
          requestUrl = `https://www.googleapis.com/youtube/v3/search?key=${this.googleApiKey}&channelId=UCx2qMIoQIchX9o5x38hf1Bw&part=snippet,id&order=date&maxResults=50`;
        }

        const request = this.http.get(requestUrl).map((res) => {
          return res;
        }).catch((error: any) => {
          return error;
        });
        return request;
        // tslint:disable-next-line:no-else-after-return
      } else if (!navigator.onLine) {
        alert('Please check your internet connection');
      }
  }

  getPlaylistList(nextPageToken = '') {

    if (navigator.onLine) {
      let requestUrl;

      if(nextPageToken.length > 0) {
        requestUrl = `https://www.googleapis.com/youtube/v3/search?key=${this.googleApiKey}&channelId=UCx2qMIoQIchX9o5x38hf1Bw&part=snippet,id&order=date&maxResults=50&pageToken=${nextPageToken}`;
      } else {
        requestUrl = `https://www.googleapis.com/youtube/v3/playlists?part=snippet,contentDetails&channelId=UCx2qMIoQIchX9o5x38hf1Bw&key=${this.googleApiKey}&maxResults=50`;
      }

      const request = this.http.get(requestUrl).map((res) => {
        return res;
      }).catch((error: any) => {
        return error;
      });
      return request;
      // tslint:disable-next-line:no-else-after-return
    } else if (!navigator.onLine) {
      alert('Please check your internet connection');
    }
  }

}
