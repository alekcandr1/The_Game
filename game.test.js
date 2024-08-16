import {Game} from './game.js'
import expect from "expect";

describe('game tests', () => {
    it('init game', () => {
        const game = new Game()

        game.settings = {
            gridSize: {
                columns: 4,
                rows: 6
            }
        }

        const settings = game.settings

        expect(game.settings.gridSize.columns).toBe(4)
        expect(game.settings.gridSize.rows).toBe(6)
    });

    it('start game test', async () => {
        const game = new Game()

        game.settings = {
            gridSize: {
                columns: 4,
                rows: 6
            }
        }

        expect(game.status).toBe('pending')
        await game.start()
        expect(game.status).toBe('in-process')

        const settings = game.settings
    });

    it('player1 and player2 should have unique coordinates', async () => {
        const game = new Game()

        game.settings = {
            gridSize: {
                columns: 2,
                rows: 3
            }
        }

        await game.start()
        console.log(game.player1)

        expect([1, 2]).toContain(game.player1.position.x)
        expect([1, 2, 3]).toContain(game.player1.position.y)

        expect([1, 2]).toContain(game.player2.position.x)
        expect([1, 2, 3]).toContain(game.player2.position.y)

        expect(
            (game.player1.position.x !== game.player2.position.x ||
                game.player1.position.y !== game.player2.position.y) &&
            (game.player1.position.x !== game.google.position.x ||
                game.player1.position.y !== game.google.position.y) &&
            (game.player2.position.x !== game.google.position.x ||
                game.player2.position.y !== game.google.position.y)
        )
            .toBe(true)

    })
})