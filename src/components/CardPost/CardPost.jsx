import Image from "next/image";
import { Avatar } from "../Avatar";
import { Star } from "../icons/Star";
import styles from "./cardpost.module.css";
import Link from "next/link";
import { ThumbsUpButton } from "./ThumbsUpButton";
import { ModalComment } from "../ModalComment";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const CardPost = ({ post, highlight, rating, category, isFetching, currentPage }) => {
  const queryClient = useQueryClient()

  const thumbsMutation = useMutation({
    mutationFn: (postData) => {
      return fetch('http://localhost:3000/api/thumbs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData),
      }).then((response) => { if (!response) throw new Error('Http error!') })
    },
    onMutate: async () => {
      const postQueryKey = ['post', post.slug]
      
      await queryClient.cancelQueries({ queryKey: ['post', post.slug] })

      const prevPost = queryClient.getQueryData(postQueryKey)

      if (prevPost) queryClient.setQueryData(postQueryKey, { ...prevPost, likes: prevPost.likes + 1 })

      return { prevPost }
    },
    onSuccess: () => {
      if (currentPage) queryClient.invalidateQueries(['posts', currentPage])
    }
  })

  const submitCommentsMutation = useMutation({
    mutationFn: (commentData) => {
      return fetch(`http://localhost:3000/api/comment/${post.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(commentData)
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['post', post.slug])
      queryClient.invalidateQueries(['posts', currentPage])
    }
  })

  const onSubmitComment = (event) => {
    event.preventDefault()

    const formData = new FormData(event.target)
    const text = formData.get('text')

    submitCommentsMutation.mutate({ id: post.id, text })
  };

  return (
    <article className={styles.card} style={{ width: highlight ? 993 : 486 }}>
      <header className={styles.header}>
        <figure style={{ height: highlight ? 300 : 133 }}>
          <Image
            src={post.cover}
            fill
            alt={`Capa do post de titulo: ${post.title}`} />
        </figure>
      </header>
      <section className={styles.body}>
        <h2>{post.title}</h2>
        <p>{post.body}</p>
        <Link href={`/posts/${post.slug}`}>Ver detalhes</Link>
      </section>
      <footer className={styles.footer}>
        <div className={styles.actions}>
          <form onClick={(e) => { e.preventDefault(), thumbsMutation.mutate({ slug: post.slug }); }}>
            <ThumbsUpButton disable={isFetching} />
            <p>{post.likes}</p>
          </form>
          <div>
            <ModalComment onSubmit={onSubmitComment} />
            <p>{post.comments.length}</p>
          </div>
          {rating && (
            <div style={{ margin: "0 3px" }}>
              <Star />
              <p style={{ marginTop: "1px" }}>{rating}</p>
            </div>
          )}
        </div>
        {category && (
          <div
            className={styles.categoryWrapper}
            style={{ fontSize: highlight ? "15px" : "12px" }}
          >
            <span className={styles.label}>Categoria: </span>{" "}
            <span className={styles.category}>{category}</span>
          </div>
        )}
        <Avatar imageSrc={post.author.avatar} name={post.author.username} />
      </footer>
    </article>
  );
};
