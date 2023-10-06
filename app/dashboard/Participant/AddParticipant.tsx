import { Fab } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { ParticipantForm } from './ParticipantForm'
import { useState } from 'react'

export default function AddParticipant() {
  const [isOpen, setIsOpen] = useState(false)

  const openModal = () => {
    setIsOpen(true)
  }
  const closeModal = () => {
    setIsOpen(false)
  }

  return (
    <div className="w-full text-center pb-4">
      <Fab
        color="inherit"
        size="medium"
        aria-label="Add participant"
        className="border-solid border-2 border-purple-300/40 text-purple-300/90 hover:bg-slate-900"
        onClick={openModal}
      >
        <AddIcon />
      </Fab>
      <h3 className="text-gray-500 text-xs pt-2"> </h3>

      <ParticipantForm isOpen={isOpen} closeModal={closeModal} />
    </div>
  )
}
