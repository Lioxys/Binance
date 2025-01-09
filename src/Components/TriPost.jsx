import React from 'react';

const TriPost = ({ setSortBy }) => {
  return (
    <div>
      <label>Tri par :</label>
      <select onChange={(e) => setSortBy(e.target.value)} defaultValue="date">
        <option value="date">Date</option>
        <option value="likes">Likes</option>
      </select>
    </div>
  );
};

export default TriPost;