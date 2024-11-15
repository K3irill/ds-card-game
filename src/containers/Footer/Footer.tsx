import React, { useEffect } from 'react'
import styles from './Footer.module.scss'
import NavButton from '../../components/buttons/NavButton.tsx'
import { Contacts, Menu } from '../../interfaces/DataInterface.ts'
import IconButton from '../../components/buttons/IconButton.tsx'
import Logo from '../../components/forImg/Logo.tsx'
import NavAccordion from '../../components/nav-accordion/NavAccrodion.tsx'
import NewsletterForm from '../../components/forms/NewsletterForm.tsx'

interface FooterProps {
  content: Menu
  contacts: Contacts
}
function Footer({ content, contacts }: FooterProps) {
  return (
    <footer className={`${styles.footer} }`}>
      <div className={`${styles.footer__container} __container`}>
        <section className={styles['footer__info-wrapper']}>
          <div className={styles.footer__info}>
            <div className={styles.footer__logo}>
              <Logo url={content.logo} />
            </div>
            <div className={styles.footer__award}>
              <img
                src="/img/awards/Holon-100-2021.jpg"
                alt="Holon 100 Award 2021"
              />
            </div>
          </div>

          <div
            className={`${styles['footer__subscribe']} ${styles['mobile-hidden']}`}
          >
            <NewsletterForm content={contacts} />
          </div>
        </section>
        <section className={styles['footer__nav']}>
          {content.footer.map((item, index) => {
            return <NavAccordion key={index} content={item} />
          })}
        </section>
        <section className={styles['footer__contacts']}>
          {Object.entries(contacts)
            .slice(0, 3)
            .map(([key, value]) => (
              <ul key={key} className={styles['footer__contacts_item']}>
                <li>
                  <p>{key}:</p>
                </li>
                <li>
                  <a href={`tel:+${value}`}>
                    {Number.isNaN(+value)
                      ? value
                      : `+${value.replace(
                          /(\+?\d{2})(\d{2})(\d{4})(\d{4})/,
                          '$1 $2 $3-$4',
                        )}`}
                  </a>
                </li>
              </ul>
            ))}
        </section>
        <div
          className={`${styles['footer__subscribe-mobile']} ${styles['tablet-hidden']}`}
        >
          <NewsletterForm content={contacts} />
        </div>
        <section className={styles['footer__socials']}>
          {Object.entries(contacts)
            .slice(3, 7)
            .map(([key, value]) => (
              <a
                key={key}
                href={value}
                title={key}
                className="footer__social-link"
              >
                <img src={`/icons/socials/${key}.svg`} alt="key" />
              </a>
            ))}
        </section>
        <hr
          className={`${styles['footer__hr-line']} ${styles['mobile-hidden']}`}
        />
        <section className={styles['footer__legal']}>
          {contacts.links.map((link, index) => (
            <a key={index} href={link.url}>
              {link.label}
            </a>
          ))}
        </section>
      </div>
    </footer>
  )
}

export default Footer
