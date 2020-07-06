// const mysql = require("mysql");
const inquirer = require("inquirer");
// const console_table = require("console.table");
const { readAllInfo, readAllEmployees, readAllRoles, readAllDepartments, addNewEmployee, readByRole, readByDepartment, addNewRole, addNewDepartment } = require("./config/orm");
const connection = require("./config/connection");

// Init function 

mainMenu()

// Main prompt to start the session

function mainMenu() {
    inquirer.prompt([{
        name: "mainMenu",
        message: "What would you like to do?",
        type: "list",
        choices: ["View all employees", "View all employees by department", "View all employees by role", "View company information", "Add employee", "Add department", "Add role", "Update employee role", "Exit"]
    }]).then((res) => {
        switch (res.mainMenu) {
            case "Exit":
                connection.end();
                process.exit();
            case "View all employees":
                readAllInfo().then((res) => {
                    // console.log(res);
                    mainMenu()
                })
                break
            case "View all employees by department":
                readByDepartment().then((res) => {
                    mainMenu()
                })
                break
            case "View all employees by role":
                readByRole().then((res) => {
                    mainMenu()
                })
                break
            case "Add employee":
                addEmployee()
                break
            case "Add role":
                addRole()
                break
            case "Add department":
                addDepartment()
                break

            default:
                break

        }
    })
}

// Function to start prompt for add Employee

const addEmployee = async () => {
    try {
        let roleList = await readAllRoles()
        let employeeList = await readAllEmployees()

        inquirer.prompt([
            {
                name: "employeeFname",
                message: "Enter the first name?",
                type: "input",
            },
            {
                name: "employeeLname",
                message: "Enter the last name?",
                type: "input",
            },
            {
                name: "employeeRole",
                message: "What role?",
                type: "list",
                choices: roleList
            },
            {
                name: "employeeManager",
                message: "Who is the manager for this employee?",
                type: "list",
                choices: employeeList
            },
        ]).then((res) => {

            const first_name = res.employeeFname
            const last_name = res.employeeLname
            const role_id = roleList.indexOf(res.employeeRole) + 1
            const manager_id = employeeList.indexOf(res.employeeManager) + 1

            const final_employee = { first_name, last_name, role_id, manager_id }

            addNewEmployee(final_employee)
            mainMenu()
        })
    } catch (err) {
        console.log({ error: err });

    }
}

// Function to start prompt to add a Role

const addRole = async () => {
    try {
        let departmentList = await readAllDepartments()
        inquirer.prompt([
            {
                name: "roleTitle",
                message: "Can you enter the Title for this role?",
                type: "input",
            },
            {
                name: "salary",
                message: "Can you input the annual salary for this role?",
                type: "number",
            },
            {
                name: "department",
                message: "What is the department for this role?",
                type: "list",
                choices: departmentList
            },
        ]).then((res) => {

            const title = res.roleTitle
            const salary = res.salary
            const department_id = departmentList.indexOf(res.department) + 1

            const final_role = { title, salary, department_id }

            addNewRole(final_role)
            mainMenu()
        })
    } catch (err) {
        console.log({ error: err });

    }
}

// Function to start prompt to add a Role

const addDepartment = async () => {
    try {
        inquirer.prompt([
            {
                name: "departmentName",
                message: "Can you enter the name of your department?",
                type: "input",
            },
        ]).then((res) => {

            const name = res.departmentName

            const final_department = { name }

            addNewDepartment(final_department)

            mainMenu()
        })
    } catch (err) {
        console.log({ error: err });

    }
}