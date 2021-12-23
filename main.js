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
// }
class MapSize {
    constructor() {
        this.mapSizeWidth = 13;
        this.mapSizeHeight = 7;
    }
}
class startPos {
    constructor(mapsize = new MapSize) {
        this.startPosX = Math.floor(Math.random() * mapsize.mapSizeWidth);
        this.startPosY = Math.floor(Math.random() * mapsize.mapSizeHeight);
    }
}

// class PlayerPos {
//     constructor(startpos = new startPos) {
//         this.playerPositionX = startpos.startPosX;
//         this.playerPositionY = startpos.startPosY;
//     }
// }

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
    constructor(percentage = new Difficulty, mapsize = new MapSize, randomStartPos = new startPos) {
        this.mapsizewidth = mapsize.mapSizeWidth;
        this.mapsizeheight = mapsize.mapSizeHeight;
        this.randomStartPosX = randomStartPos.startPosX;
        this.randomStartPosY = randomStartPos.startPosY;
        // this.hat = '^';
        // this.hole = 'O';
        // this.fieldCharacter = '░';
        // this.pathCharacter = '*';
        this.percentage = percentage.HardMode();

    }

    //method - gen random map
    generateField() {
        const genMap = [];
        // this.posX = Math.floor(Math.random() * this.MapSizeWidth);
        // this.posY = Math.floor(Math.random() * this.MapSizeHeight);
        let randomPosX = Math.floor(Math.random() * this.mapsizewidth);
        let randomPosY = Math.floor(Math.random() * this.mapsizeheight);
        let hatOnPos = false;
        for (let h = 0; h < this.mapsizeheight; h++) {
            genMap.push([]);
            for (let w = 0; w < this.mapsizewidth; w++) {
                let randomSymbol = Math.random();
                if (randomSymbol > this.percentage) {
                    genMap[h].push(fieldCharacter);
                } else {
                    genMap[h].push(hole);
                }
            }
        }
        // genMap[this.randomStartPosY][this.randomStartPosX] = pathCharacter;
        while (!hatOnPos) {
            if (randomPosY != this.randomStartPosY && randomPosX != this.randomStartPosX) {
                genMap[randomPosY][randomPosX] = hat;
                hatOnPos = true;
            }
        }
        return genMap;
    }

}
// const map1 = new Map
// console.log(map1.generateField())

class Game {
    constructor(field = new Map, playerPos = new startPos) {
        this.field = field.generateField();
        this.playerPosX = playerPos.startPosX;
        this.playerPosY = playerPos.startPosY;
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
                this.playerPosY -= 1;
                break;
            case 'A':
                this.playerPosX -= 1;
                break;
            case 'S':
                this.playerPosY += 1;
                break;
            case 'D':
                this.playerPosX += 1;
                break;
            default:
                console.log('Enter your next step(WASD):');
                this.Move();
                break;
        }
    }

    checkBoundary() {
        return this.playerPosX >= 0 &&
            this.playerPosY >= 0 &&
            this.playerPosX < this.field[0].length &&
            this.playerPosY < this.field.length;
    }

    checkHatfound() {
        return this.field[this.playerPosY][this.playerPosX] === hat;
    }

    checkHolefell() {
        return this.field[this.playerPosY][this.playerPosX] === hole;
    }

    play() {
        let playstat = true;
        this.field[this.playerPosY][this.playerPosX] = pathCharacter;
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
            this.field[this.playerPosY][this.playerPosX] = pathCharacter;
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