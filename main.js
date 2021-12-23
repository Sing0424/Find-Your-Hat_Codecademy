const prompt = require('prompt-sync')({ sigint: true });


const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

// class GameStatus {
//     constructor(location = new Location, field = new Map) {
//         this.status;
//         this.location = {
//             x: location.location.x,
//             y: location.location.y,
//         }
//         this.field = field
//     }
// }

class RunGame {
    constructor() {
        this.playstat;
    }
    play() {
        this.playstat = true;
        this.generateField(this.HardMode());
        while (playstat) {
            this.print();
            this.Move();
            if (!this.checkBoundary()) {
                console.log('You fell outside!');
                playstat = false;
                break;
            } else if (this.checkHolefell()) {
                console.log('You fell in the hole!');
                playstat = false;
                break;
            } else if (this.checkHatfound()) {
                console.log('You found the Hat!');
                playstat = false;
                break;
            }
            this.field[this.posY][this.posX] = pathCharacter;
        }
    }

}

class Location {
    constructor() {
        this.location = {
            x: null,
            y: null,
        }
    }
}

// class Direction {
//     constructor() {
//         this.location = {
//             x: null,
//             y: null
//         }
//     }

// }

class Difficulty {
    constructor() {
            this.percentage;
        }
        //method - decide difficulty
    HardMode() {
        const askHardMode = prompt('Hard Mode?(Y/N)').toUpperCase();
        switch (askHardMode) {
            case 'Y':
                this.percentage = 0.2;
                return this.percentage;
                break;
            case 'N':
                this.percentage = 0.1;
                return this.percentage;
                break;
            default:
                console.log('Please type Y/N');
                this.HardMode();
                break;
        }
    }
}

class Map { // converted from Field
    constructor(percentage = new Difficulty) {
        this.MapSizeHeight = 7;
        this.MapSizeWidth = 13;
        this.hat = '^';
        this.hole = 'O';
        this.fieldCharacter = '░';
        this.pathCharacter = '*';
        this.percentage = percentage.HardMode();

    }

    //method - gen random map
    generateField() {
        const genMap = [];
        // this.posX = Math.floor(Math.random() * this.MapSizeWidth);
        // this.posY = Math.floor(Math.random() * this.MapSizeHeight);
        let randomPosX = Math.floor(Math.random() * this.MapSizeWidth);
        let randomPosY = Math.floor(Math.random() * this.MapSizeHeight);
        let hatOnPos = false;
        for (let h = 0; h < this.MapSizeHeight; h++) {
            genMap.push([]);
            for (let w = 0; w < this.MapSizeWidth; w++) {
                let randomSymbol = Math.random();
                if (randomSymbol > this.percentage) {
                    genMap[h].push(this.fieldCharacter);
                } else {
                    genMap[h].push(this.hole);
                }
            }
        }
        genMap[this.posY][this.posX] = this.pathCharacter;
        while (!hatOnPos) {
            if (randomPosY != this.posY && randomPosX != this.posX) {
                genMap[randomPosY][randomPosX] = this.hat;
                hatOnPos = true;
            }
        }
        return genMap;
    }

}
// const map1 = new Map
// console.log(map1.generateField())

class Game {
    constructor(field = new Map, location = new Location) {
        this.field = field.generateField();
        this.location = {
            x: location.location.x,
            y: location.location.y,
        }
    }

    print() {
        for (let i = 0; i < this.field.length; i++) {
            console.log(this.field[i].join(''));
        }
    }

    Move() {
        const moveInput = prompt('Enter your next step(WASD):').toUpperCase();
        switch (moveInput) {
            case 'W':
                this.location.y -= 1;
                break;
            case 'A':
                this.location.x -= 1;
                break;
            case 'S':
                this.location.y += 1;
                break;
            case 'D':
                this.location.x += 1;
                break;
            default:
                console.log('Enter your next step(WASD):');
                this.Move();
                break;
        }
    }

    checkBoundary() {
        return this.location.x >= 0 &&
            this.location.y >= 0 &&
            this.location.x < this.field[0].length &&
            this.location.y < this.field.length;
    }

    checkHatfound() {
        return this.field[this.location.y][this.location.x] === hat;
    }

    checkHolefell() {
        return this.field[this.location.y][this.location.x] === hole;
    }

    play() {
        let playstat = true;
        while (playstat) {
            this.print();
            this.Move();
            if (!this.checkBoundary()) {
                console.log('You fell outside!');
                playstat = false;
                break;
            } else if (this.checkHolefell()) {
                console.log('You fell in the hole!');
                playstat = false;
                break;
            } else if (this.checkHatfound()) {
                console.log('You found the Hat!');
                playstat = false;
                break;
            }
            this.field[this.location.y][this.location.x] = pathCharacter;
        }
    }
}

const game = new Game;
game.play();

//Game



//old code

// const hat = '^';
// const hole = 'O';
// const fieldCharacter = '░';
// const pathCharacter = '*';
// const MapSizeHeight = 7;
// const MapSizeWidth = 13;
// let percentage = null;
// let playstat = false;

// class Field {
//     constructor(field) {
//         this.field = field;
//         this.posX = null;
//         this.posY = null;
// 
// }

// HardMode() {
//     const askHardMode = prompt('Hard Mode?(Y/N)').toUpperCase();
//     switch (askHardMode) {
//         case 'Y':
//             percentage = 0.2;
//             return percentage;
//             break;
//         case 'N':
//             percentage = 0.1;
//             return percentage;
//             break;
//         default:
//             console.log('Please type Y/N');
//             this.HardMode();
//             break;
//     }
// }

// play() {
//     playstat = true;
//     this.generateField(this.HardMode());
//     while (playstat) {
//         this.print();
//         this.Move();
//         if (!this.checkBoundary()) {
//             console.log('You fell outside!');
//             playstat = false;
//             break;
//         } else if (this.checkHolefell()) {
//             console.log('You fell in the hole!');
//             playstat = false;
//             break;
//         } else if (this.checkHatfound()) {
//             console.log('You found the Hat!');
//             playstat = false;
//             break;
//         }
//         this.field[this.posY][this.posX] = pathCharacter;
//     }
// }

// Move() {
//     const moveInput = prompt('Enter your next step(WASD):').toUpperCase();
//     switch (moveInput) {
//         case 'W':
//             this.posY -= 1;
//             break;
//         case 'A':
//             this.posX -= 1;
//             break;
//         case 'S':
//             this.posY += 1;
//             break;
//         case 'D':
//             this.posX += 1;
//             break;
//         default:
//             console.log('Enter your next step(WASD):');
//             this.Move();
//             break;
//     }
// }

// checkBoundary() {
//     return this.posX >= 0 &&
//         this.posY >= 0 &&
//         this.posX < this.field[0].length &&
//         this.posY < this.field.length;
// }

// checkHatfound() {
//     return this.field[this.posY][this.posX] === hat;
// }

// checkHolefell() {
//     return this.field[this.posY][this.posX] === hole;
// }

// generateField(percentage) {
//     const genMap = [];
//     this.posX = Math.floor(Math.random() * MapSizeWidth);
//     this.posY = Math.floor(Math.random() * MapSizeHeight);
//     let randomPosX = Math.floor(Math.random() * MapSizeWidth);
//     let randomPosY = Math.floor(Math.random() * MapSizeHeight);
//     let hatOnPos = false;
//     for (let h = 0; h < MapSizeHeight; h++) {
//         genMap.push([]);
//         for (let w = 0; w < MapSizeWidth; w++) {
//             let randomSymbol = Math.random();
//             if (randomSymbol > percentage) {
//                 genMap[h].push(fieldCharacter);
//             } else {
//                 genMap[h].push(hole);
//             }
//         }
//     }
//     genMap[this.posY][this.posX] = pathCharacter;
//     while (!hatOnPos) {
//         if (randomPosY != this.posY && randomPosX != this.posX) {
//             genMap[randomPosY][randomPosX] = hat;
//             hatOnPos = true;
//         }
//     }
//     this.field = genMap;
// }

//     print() {
//         for (let i = 0; i < this.field.length; i++) {
//             console.log(this.field[i].join(''));
//         }
//     }
// }

// const myField = new Field();
// myField.play();