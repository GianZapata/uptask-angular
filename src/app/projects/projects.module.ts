import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ProjectsRoutingModule } from './projects-routing.module';

import { EditProjectComponent } from './pages/edit-project/edit-project.component';
import { ListProjectsComponent } from './pages/list-projects/list-projects.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { NewProjectComponent } from './pages/new-project/new-project.component';
import { PreviewProjectComponent } from './pages/preview-project/preview-project.component';
import { ShowProjectComponent } from './pages/show-project/show-project.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    EditProjectComponent,
    ListProjectsComponent,
    NewProjectComponent,
    PreviewProjectComponent,
    ShowProjectComponent,
    MainLayoutComponent,
  ],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class ProjectsModule { }
