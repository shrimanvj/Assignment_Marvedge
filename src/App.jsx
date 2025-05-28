import { useState, useEffect } from 'react'
import HeroSection from './components/HeroSection'
import TourEditor from './components/TourEditor'
import TourPreview from './components/TourPreview'
import StepModal from './components/StepModal'
import ThemeToggle from './components/ThemeToggle'
import useTourSteps from './hooks/useTourSteps'
import './styles/index.css'

function App() {
  // Theme state
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('theme') === 'dark')
  // Modal state
  const [modalOpen, setModalOpen] = useState(false)
  const [editIdx, setEditIdx] = useState(null)
  // Preview state
  const [previewMode, setPreviewMode] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)

  // Steps state
  const {
    steps,
    addStep,
    editStep,
    removeStep,
    reorderSteps,
    setSteps
  } = useTourSteps([
    // Example initial steps for demo
    {
      id: 1,
      title: 'Welcome to the Tour!',
      imageUrl: 'https://placehold.co/128x128?text=Step+1',
      description: 'This is the first step of your product tour.'
    },
    {
      id: 2,
      title: 'Feature Highlight',
      imageUrl: 'https://placehold.co/128x128?text=Step+2',
      description: 'Showcase a key feature with an image and description.'
    },
    {
      id: 3,
      title: 'Get Started',
      imageUrl: 'https://placehold.co/128x128?text=Step+3',
      description: 'Guide users to get started with your product.'
    }
  ])

  // Theme toggle effect
  const handleThemeToggle = () => {
    setDarkMode((prev) => !prev)
    document.documentElement.classList.toggle('dark')
  }

  // Modal handlers
  const handleAddStep = () => {
    setEditIdx(null)
    setModalOpen(true)
  }
  const handleEditStep = (idx) => {
    setEditIdx(idx)
    setModalOpen(true)
  }
  const handleRemoveStep = (idx) => {
    removeStep(idx)
  }
  const handleSaveStep = (step) => {
    if (editIdx !== null) {
      editStep(editIdx, step)
    } else {
      addStep(step)
    }
    setModalOpen(false)
  }

  // Preview handlers
  const handlePreview = () => {
    setPreviewMode(true)
    setCurrentStep(0)
  }
  const handleClosePreview = () => setPreviewMode(false)
  const handleNextStep = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
  const handlePrevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0))

  // Keyboard navigation for preview
  useEffect(() => {
    if (!previewMode) return
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') handleNextStep()
      if (e.key === 'ArrowLeft') handlePrevStep()
      if (e.key === 'Escape') handleClosePreview()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [previewMode, currentStep, steps.length])

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <ThemeToggle darkMode={darkMode} onToggle={handleThemeToggle} />
      <main className="max-w-3xl mx-auto px-4 pb-16">
        <HeroSection onStartDemo={handlePreview} />
        {!previewMode && (
          <TourEditor
            steps={steps}
            onAddStep={handleAddStep}
            onEditStep={handleEditStep}
            onRemoveStep={handleRemoveStep}
            onReorderSteps={reorderSteps}
            onPreview={handlePreview}
          />
        )}
        <StepModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onSave={handleSaveStep}
          initialData={editIdx !== null ? steps[editIdx] : null}
        />
        {previewMode && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-2xl relative">
              <button className="absolute top-2 right-2 text-2xl" onClick={handleClosePreview} aria-label="Close Preview">&times;</button>
              <TourPreview
                steps={steps}
                currentStep={currentStep}
                onPrev={handlePrevStep}
                onNext={handleNextStep}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
