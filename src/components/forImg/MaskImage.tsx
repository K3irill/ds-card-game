import React from 'react'
import styles from './MaskImage.module.scss'
interface MaskImageProps {
  url: string
  mask: string
}
const MaskImage = ({ url, mask }: MaskImageProps) => {
  return (
    <img
      src={url}
      alt=""
      className={`${styles['img-mask__' + mask]} ${styles['img-mask']}`}
    />
  )
}

export default MaskImage
