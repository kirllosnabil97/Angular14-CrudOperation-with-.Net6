﻿using Fullstack.API.Models;
using Microsoft.EntityFrameworkCore;

namespace Fullstack.API.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<Employee> Employees { get; set; }
    }
}
