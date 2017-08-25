import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing, appRoutingProviders } from './app.routing';



import { AppComponent } from './app.component';
//Categoria
import { CategoriaAddComponent } from './components/categoria-add.component';
import { CategoriaEditComponent } from './components/categoria-edit.component';
import { CategoriaListComponent } from './components/categoria-list.component';

//SubCategoria
import { SubCategoriaAddComponent } from './components/subcategoria-add.component';
import { SubCategoriaListComponent } from './components/subcategoria-list.component';
import { SubCategoriaEditComponent } from './components/subcategoria-edit.component';

//Coleccion
import { ColeccionAddComponent } from './components/coleccion-add.component';
import { ColeccionListComponent } from './components/coleccion-list.component';
//import { CategoriaEditComponent } from './components/categoria-edit.component';
//import { CategoriaListComponent } from './components/categoria-list.component';


@NgModule({
  declarations: [
      AppComponent,
      CategoriaAddComponent,
      CategoriaEditComponent,
      CategoriaListComponent,
      SubCategoriaAddComponent,
      SubCategoriaListComponent,
      SubCategoriaEditComponent,
      ColeccionAddComponent,
      ColeccionListComponent
  ],
  imports: [
      BrowserModule,
      FormsModule,
      HttpModule,
      routing
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})

export class AppModule { }
