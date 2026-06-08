import { useRef, useState } from 'react'
import styles from './SummaryPage.module.css'

const TICKER = '₹0 DEPOSIT  •  3/MO MIN TENURE  •  CANCEL ANYTIME  •  '

type UPIOption = 'PhonePe' | 'G Pay' | 'Kiwi'


const ITEMS = [
  { id: 1, name: 'Aara Solid wood upholstered Queen', price: '₹249/mo', isPremium: false, image: '/summaryPage/item1.png' },
  { id: 2, name: 'Aara Solid wood upholstered Queen', price: '₹249/mo', isPremium: true, image: '/summaryPage/item2.png' },
  { id: 3, name: 'Bianca Traditional Side Table', price: '₹249/mo', isPremium: false, image: '/summaryPage/item3.png' },
]

const COST_BREAKDOWN = [
  { label: 'Total Cost', amount: '₹2400' },
  { label: 'GST', amount: '₹240.44' },
  { label: 'Delivery Charges', amount: '₹23.44' },
  { label: 'Deposit', amount: '₹590' },
]

const UPI_LOGOS: Record<UPIOption, string> = {
  'PhonePe': '/summaryPage/phonePeLogo.png',
  'G Pay': '/summaryPage/gpayLogo.png',
  'Kiwi': '/summaryPage/kiwiLogo.png',
}

const OTHERS = [
  { label: 'Cards', sub: 'Pay via cards', image: '/summaryPage/creditCardLogo.svg', bg: '#1c5254' },
  { label: 'Netbanking', sub: 'Select from a list of banks', image: '/summaryPage/netBankingLogo.svg', bg: '#1aafaf' },
  { label: 'Wallets', sub: 'Paytm, PhonePe, Amazon Pay & more', image: '/summaryPage/WalletLogo.svg', bg: '#5b8def' },
]

interface Props {
  onBack: () => void
  onEditAddress: () => void
}

export default function SummaryPage({ onBack, onEditAddress }: Props) {
  const [itemsExpanded, setItemsExpanded] = useState(false)
  const [costExpanded, setCostExpanded] = useState(true)
  const [autoPayOn, setAutoPayOn] = useState(true)
  const [offerApplied, setOfferApplied] = useState(false)
  const [selectedUPI, setSelectedUPI] = useState<UPIOption | null>(null)
  const paymentRef = useRef<HTMLDivElement>(null)

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
              <button className={styles.tealTextBtn} onClick={onEditAddress}>EDIT</button>
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
            <img src="/blueTruck.svg" alt="" className={styles.truckIcon} />
            <span className={styles.kycText}>KYC VERIFICATION REQUIRED</span>
          </div>
        </div>

        {/* ── Items + Cost Breakup (combined card) ── */}
        <div className={styles.card}>

          {/* Items section */}
          <button className={styles.collapseRow} onClick={() => setItemsExpanded(v => !v)}>
            <span className={styles.sectionLabel}>03 ITEMS</span>
            <span className={`${styles.chevron} ${itemsExpanded ? '' : styles.chevronClosed}`}><img src="/down.svg" alt="" className={styles.chevronImg} /></span>
          </button>
          {!itemsExpanded && (
            <div className={styles.itemsCollapsed}>
              <div className={styles.thumbRow}>
                {ITEMS.map(item => (
                  <img key={item.id} src={item.image} className={styles.thumb} alt={item.name} />
                ))}
              </div>
            </div>
          )}

          {itemsExpanded && (
            <>
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

              <div className={styles.sectionDivider} />

              {/* Cost Breakup section */}
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
            </>
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
            <div className={styles.offerText}>
              <p className={styles.offerTitle}>Save ₹199</p>
              <p className={styles.offerSub}>Free delivery over ₹500/mo</p>
            </div>
            {offerApplied
              ? <span className={styles.appliedLabel}>
                  <svg width="14" height="11" viewBox="0 0 14 11" fill="none" style={{display:'inline-block', verticalAlign:'middle', marginRight:5}}>
                    <path d="M1.5 5.5L5.5 9.5L12.5 1.5" stroke="#2a7f8a" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  APPLIED
                </span>
              : <button className={styles.applyBtn} onClick={() => setOfferApplied(true)}>APPLY</button>
            }
          </div>
        </div>

        {/* ── Ticker ── */}
        <div className={styles.ticker}>
          <span className={styles.tickerInner}>{TICKER + TICKER}</span>
        </div>

        {/* ── Payment Method ── */}
        <div className={styles.card} ref={paymentRef}>
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
              <div className={styles.othersIconWrap} style={{ background: item.bg }}>
                <img src={item.image} className={styles.othersIcon} alt={item.label} />
              </div>
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

      {/* ── Sticky Pay Bar ── */}
      <div className={styles.stickyBar}>
        <button
          className={styles.payUsing}
          onClick={() => paymentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
        >
          <span className={styles.payUsingLabel}>PAY USING</span>
          <div className={styles.payUsingRow}>
            <img src="/summaryPage/phonePeLogo.png" className={styles.phonepeIcon} alt="PhonePe" />
            <span className={styles.payUsingMethod}>PhonePe UPI</span>
            <svg width="7" height="12" viewBox="0 0 7 12" fill="none">
              <path d="M1 1l5 5-5 5" stroke="#1a1a1a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </button>
        <button className={styles.payBtn}>Pay ₹13,974</button>
      </div>

    </div>
  )
}
