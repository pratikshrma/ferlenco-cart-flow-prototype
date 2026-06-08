import { useState } from 'react'
import styles from './CartPage.module.css'
import CouponSheet from './CouponSheet'
import LoginSheet from './LoginSheet'
import RemoveItemSheet, { type CartItem } from './RemoveItemSheet'

interface RelatedProduct {
  id: number
  name: string
  price: string
  originalPrice: string
  discount: string | null
  image: string
}

const ALL_RELATED: RelatedProduct[] = [
  { id: 101, name: 'Bed Side Table',       price: '₹249/mo', originalPrice: '₹409', discount: '-15%', image: '/YourCart/relatedProduct1.jpg' },
  { id: 102, name: 'Bed Side Table',       price: '₹249/mo', originalPrice: '₹409', discount: null,   image: '/YourCart/relatedProduct2.jpg' },
  { id: 103, name: 'Bed Side Table',       price: '₹249/mo', originalPrice: '₹409', discount: '-10%', image: '/YourCart/relatedProduct3.jpg' },
  { id: 104, name: 'Study Desk',           price: '₹199/mo', originalPrice: '₹349', discount: null,   image: '/YourCart/relatedProduct1.jpg' },
  { id: 105, name: 'Wardrobe',             price: '₹399/mo', originalPrice: '₹599', discount: '-20%', image: '/YourCart/relatedProduct2.jpg' },
  { id: 106, name: 'Coffee Table',         price: '₹149/mo', originalPrice: '₹249', discount: null,   image: '/YourCart/relatedProduct3.jpg' },
  { id: 107, name: 'Dining Chair',         price: '₹179/mo', originalPrice: '₹299', discount: '-8%',  image: '/YourCart/relatedProduct1.jpg' },
  { id: 108, name: 'Bookshelf',            price: '₹219/mo', originalPrice: '₹379', discount: null,   image: '/YourCart/relatedProduct2.jpg' },
  { id: 109, name: 'Recliner Chair',       price: '₹449/mo', originalPrice: '₹699', discount: '-12%', image: '/YourCart/relatedProduct3.jpg' },
  { id: 110, name: 'TV Unit',              price: '₹279/mo', originalPrice: '₹459', discount: null,   image: '/YourCart/relatedProduct1.jpg' },
  { id: 111, name: 'Shoe Rack',            price: '₹129/mo', originalPrice: '₹199', discount: '-5%',  image: '/YourCart/relatedProduct2.jpg' },
  { id: 112, name: 'Chest of Drawers',     price: '₹329/mo', originalPrice: '₹529', discount: null,   image: '/YourCart/relatedProduct3.jpg' },
  { id: 113, name: 'Sofa',                 price: '₹599/mo', originalPrice: '₹899', discount: '-18%', image: '/YourCart/relatedProduct1.jpg' },
]

function relatedToCartItem(p: RelatedProduct): CartItem {
  return {
    id: p.id,
    name: p.name,
    subtitle: 'Brand New',
    price: p.price,
    originalPrice: p.originalPrice,
    delivery: '3-4 Days',
    isPremium: false,
    image: p.image,
  }
}

const INITIAL_ITEMS: CartItem[] = [
  {
    id: 1,
    name: 'Aara Solid wood upholstered Queen ...',
    subtitle: 'Brand New, No Storage..',
    price: '₹249/mo',
    originalPrice: '₹409',
    delivery: '3-4 Days',
    isPremium: false,
    image: '/YourCart/AaraSolidWood.png',
  },
  {
    id: 2,
    name: 'Aara Solid wood upholstered Queen',
    subtitle: 'Brand New, No Storage',
    price: '₹249/mo',
    originalPrice: '₹409',
    delivery: '3-4 Days',
    isPremium: true,
    image: '/YourCart/queen.png',
  },
  {
    id: 3,
    name: 'Bianca Traditional Side Table',
    subtitle: 'Refurbished, With Storage',
    price: '₹249/mo',
    originalPrice: '₹409',
    delivery: '3-4 Days',
    isPremium: false,
    image: '/YourCart/sideTable.png',
  },
]


interface Props {
  onNavigateToAddress: () => void
  onBack: () => void
  hideTotal?: boolean
}

export default function CartPage({ onNavigateToAddress, onBack, hideTotal = false }: Props) {
  const [items, setItems] = useState<CartItem[]>(INITIAL_ITEMS)
  const [quantities, setQuantities] = useState<Record<number, number>>({ 1: 1, 2: 1, 3: 1 })

  const [relatedDisplayed, setRelatedDisplayed] = useState<RelatedProduct[]>(ALL_RELATED.slice(0, 3))
  const [relatedQueue,     setRelatedQueue]     = useState<RelatedProduct[]>(ALL_RELATED.slice(3))
  const [exitingRelId,     setExitingRelId]     = useState<number | null>(null)
  const [enteringRelId,    setEnteringRelId]    = useState<number | null>(null)
  const [enteringCartId,   setEnteringCartId]   = useState<number | null>(null)
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

  const addFromRelated = (product: RelatedProduct) => {
    if (exitingRelId !== null) return // ignore taps during animation

    setExitingRelId(product.id)

    setTimeout(() => {
      const next = relatedQueue[0] ?? null

      setRelatedDisplayed(prev => {
        const without = prev.filter(p => p.id !== product.id)
        return next ? [...without, next] : without
      })
      if (next) {
        setRelatedQueue(prev => prev.slice(1))
        setEnteringRelId(next.id)
        setTimeout(() => setEnteringRelId(null), 420)
      }
      setExitingRelId(null)

      setItems(prev => [...prev, relatedToCartItem(product)])
      setQuantities(prev => ({ ...prev, [product.id]: 1 }))
      setEnteringCartId(product.id)
      setTimeout(() => setEnteringCartId(null), 420)
    }, 280)
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
        <div className={styles.headerLeft}>
          <button className={styles.backBtn} onClick={onBack}><img src="/back.svg" alt="Back" className={styles.backIcon} /></button>
          <h1 className={styles.title}>YOUR CART</h1>
        </div>
        <button className={styles.pincodePill}>
          560078
          <img src="/down.svg" alt="" className={styles.locationChevron} />
        </button>
      </div>

      {/* ── Items Card ── */}
      <div className={styles.card}>
        <p className={styles.sectionLabel}>ITEMS</p>

        {items.map((item, idx) => (
          <div
            key={item.id}
            className={`${styles.itemWrapper} ${exitingId === item.id ? styles.itemExiting : ''} ${enteringCartId === item.id ? styles.itemEntering : ''}`}
          >
            <div className={styles.itemRow}>
              <div className={styles.itemImgWrap}>
                <img src={item.image} className={styles.itemImg} alt={item.name} />
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
                  <div className={styles.deliveryRow}>
                    <img src="/YourCart/icons/truck.svg" alt="" className={styles.truckIcon} />
                    <span className={styles.deliveryText}>{item.delivery}</span>
                  </div>
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
                      <button className={styles.stepBtn} onClick={() => quantities[item.id] <= 1 ? openRemoveSheet(item) : updateQty(item.id, -1)}>−</button>
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
      </div>

      {/* ── Furlenco Protect ── */}
      <div className={styles.protectCard}>
        <div className={styles.protectHeader}>
          <div className={styles.protectLeft}>
            <img src="/YourCart/ferlencoProductLogo.jpg" className={styles.shieldImg} alt="Furlenco Protect" />
            <div className={styles.protectTextBlock}>
              <div className={styles.protectTitleRow}>
                <span className={styles.protectTitle}>Furlenco Protect</span>
                <span className={styles.protectArrow}>›</span>
              </div>
              <p className={styles.protectSubtitle}>Insure your furniture against scratches, dents and breakage</p>
            </div>
          </div>
          <label className={styles.checkboxWrap}>
            <input type="checkbox" checked={protectEnabled} onChange={() => setProtectEnabled(v => !v)} />
            <span className={styles.checkmark} />
          </label>
        </div>
        <div className={styles.protectFooter}>
          <span className={styles.coveredLabel}>03 Products covered</span>
          <span className={styles.protectPrice}>₹129/mo</span>
        </div>
      </div>

      {/* ── Related Products ── */}
      {relatedDisplayed.length > 0 && (
        <div className={styles.card}>
          <p className={styles.sectionLabel}>RELATED PRODUCTS</p>
          <div className={styles.relatedRow}>
            {relatedDisplayed.map(product => (
              <div
                key={product.id}
                className={`${styles.relatedItem} ${exitingRelId === product.id ? styles.relatedItemExiting : ''} ${enteringRelId === product.id ? styles.relatedItemEntering : ''}`}
              >
                <div className={styles.relatedImgPlaceholder}>
                  <img src={product.image} className={styles.relatedImg} alt={product.name} />
                  <button className={styles.relatedAddBtn} onClick={() => addFromRelated(product)}>+</button>
                </div>
                <p className={styles.relatedName}>{product.name}</p>
                <div className={styles.relatedPriceRow}>
                  <span className={styles.relatedPrice}>{product.price}</span>
                  {product.discount && <span className={styles.relatedDiscount}>{product.discount}</span>}
                </div>
                <p className={styles.relatedOriginalPrice}>{product.originalPrice}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Icons Banner ── */}
      <img src="/YourCart/iconsImage.svg" alt="" className={styles.iconsBanner} />

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
            <img src="/summaryPage/GreenOffer.svg" alt="" className={styles.savingsIcon} />
          </div>
          <div className={styles.offerText}>
            <p className={styles.offerCode}>Save ₹199</p>
            <p className={styles.offerSubtext}>Free delivery over ₹500/mo</p>
          </div>
          <button className={styles.applyBtn}>APPLY</button>
        </div>
        <div className={styles.couponBanner}>
          <span>Add ₹299 to your cart to avail this coupon</span>
        </div>
      </div>

      {/* ── View All Coupons ── */}
      <div className={styles.card} onClick={() => setShowCoupons(true)} style={{ cursor: 'pointer' }}>
        <div className={styles.couponRow}>
          <span className={styles.couponLabel}>View all coupons</span>
          <div className={styles.couponRight}>
            <span className={styles.couponCount}>(20)</span>
            <span className={styles.couponChevron}>›</span>
          </div>
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
        <div className={styles.savingsBanner}>
          <img src="/summaryPage/GreenOffer.svg" alt="" className={styles.savingsIcon} />
          <span>You've saved <strong>₹389</strong> on this purchase</span>
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
