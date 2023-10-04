import { F_COMPLETED, F_INREVIEW, F_PENDING } from '@/const'
import { useEditFinance } from '@/hooks/useEditFinance'
import { Avatar, Button, Chip, ListItem, Typography } from '@mui/material'

interface props {
  id: number
  fromParticipant?: Partial<Participants> | null
  toParticipant?: Partial<Participants> | null
  debt: financeType
}
export default function ItemFinance({
  id,
  fromParticipant = null,
  toParticipant = null,
  debt,
}: props) {
  const [editSucceed, loadingEdit, errorEdit, editFinance] = useEditFinance()
  const isFrom = fromParticipant !== null
  const areBits = debt.bits !== 0
  const name = isFrom ? fromParticipant.name : toParticipant?.name
  const sign = isFrom ? '+' : '-'
  const imgSrc = isFrom ? fromParticipant.imgProfile : toParticipant?.imgProfile
  const debtAmount = areBits ? debt.bits : debt.subscription
  const typeTitle = areBits ? 'Bits' : 'Subs'

  type StatusDetails = { title: string; color: string }
  const statusMap: Record<string, StatusDetails> = {
    [F_PENDING]: { title: 'Pending', color: 'bg-orange-300/60' },
    [F_INREVIEW]: { title: 'In review', color: 'bg-blue-300/60' },
    [F_COMPLETED]: { title: 'Completed', color: 'bg-emerald-300/50' },
  }
  const status: StatusDetails = statusMap[debt.status]

  const payDebt = () => editFinance({ id })
  const completeDebt = () => editFinance({ id, toBeCompleted: true })
  const buttonSettings = (): { title: string; action: (() => void) | null } => {
    if (!isFrom && debt.status === F_PENDING)
      return { title: 'pagar', action: payDebt }
    if (isFrom && debt.status === F_INREVIEW)
      return { title: 'completar', action: completeDebt }
    return { title: '', action: null }
  }
  const btnDetail = buttonSettings()

  return (
    <ListItem
      alignItems="flex-start"
      className="bg-purple-50/10 rounded-lg px-3"
    >
      <div className="flex w-row w-full  items-center justify-around gap-2 ">
        <Avatar alt={name!} src={imgSrc!} />
        <Typography variant="caption" className="w-1/3 truncate">
          {name}
        </Typography>
        <div className="w-1/3 ">
          <div className=" w-fit flex flex-col gap-1 md:flex-row lg:flex-col xl:flex-row items-center justify-center">
            <Typography variant="h5">{`${sign}${debtAmount}`}</Typography>
            <Chip label={typeTitle} size="small" />
          </div>
        </div>
        <div className=" w-1/3  text-center">
          <Chip
            className={`${status?.color} text-indigo-950`}
            label={status?.title}
            size="small"
          />
          {btnDetail.action && (
            <Button
              variant="outlined"
              className="mt-2"
              size="small"
              color="secondary"
              fullWidth
              onClick={btnDetail.action}
              hidden={loadingEdit}
            >
              {btnDetail.title}
            </Button>
          )}
        </div>
      </div>
    </ListItem>
  )
}
