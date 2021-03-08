import Axios from "axios";

export async function getUserList() {
  const users = await Axios.get("https://jsonplaceholder.typicode.com/users");
  return users.data;
}

export async function getAllPostIds() {
  const users = await Axios.get("https://jsonplaceholder.typicode.com/users");

  // Returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]

  return users.data.map((user) => {
    const uid = user.id.toString();
    return {
      params: {
        id: uid,
      },
    };
  });
}

export async function getPostData(id) {
  const posts = await Axios.get("https://jsonplaceholder.typicode.com/posts");
  const filteredPosts = posts.data.filter(
    (post) => post.userId === parseInt(id)
  );

  return filteredPosts;
}

export async function getAllCommentIds() {
  const posts = await Axios.get("https://jsonplaceholder.typicode.com/posts");

  return posts.data.map((post) => {
    const commentId = post.id.toString();
    return {
      params: {
        id: commentId,
      },
    };
  });
}

export async function getCommentsData(id) {
  const comments = await Axios.get(
    "https://jsonplaceholder.typicode.com/comments"
  );
  const filteredComments = comments.data.filter(
    (comment) => comment.postId === parseInt(id)
  );
  console.log(filteredComments);
  return filteredComments;
}
