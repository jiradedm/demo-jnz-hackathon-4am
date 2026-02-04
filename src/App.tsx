import { useState } from 'react'
import { PitchForm } from './components/PitchForm'
import { DeckViewer } from './components/DeckViewer'
import type { Deck } from './types/deck'

function App() {
  const [deck, setDeck] = useState<Deck | null>(null)

  return (
    <>
      <div className="min-h-screen grid-bg flex flex-col items-center justify-center p-6 sm:p-8">
        <PitchForm onDeckCreated={setDeck} />
      </div>
      {deck && <DeckViewer onClose={() => setDeck(null)} />}
    </>
  )
}

export default App
