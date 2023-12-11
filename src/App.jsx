import { Post } from './components/Post'
import { Header } from './components/Header'
import { Sidebar } from './components/Sidebar'

import './global.css'
import styles from './App.module.css'


function App() {
  return (
    <>
      <Header />
      
      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          <Post author="Nome do autor" content="texto texto texto" />
          <Post author="Nome do autor Diego" content="texto haha texto haha texto haha" />
        </main>
      </div>
    </>
  )
}

export default App
