import { TwitchClip } from 'react-twitch-embed'
type Props = {
  url: string
}
interface TypeUrlRes {
  type: string | null
  url: string
}
const getUrl = ({ url }: Props) => {
  let urlRes: TypeUrlRes = { type: null, url: '' }
  const isTwitchClipRegex = /clip/
  if (isTwitchClipRegex.test(url)) {
    const urlTwitchClipRegex = /[^/]*$/
    const urlTwitch = url.match(urlTwitchClipRegex)
    urlRes = {
      type: 'clip',
      url: urlTwitch ? urlTwitch[0] : '',
    }
  }
  return urlRes
}
export function PlayMedia({ url }: Props) {
  const media = getUrl({ url })

  if (!media.type) return <h1>No es una url valida</h1>
  if (media.type === 'clip')
    return (
      <TwitchClip clip={media.url} height="100%" width="100%" autoplay muted />
    )
}
