import React, { useState } from 'react'
import styles from "./MainPage.module.css"
import Card from '../../components/Card/Card'

function MainPage() {
    const [cardArr, setCardArr] = useState([]);


    const addCard = () => {
        setCardArr(prev => [
            ...prev,
            {
                id: prev.length + 1,
                text: prev.length + 1,
                isBased: false,
            }
        ]
        )
    }

    const setBased = (id) => {
        setCardArr(prev =>
            prev.map(el => {
                if (el.id === id) {
                    el.isBased = true
                } else {
                    el.isBased = false
                }
                return el
            }
            )
        )
    }

    const deleteItem = (id) => {
        setCardArr(prev =>
            prev.filter(el => el.id !== id)
        )
    }

    return (
        <>
            <button
                onClick={addCard}
            >+ elem</button>
            <div className={styles.main_page_container}>

                <div className={styles.main_page_base_card}>
                    <h1>Base card</h1>
                    {cardArr.filter(el => el.isBased).map(el =>
                        <Card onBase={setBased} id={el.id} text={el.text} onDelete={deleteItem} />
                    )}
                </div>
                <div className={styles.main_page_cards_slider}>
                    {cardArr.filter(el => !el.isBased).map(el =>
                        <Card onBase={setBased} id={el.id} text={el.text} onDelete={deleteItem} />
                    )}
                </div>
            </div>
        </>
    )
}

export default MainPage