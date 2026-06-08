import styles from './FomoSheet.module.css'

interface Props {
  open: boolean
  onClose: () => void
  onContinue: () => void
}

const ADD_ONS = [
  { img: '/YourCart/relatedProduct1.jpg', name: 'Bed Side Table', price: '₹249/mo', discount: '-10%' },
  { img: '/YourCart/relatedProduct2.jpg', name: 'Bed Side Table', price: '₹249/mo', discount: null },
  { img: '/YourCart/relatedProduct3.jpg', name: 'Bed Side Table', price: '₹249/mo', discount: '-10%' },
  { img: '/YourCart/sideTable.png',       name: 'Bed Side Table', price: '₹249/mo', discount: null },
]

export default function FomoSheet({ open, onClose, onContinue }: Props) {
  return (
    <>
      <div
        className={`${styles.overlay} ${open ? styles.overlayVisible : ''}`}
        onClick={onClose}
      />

      <div className={`${styles.modal} ${open ? styles.modalOpen : ''}`}>
        {/* Header */}
        <div className={styles.header}>
          <div>
            <h2 className={styles.title}>Usually best paired with</h2>
            <p className={styles.subtitle}>You can pair your bed with an add on</p>
          </div>
          <button className={styles.closeBtn} onClick={onClose}>✕</button>
        </div>

        {/* Horizontal product scroll */}
        <div className={styles.scrollRow}>
          {ADD_ONS.map((item, i) => (
            <div key={i} className={styles.card}>
              <div className={styles.imageWrap}>
                <img src={item.img} alt={item.name} className={styles.cardImg} />
                <button className={styles.addBtn}>+</button>
              </div>
              <p className={styles.cardName}>{item.name}</p>
              <div className={styles.cardPriceRow}>
                <span className={styles.cardPrice}>{item.price}</span>
                {item.discount && <span className={styles.discountBadge}>{item.discount}</span>}
              </div>
            </div>
          ))}
        </div>

        {/* Skip button */}
        <button className={styles.skipBtn} onClick={onContinue}>I'll skip it</button>
      </div>
    </>
  )
}
