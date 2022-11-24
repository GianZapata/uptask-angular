import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Project } from '../../interfaces/project.interface';
import { ProjectsService } from '../../services/projects.service';

@Component({
  selector: 'app-show-project',
  templateUrl: './show-project.component.html',
  styles: [],
})
export class ShowProjectComponent implements OnInit {
  private _project!: Project;

  get project(): Project {
    return { ...this._project };
  }

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly projectsService: ProjectsService,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.projectsService.getProject(id)))
      .subscribe({
        next: (project) => (this._project = project),
        error: () => {
          this.router.navigateByUrl('/projects/list');
        },
      });
  }
}
