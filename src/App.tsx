import React, { useEffect, useState } from 'react'
import Header from './containers/Header/Header.tsx'
import { Database } from './interfaces/DataInterface.ts'
import K3Loader from './components/loaders/k3Loader.tsx'
// eslint-disable-next-line import/no-named-default
import { default as requestToData } from './services/fetchData.ts'
import useData from './hooks/useData.ts'
import { useTheme } from './components/theme-provider/ThemeContext.tsx'
import ArticlePreview from './containers/ArticlePreview/ArticlePreview.tsx'
import { Article } from './components/Article.tsx'
import ArticlesBlock from './containers/ArticleBlock/ArticlesBlock.tsx'
import WebinarsBlock from './containers/WebinarsBlock/WebinarsBlock.tsx'
import SubscribeBlock from './containers/SubscribeBlock/SubscribeBlock.tsx'
import Footer from './containers/Footer/Footer.tsx'
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
      {contentData && (
        <>
          <Header content={contentData.menu} />
          <main>
            <ArticlePreview ticker={contentData.sections.main.ticker}>
              <Article content={contentData.sections.main.items[0]} />
            </ArticlePreview>
            <ArticlesBlock content={contentData.sections.content}>
              {contentData.sections.content.items.map((item, index) => {
                return <Article key={index} content={item} />
              })}
            </ArticlesBlock>
            <WebinarsBlock
              content={contentData.sections.proposals}
            ></WebinarsBlock>
            <SubscribeBlock content={contentData.sections.subscription} />
          </main>
          <Footer
            content={contentData.menu}
            contacts={contentData.contacts}
          ></Footer>
        </>
      )}
    </>
  )
}

export default App
