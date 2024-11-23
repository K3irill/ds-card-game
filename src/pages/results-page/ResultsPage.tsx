import React, { useContext, useState, useEffect } from 'react'
import styles from './ResultPage.module.scss'
import { AppContext } from '../../context/Context'
import parseCustomDate from '../../utils/parseCustomDate'
import { UserResultData } from '../../interfaces/gameSetting.interface'
import TextInput from '../../components/inputs/TextInput'
const ResultsPage = () => {
  const appContext = useContext(AppContext)
  if (!appContext) {
    throw new Error('AppContext must be used within an AppProvider')
  }
  const { userResultData } = appContext
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [sortTeg, setSortTeg] = useState<'asc' | 'desc'>('asc')
  const [sortedData, setSortedData] = useState<UserResultData[]>(userResultData)
  const [searchKeyword, setSearchKeyword] = useState<string>('')

  const rowsPerPage = 10
  const startIndex = (currentPage - 1) * rowsPerPage
  const endIndex = startIndex + rowsPerPage
  const currentData = sortedData.slice(startIndex, endIndex)
  const totalPages = Math.ceil(sortedData.length / rowsPerPage)

  useEffect(() => {
    setSortedData(userResultData)
  }, [userResultData])

  useEffect(() => {
    if (searchKeyword) {
      const filtered = userResultData.filter((result) =>
        Object.values(result).some((value) =>
          value.toString().toLowerCase().includes(searchKeyword.toLowerCase()),
        ),
      )
      console.log(1)

      setSortedData(filtered)
      setCurrentPage(1)
    } else {
      setSortedData(userResultData)
    }
  }, [searchKeyword, userResultData])

  const sortByTime = () => {
    const sorted = [...sortedData].sort((a, b) => {
      const dateA = parseCustomDate(a.date_time)
      const dateB = parseCustomDate(b.date_time)

      return sortTeg === 'asc'
        ? dateA.getTime() - dateB.getTime()
        : dateB.getTime() - dateA.getTime()
    })

    setSortedData(sorted)
    setSortTeg((prev) => (prev === 'asc' ? 'desc' : 'asc'))
    setCurrentPage(1)
  }

  const handlePageChange = (n: number) => {
    setCurrentPage(n)
  }

  return (
    <div className={styles['result-page']}>
      <div className={styles['result-page__container']}>
        <div className={styles['result-page__headings']}>
          <h2>User Statistics</h2>
          <TextInput
            value={searchKeyword}
            placeholder="Search"
            funOnChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchKeyword(e.target.value)
            }
            setValue={setSearchKeyword}
            type="text"
          />
        </div>
        <div className={styles['result-page__table-wrapper']}>
          <table className={styles['result-page__table']}>
            <thead>
              <tr>
                <th
                  className={styles['result-page__sort-btn']}
                  onClick={sortByTime}
                >
                  Date & Time
                  <img
                    className={styles['result-page__sort-img']}
                    src="/icons/sort.svg"
                    alt=""
                  />
                </th>
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
                  <td style={{ textAlign: 'center' }} colSpan={6}>
                    No data available
                  </td>
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
                    currentPage === index + 1
                      ? styles['result-page__pagination-btn--active']
                      : ''
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
