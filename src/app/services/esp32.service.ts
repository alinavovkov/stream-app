import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Esp32Service {
  private baseUrl = 'http://192.168.4.223/'; 

  constructor(private http: HttpClient) {}

  getStatus(): Observable<any> {
    return this.http.get(`${this.baseUrl}/status`);
  }

  setFramesize(value: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/control?framesize=${value}`);
  }

  getStill(): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/control?still=${Date.now()}`, {
      responseType: 'blob',
    });
  }

  startStream(): Observable<any> {
    return this.http.get(`${this.baseUrl}/sustain?stream=0`);
  }

  stopStream(): Observable<any> {
    return this.http.get(`${this.baseUrl}/control?stopStream=0`);
  }

  reboot(): Observable<any> {
    return this.http.get(`${this.baseUrl}/control?reset=1`);
  }

  // Додай інші методи за потреби
}
