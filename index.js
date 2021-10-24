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
};

function viewAllDept (){
    db.query('select * from department' , function (err, results) {
        console.table(results);
        
        hold();
      });
};

function viewAllRoles (){
    db.query('select roles.id, roles.title, roles.salary, department.name from roles join department on   department.id = roles.department_id;' , function (err, results) {
        console.table(results);
        hold();
      });
};

function viewAllEmployees (){
db.query('select e.id, concat(e.first_name, " ", e.last_name) as "Name", roles.title, department.name, roles.salary, concat(m.first_name, " ", m.last_name) as "Manager Name" from employee e left join employee m on e.manager_id = m.id join roles on e.roles_id = roles.id join department on department.id = roles.department_id order by e.id asc;' , function (err, results) {
        console.table(results);
        hold();
      });
};

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
            db.query(`insert into department (name) value ("${response.dept}")`);
            console.log(`Department ${response.dept} added.`);
            hold();
        })
};

function addRole (){
    inquirer
        .prompt(
            [{
                type: "input",
                name: "title",
                message: "What is the name of the role you want to add?",
                validate: async (input) => {
                    if (!input){
                        return "Please enter a role name.";
                    }
                    return true;
                }
            },
            {
                type: "number",
                name: "id",
                message: "What is the roles id?",
                validate: function (name) {
                    var valid = Number.isInteger(name)
                    return valid || `Please enter a valid whole number`
                },
            },
            {
                type: "input",
                name: "salary",
                message: "What is the salary of the role?",
                validate: async (input) => {
                    if (!Number.isInteger(input)){
                        return "Please enter a number";
                    };
                    return true;
                }
            },
            {
                type: "input",
                name: "dept_id",
                message: "What is id for the department this role is in?",
                validate: async (input) => {
                    if (!Number.isInteger(input)){
                        return "Please enter a number";
                    };
                    db.query('select * from department' , function (err, results) {
                        results.forEach(element => {
                            if (element.id === input){
                                return true;
                            }
                            return "Please enter a department id.";
                        });
                    })
                }
            }]
        )
        .then((response) => {
            db.query(`insert into roles (id, title, salary, department_id) value (${response.id}, "${response.title}", ${response.salary}, ${response.dept_id})`);
            console.log(`Role ${response.title} added.`);
            hold();
        })
};

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

            case "Add a role" : addRole ();
                break;

            case "Add an employee" :
                break;

            case "Update an employee role" :
                break;

            case "Quit" : process.exit(1);

        };
    });
};

init();
