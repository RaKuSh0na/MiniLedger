import { Component, OnInit } from '@angular/core';
import { Account, AccountsService } from '../../services/accounts';
import { FormsModule } from '@angular/forms';
import { RouterOutlet, Router } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-accounts',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './accounts.html',
  styleUrls: ['./accounts.css']
})
export class AccountsComponent implements OnInit {

  accounts: Account[] = [];
  newAccountName: string = '';
  selectedAccount: { id: number, name: string } | null = null;
  selectedAccountName: string = '';


  constructor(private accountsService: AccountsService, private router: Router) { }

  ngOnInit(): void {
    this.loadAccounts();
  }

  loadAccounts() {
    this.accountsService.getAccounts().subscribe(accounts => {
      this.accounts = accounts;
    });
  }


  // Called on Add Account Modal Submit
  createAccount() {
    // NOTE: Your service call hardcodes balance: 0.
    if (!this.newAccountName.trim()) return;

    this.accountsService.createAccount({ name: this.newAccountName, balance: 0 }).subscribe(() => {
      this.newAccountName = '';
      this.loadAccounts();

      this.closeModal('addAccountModal');
    });
  }

  updateAccount() {
    // Get the name and ID from the stable object
    const newName = this.selectedAccount?.name?.trim();
    const id = this.selectedAccount?.id;

    // Ensure we have a valid name and ID
    if (!newName || id === undefined) return;

    this.accountsService.updateAccount(id, { name: newName }).subscribe(() => {
      this.loadAccounts();
      
      this.closeModal('editNameModal');
     
    });
  }

  deleteAccount(id: number) {
    this.accountsService.deleteAccount(id).subscribe(() => {
      this.loadAccounts();
    });
  }

  prepareEdit(account: Account) {
    // Create a copy of the ID and name for editing
    this.selectedAccount = {
      id: account.id,
      name: account.name
    };
  }

  clearEditState() {
    this.selectedAccount = null;
  }

  closeModal(modalId: string) {
    const modalElement = document.getElementById(modalId);
    if (modalElement) {
      const modalInstance = (window as any).bootstrap?.Modal.getInstance(modalElement)
        || new (window as any).bootstrap.Modal(modalElement);
      modalInstance.hide();
    }
  }

  //  direct to transaction page
  goToTransactions(accountId: number) {
    this.router.navigate(['/transactions', accountId]);
  }
}
