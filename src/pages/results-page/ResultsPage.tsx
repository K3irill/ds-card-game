import React, { useContext, useState, useEffect } from 'react'
import styles from './ResultPage.module.scss'
import { AppContext } from '../../context/Context'

const ResultsPage = () => {
  const appContext = useContext(AppContext)

  if (!appContext) {
    throw new Error('AppContext must be used within an AppProvider')
  }

  const { userResultData } = appContext

  const [currentPage, setCurrentPage] = useState(1)

  const rowsPerPage = 10

  const startIndex = (currentPage - 1) * rowsPerPage
  const endIndex = startIndex + rowsPerPage
  const currentData = userResultData.slice(startIndex, endIndex)

  const totalPages = Math.ceil(userResultData.length / rowsPerPage)

  const handlePageChange = (n: number) => {
    setCurrentPage(n)
  }

  return (
    <div className={styles['result-page']}>
      <div className={styles['result-page__container']}>
        <div className={styles['result-page__headings']}>
          <h2>User Statistics</h2>
        </div>
        <div className={styles['result-page__table-wrapper']}>
          <table className={styles['result-page__table']}>
            <thead>
              <tr>
                <th>Date & Time</th>
                <th>Playing Time</th>
                <th>Mistakes Count</th>
                <th>Difficulty</th>
                <th>Guess Count</th>
                <th>User</th>
              </tr>
            </thead>
            <tbody>
              {currentData.length > 0 ? (
                currentData.map((row, index) => (
                  <tr key={index}>
                    <td>{row.date_time}</td>
                    <td>{row.playing_time}</td>
                    <td>{row.mistakes}</td>
                    <td>{row.difficulty}</td>
                    <td>{row.guesses}</td>
                    <td>{row.user}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6}>No data available</td>
                </tr>
              )}
            </tbody>
          </table>
          {totalPages > 1 && (
            <div className={styles['result-page__pagination']}>
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  className={`${styles['result-page__pagination-btn']} ${
                    currentPage === index + 1 ? styles['active'] : ''
                  }`}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ResultsPage
