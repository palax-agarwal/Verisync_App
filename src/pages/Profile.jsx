import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Award, LogOut, Edit, CheckCircle, Clock } from 'lucide-react';
import { TrustMeter } from '../components/TrustMeter';
import { useEffect, useState } from 'react';
import { getPosts } from '../utils/storage';

export const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [userPosts, setUserPosts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const allPosts = getPosts();
    const myPosts = allPosts.filter(post => post.author === user.name);
    setUserPosts(myPosts);
    setEditName(user.name);
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSaveEdit = () => {
    setIsEditing(false);
  };

  if (!user) {
    return null;
  }

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
            <div className="flex justify-center mb-6">
              <div className="bg-white/20 backdrop-blur-sm p-6 rounded-full">
                <User className="w-16 h-16" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4">{user.name}</h1>
            <p className="text-xl text-blue-100">{user.email}</p>
          </motion.div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-xl shadow-md p-8 mb-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-gray-900">Profile Information</h2>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                <Edit className="w-5 h-5" />
                {isEditing ? 'Cancel' : 'Edit'}
              </button>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <User className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500 mb-1">Full Name</p>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  ) : (
                    <p className="text-lg font-semibold text-gray-900">{user.name}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Mail className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500 mb-1">Email Address</p>
                  <p className="text-lg font-semibold text-gray-900">{user.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Award className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500 mb-1">Member Since</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {isEditing && (
                <button
                  onClick={handleSaveEdit}
                  className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Save Changes
                </button>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-xl shadow-md p-8 mb-8"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Trust Score</h2>
            <TrustMeter score={user.trustScore || 50} size="large" />
            <p className="text-gray-600 mt-4 text-center">
              Keep contributing verified content to improve your trust score
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-xl shadow-md p-8 mb-8"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Your Submissions</h2>

            {userPosts.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">You haven't made any submissions yet</p>
                <button
                  onClick={() => navigate('/transparency')}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Create Your First Post
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {userPosts.map((post) => (
                  <div
                    key={post.id}
                    className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{post.title}</h3>
                      <span
                        className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
                          post.status === 'verified'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {post.status === 'verified' ? (
                          <>
                            <CheckCircle className="w-4 h-4" />
                            <span>Verified</span>
                          </>
                        ) : (
                          <>
                            <Clock className="w-4 h-4" />
                            <span>Pending</span>
                          </>
                        )}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">{post.description}</p>
                    <p className="text-gray-400 text-xs">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center"
          >
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 px-8 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors shadow-md hover:shadow-lg"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

