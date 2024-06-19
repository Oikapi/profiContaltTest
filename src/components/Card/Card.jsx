import React from 'react'
import styles from "./Card.module.css"

function Card({ onBase, onDelete, id, text, onChangeValue }) {
    return (
        <div className={styles.card}>
            <input
                className={styles.disable_input}
                value={text}
                onChange={(e) => onChangeValue(id, e.target.value)}
            ></input >
            <div className={styles.card_btns}>
                <button onClick={() => onDelete(id)} >Delete</button>
                <button onClick={() => onBase(id)}>Base</button>
            </div>
        </div>
    )
}

export default Card