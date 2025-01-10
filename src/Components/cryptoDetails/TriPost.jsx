import React from 'react';
import '../../styles/ListPost.css';

const TriPost = ({ setSortBy }) => {
  return (
    <div classname="tri-post">
      <label>Tri par :</label>
      <select onChange={(e) => setSortBy(e.target.value)} defaultValue="date">
        <option value="date">Date</option>
        <option value="likes">Likes</option>
      </select>
    </div>
  );
};

export default TriPost;