import { useState } from 'react';
import Formulaire from './Components/Formulaire';
import ListePost from './Components/ListePost';

function App() {
  const [posts, setPost] = useState([]);

  return (
    <div>
      <Formulaire posts={posts} setPost={setPost} />
      <ListePost posts={posts} setPost={setPost} />
    </div>
  );
}

export default App;
