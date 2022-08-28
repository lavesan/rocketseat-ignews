import { GetStaticPaths, GetStaticProps } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { getPrismicClient } from "../../../services/prismic";
import styles from "../post.module.scss";

interface IPostPreviewProps {
  post: {
    slug: string;
    title: string;
    content: string;
    updatedAt: string;
  };
}

export default function PostPreview({ post }: IPostPreviewProps) {
  const { data } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (data?.activeSubscription) {
      router.push(`/posts/${post.slug}`);
    }
  }, [data, post, router]);

  return (
    <>
      <Head>
        <title>{post.title} | Ignews</title>
      </Head>

      <main className={styles.container}>
        <article className={styles.post}>
          <h1>{post.title}</h1>
          <time>{post.updatedAt}</time>
          <div
            className={`${styles.postContent} ${styles.previewContent}`}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div className={styles.continueReading}>
            Wanna continue reading?
            <Link href="/">
              <a href="#">Subscribe now 🤗</a>
            </Link>
          </div>
        </article>
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    // Parâmetros que são gerados de forma estática, carregando já estaticamente no build
    paths: [
      {
        params: {
          slug: "prisma-uma-das-melhores-coisas-que-ja-aconteceu-no",
        },
      },
    ],
    // fallback recebe 3 valores
    // true -> Se alguém acessar uma rota com param que não foi gerado estaticamente,
    // o carregamento vai ser feito pelo lado do browser. Não legal para SEO
    // false -> Se o cara não foi carregado ainda, retorna um erro 404 not found, só isso.
    // blocking -> Se o cara não foi carregado, ele carrega pelo lado do server para depois entregar
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;

  const prismic = getPrismicClient();

  const response = await prismic.getByUID("post", slug as string);

  const post = {
    slug,
    title: response.data.title[0].text,
    content: response.data.content
      .splice(0, 3)
      .map(({ text }) => text)
      .join("<br />"),
    updatedAt: new Date(response.last_publication_date).toLocaleDateString(
      "pt-BR",
      {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }
    ),
  };

  return {
    props: {
      post,
    },
    redirect: 60 * 30,
  };
};
