import React from 'react'
import styles from './UserImagesModal.module.scss'
interface UserImagesModalProps {
  images: string[]
  setImages: React.Dispatch<React.SetStateAction<string[]>>
  onClose: React.Dispatch<React.SetStateAction<boolean>>
}
const UserImagesModal = ({
  images,
  setImages,
  onClose,
}: UserImagesModalProps) => {
  const deleteImg = (deleteIndex: number) => {
    const filtered = images.filter((img, index) => index !== deleteIndex)
    setImages(filtered)
  }

  return (
    <div className={styles.userModal}>
      <h3>Downloaded images for cards</h3>
      <button
        onClick={() => onClose(false)}
        className={styles['userModal__close-btn']}
      >
        X
      </button>
      <div className={styles['userModal__images-wrapper']}>
        {images.map((img, index) => {
          return (
            <div className={styles['userModal__image']}>
              <img src={img} alt="img" />
              <button
                onClick={() => deleteImg(index)}
                className={styles['userModal__delete-btn']}
              >
                X
              </button>
            </div>
          )
        })}
        {images.length === 0 && (
          <p
            style={{
              textAlign: 'center',
              width: '100%',
              fontSize: '32px',
              marginTop: '100px',
            }}
          >
            empty-_-
          </p>
        )}
      </div>
    </div>
  )
}

export default UserImagesModal
