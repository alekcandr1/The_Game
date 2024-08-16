export class Game {
    #settings
    #status = 'pending'
    #player1
    #player2
    #google

    #getRandomPosition(existedPosition = []) {
        let newX
        let newY

        do {
            newX = NumberUtil.getRandomNumber(this.#settings.gridSize.columns)
            newY = NumberUtil.getRandomNumber(this.#settings.gridSize.rows)
        } while (
            existedPosition.some(pos => newX === pos.x && newY === pos.y)
            )

        return new Position(newX, newY)
    }

    #createUnites() {
        const player1Position = this.#getRandomPosition()
        this.#player1 = new Player(1, player1Position)

        const player2Position = this.#getRandomPosition([player1Position])
        this.#player2 = new Player(2, player2Position)

        const googlePosition = this.#getRandomPosition([player1Position, player2Position])
        this.#google = new Google(googlePosition)
    }

    async start() {
        if (this.#status === 'pending') {
            this.#status = 'in-process'
            this.#createUnites()
        }
    }

    pause() {

    }

    resume() {

    }


    set settings(settings) {
        this.#settings = settings
    }

    get settings() {
        return this.#settings
    }

    get status() {
        return this.#status
    }

    get player1() {
        return this.#player1
    }

    get player2() {
        return this.#player2
    }

    get google() {
        return this.#google
    }
}

class NumberUtil {
    static getRandomNumber(max) {
        return Math.floor(Math.random() * max + 1)
    }
}

class Position {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
}

class Unite {
    constructor(position) {
        this.position = position
    }
}

class Player extends Unite {
    constructor(id, position) {
        super(position)
        this.id = id
    }
}

class Google extends Unite {
    constructor(position) {
        super(position)
    }
}

