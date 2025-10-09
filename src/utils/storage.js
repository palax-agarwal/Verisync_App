export const getPosts = () => {
  return JSON.parse(localStorage.getItem('verisync_posts') || '[]');
};

export const savePosts = (posts) => {
  localStorage.setItem('verisync_posts', JSON.stringify(posts));
};

export const addPost = (post) => {
  const posts = getPosts();
  const newPost = {
    id: Date.now().toString(),
    ...post,
    createdAt: new Date().toISOString(),
    status: 'pending'
  };
  posts.unshift(newPost);
  savePosts(posts);
  return newPost;
};

export const initializeSampleData = () => {
  const posts = getPosts();
  if (posts.length === 0) {
    const samplePosts = [
      {
        id: '1',
        title: 'Climate Data Verification',
        description: 'Verified climate change data from multiple scientific sources showing temperature increase trends.',
        author: 'Dr. Sarah Johnson',
        status: 'verified',
        createdAt: new Date(Date.now() - 86400000).toISOString()
      },
      {
        id: '2',
        title: 'Supply Chain Transparency Report',
        description: 'Complete transparency report on product sourcing and manufacturing processes.',
        author: 'Global Supply Co.',
        status: 'verified',
        createdAt: new Date(Date.now() - 172800000).toISOString()
      },
      {
        id: '3',
        title: 'Medical Research Findings',
        description: 'Peer-reviewed research on new treatment effectiveness awaiting final verification.',
        author: 'Medical Research Institute',
        status: 'pending',
        createdAt: new Date(Date.now() - 259200000).toISOString()
      }
    ];
    savePosts(samplePosts);
  }
};
