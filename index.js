#! /usr/bin/env node
//importing inquirer
import inquirer from "inquirer";
//importing chalk
import chalk from "chalk";
//title
console.log(chalk.bold.yellow(`!! Create Mark Sheet !!`));
let marks = [];
//taking some data from user like name roll no 
let data = await inquirer.prompt([
    {
        name: "Student_name",
        type: "input",
        message: "Enter Student: ",
    },
    {
        name: "Roll_no",
        type: "number",
        message: "Enter your Roll number: ",
    },
]);
//list of Subject
let subject = [
    "English",
    "Social Studies",
    "Math",
    "Urdu",
    "Physics",
    "Chemistry",
    "Computer",
    "Biology",
];
for (let i = 0; i < 8; i++) {
    //taking all subject marks from user
    let subject_n_marks = await inquirer.prompt([
        {
            name: "Sunject_no",
            type: "number",
            message: `Enter ${subject[i]} No: `
        }
    ]);
    marks.push(subject_n_marks.Sunject_no); //pusing all to array to save all marks
}
//now going to add all subject marks to calculate percentage
let total_obtail = marks.reduce((total, number) => total + number, 0);
let total_marks = marks.length * 100; //total marks 
let percentage = total_obtail / marks.length; //percentage formula to calculate percentage
if (marks.every(number => number <= 100 && number >= 0)) // Each subject in under 100 so it will go further other wise it will give error
 {
    Result();
}
else {
    console.log(chalk.red(`\n\nEach Subject number should be less than 100 nad greater than 0`));
}
async function Result() {
    let grade;
    if (percentage > 80 && percentage < 100) {
        grade = "A+";
    }
    else if (percentage > 70 && percentage < 80) {
        grade = "A";
    }
    else if (percentage > 60 && percentage < 70) {
        grade = "B";
    }
    else if (percentage > 50 && percentage < 60) {
        grade = "C";
    }
    else if (percentage > 40 && percentage < 50) {
        grade = "D";
    }
    else if (percentage > 30 && percentage < 40) {
        grade = "E";
    }
    else if (percentage > 100) {
        grade = chalk.red("Enter Proper Marks");
    }
    else {
        console.log(chalk.red(`Fail`));
    }
    console.log(`
-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-
\t\t\tMark Sheet
Student name: ${chalk.yellow(data.Student_name)}
Roll No: ${chalk.yellow(data.Roll_no)}
-------------------------------------------------------
Subjects :
`);
    for (let i = 0; i < subject.length; i++) {
        console.log(`${subject[i]}: ${chalk.yellow(marks[i])}`);
    }
    console.log(`
Total marks: ${chalk.yellow(total_marks)}
Obtain marks: ${chalk.yellow(total_obtail)}
Percentage: ${chalk.yellow(percentage.toFixed(2) + "%")}
Grade: ${chalk.yellow(grade)}
---------------------------------------------------------
` + chalk.greenBright(`Thanks for Use my program 
Follow on GIthub : https://github.com/ZaeemUddinWork`) + `
-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-
  `);
}
