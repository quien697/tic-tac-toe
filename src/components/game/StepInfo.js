/*
    顯示 重置按鈕 與 歷史紀錄步驟
*/
import React from 'react';

const StatusInfo = ({ history, handleJumpTo }) => {
    return(
        <div className="step-info">
            <h3>歷史紀錄</h3>
            <p>此部分只能看紀錄，無法悔棋</p>
            {history.map((item,i) => (
                <li key={i}>
                    <button onClick={() => handleJumpTo(i)}>
                        {i?`第 ${i} 步`:'重新開始'}
                    </button>
                </li>
            ))}
        </div>
    )
}

export default StatusInfo;