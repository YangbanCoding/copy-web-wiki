import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import s from './Header.module.scss'

function Header () {
  const [text, setText] = useState('')
  const router = useRouter()

  const handleChange = (e) => {
    setText(e.nativeEvent.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    router.push(`/w/${text}`)
  }

  return (
    <div>
      <div className={s.main_header}>
        <Link href='/'><div>양반위키</div></Link>
      </div>
      <div>
        <form onSubmit={handleSubmit} className={s.search_box}>
          <input className={s.search_input} placeholder='Search' onChange={handleChange} />
        </form>
      </div>
    </div>
  )
}

export default Header
