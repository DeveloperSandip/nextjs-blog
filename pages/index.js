import Head from "next/head";
import utilStyles from "../styles/utils.module.css";
import Link from "next/link";

import { getUserList } from "../lib/api";

export default function Home({ userList }) {
  return (
    <div>
      <Head>
        <title>Blog Everything</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className={utilStyles.heading}>Blog with NextJS</h1>
      <p className={utilStyles.heading_text}>
        This Data is populating from JSONPlaceholder API
      </p>

      <div className={utilStyles.table_container}>
        <h3 className={utilStyles.table_heading}>
          Users List -{" "}
          <span>
            <p className={utilStyles.table_heading_extra}>
              Click on the Username to get posts related to that User
            </p>
          </span>
        </h3>
        {userList ? (
          <table>
            <thead>
              <tr>
                <th>Sl No</th>
                <th>Name</th>
                <th>Username</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {userList.map(({ id, name, username, email }) => {
                return (
                  <tr key={Math.random()}>
                    <td>{id}</td>
                    <td>
                      {" "}
                      <Link href={`/posts/${id}`}>
                        <a>{name}</a>
                      </Link>
                    </td>
                    <td>{username}</td>
                    <td>{email}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <p className={utilStyles.heading_text}>Loading Users</p>
        )}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const userList = await getUserList();
  return {
    props: {
      userList,
    },
  };
}
