//importing inquirer
import inquirer from "inquirer";
//importing chalk
import chalk from "chalk";
console.log(chalk.bold.greenBright(`
-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-
\t\t!! Words Counter !!`));
let username = await inquirer.prompt([
    {
        name: "name",
        type: "input",
        message: "Enter your name: ",
    },
]);
async function word_counter() {
    let paragraph = await inquirer.prompt([
        {
            name: "pera",
            type: "input",
            message: "write a paragraph or a sentence: ",
        },
        {
            name: "question",
            type: "list",
            message: "Select the Option: ",
            choices: ["Words Count", "Letters Count", "Both"],
        },
    ]);
    if (paragraph.question === "Words Count") {
        let sentence = paragraph.pera;
        let Words = sentence.split(" ");
        console.log(chalk.bold.yellow(`\n${username.name},You have ${Words.length} words inside your sentence or paragraph.`));
    }
    else if (paragraph.question === "Letters Count") {
        let sentence = paragraph.pera;
        let letters = sentence.replace(/\s/g, "");
        console.log(chalk.bold.yellow(`\n${username.name},You have ${letters.length} letters inside your sentence or paragraph.`));
    }
    else if (paragraph.question === "Both") {
        let sentence = paragraph.pera;
        let letters = sentence.replace(/\s/g, "");
        let Words = sentence.split(" ");
        console.log(chalk.bold.yellow(`
   \n${username.name},You have ${Words.length} words and ${letters.length} letters 
   inside your sentence or paragraph.`));
    }
    else {
        console.log(chalk.bold.red(`\n\n!! Select Proper option !!`));
    }
    async function want_to_do_again() {
        let question = await inquirer.prompt([
            {
                name: "want_again",
                type: "list",
                message: "Want to count words and letter again: ",
                choices: ["Yes", "No"],
            },
        ]);
        if (question.want_again === "Yes") {
            chalk.bold.greenBright(`
-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-
`);
            word_counter();
        }
        else {
            console.log(chalk.bold.greenBright(`
            Thank you for Check my Program
            Follow: https://github.com/ZaeemUddinWork
-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-
`));
        }
    }
    want_to_do_again();
}
word_counter();
