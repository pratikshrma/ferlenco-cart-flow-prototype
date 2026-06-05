import { useState } from 'react'
import styles from './EditAddressSheet.module.css'

interface Props {
  open: boolean
  onClose: () => void
  onContinue: () => void
}

type SaveAs = 'Home' | 'Work' | 'Others'

export default function EditAddressSheet({ open, onClose, onContinue }: Props) {
  const [houseNo, setHouseNo] = useState('')
  const [apartment, setApartment] = useState('')
  const [city, setCity] = useState('')
  const [zipcode, setZipcode] = useState('')
  const [saveAs, setSaveAs] = useState<SaveAs>('Home')

  return (
    <>
      <div
        className={`${styles.overlay} ${open ? styles.overlayVisible : ''}`}
        onClick={onClose}
      />

      <div className={`${styles.sheet} ${open ? styles.sheetOpen : ''}`}>
        <div className={styles.sheetContent}>

          <p className={styles.sectionLabel}>SELECT DELIVERY LOCATION</p>

          <div className={styles.addressRow}>
            <div className={styles.locationIcon} />
            <div className={styles.addressText}>
              <p className={styles.addressName}>Aditya Tiwari</p>
              <p className={styles.addressDetail}>T-1, Rose Garden, 5th Main,{'\n'}Bengaluru, Karnataka</p>
            </div>
            <button className={styles.changeBtn}>CHANGE</button>
          </div>

          <div className={styles.fieldGroup}>
            <div className={styles.field}>
              <input
                id="houseNo"
                className={styles.input}
                type="text"
                placeholder=" "
                value={houseNo}
                onChange={e => setHouseNo(e.target.value)}
              />
              <label className={styles.label} htmlFor="houseNo">House/ Flat No</label>
            </div>

            <div className={styles.field}>
              <input
                id="apartment"
                className={styles.input}
                type="text"
                placeholder=" "
                value={apartment}
                onChange={e => setApartment(e.target.value)}
              />
              <label className={styles.label} htmlFor="apartment">Apartment/ Road/ Area</label>
            </div>

            <div className={styles.field}>
              <input
                id="city"
                className={styles.input}
                type="text"
                placeholder=" "
                value={city}
                onChange={e => setCity(e.target.value)}
              />
              <label className={styles.label} htmlFor="city">City</label>
            </div>

            <div className={styles.field}>
              <input
                id="zipcode"
                className={styles.input}
                type="text"
                placeholder=" "
                value={zipcode}
                onChange={e => setZipcode(e.target.value)}
              />
              <label className={styles.label} htmlFor="zipcode">Zipcode</label>
            </div>
          </div>

          <p className={styles.saveAsLabel}>SAVE AS</p>
          <div className={styles.saveAsRow}>
            {(['Home', 'Work', 'Others'] as SaveAs[]).map(tag => (
              <button
                key={tag}
                className={`${styles.saveAsBtn} ${saveAs === tag ? styles.saveAsBtnActive : ''}`}
                onClick={() => setSaveAs(tag)}
              >
                {tag}
              </button>
            ))}
          </div>

          <button className={styles.continueBtn} onClick={onContinue}>Continue</button>

        </div>
      </div>
    </>
  )
}
