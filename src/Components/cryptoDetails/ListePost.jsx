import Formulaire from "./Formulaire";
import { useState } from "react";
import TriPost from "./TriPost";
import '../../styles/ListPost.css';

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

      <TriPost className="tri-post" setSortBy={setSortBy} />

      <ul className="post-list">
        {sortedPosts.length > 0 ? ( sortedPosts.map((post) => (
        <li key={post.id} className="post-item">
            <h3 className="post-title">Titre : {post.titre}</h3>
            <p className="post-content">Contenue : {post.contenue}</p>
            <p className="post-date">Date : {post.date}</p>
            <strong className="post-likes">Likes : </strong> {post.likes || 0}
        <div className="post-buttons">
            <button className="modify-btn" onClick={() => modifierPosts(post)}>Modifier</button>
            <button className="delete-btn" onClick={() => supprimerPosts(post.id)}>Supprimer</button>
            <button className="like-btn" onClick={() => likerPost(post.id)}>Like</button>
        </div>
        </li>
    ))) : (<p className="no-post">Aucun post</p>)}
    </ul>
    {postToEdit && <Formulaire posts={posts} setPost={setPost} postToEdit={postToEdit} setPostToEdit={setPostToEdit} />}
    </div>
  );
};

export default ListePost;