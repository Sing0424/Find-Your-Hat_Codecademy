const prompt = require('prompt-sync')({ sigint: true });

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

const MapSizeHeight = 7;
const MapSizeWidth = 13;
let percentage = null;
let playstat = false;

class Field {
    constructor(field) {
        this.field = field;
        this.posX = null;
        this.posY = null;
        // this.field[0][0] = pathCharacter;
    }


    HardMode() {
        const askHardMode = prompt('Hard Mode?(Y/N)').toUpperCase();
        switch (askHardMode) {
            case 'Y':
                percentage = 0.2;
                return percentage;
            case 'N':
                percentage = 0.1;
                return percentage;
            default:
                console.log('Please type Y/N');
                this.HardMode();
                break;
        }
    }

    play() {
        playstat = true;
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

    Move() {
        const moveInput = prompt('Enter your next step(WASD):').toUpperCase();
        switch (moveInput) {
            case 'W':
                this.posY -= 1;
                break;
            case 'A':
                this.posX -= 1;
                break;
            case 'S':
                this.posY += 1;
                break;
            case 'D':
                this.posX += 1;
                break;
            default:
                console.log('Enter your next step(WASD):');
                this.Move();
                break;
        }
    }

    checkBoundary() {
        return this.posX >= 0 &&
            this.posY >= 0 &&
            this.posX < this.field[0].length &&
            this.posY < this.field.length;
    }

    checkHatfound() {
        return this.field[this.posY][this.posX] === hat;
    }

    checkHolefell() {
        return this.field[this.posY][this.posX] === hole;
    }

    generateField(percentage) {
        const genMap = [];
        this.posX = Math.floor(Math.random() * MapSizeWidth);
        this.posY = Math.floor(Math.random() * MapSizeHeight);
        let randomPosX = Math.floor(Math.random() * MapSizeWidth);
        let randomPosY = Math.floor(Math.random() * MapSizeHeight);
        let hatOnPos = false;
        for (let h = 0; h < MapSizeHeight; h++) {
            genMap.push([]);
            for (let w = 0; w < MapSizeWidth; w++) {
                let randomSymbol = Math.random();
                if (randomSymbol > percentage) {
                    genMap[h].push(fieldCharacter);
                } else {
                    genMap[h].push(hole);
                }
            }
        }
        genMap[this.posY][this.posX] = pathCharacter;
        while (!hatOnPos) {
            if (randomPosY != this.posY && randomPosX != this.posX) {
                genMap[randomPosY][randomPosX] = hat;
                hatOnPos = true;
            }
        }
        this.field = genMap;
    }

    print() {
        for (let i = 0; i < this.field.length; i++) {
            console.log(this.field[i].join(''));
        }
    }
}

const myField = new Field();
myField.play();