import React from 'react'
import styles from "./Card.module.css"

function Card({ onBase, onDelete, id, text }) {
    console.log(onBase)
    return (
        <div className={styles.card}>
            <h2>{text}</h2>
            <div className={styles.card_btns}>
                <button onClick={() => onDelete(id)} >Delete</button>
                <button onClick={() => onBase(id)}>Base</button>
            </div>
        </div>
    )
}

export default Card