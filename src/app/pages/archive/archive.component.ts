import { Component } from '@angular/core';

@Component({
  selector: 'app-archive',
  standalone: false,
  templateUrl: './archive.component.html',
  styleUrl: './archive.component.scss'
})
export class ArchiveComponent {
  records = [
    { id: 1, date: '23.02.2025 14:30', url: '/assets/videos/record1.mp4' },
    { id: 2, date: '23.02.2025 12:15', url: '/assets/videos/record2.mp4' },
    { id: 3, date: '23.02.2025 09:45', url: '/assets/videos/record3.mp4' }
  ];

  viewRecord(record: any) {
    window.open(record.url, '_blank');
  }

  downloadRecord(record: any) {
    const link = document.createElement('a');
    link.href = record.url;
    link.download = `record-${record.id}.mp4`;
    link.click();
  }
}
