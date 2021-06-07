using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SahraStudy.Controllers
{
    [Route("api/[controller]")]
    public class UsersController : Controller
    {

        private static List<User> Users = new List<User>(){ 
           new User() {Id = "125122312", Name = "name1", Surname = "soyad1", PhoneNumber = "905111111111" } };

        [HttpGet]
        public List<User> GetUsers()
        {
            return Users;
        }

        [HttpGet("[action]/{name}")]
        public  User GetUser (string id)
        {
            var user = Users.Find((v) => v.Id == id);
            
            if(user == null)
            {
                return null;
            }
            else
            {
                return user;
            }
        }

        [HttpPost]
        public IActionResult AddUser([FromBody] User item)
        {
            Users.Add(item);

            return Ok(new
            {
                success = true,
                returncode = "200"
            });
        }

        [HttpPut("{id}")]
        public IActionResult Update([FromBody] User user)
        {
            var userToUpdate = Users.Find((v) => v.Id == user.Id);

            if (userToUpdate == null)
            {
                return NotFound();
            }

            userToUpdate.Name = user.Name;
            userToUpdate.Surname = user.Surname;
            userToUpdate.PhoneNumber = user.PhoneNumber;

            return Ok(new
            {
                success = true,
                returncode = "200"
            });
        }

        [HttpDelete("{id}")]
        public IActionResult Delete([FromBody] User user)
        {
            var userToDelete = Users.Find((v) => v.Id == user.Id);

            if (userToDelete == null)
            {
                return NotFound();
            }

            Users.Remove(userToDelete);

            return Ok(new
            {
                success = true,
                returncode = "200"
            });
        }



        public class User
        {
            public string Id { get; set; }
            public string Name { get; set; }
            public string Surname { get; set; }
            public string PhoneNumber { get; set; }
        }
    }
}
