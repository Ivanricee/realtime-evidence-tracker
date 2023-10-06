'use client'
import { addFinance } from '@/app/actions/financeActions'
import { AutocompleteParticipant } from '@/components/AutocompleteParticipants'
import { Submit } from '@/components/Submit'
import type { financeDataType } from '@/types'
import { Chip, Divider, TextField } from '@mui/material'
import { useRef, useState } from 'react'
import { Toaster, toast } from 'sonner'
type TautocompleteRef = {
  getOptionSelected: () => Participants[]
  reset: () => void
}
export default function Finance() {
  const autocompleteRef = useRef<TautocompleteRef>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const [participantFrom, setParticipantFrom] = useState<Participants | null>(
    null
  )
  const [transactionError, setTransactionError] = useState(false)
  const [bits, setBits] = useState('')
  const [subs, setSubs] = useState('')

  const handleAutocomplete = (participant: Participants) => {
    if (participant) setParticipantFrom({ ...participant })
  }
  const handleBits = (event: React.ChangeEvent<HTMLInputElement>) =>
    setBits(event.target.value)
  const handleSubs = (event: React.ChangeEvent<HTMLInputElement>) =>
    setSubs(event.target.value)

  const submitAddQuiz = async (formData: FormData) => {
    const partSelected = autocompleteRef.current?.getOptionSelected()
    autocompleteRef.current?.reset()
    const from = participantFrom?.id
    const to = partSelected?.map((participant) => participant.id)
    const bits = formData.get('bits')
    const subs = formData.get('subs')
    const hasSubs = subs && subs?.length > 0
    const hasBits = bits && bits?.length > 0
    const hasTransaction = hasSubs || hasBits
    if (!hasTransaction) {
      setTransactionError(true)
    } else {
      setTransactionError(false)
    }
    if (from && to && hasTransaction) {
      const financeData: financeDataType = {
        from,
        to,
        bits: Number(bits),
        subs: Number(subs),
      }

      const response = await addFinance(financeData)
      if (response) {
        const { data, status } = response
        if (status === 201) {
          formRef.current?.reset()

          return toast.success('Quiz agregado con exito')
        }
        return toast.error('Algo salio mal, intenta mas terde')
      }
    }
  }
  const isBitsDisable = subs.length !== 0
  const isSubsDisable = bits.length !== 0

  return (
    <article
      className="h-full w-full flex flex-col items-center rounded-xl shadow-2xl py-14 px-14
        bg-transparent bg-gradient-to-t from-zinc-800/20 from-20% to-65% overflow-auto  "
    >
      <div className="overflow-auto flex flex-col items-center h-full py-14 px-14">
        <form
          ref={formRef}
          action={submitAddQuiz}
          className="w-full flex flex-col items-center"
        >
          <div className="flex gap-4">
            <div className="w-1/2">
              <AutocompleteParticipant
                participant={participantFrom}
                onChange={handleAutocomplete}
                title="Del participante"
              />
            </div>
            <div className="w-1/2">
              <AutocompleteParticipant
                ref={autocompleteRef}
                participantIdFilter={participantFrom?.id}
                isMultiple
                title="Para el participante"
              />
            </div>
          </div>
          <TextField
            value={bits}
            onChange={handleBits}
            disabled={isBitsDisable}
            className="w-1/4 min-w-[13rem]"
            defaultValue={''}
            margin="dense"
            id="bits"
            name="bits"
            label="Bits"
            type="number"
            color="primary"
            variant="outlined"
          />
          <Divider
            variant="middle"
            flexItem
            className="w-1/4 min-w-[10rem] self-center"
          >
            <Chip label="ó" />{' '}
          </Divider>
          <TextField
            value={subs}
            onChange={handleSubs}
            disabled={isSubsDisable}
            className="w-1/4 min-w-[13rem]"
            defaultValue={''}
            margin="dense"
            id="subs"
            name="subs"
            label="Subscripciones"
            type="number"
            color="primary"
            variant="outlined"
          />
          {transactionError && (
            <Chip
              label="Agrega bits o subscripciones para continuar"
              className="bg-red-400/5 text-red-300/90 mt-2"
            />
          )}
          <div className="text-center pt-6">
            <Submit description="Registrar transacción" />
          </div>
        </form>
      </div>
      <Toaster position="bottom-left" richColors closeButton />
    </article>
  )
}
