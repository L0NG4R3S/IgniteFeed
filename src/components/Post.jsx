import styles from './Post.module.css'
import { Comment } from './Comment'
import { Avatar } from './Avatar'
import { format, formatDistanceToNow } from 'date-fns'
import ptBr from 'date-fns/locale/pt-BR'

// author: { avatarUrl: "", name: "", role: ""}
// publishedAt: Date
// content: string

export function Post({ author, publishedAt, content }) {
  // usando Intl para formatar a data
  // const publishedDateFormatted = new Intl.DateTimeFormat('pt-BR', {
  //   day: '2-digit',
  //   month: 'long',
  //   hour: '2-digit',
  //   minute: '2-digit'
  // }).format(publishedAt)
  const publishedDateFormatted = format(publishedAt, "d 'de' LLLL 'as' HH:mm'h'", {
    locale: ptBr
  })

  const publishedDateRelativeFromNow = formatDistanceToNow(publishedAt, {
    locale: ptBr,
    addSuffix: true
  })

  console.log('content', content)

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={author.avatarUrl} />
          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>

        <time title={publishedDateFormatted} dateTime={publishedAt.toISOString()}>{publishedDateRelativeFromNow}</time>
      </header>

      <div className={styles.content}>
        {content.map((item, index)=>{
          if(item.type === 'paragraph'){
            return <p key={index}>{item.content}</p>
          }else {
            return <p key={index}><a href='#'>{item.content}</a></p>
          }
        })}
      </div>

      <form className={styles.commentForm}> 
        <strong>Deixe seu comentário</strong>
        <textarea placeholder="Deixe um comentário" />
        <footer>
          <button type="submit">Publicar</button>
        </footer>
      </form>

      <div className={styles.commentList}>
        <Comment />
        <Comment />
        <Comment />
      </div>
    </article>
  )
}