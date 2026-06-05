import { useState } from 'react'
import styles from './CouponSheet.module.css'

interface Props {
  open: boolean
  onClose: () => void
}

const validCoupons = [
  {
    id: 1,
    code: 'FLAT800',
    save: 'Save ₹140 on your order!',
    description: 'Use code FLAT800 & get flat ₹800 off orders above ₹2999',
  },
]

const invalidCoupons = [
  {
    id: 1,
    code: 'BEST300',
    save: 'Save ₹140 on your order!',
    description: 'Use code FLAT800 & get flat ₹800 off orders above ₹2999',
  },
  {
    id: 2,
    code: 'BEST300',
    save: 'Save ₹140 on your order!',
    description: 'Use code FLAT800 & get flat ₹800 off orders above ₹2999',
  },
]

export default function CouponSheet({ open, onClose }: Props) {
  const [code, setCode] = useState('')

  return (
    <>
      <div
        className={`${styles.overlay} ${open ? styles.overlayVisible : ''}`}
        onClick={onClose}
      />

      <div className={`${styles.sheet} ${open ? styles.sheetOpen : ''}`}>
        <div className={styles.sheetContent}>

          {/* ── Add Offers ── */}
          <p className={`${styles.sectionLabel} ${styles.firstLabel}`}>ADD OFFERS</p>
          <div className={styles.inputWrap}>
            <input
              className={styles.input}
              type="text"
              placeholder="Enter Coupon Code"
              value={code}
              onChange={e => setCode(e.target.value)}
            />
            <button className={styles.inputApply}>APPLY</button>
          </div>

          {/* ── Valid Coupons ── */}
          <p className={styles.sectionLabel}>VALID COUPONS</p>
          {validCoupons.map(coupon => (
            <div key={coupon.id} className={styles.validCard}>
              <div className={styles.cardTop}>
                <div className={`${styles.iconBox} ${styles.iconGreen}`}>%</div>
                <div className={styles.cardInfo}>
                  <p className={styles.cardCode}>{coupon.code}</p>
                  <p className={styles.cardSave}>{coupon.save}</p>
                </div>
                <button className={styles.applyValid}>APPLY</button>
              </div>
              <div className={styles.cardDivider} />
              <p className={styles.cardDesc}>{coupon.description}</p>
            </div>
          ))}

          {/* ── Invalid Coupons ── */}
          <p className={styles.sectionLabel}>INVALID COUPONS</p>
          {invalidCoupons.map(coupon => (
            <div key={coupon.id} className={styles.invalidCard}>
              <div className={styles.cardTop}>
                <div className={`${styles.iconBox} ${styles.iconGray}`}>%</div>
                <div className={styles.cardInfo}>
                  <p className={styles.cardCode}>{coupon.code}</p>
                  <p className={styles.cardSave}>{coupon.save}</p>
                </div>
                <button className={styles.applyInvalid} disabled>APPLY</button>
              </div>
              <div className={styles.cardDivider} />
              <p className={styles.cardDesc}>{coupon.description}</p>
            </div>
          ))}

        </div>
      </div>
    </>
  )
}
