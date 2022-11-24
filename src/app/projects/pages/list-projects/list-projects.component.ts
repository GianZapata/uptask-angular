import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { ProjectsService } from '../../services/projects.service';
import { Project } from '../../interfaces/project.interface';

@Component({
  selector: 'app-projects',
  templateUrl: './list-projects.component.html',
  styles: [],
})
export class ListProjectsComponent implements OnInit {
  private _projects: Project[] = [];

  get projects(): Project[] {
    return this._projects;
  }

  constructor(
    private readonly authService: AuthService,
    private readonly projectsService: ProjectsService,
  ) {}

  ngOnInit(): void {
    this.getProjects();
  }

  getProjects(): Project[] {
    this.projectsService.getProjects().subscribe((projects) => {
      this._projects = projects;
    });
    return this._projects;
  }
}
