const prompt = require('prompt-sync')({ sigint: true });

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

const MapSizeHeight = 7;
const MapSizeWidth = 13;
let percentage = 0.1;
let playstat = false;

class Field {
    constructor(field) {
        this.field = field;
        this.posX = Math.floor(Math.random() * MapSizeWidth);
        this.posY = Math.floor(Math.random() * MapSizeHeight);
        // this.field[0][0] = pathCharacter;
    }


    static HardMode() {
        const askHardMode = prompt('Hard Mode?(Y/N)').toUpperCase();
        switch (askHardMode) {
            case 'Y':
                percentage = 0.2;
                break;
            case 'N':
                percentage = 0.1;
                break;
            default:
                console.log('Please type Y/N');
                this.HardMode();
                break;
        }
    }

    play() {
        playstat = true;
        this.field[this.posY][this.posX] = pathCharacter;
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

    static generateField(height, width, percentage) {
        const genMap = [];
        let randomPosX = Math.floor(Math.random() * (width));
        let randomPosY = Math.floor(Math.random() * (height));
        let hatOnPos = false;
        for (let h = 0; h < height; h++) {
            genMap.push([]);
            for (let w = 0; w < width; w++) {
                let randomSymbol = Math.random();
                if (randomSymbol > percentage) {
                    genMap[h].push(fieldCharacter);
                } else {
                    genMap[h].push(hole);
                }
            }
        }
        while (!hatOnPos) {
            if (randomPosY != this.posY && randomPosX != this.posX) {
                genMap[randomPosY][randomPosX] = hat;
                hatOnPos = true;
            }
        }
        return genMap;
    }

    print() {
        for (let i = 0; i < this.field.length; i++) {
            console.log(this.field[i].join(''));
        }
    }
}

Field.HardMode();

const newMap = Field.generateField(MapSizeHeight, MapSizeWidth, percentage);
const myField = new Field(newMap, MapSizeHeight, MapSizeWidth);

myField.play();