import { motion } from 'framer-motion';
import { Shield, FileCheck, BarChart3, CheckCircle } from 'lucide-react';
import { TrustMeter } from '../components/TrustMeter';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Tools = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showVerificationForm, setShowVerificationForm] = useState(false);
  const [verificationData, setVerificationData] = useState({
    title: '',
    description: ''
  });
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleVerificationSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }

    setSubmitSuccess(true);
    setVerificationData({ title: '', description: '' });
    setTimeout(() => {
      setSubmitSuccess(false);
      setShowVerificationForm(false);
    }, 2000);
  };

  const tools = [
    {
      icon: Shield,
      title: 'Trust Meter',
      description: 'View and track your trust score based on verified activities and contributions',
      color: 'blue',
      action: user ? 'view' : 'login'
    },
    {
      icon: FileCheck,
      title: 'Verification Form',
      description: 'Submit information for verification by our trusted validation system',
      color: 'green',
      action: 'form'
    },
    {
      icon: BarChart3,
      title: 'Transparency Reports',
      description: 'Access detailed reports of verified and pending submissions',
      color: 'purple',
      action: 'navigate'
    }
  ];

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
            <h1 className="text-5xl md:text-6xl font-bold mb-6">VeriSync Tools</h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Powerful features to help you build and maintain digital trust
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {tools.map((tool, index) => (
              <motion.div
                key={tool.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-md p-8 hover:shadow-xl transition-shadow"
              >
                <div className={`bg-${tool.color}-100 w-16 h-16 rounded-xl flex items-center justify-center mb-6`}>
                  <tool.icon className={`w-9 h-9 text-${tool.color}-600`} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{tool.title}</h3>
                <p className="text-gray-600 mb-6">{tool.description}</p>

                {tool.action === 'view' && (
                  <button className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                    View Details
                  </button>
                )}
                {tool.action === 'login' && (
                  <button
                    onClick={() => navigate('/login')}
                    className="w-full px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                  >
                    Login to Access
                  </button>
                )}
                {tool.action === 'form' && (
                  <button
                    onClick={() => setShowVerificationForm(true)}
                    className="w-full px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
                  >
                    Open Form
                  </button>
                )}
                {tool.action === 'navigate' && (
                  <button
                    onClick={() => navigate('/transparency')}
                    className="w-full px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                  >
                    View Reports
                  </button>
                )}
              </motion.div>
            ))}
          </div>

          {user && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-xl shadow-md p-8 max-w-2xl mx-auto"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Your Trust Score</h2>
              <TrustMeter score={user.trustScore || 50} size="large" />
              <p className="text-gray-600 mt-6 text-center">
                Your trust score reflects your verified activities and contributions to the VeriSync community.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {showVerificationForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Verification Form</h3>
              <button
                onClick={() => setShowVerificationForm(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
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
                <h4 className="text-xl font-semibold text-gray-900 mb-2">Submitted Successfully!</h4>
                <p className="text-gray-600">Your submission is pending verification.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleVerificationSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={verificationData.title}
                    onChange={(e) => setVerificationData({ ...verificationData, title: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="Enter submission title"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={verificationData.description}
                    onChange={(e) => setVerificationData({ ...verificationData, description: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                    rows="4"
                    placeholder="Describe what needs to be verified"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Submit for Verification
                </button>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
};

