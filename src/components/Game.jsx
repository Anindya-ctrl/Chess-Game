import React, { useState, useEffect, useRef } from 'react';
import ChessBoard from 'chessboardjsx';
import Chess from 'chess.js';
import '../styles/App.css';

function Game() {
    const [ position, setPosition ] = useState('start');
    const game = useRef();

    useEffect(() => game.current = new Chess(), []);
    console.log(game);

    const handleDrop = ({ sourceSquare, targetSquare }) => {
        const move = game.current.move({
            from: sourceSquare,
            to: targetSquare,
        });

        if(!move) return ;
        return setPosition(game.current.fen());
    }

    const handleRestart = () => {
        setPosition('start');
        game.current.clear();
        game.current.reset();
    }

    return (
        <div className="game-board">
            <ChessBoard
                position={ position }
                draggable={ true }
                dropSquareStyle={{
                    backgroundColor: 'skyblue',
                }}
                onDrop={ handleDrop }
            />

            {
                game.current && game.current.game_over() && (
                    <div className="game-over">
                        <h3>Game Over</h3>
                        <button onClick={ handleRestart }>Restart</button>
                    </div>
                )
            }
        </div>
    )
}

export default Game;
