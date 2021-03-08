import Head from "next/head";
import Link from "next/link";
import utilStyles from "../../styles/utils.module.css";
import { getAllPostIds, getPostData } from "../../lib/api";

export default function Post({ postData }) {
  return (
    <>
      <Head>
        <title>Post List</title>
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
        {postData ? (
          <table>
            <thead>
              <tr>
                <th>Sl No</th>
                <th>Tilte</th>
                <th>Body</th>
              </tr>
            </thead>
            <tbody>
              {postData.map(({ userId, id, title, body }) => {
                return (
                  <tr key={Math.random()}>
                    <td>{id.toString()}</td>
                    <td>
                      {" "}
                      <Link href={`/comments/${id}`}>
                        <a>{title}</a>
                      </Link>
                    </td>
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
  const paths = await getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  // Fetch necessary data for the blog post using params.id
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}
