#! /usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";

class Hero {
    static decreaseHealth() {}
    name : string;
    health : number = 100;

    constructor (name : string, health : number) {
        this.name = name;
        this.health = health
    };

    decreaseHealth () {
        this.health -= 25;
    };

    increaseHealth () {
        this.health = 100;
    };
}
class  Enemy {
    static decreaseHealth() {}
    name : string;
    health : number = 100;

    constructor (name : string, health : number) {
        this.name = name
        this.health = health
    }

    decreaseHealth () {
        this.health -= 25
    }
}

async function main() {
    const { heroName } = await inquirer.prompt({
        name : "heroName",
        type : "input",
        message : "Please enter your Hero's name"
    });

    console.log("\n");
    console.log(chalk.blueBright.underline.bold.italic(`##### WELCOME ${heroName} TO THE ADVENTURE GAME AS A HERO #####`));
    console.log("\n");

    const { enemyType } = await inquirer.prompt({
        name : "enemyType",
        type : "list",
        message : "Select your enemy",
        choices : ["Vampire", "Werewolf", "Ghost"]
    });


    const hero = new Hero(`${heroName}`, 100);
    const enemy = new Enemy(`${enemyType}`, 100);

    console.log(`${heroName} Encounters ${enemyType}`)

do {
    const { action } = await inquirer.prompt({
        name : "action",
        type : "list",
        message : "Choose your action",
        choices : ["Attack", "Defend", "Flee"]
    });


switch (action) {
    case "Attack":
        const randomNum = Math.random();
        if (randomNum > 0.5) {
            enemy.decreaseHealth();
            console.log(`${heroName}'s health: ${hero.health}`)
            console.log(`${enemyType}'s health: ${enemy.health}`)

            if (enemy.health <= 0) {
                console.log(chalk.greenBright("Congratulations! You won!"))
                return;
            }
        } else {
            hero.decreaseHealth();
            console.log(`${Hero.name}'s health: ${hero.health}`)
            console.log(`${Enemy.name}'s health: ${enemy.health}`)

            if (hero.health <= 0)  {
                console.log(chalk.redBright("You were defeated! Try Again!"))
                return;
            }
        }
        break; 
}

} while (true);
}
main()