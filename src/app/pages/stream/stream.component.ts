import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-stream',
  standalone: false,
  templateUrl: './stream.component.html',
  styleUrl: './stream.component.scss'
})
export class StreamComponent {
  @ViewChild('streamImage') streamImageRef!: ElementRef<HTMLImageElement>;
  @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  
  imageLoaded = false;
  isRecording = false;
  isMuted = false;
  isStreaming = false;
  streamUrl = '';
  isMotionEnabled = false;
  cameraIp = 'http://192.168.4.223/sustain?stream=0'; // заміни на свою адресу
  waitingToRecord = false;

  mediaRecorder!: MediaRecorder;
  recordedChunks: Blob[] = [];
  // recordings: { url: string; date: Date }[] = [];

  recordings: { url: string; timestamp: string; filename: string }[] = [];

private saveRecording(blob: Blob) {
  const url = URL.createObjectURL(blob);
  const timestamp = new Date().toLocaleString('uk-UA');
  const filename = `record_${Date.now()}.webm`;

  this.recordings.unshift({ url, timestamp, filename });
}

  // toggleRecording() {
  //   this.isRecording = !this.isRecording;
  //   // додатково можеш викликати метод запису відео тут
  // }
  onImageLoaded(): void {
    this.imageLoaded = true;
  
    // Якщо очікуємо запис після завантаження
    if (this.waitingToRecord) {
      this.waitingToRecord = false;
      this.startRecording();
    }
  }

  toggleRecording() {
    console.log('recording started');
    
    this.isRecording = !this.isRecording;
    this.isRecording ? this.stopRecording() : this.startRecording();
    // if (this.isRecording) {
    //   // Зачекай DOM
    //   setTimeout(() => {
    //     if (!this.canvasRef || !this.streamImageRef) {
    //       console.warn('Canvas або зображення ще не доступне');
    //       return;
    //     }
    //     this.startRecording();
    //   }, 300);
    // } else {
    //   this.stopRecording();
    // }
    if (this.isRecording) {
      // Якщо стрім увімкнено, але зображення ще не завантажене
      if (!this.imageLoaded) {
        console.log('Очікуємо завантаження зображення для запису...');
        this.waitingToRecord = true;
        return;
      }
      this.startRecording();
    } else {
      this.stopRecording();
    }
  }

  startRecording() {
    if (!this.canvasRef?.nativeElement || !this.streamImageRef?.nativeElement) {
      console.warn('Canvas або зображення потоку ще не доступне');
      return;
    }
    // if (!this.streamImageRef || !this.canvasRef) {
    //   console.error('streamImageRef or canvasRef is not available yet.');
    //   return;
    // }
    const canvas = this.canvasRef.nativeElement;
    const img = this.streamImageRef.nativeElement;

    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d')!;
    const fps = 10;

    const drawLoop = () => {
      if (!this.isRecording) return;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      setTimeout(drawLoop, 1000 / fps);
    };
    drawLoop();

    const stream = canvas.captureStream(fps);
    this.mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm; codecs=vp9' });

    this.recordedChunks = [];

    this.mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) this.recordedChunks.push(e.data);
    };

    this.mediaRecorder.onstop = () => {
      const blob = new Blob(this.recordedChunks, { type: 'video/webm' });
      const url = URL.createObjectURL(blob);
      // this.recordings.unshift({ url, date: new Date() });
      this.recordings.unshift({
        url,
        timestamp: new Date().toLocaleString('uk-UA'),
        filename: `record_${Date.now()}.webm`
      });
    };

    this.mediaRecorder.start();
    this.isRecording = true;
  }

  // stopRecording() {
  //   this.mediaRecorder.stop();
  //   this.isRecording = false;
  // }
  stopRecording() {
    if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
      this.mediaRecorder.stop();
    }
  }
  
  handleRecordingStop(blob: Blob) {
    this.saveRecording(blob);
  }

  // playRecording(url: string) {
  //   window.open(url, '_blank');
  // }
  playRecording(url: string) {
    const videoElement = document.createElement('video');
    videoElement.src = url;
    videoElement.controls = true;
    videoElement.autoplay = true;
    document.body.appendChild(videoElement);
  }
  toggleMute() {
    this.isMuted = !this.isMuted;
    // Тут ти можеш керувати логікою звуку
  }


  toggleStream(): void {
    this.isStreaming = !this.isStreaming;

    if (this.isStreaming) {
      this.streamUrl = 'http://192.168.4.223/sustain?stream=0' + Date.now();
    } else {
      this.streamUrl = ''; // зупинити трансляцію
    }
  }

  toggleMotionDetection(): void {
    this.isMotionEnabled = !this.isMotionEnabled;

    const motionUrl = `${this.cameraIp}/control?enableMotion=${this.isMotionEnabled ? 1 : 0}`;
    const recordUrl = `${this.cameraIp}/control?record=${this.isMotionEnabled ? 1 : 0}`;
    const sensitivityUrl = `${this.cameraIp}/control?motionVal=7`; // опційно: встановлює чутливість

    // Надіслати всі запити послідовно
    fetch(motionUrl);
    fetch(recordUrl);
    fetch(sensitivityUrl);
  }
}
