import React, { useCallback, useState } from 'react'
import styles from "./MainPage.module.css"
import Card from '../../components/Card/Card'
import Slider from '../../components/Slider/Slider';

function MainPage() {
    const [cardArr, setCardArr] = useState([]);

    const addCard = () => {
        setCardArr(prev => [
            ...prev,
            {
                id: Math.random(),
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

    const onChangeCardValue = (id, text) => {
        console.log(text)
        setCardArr(prev =>
            prev.map(el => {
                if (el.id === id) {
                    el.text = text
                }
                return el
            }
            )
        )
    }

    const renderCard = useCallback((item) =>
        <Card onBase={setBased} id={item.id} text={item.text} onDelete={deleteItem} onChangeValue={onChangeCardValue} key={item.id} />
        , [])

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
                <Slider list={cardArr.filter(el => !el.isBased)} renderItem={renderCard} />
            </div>
        </>
    )
}

export default MainPage