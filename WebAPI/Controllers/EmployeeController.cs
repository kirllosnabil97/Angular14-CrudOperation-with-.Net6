using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using WebAPI.Model;

namespace WebAPI.Controllers
{
    [Route("api/[controller]/[Action]")]
    
    public class EmployeeController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public EmployeeController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: Employee

        [HttpGet(Name = "GetEmployee")]
        public async Task<ActionResult<IEnumerable<Employee>>> GetEmployee()
        {
            //   return View(await _context.Employees.ToListAsync());
            var employees = (from e in _context.Employees
                             join d in _context.Designations
                             on e.DesignationID equals d.Id

                             select new Employee
                             {
                                 Id = e.Id,
                                 Name = e.Name,
                                 LastName = e.LastName,
                                 Email = e.Email,
                                 Age = e.Age,
                                 DesignationID = e.DesignationID,
                                 Designation = d.DesignationName,
                                 Doj = e.Doj,
                                 Gender = e.Gender,
                                 IsActive = e.IsActive,
                                 IsMarried = e.IsMarried
                             }
                            ).ToListAsync();

            return await employees;
        }

        [HttpGet("{id}",Name = "GetEmployeeById")]
        public async Task<ActionResult<Employee>> GetEmployeeById(int? id)
        {
            if (id == null || _context.Employees == null)
            {
                return NotFound();
            }

            var employee = await _context.Employees
                .FirstOrDefaultAsync(m => m.Id == id);
            if (employee == null)
            {
                return NotFound();
            }

            return employee;
        }

        [HttpPost(Name = "CreateEmployee")]
        public async Task<IActionResult> CreateEmployee(Employee employee)
        {
           
                _context.Add(employee);
                await _context.SaveChangesAsync();
                return CreatedAtAction("GetEmployeeById", new { id = employee.Id }, employee);

          
        }

        [HttpPut("{id}",Name = "EditEmployee")]
        public async Task<ActionResult<Employee>> EditEmployee(int id,Employee employee)
        {
            if (id != employee.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(employee);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!EmployeeExists(employee.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return NoContent();
            }
            return employee;
        }

        [HttpDelete("{id}",Name = "DeleteEmployee")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            if (_context.Employees == null)
            {
                return Problem("Entity set 'ApplicationDbContext.Employees'  is null.");
            }
            var employee = await _context.Employees.FindAsync(id);
            if (employee != null)
            {
                _context.Employees.Remove(employee);
            }
            
            await _context.SaveChangesAsync();
            return (IActionResult)employee;
        }

        private bool EmployeeExists(int id)
        {
          return _context.Employees.Any(e => e.Id == id);
        }
    }
}
