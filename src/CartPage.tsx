import { useState } from 'react'
import styles from './CartPage.module.css'
import CouponSheet from './CouponSheet'
import LoginSheet from './LoginSheet'
import RemoveItemSheet, { type CartItem } from './RemoveItemSheet'

const INITIAL_ITEMS: CartItem[] = [
  {
    id: 1,
    name: 'Aara Solid wood upholstered Queen ...',
    subtitle: 'Brand New, No Storage..',
    price: '₹249/mo',
    originalPrice: '₹409',
    delivery: 'Delivery: 3-4 Days',
    isPremium: false,
  },
  {
    id: 2,
    name: 'Aara Solid wood upholstered Queen',
    subtitle: 'Brand New, No Storage',
    price: '₹249/mo',
    originalPrice: '₹409',
    delivery: 'Delivery: 3-4 Days',
    isPremium: true,
  },
  {
    id: 3,
    name: 'Bianca Traditional Side Table',
    subtitle: 'Refurbished, With Storage',
    price: '₹249/mo',
    originalPrice: '₹409',
    delivery: 'Delivery: 3-4 Days',
    isPremium: false,
  },
]

const TICKER = '₹0 DEPOSIT  •  3/MO MIN TENURE  •  CANCEL ANYTIME  •  '

interface Props {
  onNavigateToAddress: () => void
  hideTotal?: boolean
}

export default function CartPage({ onNavigateToAddress, hideTotal = false }: Props) {
  const [items, setItems] = useState<CartItem[]>(INITIAL_ITEMS)
  const [quantities, setQuantities] = useState<Record<number, number>>({ 1: 1, 2: 1, 3: 1 })
  const [upgradeEnabled, setUpgradeEnabled] = useState(false)
  const [protectEnabled, setProtectEnabled] = useState(true)
  const [showCoupons, setShowCoupons] = useState(false)
  const [showLogin, setShowLogin] = useState(false)

  // Remove-item sheet state
  const [sheetItem, setSheetItem] = useState<CartItem | null>(null)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [exitingId, setExitingId] = useState<number | null>(null)

  const updateQty = (id: number, delta: number) =>
    setQuantities(prev => ({ ...prev, [id]: Math.max(0, (prev[id] ?? 1) + delta) }))

  const openRemoveSheet = (item: CartItem) => {
    setSheetItem(item)
    setSheetOpen(true)
  }

  const closeRemoveSheet = () => {
    setSheetOpen(false)
    setTimeout(() => setSheetItem(null), 400)
  }

  const triggerRemove = (id: number) => {
    setSheetOpen(false)
    setTimeout(() => setSheetItem(null), 400)
    setExitingId(id)
    setTimeout(() => {
      setItems(prev => prev.filter(item => item.id !== id))
      setQuantities(prev => { const next = { ...prev }; delete next[id]; return next })
      setExitingId(null)
    }, 380)
  }

  const handleSheetDecrement = () => {
    if (!sheetItem) return
    const cur = quantities[sheetItem.id] ?? 1
    if (cur > 0) updateQty(sheetItem.id, -1)
  }

  return (
    <div className={styles.page}>

      {/* ── Header ── */}
      <div className={styles.header}>
        <button className={styles.backBtn}>‹</button>
        <h1 className={styles.title}>Your Cart</h1>
        <div className={styles.location}>
          5th Phase, J P Nagar Bengaluru, 560078
          <span className={styles.locationChevron}>▾</span>
        </div>
      </div>

      {/* ── Ticker ── */}
      <div className={styles.ticker}>
        <span className={styles.tickerInner}>{TICKER + TICKER}</span>
      </div>

      {/* ── Items Card ── */}
      <div className={styles.card}>
        <p className={styles.sectionLabel}>ITEMS</p>

        {items.map((item, idx) => (
          <div
            key={item.id}
            className={`${styles.itemWrapper} ${exitingId === item.id ? styles.itemExiting : ''}`}
          >
            <div className={styles.itemRow}>
              <div className={styles.itemImgWrap}>
                <div className={styles.imgPlaceholder} />
                {item.isPremium && <div className={styles.premiumBadge} />}
              </div>
              <div className={styles.itemContent}>
                <div className={styles.itemTopRow}>
                  <div className={styles.itemMeta}>
                    <p className={styles.itemName}>{item.name}</p>
                    <p className={styles.itemSubtitle}>{item.subtitle}</p>
                  </div>
                  <div className={styles.itemPriceCol}>
                    <p className={styles.itemPrice}>{item.price}</p>
                    <p className={styles.itemOriginalPrice}>{item.originalPrice}</p>
                  </div>
                </div>
                <div className={styles.itemBottomRow}>
                  <p className={styles.deliveryText}>{item.delivery}</p>
                  <div className={styles.itemActions}>
                    <button
                      className={styles.trashBtn}
                      aria-label="Remove item"
                      onClick={() => openRemoveSheet(item)}
                    >
                      <svg width="14" height="16" viewBox="0 0 14 16" fill="none">
                        <path d="M1 4h12M5 4V2h4v2M2 4l1 10h8l1-10" stroke="#bbb" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                    <div className={styles.stepper}>
                      <button className={styles.stepBtn} onClick={() => openRemoveSheet(item)}>−</button>
                      <span className={styles.stepCount}>{quantities[item.id]}</span>
                      <button className={styles.stepBtn} onClick={() => updateQty(item.id, 1)}>+</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {idx < items.length - 1 && <div className={styles.itemDivider} />}
          </div>
        ))}

        {/* ── Upgrade Banner ── */}
        <div className={styles.upgradeBanner}>
          <div className={styles.upgradeLeft}>
            <div className={styles.infoIcon}>i</div>
            <span className={styles.upgradeLabel}>UPGRADE TO BRAND NEW</span>
          </div>
          <div className={styles.upgradeRight}>
            <span className={styles.upgradePrice}>+ ₹50/mo</span>
            <label className={styles.toggleWrap}>
              <input type="checkbox" checked={upgradeEnabled} onChange={() => setUpgradeEnabled(v => !v)} />
              <span className={styles.toggleSlider} />
            </label>
          </div>
        </div>
      </div>

      {/* ── Furlenco Protect ── */}
      <div className={styles.protectCard}>
        <div className={styles.protectHeader}>
          <div className={styles.protectTitleRow}>
            <span className={styles.protectTitle}>FURLENCO PROTECT</span>
            <span className={styles.protectArrow}>›</span>
          </div>
          <label className={styles.checkboxWrap}>
            <input type="checkbox" checked={protectEnabled} onChange={() => setProtectEnabled(v => !v)} />
            <span className={styles.checkmark} />
          </label>
        </div>
        <div className={styles.protectBody}>
          <div className={styles.shieldPlaceholder} />
          <ul className={styles.protectList}>
            <li>Covers scratches</li>
            <li>Covers for small dents</li>
            <li>Replacement on breakge</li>
          </ul>
        </div>
        <div className={styles.protectFooter}>
          <span className={styles.coveredLabel}>03 Products covered</span>
          <span className={styles.protectPrice}>₹129/mo</span>
        </div>
      </div>

      {/* ── Related Products ── */}
      <div className={styles.card}>
        <p className={styles.sectionLabel}>RELATED PRODUCTS</p>
        <div className={styles.relatedRow}>
          {[1, 2, 3].map(i => (
            <div key={i} className={styles.relatedItem}>
              <div className={styles.relatedImgPlaceholder} />
              <button className={styles.relatedAddBtn}>+</button>
            </div>
          ))}
        </div>
      </div>

      {/* ── Sticky Bar ── */}
      {!hideTotal && <div className={styles.stickyBar}>
        <div>
          <p className={styles.totalLabel}>Total Price</p>
          <p className={styles.totalAmount}>₹13899.98</p>
        </div>
        <button className={styles.continueBtn} onClick={() => setShowLogin(true)}>Continue</button>
      </div>}

      {/* ── Offers ── */}
      <div className={styles.card}>
        <p className={styles.sectionLabel}>OFFERS</p>
        <div className={styles.offerRow}>
          <div className={styles.offerIconWrap}>
            <span>%</span>
          </div>
          <div className={styles.offerText}>
            <p className={styles.offerCode}>FLAT100</p>
            <p className={styles.offerSubtext}>Free delivery over ₹500/mo</p>
          </div>
          <button className={styles.applyBtn}>Apply</button>
        </div>
        <div className={styles.couponRow} onClick={() => setShowCoupons(true)}>
          <span className={styles.couponLabel}>View all coupons</span>
          <span className={styles.couponCount}>(20) ›</span>
        </div>
      </div>

      {/* ── Pricing ── */}
      <div className={styles.card}>
        <p className={styles.sectionLabel}>PRICING</p>
        <div className={styles.pricingRow}><span>Total Cost</span><span>₹2400</span></div>
        <div className={styles.pricingRow}><span>GST</span><span>₹240.44</span></div>
        <div className={styles.pricingRow}><span>Delivery Charges</span><span>₹23.44</span></div>
        <div className={styles.pricingRow}><span>Deposit</span><span>₹590</span></div>
        <div className={styles.pricingDivider} />
        <div className={styles.pricingFinalRow}>
          <span>Final cost</span>
          <span>₹13899.98</span>
        </div>
      </div>

      <div className={styles.bottomPad} />

      <CouponSheet open={showCoupons} onClose={() => setShowCoupons(false)} />
      <LoginSheet
        open={showLogin}
        onClose={() => setShowLogin(false)}
        onSuccess={() => { setShowLogin(false); onNavigateToAddress() }}
      />

      <RemoveItemSheet
        item={sheetItem}
        quantity={sheetItem ? (quantities[sheetItem.id] ?? 1) : 1}
        open={sheetOpen}
        onClose={closeRemoveSheet}
        onRemove={() => sheetItem && triggerRemove(sheetItem.id)}
        onWishlist={() => sheetItem && triggerRemove(sheetItem.id)}
        onIncrement={() => sheetItem && updateQty(sheetItem.id, 1)}
        onDecrement={handleSheetDecrement}
      />
    </div>
  )
}
