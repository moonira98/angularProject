import { Routes } from '@angular/router';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { LoginSignupComponent } from './components/login-signup/login-signup.component';
import { authGuard } from './shared/auth.guard';
import { PagenotFoundComponent } from './components/pagenot-found/pagenot-found.component';
import { ServerErrorComponent } from './components/server-error/server-error.component';

export const routes: Routes = [
    {path: 'contacts', component: ContactListComponent, canActivate: [authGuard]},
    {path: 'login-signup', component: LoginSignupComponent},
    {path: 'server-error', component: ServerErrorComponent},
    {path: '', redirectTo: 'login-signup', pathMatch: 'full'},
    {path: '**', component: PagenotFoundComponent},
    
];
