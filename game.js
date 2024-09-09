export class Game {
    #settings = {
        gridSize: {
            columns: 2,
            rows: 3
        },
        googleJumpInterval: 2000,
    }
    #googleJumpIntervalId
    #status = 'pending'
    #player1
    #player2
    #google
    #score = {
        1: 0,
        2: 0
    }


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

    moveGoogleToRandomPosition(isStartPosition) {
        const googlePosition = isStartPosition
            ? this.#getRandomPosition([this.#player1.position, this.#player2.position])
            : this.#getRandomPosition([this.#player1.position, this.#player2.position, this.#google.position])
        this.#google = new Google(googlePosition)
    }

    #createUnites() {
        const player1Position = this.#getRandomPosition()
        this.#player1 = new Player(1, player1Position)

        const player2Position = this.#getRandomPosition([player1Position])
        this.#player2 = new Player(2, player2Position)

        this.moveGoogleToRandomPosition(true)
    }

    stop() {
        this.#status = 'finished'
        clearInterval(this.#googleJumpIntervalId)
    }

    start() {
        if (this.#status === 'pending') {
            this.#status = 'in-process'
        }
        this.#createUnites()
        this.#googleJumpIntervalId = setInterval(() => this.moveGoogleToRandomPosition(false), this.settings.googleJumpInterval)
    }

    #isBorder(movingPlayer, step) {
        let prevPlayer1Position = this.#player1.position.copy()

        if (step.x) {
            prevPlayer1Position.x += step.x
            return prevPlayer1Position.x < 1 || prevPlayer1Position.x > this.#settings.gridSize.columns
        }
        if (step.y) {
            prevPlayer1Position.y += step.y
            return prevPlayer1Position.y < 1 || prevPlayer1Position.y > this.#settings.gridSize.rows
        }
    }

    #isOtherPlayer(movingPlayer, otherPlayer, step) {
        let prevPlayer1Position = movingPlayer.position.copy()
        let prevPlayer2Position = otherPlayer.position.copy()

        if (step.x) {
            prevPlayer1Position.x += step.x
        }
        if (step.y) {
            prevPlayer1Position.y += step.y
        }
        return prevPlayer2Position.equal(otherPlayer.position)
    }

    #checkGoogleCatching(movingPlayer) {
        if (movingPlayer.position.equal(this.#google.position)) {
            this.#score[movingPlayer.id].points++
        }
        this.moveGoogleToRandomPosition(false)
    }

    #movePlayer(movingPlayer, otherPlayer, step) {
        const isBorder = this.#isBorder(movingPlayer, step)
        const isOtherPlayer = this.#isOtherPlayer(movingPlayer, otherPlayer, step)
        if (isBorder || isOtherPlayer) {
            return
        }
        if (step.x) {
            movingPlayer.position.x += step.x
        }
        if (step.y) {
            movingPlayer.position.y += step.y
        }
        this.#checkGoogleCatching(movingPlayer)
    }

    movePlayer1Right() {
        const step = {x: 1}
        this.#movePlayer(this.#player1, this.#player2, step)
    }

    movePlayer1Left() {
        const step = {x: -1}
        this.#movePlayer(this.#player1, this.#player2, step)
    }

    movePlayer1Up() {
        const step = {y: 1}
        this.#movePlayer(this.#player1, this.#player2, step)
    }

    movePlayer1Down() {
        const step = {y: -1}
        this.#movePlayer(this.#player1, this.#player2, step)
    }

    movePlayer2Right() {
        const step = {x: 1}
        this.#movePlayer(this.#player2, this.#player1, step)
    }

    movePlayer2Left() {
        const step = {x: -1}
        this.#movePlayer(this.#player2, this.#player1, step)
    }

    movePlayer2Up() {
        const step = {y: 1}
        this.#movePlayer(this.#player2, this.#player1, step)
    }

    movePlayer2Down() {
        const step = {y: -1}
        this.#movePlayer(this.#player2, this.#player1, step)
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
    set score(score) {
        this.#score = score
    }

    get score() {
        return this.#score
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

    copy() {
        return new Position(this.x, this.y)
    }

    equal(somePosition) {
        return (this.x === somePosition.x && this.y === somePosition.y)
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

