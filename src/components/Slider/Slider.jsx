import React, { useEffect, useRef } from 'react'
import styles from "./Slider.module.css"
import prevSlide from "../../assets/icons/prevSlider.svg"
import nextSlide from "../../assets/icons/nextSlider.svg"

function Slider({ list, renderItem }) {
    const scrollableRef = useRef(null);
    const leftButton = useRef(null);
    const rightButton = useRef(null);

    const handlePrevButtonClick = () => {
        if (scrollableRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollableRef.current;
            const containerRect = scrollableRef.current.getBoundingClientRect();
            const children = Array.from(scrollableRef.current.children)
            const firstLevelDivs = children.filter(child => child.tagName.toLowerCase() === 'div');
            scrollWidth > clientWidth ? rightButton.current.style.visibility = "visible" : rightButton.current.style.visibility = "hidden"
            scrollLeft > firstLevelDivs[0].getBoundingClientRect().width ? leftButton.current.style.visibility = "visible" : leftButton.current.style.visibility = "hidden"
            for (let el of firstLevelDivs.reverse()) {
                const elimentRect = el.getBoundingClientRect();
                if (!(elimentRect.left >= containerRect.left)) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })
                    break;
                }
            }
        }
    };

    const handleNextButtonClick = () => {
        if (scrollableRef.current) {
            const containerRect = scrollableRef.current.getBoundingClientRect();
            const children = Array.from(scrollableRef.current.children)
            const firstLevelDivs = children.filter(child => child.tagName.toLowerCase() === 'div');
            const { scrollLeft, scrollWidth } = scrollableRef.current;

            for (let el of firstLevelDivs) {
                const elimentRect = el.getBoundingClientRect();
                console.log(elimentRect.right, scrollLeft, scrollWidth, elimentRect.width)
                if (elimentRect.right >= containerRect.right) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' })
                    scrollLeft >= 0 ? leftButton.current.style.visibility = "visible" : leftButton.current.style.visibility = "hidden"
                    elimentRect.right + scrollLeft < scrollWidth + elimentRect.width ? rightButton.current.style.visibility = "visible" : rightButton.current.style.visibility = "hidden"
                    break;
                }
            }
        }
    };


    useEffect(() => {
        if (scrollableRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollableRef.current;
            scrollLeft > clientWidth / list.length ? leftButton.current.style.visibility = "visible" : leftButton.current.style.visibility = "hidden"
            scrollLeft + clientWidth < scrollWidth ? rightButton.current.style.visibility = "visible" : rightButton.current.style.visibility = "hidden"
        }
    }, [list])

    return (
        <div
            ref={scrollableRef}
            className={styles.slider}
        >
            {list.map(el => renderItem(el))}
            <button className={`${styles.slider_btn} ${styles.btn_left}`} ref={leftButton} onClick={handlePrevButtonClick}>
                <img src={prevSlide} />
            </button>
            <button className={`${styles.slider_btn} ${styles.btn_right}`} ref={rightButton} onClick={handleNextButtonClick}>
                <img src={nextSlide} />
            </button>
        </div>
    );
};


export default Slider