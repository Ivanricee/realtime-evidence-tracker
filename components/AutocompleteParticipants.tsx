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
import FormControl from '@mui/material/FormControl'
type Props = {
  isMultiple?: boolean
  participantId?: string | null
  participant?: Participants | null
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
}

const AutocompleteParticipant = forwardRef<ChildHandle, Props>(
  (
    {
      isMultiple = false,
      participantId = null, // initate value:{}
      participant = null, //needed when participantId exist for init value:{}.
      onChange,
    },
    ref
  ) => {
    const [alertToast, openAlertToast, resetAlertToast] = useAlertToast()
    const [participants, loading, error] = useParticipants()
    const [selectedParticipantsState, setSelectedParticipantsState] = useState<
      Participants[] | []
    >([])

    //-------- multiple item
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
    const multipleProps = {
      multiple: true,
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
      sx: { width: 300 },
      onChange: (event: React.ChangeEvent<{}>, value: any) =>
        handleSingleItem(String(value?.id)),
    }
    //-------
    useImperativeHandle(
      ref,
      () => ({
        getOptionSelected: () => selectedParticipantsState,
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

    /*if (loading)
      return (
        <div className=" w-full">
          <Skeleton variant="text" className="w-full h-20" />
        </div>
      )*/
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
    return (
      <>
        <Autocomplete
          {...propsSelect}
          className="min-w-[350px]"
          disablePortal
          id="participant menu"
          autoComplete
          autoHighlight
          openOnFocus
          options={participants}
          getOptionLabel={(option) => (option?.name ? option?.name : '')}
          isOptionEqualToValue={(option, value) => option?.id === value?.id}
          renderInput={(params) => (
            <TextField
              {...params}
              required={selectedParticipantsState.length === 0}
              label={
                isMultiple
                  ? 'Selecciona uno o varios participantes'
                  : 'Selecciona un participante'
              }
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
