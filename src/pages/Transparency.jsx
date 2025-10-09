import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, X, CheckCircle } from 'lucide-react';
import { PostCard } from '../components/PostCard';
import { getPosts, addPost } from '../utils/storage';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const Transparency = () => {
  const [posts, setPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [newPost, setNewPost] = useState({
    title: '',
    description: '',
    author: ''
  });
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = () => {
    const allPosts = getPosts();
    setPosts(allPosts);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user) {
      navigate('/login');
      return;
    }

    const post = {
      ...newPost,
      author: user.name
    };

    addPost(post);
    loadPosts();
    setNewPost({ title: '', description: '', author: '' });
    setSubmitSuccess(true);

    setTimeout(() => {
      setSubmitSuccess(false);
      setShowModal(false);
    }, 2000);
  };

  const filteredPosts = filterStatus === 'all'
    ? posts
    : posts.filter(post => post.status === filterStatus);

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Transparency Feed</h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              View all verified and pending submissions in our community
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div className="flex gap-2">
              <button
                onClick={() => setFilterStatus('all')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filterStatus === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                All Posts
              </button>
              <button
                onClick={() => setFilterStatus('verified')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filterStatus === 'verified'
                    ? 'bg-green-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                Verified
              </button>
              <button
                onClick={() => setFilterStatus('pending')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filterStatus === 'pending'
                    ? 'bg-yellow-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                Pending
              </button>
            </div>

            <button
              onClick={() => {
                if (!user) {
                  navigate('/login');
                } else {
                  setShowModal(true);
                }
              }}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-md"
            >
              <Plus className="w-5 h-5" />
              New Post
            </button>
          </div>

          {filteredPosts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl text-gray-500">No posts found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Submit New Post</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {submitSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-12 h-12 text-green-600" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">Posted Successfully!</h4>
                <p className="text-gray-600">Your post is now pending verification.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={newPost.title}
                    onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="Enter post title"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={newPost.description}
                    onChange={(e) => setNewPost({ ...newPost, description: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                    rows="4"
                    placeholder="Describe your submission"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Submit Post
                </button>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
};
