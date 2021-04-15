/*
    顯示棋盤上的 button
*/
import React from 'react';

const Square = ({ value, changeColor, handleClick }) => {
    return(
        <button className={`square ${(changeColor)?'winner':''}`} onClick={handleClick}>
            {value}
        </button>
    );
};

export default Square;