import styles from './FomoSheet.module.css'

interface Props {
  open: boolean
  onClose: () => void
  onContinue: () => void
}

export default function FomoSheet({ open, onClose, onContinue }: Props) {
  return (
    <>
      <div
        className={`${styles.overlay} ${open ? styles.overlayVisible : ''}`}
        onClick={onClose}
      />

      <div className={`${styles.sheet} ${open ? styles.sheetOpen : ''}`}>
        <div className={styles.handle} />

        {/* Shield icon */}
        <div className={styles.shieldWrap}>
          <img src="/standardRentalPlan/mainLogo.png" alt="Standard Rental Plan" className={styles.shieldImg} />
        </div>

        {/* Title */}
        <p className={styles.subtitle}>Your products are valid under</p>
        <h2 className={styles.title}>Standard Rental Plan</h2>

        {/* Feature icons */}
        <div className={styles.features}>
          <div className={styles.featureItem}>
            <div className={styles.iconBox}>
              <img src="/standardRentalPlan/PayMonthly.svg" alt="Pay monthly" className={styles.iconImg} />
            </div>
            <span className={styles.featureLabel}>Pay monthly</span>
          </div>

          <div className={styles.featureItem}>
            <div className={styles.iconBox}>
              <img src="/standardRentalPlan/3mMinimum.svg" alt="3M Minimum" className={styles.iconImg} />
            </div>
            <span className={styles.featureLabel}>3M Minimum</span>
          </div>

          <div className={styles.featureItem}>
            <div className={styles.iconBox}>
              <img src="/standardRentalPlan/customDelivery.svg" alt="Custom Delivery" className={styles.iconImg} />
            </div>
            <span className={styles.featureLabel}>Custom Delivery</span>
          </div>
        </div>

        {/* Description */}
        <p className={styles.description}>
          Your cart contains products on a monthly payment plan, each with a minimum period of 3 months
        </p>

        {/* Continue button */}
        <button className={styles.continueBtn} onClick={onContinue}>
          Continue
        </button>
      </div>
    </>
  )
}
