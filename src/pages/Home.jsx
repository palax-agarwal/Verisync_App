import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, ArrowRight, CheckCircle } from 'lucide-react';
import { PostCard } from '../components/PostCard';
import { getPosts } from '../utils/storage';
import { useEffect, useState } from 'react';

export const Home = () => {
  const [recentPosts, setRecentPosts] = useState([]);

  useEffect(() => {
    const posts = getPosts();
    setRecentPosts(posts.slice(0, 3));
  }, []);

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="flex justify-center mb-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="bg-white/10 backdrop-blur-sm p-4 rounded-full"
              >
                <Shield className="w-16 h-16" />
              </motion.div>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              VeriSync
            </h1>
            <p className="text-2xl md:text-3xl mb-4 font-light">
              Where Trust Meets Technology
            </p>
            <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto">
              A platform promoting truth, trust, and transparency
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/login"
                className="px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors shadow-lg hover:shadow-xl inline-flex items-center justify-center"
              >
                Login
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                to="/signup"
                className="px-8 py-4 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-400 transition-colors shadow-lg hover:shadow-xl inline-flex items-center justify-center"
              >
                Sign Up
              </Link>
              <Link
                to="/about"
                className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-colors inline-flex items-center justify-center"
              >
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose VeriSync?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Building digital trust through verifiable information and transparent processes
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Trust',
                description: 'Build confidence through verified credentials and transparent operations',
                icon: Shield
              },
              {
                title: 'Truth',
                description: 'Access accurate, fact-checked information from reliable sources',
                icon: CheckCircle
              },
              {
                title: 'Transparency',
                description: 'Full visibility into verification processes and data handling',
                icon: ArrowRight
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow"
              >
                <div className="bg-blue-100 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {recentPosts.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Recent Verified Posts
              </h2>
              <p className="text-xl text-gray-600">
                See what's being verified in the VeriSync community
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {recentPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>

            <div className="text-center">
              <Link
                to="/transparency"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                View All Posts
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>
      )}

      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-4">
              Ready to Build Trust?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join VeriSync today and be part of a transparent digital future
            </p>
            <Link
              to="/signup"
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors shadow-lg hover:shadow-xl"
            >
              Get Started Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

