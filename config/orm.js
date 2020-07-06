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
                CASE WHEN m.last_name is null then "None" else CONCAT(m.first_name, " ",m.last_name) END as manager
            
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
            CASE WHEN m.last_name is null then "None" else CONCAT(m.first_name, " ",m.last_name) END as manager
            
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
            CASE WHEN m.last_name is null then "None" else CONCAT(m.first_name, " ",m.last_name) END as manager
            
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
            .query(`SELECT title, id FROM role ORDER BY id;`, (err, data) => {
                if (err) {
                    reject(err);
                } else {

                    resolve(data)
                }
            })
    })
}

// Departments

const readAllDepartments = () => {
    return new Promise((resolve, reject) => {
        connection
            .query(`SELECT name, id FROM department ORDER BY id;`, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data)
                        ;
                }
            })
    })
}

// Employee

const readAllEmployees = () => {
    return new Promise((resolve, reject) => {
        connection
            .query(`SELECT id, first_name, last_name FROM employee ORDER BY id;`, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data)
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

// Department

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

// UPDATE FUNCTION 

// Role

const updateRole = (newRole, targetEmployee) => {
    return new Promise((resolve, reject) => {
        connection
            .query(`UPDATE employee SET role_id = ? WHERE id = ?`, [[newRole], [targetEmployee]], (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve({ msg: "Role successfully updated" })
                    console.log("Role successfully updated !")
                        ;
                }
            })
    })
}

// DELETE FUNCTION 

// Employee

const deleteEmployee = (id) => {
    return new Promise((resolve, reject) => {
        connection
            .query(`DELETE FROM employee WHERE id = ?`, [id], (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve({ msg: "Employee deleted" })
                    console.log("Employee deleted !")
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
    updateRole, // Update items to tables
    deleteEmployee, // Delete item from tables
}