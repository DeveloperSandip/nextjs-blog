import Head from "next/head";
import Link from "next/link";
import utilStyles from "../../styles/utils.module.css";
import { getAllCommentIds, getCommentsData } from "../../lib/api";

export default function Comments({ commentsData }) {
  return (
    <>
      <Head>
        <title>Comment List</title>
      </Head>
      <div className={utilStyles.table_container}>
        <h3 className={utilStyles.table_heading}>
          Posts List -{" "}
          <span>
            <p className={utilStyles.table_heading_extra}>
              Click on the title to get comments related to that posts -{" "}
              <span>
                <Link href="/">
                  <a>Back to Home</a>
                </Link>
              </span>
            </p>
          </span>
        </h3>
        {commentsData ? (
          <table>
            <thead>
              <tr>
                <th>Sl No</th>
                <th>Tilte</th>
                <th>Body</th>
              </tr>
            </thead>
            <tbody>
              {commentsData.map(({ id, name, body }) => {
                return (
                  <tr key={Math.random()}>
                    <td>{id.toString()}</td>
                    <td>{name}</td>
                    <td>{body}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <p className={utilStyles.heading_text}>Loading Posts</p>
        )}
      </div>
    </>
  );
}

export async function getStaticPaths() {
  // Return a list of possible value for id
  const paths = await getAllCommentIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  // Fetch necessary data for the blog post using params.id
  const commentsData = await getCommentsData(params.id);
  return {
    props: {
      commentsData,
    },
  };
}
