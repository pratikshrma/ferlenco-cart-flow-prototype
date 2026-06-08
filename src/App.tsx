import { useState } from 'react'
import ProductPage from './ProductPage'
import CartPage from './CartPage'
import AddressPage from './AddressPage'
import EditAddressSheet from './EditAddressSheet'
import SummaryPage from './SummaryPage'
import FomoSheet from './FomoSheet'
import SelectAddressSheet from './SelectAddressSheet'
import styles from './App.module.css'

type Screen = 'product' | 'cart' | 'address' | 'summary'

export default function App() {
  const [screen, setScreen] = useState<Screen>('product')
  const [showEditSheet, setShowEditSheet] = useState(false)
  const [showFomoSheet, setShowFomoSheet] = useState(false)
  const [showSelectAddress, setShowSelectAddress] = useState(false)

  return (
    <>
      {/* Product page is always the base */}
      <ProductPage
        onBack={() => setScreen('cart')}
        onRent={() => setShowFomoSheet(true)}
      />

      {/* Cart slides over product */}
      {screen !== 'product' && (
        <div className={styles.slideInRight}>
          <CartPage
            onNavigateToAddress={() => setScreen('address')}
            onBack={() => setScreen('product')}
            hideTotal={screen !== 'cart'}
          />
        </div>
      )}

      {/* Address slides over cart */}
      {(screen === 'address' || screen === 'summary') && (
        <div className={styles.slideInRight}>
          <AddressPage
            onBack={() => setScreen('cart')}
            onContinue={() => setScreen('summary')}
            onEditAddress={() => setShowEditSheet(true)}
          />
        </div>
      )}

      {/* Summary slides over address */}
      {screen === 'summary' && (
        <div className={styles.slideInRight}>
          <SummaryPage
            onBack={() => setScreen('address')}
            onEditAddress={() => setShowSelectAddress(true)}
          />
        </div>
      )}

      <EditAddressSheet
        open={showEditSheet}
        onClose={() => setShowEditSheet(false)}
        onContinue={() => setShowEditSheet(false)}
      />

      <FomoSheet
        open={showFomoSheet}
        onClose={() => setShowFomoSheet(false)}
        onContinue={() => { setShowFomoSheet(false); setScreen('cart') }}
      />

      <SelectAddressSheet
        open={showSelectAddress}
        onClose={() => setShowSelectAddress(false)}
        onSave={() => setShowSelectAddress(false)}
      />
    </>
  )
}
