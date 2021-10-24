const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");
const logo = require("asciiart-logo");
const db = require("./db/connection");


console.log(logo({name: "Employee Manager"}).render());

function hold (){
    inquirer
        .prompt([{type: "confirm", name :"continue", message: "continue"}])
        .then((response) => {if(response.continue){init()}else{process.exit(1)}});
}

function viewAllDept (){
    db.query('select * from department' , function (err, results) {
        console.table(results);
        hold();
      });
}

function viewAllRoles (){
    db.query('select roles.id, roles.title, roles.salary, department.name from roles join department on   department.id = roles.department_id;' , function (err, results) {
        console.table(results);
        hold();
      });
}

function viewAllEmployees (){
db.query('select e.id, concat(e.first_name, " ", e.last_name) as "Name", roles.title, department.name, roles.salary, concat(m.first_name, " ", m.last_name) as "Manager Name" from employee e left join employee m on e.manager_id = m.id join roles on e.roles_id = roles.id join department on department.id = roles.department_id order by e.id asc;' , function (err, results) {
        console.table(results);
        hold();
      });
}
function addDepartment (){
    inquirer
        .prompt(
            [{
                type: "input",
                name: "dept",
                message: "What is the name of the department?",
                validate: async (input) => {
                    if (!input){
                        return "Please enter a department name.";
                    }
                    return true;
                }
            }]
        )
        .then((response) => {
            console.log(response.dept)
        })
}

function init(){
    inquirer
        .prompt(
            [{
            type: "list",
            message: "What would you like to do?",
            name: "todo",
            choices: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update an employee role", "Quit"]
            }]
        )
    .then((response) => {
        switch (response.todo){
            case "View all departments" : viewAllDept ();
                break;

            case "View all roles" : viewAllRoles ();
                break;

            case "View all employees" : viewAllEmployees ();
                break;

            case "Add a department" : addDepartment ();
                break;

            case "Add a role" :
                break;

            case "Add an employee" :
                break;

            case "Update an employee role" :
                break;

            case "Quit" : process.exit(1);
                break;

        }
    })
}

init();
