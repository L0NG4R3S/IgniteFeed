import styles from "./Post.module.css";
import { Comment } from "./Comment";
import { Avatar } from "./Avatar";
import { format, formatDistanceToNow } from "date-fns";
import ptBr from "date-fns/locale/pt-BR";
import { useState } from "react";

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

  const [comments, setComments] = useState(["Post muito legal"]);
  const [newCommentText, setNewCommentText] = useState("");

  const publishedDateFormatted = format(
    publishedAt,
    "d 'de' LLLL 'as' HH:mm'h'",
    {
      locale: ptBr,
    }
  );

  const publishedDateRelativeFromNow = formatDistanceToNow(publishedAt, {
    locale: ptBr,
    addSuffix: true,
  });

  function handleCreateNewComent() {
    // fugit do padrao de navegacao do html pois estamos criando uma single page application
    event.preventDefault();
    console.log("oi");

    setComments([...comments, newCommentText]);
    setNewCommentText("");
  }

  function handleNewCommentChange() {
    event.target.setCustomValidity("");
    setNewCommentText(event.target.value);
  }

  function deleteComment(comment) {
    const newComments = comments.filter((item) => item !== comment);
    setComments(newComments);
  }

  function handleNewCommentInvalid() {
    event.target.setCustomValidity("Campo obrigatório");
  }

  const isNewCommentEmpty = newCommentText.length < 1;

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

        <time
          title={publishedDateFormatted}
          dateTime={publishedAt.toISOString()}
        >
          {publishedDateRelativeFromNow}
        </time>
      </header>

      <div className={styles.content}>
        {content.map((item, index) => {
          if (item.type === "paragraph") {
            return <p key={index}>{item.content}</p>;
          } else {
            return (
              <p key={index}>
                <a href="#">{item.content}</a>
              </p>
            );
          }
        })}
      </div>

      <form className={styles.commentForm} onSubmit={handleCreateNewComent}>
        <strong>Deixe seu comentário</strong>
        <textarea
          name="comment"
          placeholder="Deixe um comentário"
          onChange={handleNewCommentChange}
          value={newCommentText}
          required
          onInvalid={handleNewCommentInvalid}
        />
        <footer>
          <button disabled={isNewCommentEmpty} type="submit">
            Publicar
          </button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {comments.map((item) => {
          return (
            <Comment
              key={item}
              content={item}
              onDeleteComment={deleteComment}
            />
          );
        })}
      </div>
    </article>
  );
}
