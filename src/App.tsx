import React, { useEffect, useState } from 'react'
import Header from './containers/Header/Header.tsx'
import { Database } from './interfaces/DataInterface.ts'
import K3Loader from './components/loaders/k3Loader.tsx'
// eslint-disable-next-line import/no-named-default
import { default as requestToData } from './services/fetchData.ts'
import useData from './hooks/useData.ts'
import { useTheme } from './components/ThemeContext.tsx'
import ArticlePreview from './containers/ArticlePreview/ArticlePreview.tsx'
import { Article } from './components/Article.tsx'
import ArticlesBlock from './containers/Article/ArticlesBlock.tsx'
function App() {
  const { theme, toggleTheme } = useTheme()
  const { contentData, isLoading, error } = useData(requestToData)
  useEffect(() => {
    toggleTheme()
  }, [])

  return (
    <>
      {isLoading && <K3Loader />}
      {error && <p>{error}</p>}
      {contentData && <Header content={contentData.menu} />}

      {contentData && (
        <main>
          <ArticlePreview ticker={contentData.sections.main.ticker}>
            <Article content={contentData.sections.main.items[0]} />
          </ArticlePreview>
          <ArticlesBlock>
            {contentData.sections.content.items.map((item) => {
              return <Article content={item} />
            })}
          </ArticlesBlock>
        </main>
      )}
    </>
  )
}

export default App
