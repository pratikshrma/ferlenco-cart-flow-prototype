import { useState } from 'react'
import styles from './LoginSheet.module.css'

interface Props {
  open: boolean
  onClose: () => void
  onSuccess: () => void
}

export default function LoginSheet({ open, onClose, onSuccess }: Props) {
  const [step, setStep] = useState<'login' | 'otp'>('login')

  const handleClose = () => {
    onClose()
    setTimeout(() => setStep('login'), 400)
  }

  return (
    <>
      <div
        className={`${styles.overlay} ${open ? styles.overlayVisible : ''}`}
        onClick={handleClose}
      />

      <div className={`${styles.sheet} ${open ? styles.sheetOpen : ''}`}>

        {/* stays: back + logo */}
        <button className={styles.backBtn} onClick={step === 'otp' ? () => setStep('login') : handleClose}>‹</button>
        <div className={styles.logoPlaceholder} />

        {/* slides: title + subtitle + inputs */}
        <div className={styles.slidingWrap}>
          <div className={`${styles.track} ${step === 'otp' ? styles.trackSlid : ''}`}>

            {/* Login view */}
            <div className={styles.view}>
              <h2 className={styles.title}>Log in</h2>
              <p className={styles.subtitle}>Enter your details</p>
              <div className={styles.inputs}>
                <input className={styles.input} type="text" defaultValue="9876543210" />
                <p className={styles.or}>OR</p>
                <p className={styles.signupRow}>
                  Don't have an account?&nbsp;<span className={styles.signupLink}>SIGN UP</span>
                </p>
              </div>
            </div>

            {/* OTP view */}
            <div className={styles.view}>
              <h2 className={styles.title}>OTP Verification</h2>
              <p className={styles.subtitle}>Enter the OTP shared on +9876543210</p>
              <div className={styles.inputs}>
                <div className={styles.otpRow}>
                  {[0, 1, 2, 3].map(i => (
                    <input key={i} className={styles.otpBox} type="text" maxLength={1} inputMode="numeric" />
                  ))}
                </div>
                <p className={styles.or}>OR</p>
                <p className={styles.signupRow}>
                  Don't have an account?&nbsp;<span className={styles.signupLink}>SIGN UP</span>
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* stays: legal + button */}
        <div className={styles.bottom}>
          <p className={styles.legal}>
            By continuing you agree to our <strong>Terms and Condition</strong>, our{' '}
            <strong>Privacy Policy</strong>, and the <strong>"Program Terms"</strong>
          </p>
          <button
            className={styles.loginBtn}
            onClick={step === 'login' ? () => setStep('otp') : onSuccess}
          >
            LOGIN
          </button>
        </div>

      </div>
    </>
  )
}
