import { Routes } from '@angular/router';
import { AccountsComponent } from './components/accounts/accounts';
import { TransactionsComponent } from './components/transactions/transactions';

export const routes: Routes = [
  { path: '', redirectTo: 'accounts', pathMatch: 'full' },
  { path: 'accounts', component: AccountsComponent },
  { path: 'transactions/:accountId', component: TransactionsComponent }
];