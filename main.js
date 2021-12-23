const prompt = require('prompt-sync')({ sigint: true });

class Symbol {
    constructor() {
        this.hat = '^';
        this.hole = 'O';
        this.fieldCharacter = '░';
        this.pathCharacter = '*';
    }
}

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
            case 'N':
                this.percentage = 0.1;
                return this.percentage;
            default:
                console.log('Please type Y/N');
                this.HardMode();
                break;
        }
    }
}

class Map { // converted from Field
    constructor(percentage = new Difficulty, mapsize = new MapSize, randomStartPos = new startPos, MapSymbol = new Symbol) {
        this.mapsizewidth = mapsize.mapSizeWidth;
        this.mapsizeheight = mapsize.mapSizeHeight;
        this.randomStartPosX = randomStartPos.startPosX;
        this.randomStartPosY = randomStartPos.startPosY;
        this.percentage = percentage.HardMode();
        this.mapSymbolField = MapSymbol.fieldCharacter;
        this.mapSymbolhole = MapSymbol.hole;
        this.mapSymbolHat = MapSymbol.hat;
    }

    //method - gen random map
    generateField() {
        const genMap = [];
        let randomPosX = Math.floor(Math.random() * this.mapsizewidth);
        let randomPosY = Math.floor(Math.random() * this.mapsizeheight);
        let hatOnPos = false;
        for (let h = 0; h < this.mapsizeheight; h++) {
            genMap.push([]);
            for (let w = 0; w < this.mapsizewidth; w++) {
                let randomSymbol = Math.random();
                if (randomSymbol > this.percentage) {
                    genMap[h].push(this.mapSymbolField);
                } else {
                    genMap[h].push(this.mapSymbolhole);
                }
            }
        }
        while (!hatOnPos) {
            if (randomPosY != this.randomStartPosY && randomPosX != this.randomStartPosX) {
                genMap[randomPosY][randomPosX] = this.mapSymbolHat;
                hatOnPos = true;
            }
        }
        return genMap;
    }

}

class Game {
    constructor(field = new Map, playerPos = new startPos, GameSymbol = new Symbol) {
        this.field = field.generateField();
        this.playerPosX = playerPos.startPosX;
        this.playerPosY = playerPos.startPosY;
        this.gameSymbolPath = GameSymbol.pathCharacter;
        this.gameSymbolHole = GameSymbol.hole;
        this.gameSymbolHat = GameSymbol.hat;
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
        return this.field[this.playerPosY][this.playerPosX] === this.gameSymbolHat;
    }

    checkHolefell() {
        return this.field[this.playerPosY][this.playerPosX] === this.gameSymbolHole;
    }

    play() {
        let playstat = true;
        this.field[this.playerPosY][this.playerPosX] = this.gameSymbolPath;
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
            this.field[this.playerPosY][this.playerPosX] = this.gameSymbolPath;
        }
    }
}

const game = new Game;
game.play();

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