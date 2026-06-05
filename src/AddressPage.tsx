import styles from './AddressPage.module.css'

interface Props {
  onBack: () => void
  onContinue: () => void
  onEditAddress: () => void
}

export default function AddressPage({ onBack, onContinue, onEditAddress }: Props) {
  return (
    <div className={styles.page}>

      {/* ── Back button ── */}
      <button className={styles.backBtn} onClick={onBack}>‹</button>

      {/* ── Map placeholder ── */}
      <div className={styles.mapPlaceholder}>
        <div className={styles.tooltip}>Order will be delivered here</div>
        <div className={styles.pin} />
      </div>

      {/* ── Bottom card ── */}
      <div className={styles.card}>
        <p className={styles.cardLabel}>SELECT DELIVERY LOCATION</p>

        <div className={styles.addressRow}>
          <div className={styles.locationIcon} />
          <div className={styles.addressText}>
            <p className={styles.addressName}>Aditya Tiwari</p>
            <p className={styles.addressDetail}>T-1, Rose Garden, 5th Main,{'\n'}Bengaluru, Karnataka</p>
          </div>
          <button className={styles.editBtn} onClick={onEditAddress}>EDIT</button>
        </div>

        <button className={styles.continueBtn} onClick={onContinue}>Continue</button>
      </div>

    </div>
  )
}
