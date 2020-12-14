import Header from './Header'
import Footer from './Footer'
import s from './MainLayout.module.scss'

function MainLayout (props) {
  return (
    <div>
      <Header />
      <div className={s.container}>
        <div className={s.body}>
          {props.children}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default MainLayout
