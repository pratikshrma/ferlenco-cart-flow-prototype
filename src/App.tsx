import { useState } from 'react'
import CartPage from './CartPage'
import AddressPage from './AddressPage'
import EditAddressSheet from './EditAddressSheet'
import SummaryPage from './SummaryPage'
import styles from './App.module.css'

type Screen = 'cart' | 'address' | 'summary'

export default function App() {
  const [screen, setScreen] = useState<Screen>('cart')
  const [showEditSheet, setShowEditSheet] = useState(false)

  return (
    <>
      <CartPage
        onNavigateToAddress={() => setScreen('address')}
        hideTotal={screen !== 'cart'}
      />

      {(screen === 'address' || screen === 'summary') && (
        <div className={styles.slideInRight}>
          <AddressPage
            onBack={() => setScreen('cart')}
            onContinue={() => setScreen('summary')}
            onEditAddress={() => setShowEditSheet(true)}
          />
        </div>
      )}

      {screen === 'summary' && (
        <div className={styles.slideInRight}>
          <SummaryPage onBack={() => setScreen('address')} />
        </div>
      )}

      <EditAddressSheet
        open={showEditSheet}
        onClose={() => setShowEditSheet(false)}
        onContinue={() => setShowEditSheet(false)}
      />
    </>
  )
}
