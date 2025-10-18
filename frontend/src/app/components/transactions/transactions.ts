import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountsService, Account } from '../../services/accounts';
import { TransactionsService, Transaction, NewTransaction } from '../../services/transactions';

@Component({
  selector: 'app-transactions-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './transactions.html',
  styleUrls: ['./transactions.css']
})
export class TransactionsComponent implements OnInit {

  accountId: number | null = null;
  account: Account | null = null;
  transactions: Transaction[] = [];

  newTransaction: NewTransaction = {
    accountId: 0,
    type: 'credit',
    amount: 0,
    description: '',
    date: '' // empty initially
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private accountsService: AccountsService,
    private transactionsService: TransactionsService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('accountId');
      if (id) {
        this.accountId = +id;
        this.newTransaction.accountId = +id;
        this.loadData();
      } else {
        this.router.navigate(['/accounts']);
      }
    });
  }

  loadData(): void {
    if (!this.accountId) return;

    this.accountsService.getAccount(this.accountId).subscribe({
      next: account => {
        this.account = account;
        this.transactionsService.getTransactionsByAccount(this.accountId!).subscribe({
          next: txs => {
            //Keep date as string and sort by converting to Date for sorting only
            this.transactions = txs.sort((a, b) =>
              new Date(b.date).getTime() - new Date(a.date).getTime()
            );
          },
          error: err => console.error('Failed to load transactions:', err)
        });
      },
      error: err => {
        console.error('Failed to load account:', err);
        this.router.navigate(['/accounts']);
      }
    });
  }

  addTransaction(): void {
    if (!this.accountId || this.newTransaction.amount <= 0) return;

    // Trim description and allow null
    const trimmedDescription = this.newTransaction.description ? this.newTransaction.description.trim() : '';

    const payload: NewTransaction = {
      accountId: this.accountId,                 // explicitly set accountId
      type: this.newTransaction.type,           // explicitly set type
      amount: this.newTransaction.amount,       // explicitly set amount
      date: this.newTransaction.date,           // explicitly set date
      description: trimmedDescription.length > 0 ? trimmedDescription : null // explicitly set description

    };

    this.transactionsService.createTransaction(payload).subscribe({
      next: () => {
        this.resetTransactionForm();
        this.loadData(); // refresh transactions and balance
      },
      error: err => {
        console.error('Failed to add transaction:', err);
        alert('Failed to add transaction. Check console.');
      }
    });
  }

  resetTransactionForm(): void {
    this.newTransaction = {
      accountId: this.accountId || 0,
      type: 'credit',
      amount: 0,
      description: '',
      date: '' // reset blank
    };
  }

  goBack(): void {
    this.router.navigate(['/accounts']);
  }

}
