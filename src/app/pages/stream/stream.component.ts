import { Component } from '@angular/core';

@Component({
  selector: 'app-stream',
  standalone: false,
  templateUrl: './stream.component.html',
  styleUrl: './stream.component.scss'
})
export class StreamComponent {
  isRecording = false;
  isMuted = false;

  toggleRecording() {
    this.isRecording = !this.isRecording;
    // додатково можеш викликати метод запису відео тут
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    // Тут ти можеш керувати логікою звуку
  }
}
