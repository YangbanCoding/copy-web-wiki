import { useRouter } from 'next/router'
import Link from 'next/link'
import s from './WikiButton.module.scss'

function WikiButton () {
  const router = useRouter()

  return (
    <div className={s.container}>
      <Link href={`/edit/${router.query.docName}`}><div className={s.button}>편집</div></Link>
      <Link href={`/history/${router.query.docName}`}><div className={s.button}>역사</div></Link>
    </div>
  )
}

export default WikiButton
