import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {RegisterComponent} from './register/register.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {LoginComponent} from './login/login.component';
import {RouterModule} from '@angular/router';
import {ToolBarComponent} from './tool-bar/tool-bar.component';
import {MatDialogModule} from '@angular/material/dialog';
import {HomePageComponent} from './home-page/home-page.component';
import {AppRoutingModule} from './app-routing.module';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {jwtInterceptorProvider} from './interceptors/jwt.interceptor';
import {errorInterceptorProvider} from './interceptors/error.interceptor';
import {MatDividerModule} from '@angular/material/divider';
import {CreateFanficComponent} from './create-fanfic/create-fanfic.component';
import {MatTableModule} from '@angular/material/table';
import {TagInputModule} from 'ngx-chips';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatChipsModule} from '@angular/material/chips';
import {MatSelectModule} from '@angular/material/select';
import {ProfileComponent} from './profile/profile.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {FanficEditorComponent} from './fanfic-editor/fanfic-editor.component';
import {NewChapterComponent} from './new-chapter/new-chapter.component';
import {MarkdownModule} from 'ngx-markdown';
import {EditChapterComponent} from './edit-chapter/edit-chapter.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {ReadFanficComponent} from './read-fanfic/read-fanfic.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    ToolBarComponent,
    HomePageComponent,
    CreateFanficComponent,
    ProfileComponent,
    FanficEditorComponent,
    NewChapterComponent,
    EditChapterComponent,
    ReadFanficComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    MatDialogModule,
    AppRoutingModule,
    HttpClientModule,
    MatDividerModule,
    MatTableModule,
    TagInputModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatSelectModule,
    MatPaginatorModule,
    MatSortModule,
    MarkdownModule.forRoot({loader: HttpClient}),
    MatExpansionModule
  ],
  providers: [jwtInterceptorProvider, errorInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule {
}
