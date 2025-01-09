import React, { useState, useEffect } from 'react';

const Formulaire = ({ posts, setPost, postToEdit, setPostToEdit }) => {
  const [titre, setTitre] = useState('');
  const [contenue, setContenue] = useState('');
  const [date, setDate] = useState('');
  const [like, setLike] = useState(0);
  const [id, setId] = useState(1);

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    setPost(storedPosts);

    if (postToEdit) {
      setTitre(postToEdit.titre);
      setContenue(postToEdit.contenue);
      setDate(postToEdit.date);
      setId(postToEdit.id);
      setLike(postToEdit.like);
    }
  }, [postToEdit, setPost]);

  const onSubmit = (e) => {
    e.preventDefault();

    const newPost = { id, titre, contenue, date, like };
    let updatedPosts = [...posts];

    if(postToEdit) {
      updatedPosts = posts.map((post) =>
        post.id === postToEdit.id ? newPost : post
      );
      setPostToEdit(null);
    } else {
      updatedPosts.push(newPost);
    }

    setPost(updatedPosts);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));

    setTitre('');
    setContenue('');
    setDate('');
    setId(id + 1);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <label>Titre:</label>
          <input type="text" value={titre} onChange={(e) => setTitre(e.target.value)} />
        </div>
        <div>
          <label>Contenue :</label>
          <textarea value={contenue} onChange={(e) => setContenue(e.target.value)} />
        </div>
        <div>
          <label>Date :</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <button type="submit">{postToEdit ? 'Mettre à jour' : 'Ajouter'}</button>
      </form>
    </div>
  );
};

export default Formulaire;
