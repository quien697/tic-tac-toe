/*
    顯示 狀態資訊 與 棋盤
*/
import React from 'react';
import Square from './Square';

const Board = ({ squares, isWin, isNext, step, changeColor, handleClick }) => {
    let info;
    if(isWin){
        info = `贏家：${(isNext)?"O":"X"}`;
    }else{
        if(step === 9){
            info = "平局！";
        }else{
            info = `下一個玩家：${(isNext)?"X":"O"}`;
        }
    }
    return(
        <div>
            <h3 className="status-info">{info}</h3>
            <div className="board">
                {squares.map((item,i) => (
                    <Square 
                        key={i} 
                        value={item} 
                        changeColor={changeColor[i]}
                        handleClick={() => handleClick(i)} 
                    />
                ))}
            </div>
        </div>
    );
};

export default Board;