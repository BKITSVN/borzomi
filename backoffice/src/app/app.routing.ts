import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Categoria
import { CategoriaAddComponent } from './components/categoria-add.component';
import { CategoriaEditComponent } from './components/categoria-edit.component'
import { CategoriaListComponent } from './components/categoria-list.component';

//SubCategoria
import { SubCategoriaAddComponent } from './components/subcategoria-add.component';
import { SubCategoriaListComponent } from './components/subcategoria-list.component';
import { SubCategoriaEditComponent } from './components/subcategoria-edit.component';

//Coleccion
import { ColeccionAddComponent } from './components/coleccion-add.component';
//import { CategoriaEditComponent } from './components/categoria-edit.component';
import { ColeccionListComponent } from './components/coleccion-list.component';


const appRoutes: Routes = [
    { path: 'crear-categoria', component: CategoriaAddComponent },
    { path: 'editar-categoria/:id', component: CategoriaEditComponent },
    { path: 'categorias/:page', component: CategoriaListComponent },
    { path: 'crear-subcategoria', component: SubCategoriaAddComponent },
    { path: 'subcategorias/:page', component: SubCategoriaListComponent },
    { path: 'editar-subcategoria/:id', component: SubCategoriaEditComponent },
    { path: 'crear-coleccion', component: ColeccionAddComponent },
    { path: 'colecciones/:page', component: ColeccionListComponent },
    /*
    { path: '', component: HomeComponent },
    { path: '**', component: HomeComponent }*/
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);