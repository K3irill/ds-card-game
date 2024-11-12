import React from 'react'

const pasteLinkInText = (
  text: string,
  wordForReplace: string[],
  links: React.ReactNode[],
): React.ReactNode => {
  const regex = new RegExp(`(${wordForReplace.join('|')})`, 'g')

  return text.split(regex).map((textPart, index) => {
    const matchIndex = wordForReplace.indexOf(textPart)

    if (matchIndex !== -1) {
      return <React.Fragment key={index}>{links[matchIndex]}</React.Fragment>
    }

    return textPart
  })
}
export default pasteLinkInText
