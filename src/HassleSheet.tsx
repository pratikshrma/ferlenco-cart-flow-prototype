import styles from './HassleSheet.module.css'

interface Props {
  open: boolean
  onClose: () => void
  onContinue: () => void
}

export default function HassleSheet({ open, onClose, onContinue }: Props) {
  return (
    <>
      <div
        className={`${styles.overlay} ${open ? styles.overlayVisible : ''}`}
        onClick={onClose}
      />

      <div className={`${styles.sheet} ${open ? styles.sheetOpen : ''}`}>
        <div className={styles.handle} />

        {/* Furlenco brand row */}
        <div className={styles.brandRow}>
          <img src="/hastleFreeRentals/furlencoLogo.svg" alt="Furlenco" className={styles.brandIcon} />
          <span className={styles.brandName}>FURLENCO</span>
        </div>

        {/* Title */}
        <h2 className={styles.title}>Hassle free rentals</h2>

        {/* Features */}
        <div className={styles.features}>

          <div className={styles.featureCol}>
            <img src="/hastleFreeRentals/payMonthly.svg" alt="Pay monthly" className={styles.iconWrap} />
            <p className={styles.featureTitle}>Pay monthly</p>
            <p className={styles.featureSub}>renew at the end of each month</p>
          </div>

          <div className={styles.featureCol}>
            <img src="/hastleFreeRentals/3mMinimum.svg" alt="3M Minimum" className={styles.iconWrap} />
            <p className={styles.featureTitle}>3M Minimum</p>
            <p className={styles.featureSub}>End early to pay for the remaining</p>
          </div>

          <div className={styles.featureCol}>
            <img src="/hastleFreeRentals/autoPay.svg" alt="Autopay" className={styles.iconWrap} style={{ width: 92, height: 92 }} />
            <p className={styles.featureTitle}>Autopay</p>
            <p className={styles.featureSub}>never miss your payments</p>
          </div>

        </div>

        {/* Description */}
        <p className={styles.description}>
          Your cart contains products on a monthly payment plan, each with a minimum period of 3 months
        </p>

        {/* Continue */}
        <button className={styles.continueBtn} onClick={onContinue}>
          Continue
        </button>
      </div>
    </>
  )
}
