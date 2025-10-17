using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Entities;

public class Transaction
{
    public int Id { get; set; }                 // Primary key
    public int AccountId { get; set; }          // Foreign key to Account
    public Account Account { get; set; }        // Navigation property
    public string Description { get; set; } = ""; // Optional description
    public decimal Amount { get; set; }         // Positive for credit, negative for debit
    public DateTime Date { get; set; } = DateTime.Now;
}
