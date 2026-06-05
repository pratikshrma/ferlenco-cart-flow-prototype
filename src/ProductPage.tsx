import { useRef, useState } from 'react'
import styles from './ProductPage.module.css'

type Size    = 'Queen' | 'King'
type Storage = 'Non Storage' | 'Storage'
type Tab     = 'customise' | 'details' | 'delivery'

const SIZE_IMAGES: Record<Size, string> = {
  Queen: '/product_page/queen.png',
  King:  '/product_page/king.png',
}

const STORAGE_IMAGES: Record<Storage, string> = {
  'Non Storage': '/product_page/nonStorage.png',
  Storage:       '/product_page/storage.png',
}

const SPECS = [
  { label: 'Primary Material',    value: 'Solid Wood' },
  { label: 'Bed Type',            value: 'Queen Bed'  },
  { label: 'Finish',              value: 'Walnut'     },
  { label: 'Upholstery Material', value: 'Fabric'     },
  { label: 'Upholstery Colour',   value: 'Green'      },
]

const DIMS = [
  { value: '171 cm', label: 'Width'     },
  { value: '207 cm', label: 'Depth'     },
  { value: '120 cm', label: 'Height'    },
  { value: '35 cm',  label: 'Side Beam' },
]

const DELIVERY_ITEMS = [
  { title: 'KYC Verifications',    sub: 'Recommended for seamless delivery'                          },
  { title: 'Choose Delivery Date', sub: 'Set a date as per convenience'                              },
  { title: 'Delivery + Assembly',  sub: 'Furniture will be delivered and assembled at this set date' },
]

interface Props {
  onBack: () => void
  onRent: () => void
}

export default function ProductPage({ onBack, onRent }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>('customise')
  const [size,      setSize]      = useState<Size>('Queen')
  const [storage,   setStorage]   = useState<Storage>('Storage')
  const [brandNew,  setBrandNew]  = useState(true)

  const customiseRef = useRef<HTMLDivElement>(null)
  const detailsRef   = useRef<HTMLDivElement>(null)
  const deliveryRef  = useRef<HTMLDivElement>(null)

  const scrollTo = (tab: Tab) => {
    setActiveTab(tab)
    const map = { customise: customiseRef, details: detailsRef, delivery: deliveryRef }
    map[tab].current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className={styles.page}>

      {/* ── Nav bar ── */}
      <div className={styles.navBar}>
        <button className={styles.backBtn} onClick={onBack}>
          <img src="/back.svg" alt="Back" width={20} height={20} />
        </button>
        <div className={styles.navRight}>
          <img src="/product_page/icons/Outline 24px/Search.svg" alt="Search" width={24} height={24} />
          <img src="/product_page/icons/heart.svg" alt="Wishlist" width={24} height={24} />
          <div className={styles.cartWrap}>
            <img src="/product_page/icons/cart.svg" alt="Cart" width={24} height={24} />
            <span className={styles.cartBadge}>4</span>
          </div>
        </div>
      </div>

      {/* ── Scrollable body ── */}
      <div className={styles.scrollArea}>

        {/* Product image */}
        <div className={styles.imageSection}>
          <img src="/product_page/headerImage.png" alt="Product" className={styles.productImage} />
          <div className={styles.imageOverlay}>
            <div className={styles.shareBtn}>
              <img src="/product_page/icons/ios_share.svg" alt="Share" width={18} height={18} />
            </div>
            <div className={styles.dots}>
              <span className={`${styles.dot} ${styles.dotActive}`} />
              <span className={styles.dot} />
              <span className={styles.dot} />
              <span className={styles.dot} />
            </div>
            <div className={styles.heartBtn}>
              <img src="/product_page/icons/heart.svg" alt="Wishlist" width={18} height={18} />
            </div>
          </div>
        </div>

        {/* Product info */}
        <div className={styles.productInfo}>
          <h2 className={styles.productTitle}>Aara Solid wood{'\n'}upholstered Queen Bed</h2>
          <div className={styles.priceStack}>
            <span className={styles.originalPrice}>₹409</span>
            <span className={styles.mainPrice}>₹249/mo</span>
          </div>
        </div>

        {/* Sticky tab bar */}
        <div className={styles.tabBar}>
          {(['customise', 'details', 'delivery'] as Tab[]).map(tab => (
            <button
              key={tab}
              className={`${styles.tab} ${activeTab === tab ? styles.tabActive : ''}`}
              onClick={() => scrollTo(tab)}
            >
              {tab.toUpperCase()}
            </button>
          ))}
        </div>

        {/* ── CUSTOMISE ── */}
        <div ref={customiseRef} className={styles.section}>

          <p className={styles.sectionHead}>Select a Size</p>
          <div className={styles.optionRow}>
            {(['Queen', 'King'] as Size[]).map(s => (
              <div key={s} className={styles.optionCardWrap}>
                <button
                  className={`${styles.optionCard} ${size === s ? styles.optionActive : ''}`}
                  onClick={() => setSize(s)}
                >
                  <img src={SIZE_IMAGES[s]} alt={s} className={styles.optionImg} />
                </button>
                <div className={styles.optionFooter}>
                  <span className={styles.optionLabel}>{s}</span>
                  {s === 'King' && <span className={styles.optionPrice}>₹249/mo</span>}
                </div>
              </div>
            ))}
          </div>

          <p className={styles.sectionHead}>Storage</p>
          <div className={styles.optionRow}>
            {(['Non Storage', 'Storage'] as Storage[]).map(s => (
              <div key={s} className={styles.optionCardWrap}>
                <button
                  className={`${styles.optionCard} ${storage === s ? styles.optionActive : ''}`}
                  onClick={() => setStorage(s)}
                >
                  <img src={STORAGE_IMAGES[s]} alt={s} className={styles.optionImg} />
                </button>
                <div className={styles.optionFooter}>
                  <span className={styles.optionLabel}>{s}</span>
                  {s === 'Storage' && <span className={styles.optionPrice}>₹249/mo</span>}
                </div>
              </div>
            ))}
          </div>

          <div className={styles.brandNewRow}>
            <div className={styles.brandNewLeft}>
              <span className={styles.brandNewLabel}>Get Brand New</span>
              <span className={styles.infoIcon}>i</span>
            </div>
            <div className={styles.brandNewRight}>
              <span className={styles.brandNewPrice}>+ ₹50/mo</span>
              <label className={styles.toggle}>
                <input type="checkbox" checked={brandNew} onChange={() => setBrandNew(v => !v)} />
                <span className={styles.toggleTrack} />
              </label>
            </div>
          </div>

          <button className={styles.rentBtn} onClick={onRent}>
            <span className={styles.rentLabel}>RENT</span>
            <span className={styles.rentPrice}>₹1249/mo</span>
          </button>

        </div>

        {/* ── DETAILS ── */}
        <div ref={detailsRef} className={styles.section}>
          <p className={styles.bigHeading}>DETAILS</p>

          <p className={styles.subHeading}>Product Specification</p>
          {SPECS.map(s => (
            <div key={s.label} className={styles.specRow}>
              <span className={styles.specLabel}>{s.label}</span>
              <span className={styles.specValue}>{s.value}</span>
            </div>
          ))}

          <p className={styles.subHeading} style={{ marginTop: 24 }}>Dimensions</p>
          <div className={styles.dimsRow}>
            {DIMS.map(d => (
              <div key={d.label} className={styles.dimItem}>
                <span className={styles.dimValue}>{d.value}</span>
                <span className={styles.dimLabel}>{d.label}</span>
              </div>
            ))}
          </div>

          <p className={styles.mattressLabel}>Recommended Mattress Size</p>
          <p className={styles.mattressValue}>171 cm x 186cm x 207cm x 81cm</p>

          <img src="/product_page/lowerBedFrame.png" alt="Dimensions diagram" className={styles.diagramImg} />
        </div>

        {/* ── DELIVERY ── */}
        <div ref={deliveryRef} className={styles.section}>
          <p className={styles.bigHeading}>DELIVERY</p>

          <p className={styles.assemblyHeading}>Delivery &amp; Assembly Details</p>

          {DELIVERY_ITEMS.map(item => (
            <div key={item.title} className={styles.deliveryItem}>
              <p className={styles.deliveryTitle}>{item.title}</p>
              <p className={styles.deliverySub}>{item.sub}</p>
            </div>
          ))}

          <div className={styles.bottomPad} />
        </div>

      </div>
    </div>
  )
}
