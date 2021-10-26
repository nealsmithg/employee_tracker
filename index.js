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
    let depts = [];
    db.query('select * from department;' , function (err, results) {
        results.forEach(element => {
            depts.push({name: `${element.name}`, value: `${element.id}`},);
        });
    console.log(depts);
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
                type: "input",
                name: "id",
                message: "What is the roles id?",
                validate: async (input) => {
                    if (!input){
                        return "Please enter an id.";
                    }
                    return true;
                }
            },
            {
                type: "input",
                name: "salary",
                message: "What is the salary of the role?",
                validate: async (input) => {
                    if (!input){
                        return "Please enter a salary.";
                    }
                    return true;
                }
            },
            {
                type: "list",
                name: "dept_id",
                message: "What is id for the department this role is in?",
                choices: depts
            }]
        )
        .then((response) => {
            db.query(`insert into roles (id, title, salary, department_id) value (${response.id}, "${response.title}", ${response.salary}, ${response.dept_id})`);
            console.log(`Role ${response.title} added.`);
            hold();
        })
    })
};

function addEmployee (){
    let role_name = [];
    let managers_names = [{name: "none", value: null}];
    db.query('select roles.id, roles.title from roles;' , function (err, results) {
        results.forEach(element => {
            role_name.push({name: `${element.title}`, value: `${element.id}`},);
        });
        db.query('select concat(employee.first_name, " ", employee.last_name) as "name", employee.id, employee.manager_id from employee;', function (err,results) {
            results.forEach(element => {
                if (!element.manager_id){
                    managers_names.push({name: `${element.name}`, value: `${element.id}`},);
                }
            })
            inquirer
                .prompt(
                    [{
                        type: "input",
                        name: "first_name",
                        message: "What is the employee's first name?"
                    },
                    {
                        type: "input",
                        name: "last_name",
                        message: "What is the employee's last name?"
                    },
                    {
                        type: "list",
                        name: "role",
                        message: "What role does this employee have?",
                        choices: role_name
                    },
                    {   
                        type: "list",
                        name: "manager",
                        message: "Who is the manager for this employee?",
                        choices: managers_names
                    }]
                )
            .then ((response) => {
                let name = response.first_name + " " + response.last_name;
                db.query(`insert into employee (first_name, last_name, roles_id, manager_id) value ("${response.first_name}", "${response.last_name}", ${response.role}, ${response.manager})`);
                console.log(response.first_name, response.last_name, response.role, response.manager);
                console.log(`Employee ${name} added.`);
                hold();
            })
        })
    })
};

function updateRole(){
    let employees = [];
    let roles = [];
    db.query('select concat(employee.first_name, " ", employee.last_name) as "name", employee.id from employee;', function (err,results) {
        results.forEach(element => {
                employees.push({name: `${element.name}`, value: `${element.id}`},);
        })
        db.query('select roles.id, roles.title from roles;', function (err,results) {
            results.forEach(element => {
                    roles.push({name: `${element.title}`, value: `${element.id}`},);
            })
            inquirer
                .prompt(
                    [{
                        type: "list",
                        message: "Who would you like to update the role for?",
                        name: "id",
                        choices: employees
                    },
                    {
                        type: "list",
                        message: "What role would you like to give this person?",
                        name: "role_id",
                        choices: roles
                    }]
                )
                .then((response) => {
                    db.query(`update employee set roles_id = ${response.role_id} where id = ${response.id}`);
                    console.log("Employee role updated.")
                    hold();
                })
        })
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

            case "Add a role" : addRole ();
                break;

            case "Add an employee" : addEmployee();
                break;

            case "Update an employee role" : updateRole();
                break;

            case "Quit" : process.exit(1);

        };
    });
};

init();
