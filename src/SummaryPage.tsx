import { useState } from 'react'
import styles from './SummaryPage.module.css'

const TICKER = '₹0 DEPOSIT  •  3/MO MIN TENURE  •  CANCEL ANYTIME  •  '

type UPIOption = 'PhonePe' | 'G Pay' | 'Kiwi'


const ITEMS = [
  { id: 1, name: 'Aara Solid wood upholstered Queen', price: '₹249/mo', isPremium: false, image: '/summaryPage/item1.png' },
  { id: 2, name: 'Aara Solid wood upholstered Queen', price: '₹249/mo', isPremium: true,  image: '/summaryPage/item2.png' },
  { id: 3, name: 'Bianca Traditional Side Table',     price: '₹249/mo', isPremium: false, image: '/summaryPage/item3.png' },
]

const COST_BREAKDOWN = [
  { label: 'Total Cost',        amount: '₹2400'   },
  { label: 'GST',               amount: '₹240.44' },
  { label: 'Delivery Charges',  amount: '₹23.44'  },
  { label: 'Deposit',           amount: '₹590'    },
]

const UPI_LOGOS: Record<UPIOption, string> = {
  'PhonePe': '/summaryPage/phonePeLogo.png',
  'G Pay':   '/summaryPage/gpayLogo.png',
  'Kiwi':    '/summaryPage/kiwiLogo.png',
}

const OTHERS = [
  { label: 'Cards',      sub: 'Pay via cards',                     image: '/summaryPage/creditCardLogo.svg'  },
  { label: 'Netbanking', sub: 'Select from a list of banks',       image: '/summaryPage/netBankingLogo.svg'  },
  { label: 'Wallets',    sub: 'Paytm, PhonePe, Amazon Pay & more', image: '/summaryPage/WalletLogo.svg'      },
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
        <button className={styles.backBtn} onClick={onBack}><img src="/back.svg" alt="Back" className={styles.backIcon} /></button>
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
              <img src="/summaryPage/adityaTiwariLogo.svg" className={styles.locationIcon} alt="Location" />
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
            <span className={`${styles.chevron} ${itemsExpanded ? '' : styles.chevronClosed}`}><img src="/down.svg" alt="" className={styles.chevronImg} /></span>
          </button>
          {!itemsExpanded ? (
            <div className={styles.itemsCollapsed}>
              <p className={styles.itemsSummaryText}>Aara solid wood Queen bed, Side table...</p>
              <div className={styles.thumbRow}>
                {ITEMS.map(item => (
                  <img key={item.id} src={item.image} className={styles.thumb} alt={item.name} />
                ))}
              </div>
            </div>
          ) : (
            <div className={styles.itemList}>
              {ITEMS.map((item, idx) => (
                <div key={item.id} className={`${styles.itemRow} ${idx < ITEMS.length - 1 ? styles.itemRowBorder : ''}`}>
                  <div className={styles.itemThumbWrap}>
                    <img src={item.image} className={styles.itemThumb} alt={item.name} />
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
            <span className={`${styles.chevron} ${costExpanded ? '' : styles.chevronClosed}`}><img src="/down.svg" alt="" className={styles.chevronImg} /></span>
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
            <img src="/summaryPage/yellowPayAuto.svg" className={styles.coinPlaceholder} alt="Auto Pay" />
            <span className={styles.autoPayText}>Your monthly payments</span>
            <span className={styles.autoPayAmount}>₹574/mo</span>
          </div>
        </div>

        {/* ── Offers ── */}
        <div className={styles.card}>
          <span className={styles.sectionLabel}>OFFERS</span>
          <div className={styles.offerRow}>
            <img src="/summaryPage/GreenOffer.svg" className={styles.offerIcon} alt="Offer" />
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
                <img src={UPI_LOGOS[opt]} className={styles.upiIcon} alt={opt} />
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
              <img src={item.image} className={styles.othersIcon} alt={item.label} />
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
