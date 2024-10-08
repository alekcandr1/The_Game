import {Game} from './game.js'
import expect from "expect";

describe('game tests', () => {
    let game;
    beforeEach(() => {
        game = new Game
    });
    afterEach(() => {
        game.stop()
    });
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


    const sleep = (delay) => {
        return new Promise(resolve => setTimeout(resolve, delay))
    }

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

    it('should google change position', async () => {
        for (let i = 0; i < 10; i++) {
            const game = new Game
            game.settings = {
                gridSize: {
                    columns: 2,
                    rows: 3
                },
                googleJumpInterval: 100,
            }

            await game.start()

            // google position
            const prevGooglePositions = game.google.position.copy()

            //waiting
            await sleep(150)

            //compare positions
            expect(game.google.position.equal(prevGooglePositions)).toBe(false)
            game.stop()
        }
    })

    it("catch google by player1 or player2 for one column", async () => {
        for (let i = 0; i < 10; i++) {
            game = new Game();
            // setter
            game.settings = {
                gridSize: {
                    columns: 1,
                    rows: 3,
                },
            };

            await game.start();
            // p1   p1   p2   p2    g    g
            // p2    g   p1    g   p1   p2
            //  g   p2    g   p1   p2   p1
            const deltaForPlayer1 = game.google.position.y - game.player1.position.y;


            const prevGooglePosition = game.google.position.copy();


            if (Math.abs(deltaForPlayer1) === 2) {
                const deltaForPlayer2 =
                    game.google.position.y - game.player2.position.y;
                if (deltaForPlayer2 > 0) game.movePlayer2Down();
                else game.movePlayer2Up();


                expect(game.score[1].points).toBe(0);
                expect(game.score[2].points).toBe(1);
            } else {
                if (deltaForPlayer1 > 0) game.movePlayer1Down();
                else game.movePlayer1Up();


                expect(game.score[1].points).toBe(1);
                expect(game.score[2].points).toBe(0);
            }


            expect(game.google.position.equal(prevGooglePosition)).toBe(false);

        }
    })

})

