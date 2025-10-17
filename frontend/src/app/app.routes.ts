import { Routes } from '@angular/router';
import { AccountsComponent } from './components/accounts/accounts';

export const routes: Routes = [
  { path: '', redirectTo: 'accounts', pathMatch: 'full' },
  { path: 'accounts', component: AccountsComponent },
];