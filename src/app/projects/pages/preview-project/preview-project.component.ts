import { Component, Input } from '@angular/core';
import { Project } from '../../interfaces/project.interface';

@Component({
  selector: 'app-preview-project',
  templateUrl: './preview-project.component.html',
  styles: [],
})
export class PreviewProjectComponent {
  @Input() public project!: Project;
}
