using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace backend.Entities;

public class Transaction
{
    public int Id { get; set; }

    public int AccountId { get; set; }
    [JsonIgnore]
    public Account? Account { get; set; }

    public decimal Amount { get; set; }

    // NEW: Credit or Debit
    public string Type { get; set; } = "credit"; // default credit

    public DateTime Date { get; set; } = DateTime.Now;

    public string? Description { get; set; } 
}