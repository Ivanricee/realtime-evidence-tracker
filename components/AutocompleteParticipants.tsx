'use client'
import { useEffect, useCallback, forwardRef, useImperativeHandle } from 'react'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import Checkbox from '@mui/material/Checkbox'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import { useState } from 'react'
import { useParticipants } from '@/hooks/useParticipants'
import { NO_DATA, PARTICIPANTS, SELECT } from '@/const'
import { Toaster } from 'sonner'
import { AlertToast } from './AlertToast'
import { useAlertToast } from '@/hooks/useAlertToast'
import { CircularProgress, Skeleton } from '@mui/material'

type Props = {
  isMultiple?: boolean
  participantId?: string | null
  participant?: Participants | null
  title?: string
  participantIdFilter?: number | null
  onChange?: (itmSelected: Participants, action?: string) => void
}
type multipleSelect = {
  event: React.SyntheticEvent
  selectedParticipants: any
  action?: string
  itmSelected: any | null
}
type ChildHandle = {
  getOptionSelected: () => Participants[]
  reset: () => void
}

const AutocompleteParticipant = forwardRef<ChildHandle, Props>(
  (
    {
      isMultiple = false,
      participantId = null, // initate value:{}
      participant = null, //needed when participantId exist for init value:{}.
      title = '',
      participantIdFilter = null,
      onChange,
    },
    ref
  ) => {
    const [alertToast, openAlertToast, resetAlertToast] = useAlertToast()
    const [participants, loading, error] = useParticipants()
    const [filterParticipant, setFilterParticipant] = useState<
      Participants[] | null
    >(null)
    const [selectedParticipantsState, setSelectedParticipantsState] = useState<
      Participants[] | []
    >([])

    //-------- multiple item
    // ------ filter participant list if filter
    useEffect(() => {
      if (participantIdFilter) {
        //filter data in autocomplete
        const filter = participants.filter((participItm) => {
          return participItm.id !== participantIdFilter
        })
        //filter data in ui autocomplete
        const filterSelected = selectedParticipantsState.filter(
          (participSelectItm) => {
            return participSelectItm.id !== participantIdFilter
          }
        )
        selectedParticipantsState.length > 0 &&
          setSelectedParticipantsState([...filterSelected])

        setFilterParticipant([...filter])
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [participantIdFilter])

    const icon = <CheckBoxOutlineBlankIcon fontSize="small" />
    const checkedIcon = <CheckBoxIcon fontSize="small" />

    const handleMultipleItems = ({
      event,
      selectedParticipants,
      action,
      itmSelected = null,
    }: multipleSelect) => {
      setSelectedParticipantsState([...selectedParticipants])
    }
    //filterParticipant
    const multipleProps = {
      multiple: true,
      value: selectedParticipantsState,
      limitTags: 3,
      disableCloseOnSelect: true,
      sx: { width: '100%', paddingBottom: '2rem' },
      renderOption: (
        { key, ...props }: any,
        option: any,
        { selected }: { selected: boolean }
      ) => (
        <li {...props} key={option.id}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option?.name}
        </li>
      ),
      onChange: (
        event: React.SyntheticEvent,
        selectedParticipants: any,
        action: string | undefined,
        itmSelected: any | null
      ): void =>
        handleMultipleItems({
          event,
          selectedParticipants,
          action,
          itmSelected,
        }),
    }

    //-------- single item
    const handleSingleItem = useCallback(
      (participantId: string) => {
        const itmSelected = participants.find(
          (participant) => participant?.id === Number(participantId)
        )
        if (itmSelected && onChange) {
          onChange(itmSelected)
        }
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [participants]
    )
    useEffect(() => {
      if (participantId !== null) {
        //load onchange with loader data
        handleSingleItem(participantId)
      }
    }, [handleSingleItem, participantId])

    const singleProps = {
      value: participant,
      onChange: (event: React.ChangeEvent<{}>, value: any) =>
        handleSingleItem(String(value?.id)),
    }
    //-------
    useImperativeHandle(
      ref,
      () => ({
        getOptionSelected: () => selectedParticipantsState,
        reset: () => setSelectedParticipantsState([]),
      }),
      [selectedParticipantsState]
    )
    const propsSelect = isMultiple ? multipleProps : singleProps
    useEffect(() => {
      //Display an alert for errors or empty data.
      if (!loading) {
        let status = null
        if (participants?.length === 0) status = NO_DATA
        if (error) status = error.status
        if (status !== null) {
          openAlertToast({
            feature: PARTICIPANTS,
            action: SELECT,
            status,
          })
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [participants, loading])

    if (alertToast.isOpen)
      return (
        <>
          <div className="flex justify-center px-6 mt-6">
            <AlertToast
              alertToast={alertToast}
              resetAlertToast={resetAlertToast}
              width="6/6"
            />
          </div>
        </>
      )
    const defaultLabel = isMultiple
      ? 'Selecciona uno o varios participantes'
      : 'Selecciona un participante'
    let labelName = title !== '' ? title : defaultLabel
    return (
      <>
        <Autocomplete
          {...propsSelect}
          className="min-w-[200px] w-full"
          disablePortal
          id="participant menu"
          autoComplete
          autoHighlight
          openOnFocus
          options={
            filterParticipant !== null ? filterParticipant : participants
          }
          getOptionLabel={(option) => (option?.name ? option?.name : '')}
          isOptionEqualToValue={(option, value) => option?.id === value?.id}
          renderInput={(params) => (
            <TextField
              {...params}
              required={selectedParticipantsState.length === 0}
              label={labelName}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loading ? (
                      <CircularProgress color="inherit" size={25} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
        />

        <Toaster position="bottom-left" richColors closeButton />
      </>
    )
  }
)
AutocompleteParticipant.displayName = 'AutocompleteParticipant'
export { AutocompleteParticipant }
