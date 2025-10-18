import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Transaction {
  id: number;
  accountId: number;
  amount: number;
  type: string;
  date: string;            // Keep as string
  description?: string;    // optional
}

export interface NewTransaction {
  accountId: number;
  amount: number;
  type: string;
  description?: string | null; // allow null
  date: string;
}

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  private apiUrl = 'http://localhost:5000/api/transactions';

  constructor(private http: HttpClient) { }

  // Get all transactions for a specific account
  getTransactionsByAccount(accountId: number): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.apiUrl}/${accountId}`);
  }

  // Create a new transaction
  createTransaction(transaction: Partial<NewTransaction>): Observable<Transaction> {
    return this.http.post<Transaction>(this.apiUrl, transaction);
  }

}
