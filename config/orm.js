const connection = require("./connection")
const inquirer = require("inquirer");
// const console_table = require("console.table");

// READ ALL INFO

const readAllInfo = () => {
    return new Promise((resolve, reject) => {
        connection
            .query(`SELECT 
                employee.id AS id,
                employee.first_name,
                employee.last_name,
                role.title,
                role.salary,
                department.name as department,
                employee.manager_id as manager
            
                FROM employee
            
                LEFT JOIN role
                ON role_id = role.id
                
                
                LEFT JOIN department
                ON role.department_id = department.id
                
                LEFT JOIN employee m
                ON employee.manager_id = m.id`, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data)
                    console.table(data);
                    ;
                }
            })
    })
}

// ORDERED READ FUNCTIONS

// By role

const readByRole = () => {
    return new Promise((resolve, reject) => {
        connection
            .query(`SELECT 
            employee.id AS id,
            employee.first_name,
            employee.last_name,
            role.title,
            role.salary,
            department.name as department,
            employee.manager_id as manager
        
            FROM employee
        
            LEFT JOIN role
            ON role_id = role.id
            
            
            LEFT JOIN department
            ON role.department_id = department.id
            
            LEFT JOIN employee m
            ON employee.manager_id = m.id
            ORDER BY title`, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data)
                    console.table(data);
                    ;
                }
            })
    })
}


// By department

const readByDepartment = () => {
    return new Promise((resolve, reject) => {
        connection
            .query(`SELECT 
            employee.id AS id,
            employee.first_name,
            employee.last_name,
            role.title,
            role.salary,
            department.name as department,
            employee.manager_id as manager
        
            FROM employee
        
            LEFT JOIN role
            ON role_id = role.id
            
            
            LEFT JOIN department
            ON role.department_id = department.id
            
            LEFT JOIN employee m
            ON employee.manager_id = m.id
            ORDER BY department`, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data)
                    console.table(data);
                    ;
                }
            })
    })
}

// SIMPLE READ FUNCTIONS

// Roles

const readAllRoles = () => {
    return new Promise((resolve, reject) => {
        connection
            .query(`SELECT title FROM role ORDER BY id;`, (err, data) => {
                if (err) {
                    reject(err);
                } else {

                    let result = data.map(a => a.title);
                    resolve(result)
                    return result
                }
            })
    })
}

// Departments

const readAllDepartments = () => {
    return new Promise((resolve, reject) => {
        connection
            .query(`SELECT name FROM department ORDER BY id;`, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    let result = data.map(a => a.name);
                    resolve(result)
                    return result
                        ;
                }
            })
    })
}

// Employee

const readAllEmployees = () => {
    return new Promise((resolve, reject) => {
        connection
            .query(`SELECT first_name, last_name FROM employee ORDER BY id;`, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    let result = data.map(a => a.last_name);
                    resolve(result)
                    return result
                        ;
                }
            })
    })
}

// ADD FUNCTIONS

// Employee

const addNewEmployee = (employeeInfo) => {
    return new Promise((resolve, reject) => {
        connection
            .query(`INSERT INTO employee SET ?`, [employeeInfo], (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve({ msg: "Employee Successfully added" })
                    console.log("Employee Successfully added !")
                        // console.table(employeeInfo);
                        ;
                }
            })
    })
}

// Role

const addNewRole = (roleInfo) => {
    return new Promise((resolve, reject) => {
        connection
            .query(`INSERT INTO role SET ?`, [roleInfo], (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve({ msg: "Role Successfully added" })
                    console.log("Role Successfully added !")
                        ;
                }
            })
    })
}

// Role

const addNewDepartment = (departmentInfo) => {
    return new Promise((resolve, reject) => {
        connection
            .query(`INSERT INTO department SET ?`, [departmentInfo], (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve({ msg: "Department Successfully added" })
                    console.log("Department Successfully added !")
                        ;
                }
            })
    })
}

// EXPORTED FUNCTIONS 

module.exports = {
    readAllInfo, // Joined table
    readAllEmployees, readAllRoles, readAllDepartments, // Simple read
    readByRole, readByDepartment, // Ordered list
    addNewEmployee, addNewRole, addNewDepartment, // Add items to tables
}