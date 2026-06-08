import { useRef } from 'react'
import styles from './RemoveItemSheet.module.css'

export interface CartItem {
  id: number
  name: string
  subtitle: string
  price: string
  originalPrice: string
  delivery: string
  isPremium: boolean
  outOfStock?: boolean
  discount?: string
  image: string
}

interface Props {
  item: CartItem | null
  quantity: number
  open: boolean
  onClose: () => void
  onRemove: () => void
  onWishlist: () => void
  onIncrement: () => void
  onDecrement: () => void
}

export default function RemoveItemSheet({
  item,
  quantity,
  open,
  onClose,
  onRemove,
  onWishlist,
  onIncrement,
  onDecrement,
}: Props) {
  // Retain last item so the sheet content stays visible during the close animation
  const lastItem = useRef<CartItem | null>(null)
  if (item) lastItem.current = item
  const display = item ?? lastItem.current
  if (!display) return null

  return (
    <>
      <div
        className={`${styles.overlay} ${open ? styles.overlayVisible : ''}`}
        onClick={onClose}
      />

      <div className={`${styles.sheet} ${open ? styles.sheetOpen : ''}`}>
        {/* ── Header ── */}
        <div className={styles.header}>
          <h2 className={styles.title}>Remove Item from cart</h2>
          <button className={styles.closeBtn} onClick={onClose}>×</button>
        </div>
        <p className={styles.subtitle}>Are you sure you want to remove this product from cart</p>

        {/* ── Item Card ── */}
        <div className={styles.itemCard}>
          <div className={styles.itemRow}>
            <div className={styles.itemImgWrap}>
              <div className={styles.imgPlaceholder} />
              {display.isPremium && <div className={styles.premiumBadge} />}
            </div>
            <div className={styles.itemContent}>
              <div className={styles.itemTopRow}>
                <div className={styles.itemMeta}>
                  <p className={styles.itemName}>{display.name}</p>
                  <p className={styles.itemSubtitle}>{display.subtitle}</p>
                </div>
                <div className={styles.itemPriceCol}>
                  <p className={styles.itemPrice}>{display.price}</p>
                  <p className={styles.itemOriginalPrice}>{display.originalPrice}</p>
                </div>
              </div>
              <div className={styles.itemBottomRow}>
                <p className={styles.deliveryText}>{display.delivery}</p>
                <div className={styles.itemActions}>
                  <button className={styles.trashBtn} onClick={onWishlist} aria-label="Remove item">
                    <svg width="14" height="16" viewBox="0 0 14 16" fill="none">
                      <path d="M1 4h12M5 4V2h4v2M2 4l1 10h8l1-10" stroke="#bbb" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <div className={styles.stepper}>
                    <button className={styles.stepBtn} onClick={onDecrement}>−</button>
                    <span className={styles.stepCount}>{quantity}</span>
                    <button className={styles.stepBtn} onClick={onIncrement}>+</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Actions ── */}
        <div className={styles.actions}>
          <button className={styles.removeBtn} onClick={onRemove}>Remove</button>
          <button className={styles.wishlistBtn} onClick={onWishlist}>Move to Wishlist</button>
        </div>
      </div>
    </>
  )
}
