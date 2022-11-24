import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { ListProjectsComponent } from './pages/list-projects/list-projects.component';
import { ShowProjectComponent } from './pages/show-project/show-project.component';
import { NewProjectComponent } from './pages/new-project/new-project.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'list',
        component: ListProjectsComponent,
      },
      {
        path: 'show/:id',
        component: ShowProjectComponent,
      },
      {
        path: 'create',
        component: NewProjectComponent,
      },
      {
        path: 'edit/:id',
        component: NewProjectComponent,
      },
      {
        path: '**',
        redirectTo: 'list',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule { }
