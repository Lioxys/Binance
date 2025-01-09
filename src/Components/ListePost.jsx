import Formulaire from "./Formulaire";
import { useState } from "react";
import TriPost from "./TriPost";

const ListePost = ({ posts, setPost }) => {
  const [postToEdit, setPostToEdit] = useState(null);
  const [sortBy, setSortBy] = useState('date');

  const supprimerPosts = (idToDelete) => {
    const updatedPosts = posts.filter((post) => post.id !== idToDelete);
    setPost(updatedPosts);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
  };

  const modifierPosts = (post) => {
    setPostToEdit(post);
  };

  const likerPost = (idToLike) => {
    const updatedPosts = posts.map(post => {
      if (post.id === idToLike) {
        return { ...post, likes: (post.likes || 0) + 1 };
      }
      return post;
    });
    setPost(updatedPosts);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
  };

  const sortPosts = (posts, sortBy) => {
    if (sortBy === 'date') {
      return [...posts].sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortBy === 'likes') {
      return [...posts].sort((a, b) => b.likes - a.likes);
    }
    return posts;
  };

  const sortedPosts = sortPosts(posts, sortBy);

  return (
    <div>
      <h2>Liste des Posts</h2>

      <TriPost setSortBy={setSortBy} />

      <ul>
        {sortedPosts.length > 0 ? (
          sortedPosts.map((post) => (
            <li key={post.id}>
              Titre : {post.titre} <br />
              Contenue : {post.contenue} <br />
              Date : {post.date} <br />
              <strong>Likes :</strong> {post.likes || 0} <br />
              <button onClick={() => modifierPosts(post)}>Modifier</button>
              <button onClick={() => supprimerPosts(post.id)}>Supprimer</button>
              <button onClick={() => likerPost(post.id)}>Like</button>
            </li>
          ))
        ) : (
          <p>Aucun post</p>
        )}
      </ul>

      {postToEdit && <Formulaire posts={posts} setPost={setPost} postToEdit={postToEdit} setPostToEdit={setPostToEdit} />}
    </div>
  );
};

export default ListePost;