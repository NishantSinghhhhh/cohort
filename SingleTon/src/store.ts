
interface Game{
    id: string;
    whitePlayerName: string;
    blackPlayerName: string;
    moves : string[];

}

// export class RedisGameManager implements GameManagerInterface{
//     games: Game[] = [];
// }

// static variables and methods
// singletons , stratergy pattern
export class GameManager{
    games: Game[] = [];

   private constructor(){
        this.games = [];
    }

    addMove(gameId: string, move: string){
       console.log(` adding move ${move} to game ${gameId}`);
       const game = this.games.find((game) => game.id === gameId);
       game?.moves.push(move);
    }

    addGame(gameId: string) {
        const game: Game = {
            id: gameId,
            whitePlayerName: "John",
            blackPlayerName: "Doe",
            moves: [],
        };
        this.games.push(game);
    }

    log(){
        console.log(this.games);
    }
    
}

export const gameManager = new GameManager();
gameManager.add
// export const games:Game[] = [];
