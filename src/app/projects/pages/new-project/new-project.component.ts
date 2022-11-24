import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { ProjectsService } from '../../services/projects.service';
import { Project } from '../../interfaces/project.interface';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styles: [],
})
export class NewProjectComponent implements OnInit {
  private _project!: Project;
  public projectExists = false;

  public message = '';
  public showMessage = false;
  public hasError = true;
  public isSending = false;

  get project() {
    return { ...this._project };
  }

  projectForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    deliveryDate: ['', [Validators.required]], // El formato de la fecha debe ser YYYY-MM-DD
    description: ['', [Validators.required, Validators.minLength(5)]],
    client: ['', [Validators.required, Validators.minLength(3)]],
  });

  ngOnInit(): void {
    const { id } = this.activatedRoute.snapshot.params;
    if (!id) return;

    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.projectsService.getProject(id)))
      .subscribe((project) => {
        const { name, description, client } = project;
        const deliveryDate = new Date(project.deliveryDate)
          .toISOString()
          .split('T')[0];

        this._project = project;
        this.projectExists = true;
        this.projectForm.setValue({ name, deliveryDate, description, client });
      });
  }

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly projectsService: ProjectsService,
    private readonly activatedRoute: ActivatedRoute,
  ) {}

  onSaveProject() {
    const { name, deliveryDate, description, client } = this.projectForm.value;
    if (this.projectForm.invalid) return;

    this.isSending = true;
    if (this.projectExists && this._project._id) {
      this.projectsService
        .updateProject(this._project._id, {
          name,
          deliveryDate,
          description,
          client,
        })
        .subscribe((res) => {
          if (res === false) {
            this.showMessage = true;
            this.hasError = true;
            this.message = 'Error al guardar el proyecto';
            return;
          }

          this.projectForm.reset();
          this.message = 'Proyecto actualizado correctamente';
          this.hasError = false;
          this.showMessage = true;
          this.isSending = false;

          setTimeout(() => {
            this.router.navigateByUrl('/projects');
          }, 3000);
        });
    } else {
      this.projectsService
        .createProject({ name, deliveryDate, description, client })
        .subscribe((res) => {
          if (res === false) {
            this.showMessage = true;
            this.hasError = true;
            this.message = 'Error al crear el proyecto';
            return;
          }

          this.projectForm.reset();
          this.message = 'Proyecto creado correctamente';
          this.hasError = false;
          this.showMessage = true;
          this.isSending = false;

          setTimeout(() => {
            this.router.navigateByUrl('/projects');
          }, 3000);
        });
    }
  }

  onDeleteProject() {
    if (!this._project._id) return;

    this.projectsService.deleteProject(this._project._id).subscribe(() => {
      this.projectForm.reset();
      this.message = 'Proyecto eliminado correctamente';
      this.hasError = false;
      this.showMessage = true;

      setTimeout(() => {
        this.router.navigateByUrl('/projects');
      }, 3000);
    });
  }
}
