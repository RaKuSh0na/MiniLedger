using System.Collections.Generic;

namespace backend.Entities
{
    public class Account
    {
        public int Id { get; set; }
        public string Name { get; set; } = "";
        public decimal Balance { get; set; } = 0;

        // Navigation property
        public List<Transaction> Transactions { get; set; } = new();
    }
}