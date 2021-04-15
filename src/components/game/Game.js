import React, { useState, useEffect } from 'react';
import Board from './Board';
import StepInfo from './StepInfo';
import './Game.css';

const Game = () => {
    /* 判斷下一個玩家是誰, 型態：Boolan (True = X, False = O) */
    const [ isNext, setIsNext ] = useState(true);
    /* 紀錄歷史棋盤的步數, 型態：int */
    const [ step, setStep ] = useState(0);
    /* 紀錄歷史棋盤的格局 */
    const [ history, setHistory ] = useState([{ squares: Array(9).fill(null) }]);
    /* 紀錄是否有贏家並紀錄連線的位置 */
    const [ winner, setWinner ] = useState({ isWin: false, changeColor: [] });

    useEffect(() => {
        /*  計算是否勝利 */
        const squares = history[history.length-1].squares;
        const winCondition = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6],
        ]
        for(let i = 0; i < winCondition.length; i++){
            let curCondition = winCondition[i];
            let first = squares[curCondition[0]]
            let second = squares[curCondition[1]]
            let third = squares[curCondition[2]]
            if(null!=first && first===second && first===third){
                const changeColor = Array(9).fill(false);
                changeColor[curCondition[0]]=true;
                changeColor[curCondition[1]]=true;
                changeColor[curCondition[2]]=true;
                setWinner(((prevState) => {
                    return { 
                        ...prevState,
                        isWin: true,
                        changeColor: changeColor
                    }
                }))
            }
        } 
    }, [history, isNext]);

    const handleClick = (i) => {
        if (winner.isWin) return;
        // 取得最後一筆紀錄
        const newHistory = history[history.length-1];
        // slice 會回傳一個新的Array，原本的Array將不會被修改。
        const newSquares = newHistory.squares.slice();
        if (newSquares[i]) return;
        //calcWinner(newSquares);
        newSquares[i] = isNext?'X':'O';
        /*  更新資料 */
        setHistory((prevSquares) => [...prevSquares, { squares: newSquares }])
        setStep(history.length);
        setIsNext(!isNext);
    }

    const handleJumpTo = (step) => {    
        if(!step){
            /* 如果Step = 0,則重置歷史紀錄與勝利紀錄 */
            const newHistory = history.slice(0, step+1);
            setHistory(newHistory);
            setWinner({ isWin: false, changeColor: [] });
        }
        setStep(step);
        setIsNext((step%2)===0);
    }
    
    return(
        <div className="game">
            <h1 className="title">Tic-Tac-Toe Game</h1>
            <div className="board-wrapper">
                <Board 
                    squares={history[step].squares} 
                    isWin={winner.isWin}
                    isNext={isNext}
                    step={step}
                    changeColor={winner.changeColor} 
                    handleClick={(i)=>handleClick(i)} />
                <StepInfo 
                    history={history} 
                    handleJumpTo={handleJumpTo} />
            </div>
        </div>
    );
};

export default Game;