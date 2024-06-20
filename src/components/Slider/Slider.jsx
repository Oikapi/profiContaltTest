import React, { useEffect, useRef, useState } from 'react'
import styles from "./Slider.module.css"
import prevSlide from "../../assets/icons/prevSlider.svg"
import nextSlide from "../../assets/icons/nextSlider.svg"

function Slider({ list, renderItem }) {
    const scrollableRef = useRef(null);
    const leftButton = useRef(null);
    const rightButton = useRef(null);
    const [windowWidth, setWindowWidth] = useState(window.screen.width)
    const [isLeftButtonVisible, setLeftButtonVisible] = useState(false)
    const [isRightButtonVisible, setRightButtonVisible] = useState(false)

    const handlePrevButtonClick = () => {
        if (scrollableRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollableRef.current;
            const containerRect = scrollableRef.current.getBoundingClientRect();
            const children = Array.from(scrollableRef.current.children)
            const firstLevelDivs = children.filter(child => child.tagName.toLowerCase() === 'div');
            setRightButtonVisible(scrollWidth > clientWidth)
            setLeftButtonVisible(scrollLeft > firstLevelDivs[0].getBoundingClientRect().width)

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
            const { scrollLeft, scrollWidth, clientWidth } = scrollableRef.current;

            for (let el of firstLevelDivs) {
                const elimentRect = el.getBoundingClientRect();

                if (parseInt(elimentRect.right) > parseInt(containerRect.right)) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' })
                    setLeftButtonVisible(scrollLeft >= 0)
                    console.log(elimentRect.right + scrollLeft < scrollWidth + elimentRect.width)
                    console.log(elimentRect.right, containerRect.right)
                    setRightButtonVisible(elimentRect.right + scrollLeft < scrollWidth)
                    return
                }
                setRightButtonVisible(elimentRect.right + scrollLeft < scrollWidth + elimentRect.width)
            }
        }
    };


    useEffect(() => {
        if (scrollableRef.current) {
            const { scrollWidth, clientWidth } = scrollableRef.current;
            if (scrollWidth > clientWidth) {
                setRightButtonVisible(true)
            }
        }
    }, [list, windowWidth])

    useEffect(() => {
        const handleResize = (event) => {
            setWindowWidth(event.target.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div
            ref={scrollableRef}
            className={styles.slider}
        >
            {list.map(el => renderItem(el))}

            {
                isLeftButtonVisible &&
                <button className={`${styles.slider_btn} ${styles.btn_left}`} ref={leftButton} onClick={handlePrevButtonClick}>
                    <img src={prevSlide} />
                </button>
            }
            {
                isRightButtonVisible &&
                <button className={`${styles.slider_btn} ${styles.btn_right}`} ref={rightButton} onClick={handleNextButtonClick}>
                    <img src={nextSlide} />
                </button>
            }
        </div>
    );
};


export default Slider