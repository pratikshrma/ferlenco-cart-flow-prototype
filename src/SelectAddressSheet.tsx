import { useState } from 'react'
import styles from './SelectAddressSheet.module.css'

interface Address {
  id: number
  label: string
  detail: string
}

const ADDRESSES: Address[] = [
  { id: 1, label: 'Home',   detail: 'H-297, Sura Opal Apatments, Andheri East Mumbai' },
  { id: 2, label: 'Office', detail: 'H-297, Sura Opal Apatments, Andheri East Mumbai' },
  { id: 3, label: 'Riya',   detail: 'H-297, Sura Opal Apatments, Andheri East Mumbai' },
]

interface Props {
  open: boolean
  onClose: () => void
  onSave: () => void
}

export default function SelectAddressSheet({ open, onClose, onSave }: Props) {
  const [selected, setSelected] = useState(1)

  return (
    <>
      <div
        className={`${styles.overlay} ${open ? styles.overlayVisible : ''}`}
        onClick={onClose}
      />

      <div className={`${styles.sheet} ${open ? styles.sheetOpen : ''}`}>
        <div className={styles.handle} />

        <p className={styles.sectionLabel}>SELECT AN ADDRESS</p>

        {/* Add New */}
        <div className={styles.row}>
          <div className={`${styles.iconBox} ${styles.iconBoxTeal}`}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M9 4v10M4 9h10" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" />
            </svg>
          </div>
          <div className={styles.rowText}>
            <p className={styles.rowLabel}>Add New</p>
            <p className={styles.rowSub}>Add a new delivery address</p>
          </div>
          <svg width="9" height="16" viewBox="0 0 9 16" fill="none" className={styles.chevron}>
            <path d="M1 1l7 7-7 7" stroke="#aaa" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <div className={styles.divider} />

        {/* Address list */}
        {ADDRESSES.map((addr, idx) => (
          <div key={addr.id}>
            <button className={styles.row} onClick={() => setSelected(addr.id)}>
              <div className={`${styles.iconBox} ${styles.iconBoxTeal}`}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M9 2C6.24 2 4 4.24 4 7c0 4.25 5 9 5 9s5-4.75 5-9c0-2.76-2.24-5-5-5z" fill="#fff" />
                  <circle cx="9" cy="7" r="1.8" fill="#2a6f7f" />
                </svg>
              </div>
              <div className={styles.rowText}>
                <p className={styles.rowLabel}>{addr.label}</p>
                <p className={styles.rowSub}>{addr.detail}</p>
              </div>
              {selected === addr.id ? (
                <div className={styles.checkCircle}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M3 7l3 3 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              ) : (
                <div className={styles.emptyCircle} />
              )}
            </button>
            {idx < ADDRESSES.length - 1 && <div className={styles.divider} />}
          </div>
        ))}

        <button className={styles.saveBtn} onClick={onSave}>
          Save Address
        </button>
      </div>
    </>
  )
}
