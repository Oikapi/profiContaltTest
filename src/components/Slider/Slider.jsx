import React, { useEffect, useRef } from 'react'
import styles from "./Slider.module.css"
import prevSlide from "../../assets/icons/prevSlider.svg"
import nextSlide from "../../assets/icons/nextSlider.svg"

function Slider({ list, renderItem }) {
    const scrollableRef = useRef(null);
    const leftButton = useRef(null);
    const rightButton = useRef(null);

    const handleScroll = () => {
        if (scrollableRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollableRef.current;
            scrollLeft > 0 ? leftButton.current.style.visibility = "visible" : leftButton.current.style.visibility = "hidden"
            scrollLeft + clientWidth < scrollWidth ? rightButton.current.style.visibility = "visible" : rightButton.current.style.visibility = "hidden"
        }
    };


    const handlePrevButtonClick = () => {
        if (scrollableRef.current) {
            const containerRect = scrollableRef.current.getBoundingClientRect();
            const children = Array.from(scrollableRef.current.children)
            const firstLevelDivs = children.filter(child => child.tagName.toLowerCase() === 'div');

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

            for (let el of firstLevelDivs) {
                const elimentRect = el.getBoundingClientRect();
                if (elimentRect.right + elimentRect.width > containerRect.width) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'center' })
                    break;
                }
            }
        }
    };

    useEffect(() => {
        const scrollableElement = scrollableRef.current;
        leftButton.current.style.visibility = "hidden"
        rightButton.current.style.visibility = "hidden"
        if (scrollableElement) {
            scrollableElement.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (scrollableElement) {
                scrollableElement.removeEventListener('scroll', handleScroll);
            }
        };
    }, []);

    useEffect(() => {
        const { scrollWidth, clientWidth } = scrollableRef.current;
        if (scrollWidth > clientWidth) {
            rightButton.current.style.visibility = "visible"
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