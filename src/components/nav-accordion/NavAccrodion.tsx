import React, { useState } from 'react'
import styles from './NavAccordion.module.scss'
interface NavAccordionProps {
  content: any
}

const NavAccordion = ({ content }: NavAccordionProps) => {
  const [openAcc, setOpenAcc] = useState(false)

  return (
    <div
      onClick={() => setOpenAcc((prev) => !prev)}
      className={`${styles['nav-accordion']} ${
        openAcc ? styles['nav-accordion--open'] : styles['nav-accordion--close']
      }`}
    >
      <h3 className={styles['nav-accordion__title']}>
        {content.label}
        <img
          className={styles['nav-accordion__img-acc']}
          src="/icons/accordion-arrow.svg"
          alt="accordion-arrow"
        />
      </h3>
      <ul className={styles['nav-accordion__list']}>
        {content.items.map((link, index) => {
          return (
            <li>
              <a href={link.url}>{link.label}</a>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default NavAccordion
