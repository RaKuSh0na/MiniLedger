using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Data;
using backend.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TransactionsController : ControllerBase
{
    private readonly DataContext _context;

    public TransactionsController(DataContext context)
    {
        _context = context;
    }

    // GET: api/transactions/{accountId}
    [HttpGet("{accountId}")]
    public async Task<ActionResult<IEnumerable<Transaction>>> GetTransactions(int accountId)
    {
        var account = await _context.Accounts
            .Include(a => a.Transactions)
            .FirstOrDefaultAsync(a => a.Id == accountId);

        if (account == null)
            return NotFound("Account not found.");

        return account.Transactions
            .OrderBy(t => t.Date)
            .ToList();
    }

    // POST: api/transactions
    [HttpPost]
    public async Task<ActionResult<Transaction>> AddTransaction([FromBody]Transaction transaction)
    {
        var account = await _context.Accounts.FindAsync(transaction.AccountId);
        if (account == null)
            return BadRequest("Account not found.");

        // Update running balance
        if (transaction.Type?.ToLower() == "credit")
            account.Balance += transaction.Amount;
        else if (transaction.Type?.ToLower() == "debit")
            account.Balance -= transaction.Amount;
        else
            return BadRequest("Transaction type must be 'credit' or 'debit'.");

        transaction.Date = DateTime.UtcNow;

        _context.Transactions.Add(transaction);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetTransactions), new { accountId = transaction.AccountId }, transaction);
    }
}
