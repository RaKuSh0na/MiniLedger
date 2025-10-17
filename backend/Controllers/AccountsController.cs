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
public class AccountsController(DataContext _context) : ControllerBase
{
    // GET: api/accounts
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Account>>> GetAccounts()
    {
        return await _context.Accounts.ToListAsync();
    }

    // GET: api/accounts/{id}
    [HttpGet("{id}")]
    public async Task<ActionResult<Account>> GetAccount(int id)
    {
        var account = await _context.Accounts
            .Include(a => a.Transactions)
            .FirstOrDefaultAsync(a => a.Id == id);

        if (account == null)
            return NotFound();

        return account;
    }

    // POST: api/accounts
    [HttpPost]
    public async Task<ActionResult<Account>> CreateAccount(Account account)
    {
        _context.Accounts.Add(account);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetAccount), new { id = account.Id }, account);
    }

    // PUT: api/accounts/{id}
    [HttpPut("{id}")]
    public async Task<ActionResult<Account>> UpdateAccount(int id, Account updatedAccount)
    {
        var account = await _context.Accounts.FindAsync(id);
        if (account == null)
            return NotFound("Account not found.");

        // Only update the Name
        account.Name = updatedAccount.Name;

        await _context.SaveChangesAsync();
        return Ok(account);
    }

    // DELETE: api/accounts/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteAccount(int id)
    {
        var account = await _context.Accounts.FindAsync(id);
        if (account == null)
            return NotFound();

        _context.Accounts.Remove(account);
        await _context.SaveChangesAsync();

        return NoContent();
    }

}
