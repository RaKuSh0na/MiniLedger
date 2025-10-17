import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Account {
  id: number;
  name: string;
  balance: number;
}


@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  private apiUrl = 'http://localhost:5000/api/accounts'; //backend API URL

  constructor(private http: HttpClient) { }

  //get all account;
  getAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(this.apiUrl);
  }


  //GET account by id
  getAccount(id: number): Observable<Account> {
    return this.http.get<Account>(`${this.apiUrl}/${id}`);
  }

  // CREATE a new account
  createAccount(account: Partial<Account>): Observable<Account> {
    return this.http.post<Account>(this.apiUrl, account);
  }


  // UPDATE account (only name)
  updateAccount(id: number, account: Partial<Account>): Observable<Account> {
    return this.http.put<Account>(`${this.apiUrl}/${id}`, account);
  }

  // DELETE account
  deleteAccount(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
