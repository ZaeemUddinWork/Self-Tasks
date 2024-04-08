#! /usr/bin/env node

//importing inquirer
import inquirer from "inquirer";
//importing chalk
import chalk from "chalk";

// <!.. ---------------  Program start here --------------- ..!>

// <!.. -------  interface for game start here -------- ..!>
interface game {
  username: string;
  want_to_start: string;
  start: string;
  Shop: string;
  cheat_box:boolean
}
// <!.. -------  interface for game end here -------- ..!>

// <!.. -----------  User info for game start here -------------- ..!>

//this will just ask user or player name
let userinfo: game = await inquirer.prompt([
  {
    name: "username",
    type: "input",
    message: chalk.bold.cyanBright(`Enter Player name:`),
    default: `Spider-Man`,
  },
]);
let { username } = userinfo; //assigining inside variable of userinfo.username to username
// <!.. -----------  User info for game end here -------------- ..!>

// <!.. -----------  Number generator for index of the game start here -------------- ..!>
//this function will generate number for anything but here it is for index that will give between 0 - 2 for game.

function auto_number(max: number, min: number): number {
  let bal: number = Math.floor(Math.random() * (max - min + 1)) + min;
  return bal;
}
//array for for bot option bot will select option between this choises and this wil be done by number generator

let bot_game = ["Rock", "Scissor", "Paper"];

// <!.. -----------  Number generator for index of the game end here -------------- ..!>

// <!.. -----------  Assigining Variable for game start here -------------- ..!>

let loop: boolean = true;

let level: number = 0;//level for game

let points: number = 0;//points of game with this you can purchase items

let score: number = 0;//score similar to level this will just count how many time you won

let Cheat: boolean = false;//item of shop

let Revive: boolean = false;// another item of shop

// <!.. -----------  Assigining Variable for game end here -------------- ..!>

// <!.. -----------  While loop for game start here -------------- ..!>
while (loop) {
  let index: number = auto_number(2, 0);//assigning number between 0-2 with the help of number generator 

  // <!.. -----------  Title or manue of game start here -------------- ..!>
//this will print all data related to game how many time you won point and score
  console.log(
    chalk.bold.greenBright(`\n
.x.x.x.x.x.x.x.x.x.x.x.x.x..x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.

            -: Welcome to the Rock Scissor Paper Game :-

 \tPlayer name: ${chalk.bold.yellow(
   username
 )} \t|| \tGame Level:${chalk.bold.yellow(level)}
 \tCurrent points:${chalk.bold.yellow(
   points
 )}   \t|| \tPlayer score:${chalk.bold.yellow(score)}

 .x.x.x.x.x.x.x.x.x.x.x.x.x..x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.

`)
  );

  // <!.. -----------  Title or manue of game end here -------------- ..!>

  //giving option to user to select what you want to do 
  let start_game: game = await inquirer.prompt([
    {
      name: "want_to_start",
      type: "list",
      message: chalk.bold.cyanBright(`Select from option:`),
      choices: ["Start Game", "Shop", "Game Info", "Quit Game"],
    },
    
  ]);
  let { want_to_start } = start_game;

  // <!.. -----------  Result chacking Engine start here -------------- ..!>

  if (want_to_start === "Start Game") {

    let game_box = await inquirer.prompt([
      {
        //if player buy cheat ball this option will work 
        //this will show answer for only one time 
        name: "cheat_box",
        type: "list",
        message: chalk.bold.magenta(`
            -/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-
               !! Cheat ball has been used !!
               Bot Answer will be: ${chalk.bold.yellow(bot_game[index])}
            -/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-
  
            `),
        choices: ["Start"],
        when(start_game) {
          return Cheat === true;
        },
      },
      {
        //if player select start game than this will work and ask player to select option
        name: "start",
        type: "list",
        message: chalk.bold.cyanBright(`
            -x.-x.-x.-x.-x.-x.-x.-x.-x.-x.-x.-x.-x.
              
                Rock Scissor Paper 1.2.3:
  
            -x.-x.-x.-x.-x.-x.-x.-x.-x.-x.-x.-x.-x.
  
            `),
        choices: ["Rock", "Scissor", "Paper"],
        
      },
    ])

    let {cheat_box,start} = game_box
    if (//this will check all this conditiopn than tell user win, tie or lose the game.
      (start === "Paper" && bot_game[index] === "Rock") ||
      (start === "Scissor" && bot_game[index] === "Paper") ||
      (start === "Rock" && bot_game[index] === "Scissor")
    ) {
      points += 2;//player will gain 2 point after win 
      score++;
      level++;

      console.log(
        chalk.bold.cyanBright(`\n
        .x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.

                    -: Congratulations you Win :-
                      You clear Level: ${chalk.bold.yellow(level)}
                      !! You got 2 point !!
                      !! Total points:${chalk.bold.yellow(points)} !!
                      !! Score is ${chalk.bold.yellow(score)} !! 
        .x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.
        `)
      );

      Cheat = false;//cheat will trun to false if it was used
      loop = true;
    } else if (start === bot_game[index]) {//if player option match with bot option than game will be tie
      points += 1;
      console.log(
        chalk.bold.yellowBright(`\n
        .x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.

                        -: Game Tie :-
                       !! You got 1 point !!
                           Total points:${chalk.bold.cyanBright(points)} 

        .x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.
        `)
      );

      Cheat = false;//cheat will trun to false if it was used
      loop = true;
    } else {
      //if player used revive ball than after lose the game he can't lose data of game 
      if (Revive === true) {
        points += 1;
        console.log(
          chalk.bold.italic.magenta(`\n
          .x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.
                 <!> Revive Ball has been used <!>
                          -: You lose :-
                        !! You got 1 point !!
                          !! Total points:${chalk.bold.cyanBright(points)} !!

          .x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.
          `)
        );
        Revive = false;//REvive will trun to false if it was used
      } else {//if player haven't revive ball than he will lose all data 
        level = 0;
        score = 0;
        points -= 1;//point will be deducted by 1
        points < 0 ? (points = 0) : points;//this will check if point are going in negetive point than turn into zero

        console.log(
          chalk.bold.redBright(`\n
                .x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.

                                -: You lose :-
                       !! Your point deducted (1)point !!
                         !! Total points:${chalk.bold.cyanBright(points)} !!

                .x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.
                `)
        );
      }
    }
  }
  // <!.. -----------  Result chacking Engine end here -------------- ..!>

  // <!.. ----------- Shop start here -------------- ..!>
  else if (want_to_start === "Shop") {//shop program is start from here
    let inner_loop: boolean = true;//inner loop for shop this will repeat 
    while (inner_loop) {
      let Shop_list = await inquirer.prompt([
        {
          name: "Shop_item",
          type: "list",
          message: chalk.bold.cyanBright(`\n\n
            .-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
                    :Welcome To Points Shop:
                    -: Price of all items :-
              Cheat Ball: ${chalk.bold.yellow(8)}
              Revive ball: ${chalk.bold.yellow(4)}

              Current points:${chalk.bold.yellow(points)}
            .-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
            `),
          choices: ["Cheat Ball", "Revive ball", "Exit"],//there are only 2 items in game
        },
      ]);
      let { Shop_item } = Shop_list;
      let price;
      Shop_item === "Cheat Ball" ? (price = 8) : (price = 4);//this will check that what user selected if  chect ball than price wll be 8 other wise 4

      if (Shop_item == "Cheat Ball" || Shop_item == "Revive ball") {
        //this will confirm that you really want to buy it or not 
        let confirm = await inquirer.prompt([
          {
            name: "confirmation",
            type: "list",
            message: chalk.bold.yellow(
              `It will cost ${chalk.cyan(price)} Do you can to buy ${chalk.cyan(
                Shop_item
              )}?`
            ),
            choices: ["Yes", "No"],
          },
        ]);
        let { confirmation } = confirm;
        //condition for confiramation and point and price checking
        if (confirmation == "Yes" && points >= price) {
          console.log(
            chalk.greenBright(`\n
            -----------------------------------
                 Purchased successfully !!
            -----------------------------------`)
          );
          price == 8 ? (Cheat = true) : (Revive = true);
          points -= price;
          inner_loop = false;
        } else if (confirmation == "No") {
          inner_loop = true;
        } else {
          console.log(
            chalk.redBright(`\n
            -----------------------------------
            You haven't Point to purchase it !!
            -----------------------------------
            `)
          );
          inner_loop = true;
        }
      } else {
        inner_loop = false;
      }
    }
  }
  // <!.. ----------- Shop end here -------------- ..!>

  // <!.. ----------- Game Info start here -------------- ..!>
  else if (want_to_start === "Game Info") {//game info is here here we told all the relue related to our game 
    console.log(
      chalk.yellowBright(`
        -/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-
                              -: Game Info :-

          > This is Rock Scissor Paper Game with some addition items 
            (Cheat ball,Revive ball).

          > When you purchase items mean you are using it for next 
            game that you will play.

          > If you lose the game then your game level and score 
            will be zero but your point will only deducted by 1 point.
          
          > Cheat ball: by using cheat ball you can cheat the game for
                        one time.

          > Revive ball: By using Revive ball after losing one game 
                         you will not lose your data for losing 
                         that game.
          >Simple rule: If Paper vs Rock = Paper win.
                        If Scissor vs Paper = Scissor win.
                        If Rock vs Scissor = Rock win.

        -/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-

        `)
    );
    //this will ask to go back to main menu
    let go_back = await inquirer.prompt({
      name: "goback",
      type: "list",
      message: "...",
      choices: ["Go Back"],
    });
    loop = true;
  }
  // <!.. ----------- Game Info end here -------------- ..!>

  // <!.. ----------- Quit game start here -------------- ..!>
  else if (want_to_start === "Quit Game") {
    loop = false;
  }
  // <!.. ----------- Quit game start here -------------- ..!>

  // <!.. ----------- For error -------------- ..!>
  else {
    console.log(
      chalk.bold.redBright(`\n
      .x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.

                   -: Select Proper option :-

      .x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.
      `)
    );
  }
}
// <!.. -----------  While loop for game end here -------------- ..!>

// <!.. -----------  credit for game start here -------------- ..!>
//after end of program it will print this credit
console.log(
  chalk.bold.cyan(`
\n\n
.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.

          Thanks For Checking my program !!
                -:Follow me on:-
  Github: https://github.com/ZaeemUddinWork
  Linkedin: https://www.linkedin.com/in/zaeem-uddin/
  

.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.x.
`)
);
// <!.. -----------  credit for game end here -------------- ..!>
