import { useState } from 'react'
import styles from './SummaryPage.module.css'

const TICKER = '₹0 DEPOSIT  •  3/MO MIN TENURE  •  CANCEL ANYTIME  •  '

type UPIOption = 'PhonePe' | 'G Pay' | 'Kiwi'

const UPI_COLORS: Record<UPIOption, string> = {
  'PhonePe': '#6739b7',
  'G Pay':   '#e8f0fe',
  'Kiwi':    '#4caf50',
}

const ITEMS = [
  { id: 1, name: 'Aara Solid wood upholstered Queen', price: '₹249/mo', isPremium: false },
  { id: 2, name: 'Aara Solid wood upholstered Queen', price: '₹249/mo', isPremium: true  },
  { id: 3, name: 'Bianca Traditional Side Table',     price: '₹249/mo', isPremium: false },
]

const COST_BREAKDOWN = [
  { label: 'Total Cost',        amount: '₹2400'   },
  { label: 'GST',               amount: '₹240.44' },
  { label: 'Delivery Charges',  amount: '₹23.44'  },
  { label: 'Deposit',           amount: '₹590'    },
]

const OTHERS = [
  { label: 'Cards',      sub: 'Pay via cards'                   },
  { label: 'Netbanking', sub: 'Select from a list of banks'     },
  { label: 'Wallets',    sub: 'Paytm, PhonePe, Amazon Pay & more' },
]

interface Props {
  onBack: () => void
}

export default function SummaryPage({ onBack }: Props) {
  const [itemsExpanded, setItemsExpanded] = useState(false)
  const [costExpanded,  setCostExpanded]  = useState(false)
  const [autoPayOn,     setAutoPayOn]     = useState(true)
  const [selectedUPI,   setSelectedUPI]   = useState<UPIOption | null>(null)

  return (
    <div className={styles.page}>

      {/* ── Header ── */}
      <div className={styles.header}>
        <button className={styles.backBtn} onClick={onBack}>‹</button>
        <h1 className={styles.title}>Summary</h1>
      </div>

      <div className={styles.scrollArea}>

        {/* ── Shipping Address + KYC (single card) ── */}
        <div className={styles.addressCard}>
          <div className={styles.addressCardTop}>
            <div className={styles.cardTopRow}>
              <span className={styles.sectionLabel}>SHIPPING ADDRESS</span>
              <button className={styles.tealTextBtn}>EDIT</button>
            </div>
            <div className={styles.addressRow}>
              <div className={styles.locationIcon} />
              <div>
                <p className={styles.addressName}>Aditya Tiwari</p>
                <p className={styles.addressDetail}>T-1, Rose Garden, 5th Main,{'\n'}Bengaluru, Karnataka</p>
              </div>
            </div>
          </div>
          <div className={styles.kycStrip}>
            <div className={styles.truckPlaceholder} />
            <span className={styles.kycText}>KYC VERIFICATION REQUIRED</span>
          </div>
        </div>

        {/* ── 03 Items ── */}
        <div className={styles.card}>
          <button className={styles.collapseRow} onClick={() => setItemsExpanded(v => !v)}>
            <span className={styles.sectionLabel}>03 ITEMS</span>
            <span className={`${styles.chevron} ${itemsExpanded ? '' : styles.chevronClosed}`}>▾</span>
          </button>
          {!itemsExpanded ? (
            <div className={styles.itemsCollapsed}>
              <p className={styles.itemsSummaryText}>Aara solid wood Queen bed, Side table...</p>
              <div className={styles.thumbRow}>
                <div className={styles.thumb} />
                <div className={styles.thumb} />
                <div className={styles.thumb} />
              </div>
            </div>
          ) : (
            <div className={styles.itemList}>
              {ITEMS.map((item, idx) => (
                <div key={item.id} className={`${styles.itemRow} ${idx < ITEMS.length - 1 ? styles.itemRowBorder : ''}`}>
                  <div className={styles.itemThumbWrap}>
                    <div className={styles.itemThumb} />
                    {item.isPremium && <span className={styles.premiumDot} />}
                  </div>
                  <p className={styles.itemName}>{item.name}</p>
                  <span className={styles.itemPrice}>{item.price}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── Cost Breakup ── */}
        <div className={styles.card}>
          <button className={styles.collapseRow} onClick={() => setCostExpanded(v => !v)}>
            <span className={styles.sectionLabel}>COST BREAKUP</span>
            <span className={`${styles.chevron} ${costExpanded ? '' : styles.chevronClosed}`}>▾</span>
          </button>
          <div className={styles.payableRow}>
            <span className={styles.payableLabel}>Payable now</span>
            <span className={styles.payableAmount}>₹13899.98</span>
          </div>
          {costExpanded && (
            <div className={styles.breakdownList}>
              {COST_BREAKDOWN.map(row => (
                <div key={row.label} className={styles.breakdownRow}>
                  <span className={styles.breakdownLabel}>{row.label}</span>
                  <span className={styles.breakdownAmount}>{row.amount}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── Auto Pay ── */}
        <div className={styles.card}>
          <div className={styles.cardTopRow}>
            <span className={styles.sectionLabel}>AUTO PAY</span>
            <label className={styles.toggle}>
              <input type="checkbox" checked={autoPayOn} onChange={() => setAutoPayOn(v => !v)} />
              <span className={styles.toggleTrack} />
            </label>
          </div>
          <div className={styles.autoPayRow}>
            <div className={styles.coinPlaceholder} />
            <span className={styles.autoPayText}>Your monthly payments</span>
            <span className={styles.autoPayAmount}>₹574/mo</span>
          </div>
        </div>

        {/* ── Offers ── */}
        <div className={styles.card}>
          <span className={styles.sectionLabel}>OFFERS</span>
          <div className={styles.offerRow}>
            <div className={styles.offerIcon} />
            <span className={styles.offerCode}>FLAT100</span>
            <span className={styles.appliedText}>APPLIED ✓</span>
          </div>
        </div>

        {/* ── Ticker ── */}
        <div className={styles.ticker}>
          <span className={styles.tickerInner}>{TICKER + TICKER}</span>
        </div>

        {/* ── Payment Method ── */}
        <div className={styles.card}>
          <span className={styles.sectionLabel}>PAYMENT METHOD</span>

          <p className={styles.paySubLabel}>UPI</p>
          <div className={styles.upiRow}>
            {(['PhonePe', 'G Pay', 'Kiwi'] as UPIOption[]).map(opt => (
              <button
                key={opt}
                className={`${styles.upiOption} ${selectedUPI === opt ? styles.upiOptionActive : ''}`}
                onClick={() => setSelectedUPI(opt)}
              >
                <div className={styles.upiIcon} style={{ background: UPI_COLORS[opt] }} />
                <span className={styles.upiName}>{opt}</span>
              </button>
            ))}
          </div>

          <p className={styles.paySubLabel}>OTHERS</p>
          {OTHERS.map((item, idx) => (
            <div
              key={item.label}
              className={`${styles.othersRow} ${idx < OTHERS.length - 1 ? styles.othersRowBorder : ''}`}
            >
              <div className={styles.othersIcon} />
              <div className={styles.othersInfo}>
                <p className={styles.othersLabel}>{item.label}</p>
                <p className={styles.othersSub}>{item.sub}</p>
              </div>
              <span className={styles.othersChevron}>›</span>
            </div>
          ))}
        </div>

        <div className={styles.bottomPad} />
      </div>

    </div>
  )
}
