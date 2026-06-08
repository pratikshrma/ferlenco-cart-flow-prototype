import { useState } from 'react'
import styles from './AddressPage.module.css'
import HassleSheet from './HassleSheet'

interface Props {
  onBack: () => void
  onContinue: () => void
  onEditAddress: () => void
}

export default function AddressPage({ onBack, onContinue, onEditAddress }: Props) {
  const [showHassle, setShowHassle] = useState(false)

  return (
    <div className={styles.page}>

      {/* ── Back button ── */}
      <button className={styles.backBtn} onClick={onBack}><img src="/back.svg" alt="Back" width={18} height={18} /></button>

      {/* ── Map ── */}
      <div className={styles.mapPlaceholder}>
        <img src="/PickAddress/map.png" className={styles.mapImg} alt="Map" />
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

        <button className={styles.continueBtn} onClick={() => setShowHassle(true)}>Continue</button>
      </div>

      <HassleSheet
        open={showHassle}
        onClose={() => setShowHassle(false)}
        onContinue={() => { setShowHassle(false); onContinue() }}
      />

    </div>
  )
}
