import { motion } from 'framer-motion';
import { CheckCircle, Clock, User } from 'lucide-react';

export const PostCard = ({ post }) => {
  const isVerified = post.status === 'verified';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-xl font-semibold text-gray-900">{post.title}</h3>
        <span
          className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium ${
            isVerified
              ? 'bg-green-100 text-green-700'
              : 'bg-yellow-100 text-yellow-700'
          }`}
        >
          {isVerified ? (
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

      <p className="text-gray-600 mb-4">{post.description}</p>

      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center space-x-2">
          <User className="w-4 h-4" />
          <span>{post.author}</span>
        </div>
        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
      </div>
    </motion.div>
  );
};

