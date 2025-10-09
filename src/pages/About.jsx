import { motion } from 'framer-motion';
import { Shield, Target, Users, Eye } from 'lucide-react';

export const About = () => {
  const values = [
    {
      icon: Shield,
      title: 'Trust',
      description: 'We build platforms where trust is earned through transparency and verified actions, not just promised.'
    },
    {
      icon: Eye,
      title: 'Truth',
      description: 'Our commitment to truth means providing accurate, fact-checked information from reliable and verifiable sources.'
    },
    {
      icon: Target,
      title: 'Transparency',
      description: 'Full visibility into our processes, data handling, and verification methods ensures accountability at every step.'
    }
  ];

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">About VeriSync</h1>
            <p className="text-2xl text-blue-100 max-w-3xl mx-auto">
              Building Digital Trust in a Transparent World
            </p>
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
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              VeriSync exists to create a digital ecosystem where trust is the foundation of every interaction.
              We empower individuals and organizations to verify information, maintain transparency, and build
              lasting trust through technology.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gradient-to-br from-blue-50 to-gray-50 rounded-2xl p-8 hover:shadow-xl transition-shadow"
              >
                <div className="bg-blue-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                  <value.icon className="w-9 h-9 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <div className="bg-white rounded-2xl shadow-xl p-10">
              <div className="flex items-center justify-center mb-8">
                <div className="bg-blue-100 p-4 rounded-full">
                  <Target className="w-12 h-12 text-blue-600" />
                </div>
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6 text-center">Our Vision</h2>
              <p className="text-xl text-gray-600 leading-relaxed text-center mb-6">
                We envision a world where digital interactions are built on a foundation of trust and transparency.
                Where information is verifiable, processes are clear, and every user can make informed decisions
                with confidence.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed text-center">
                Through innovative technology and unwavering commitment to our values, we're creating tools that
                empower users to verify information, track authenticity, and build trust in every digital interaction.
              </p>
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
            className="text-center"
          >
            <div className="flex items-center justify-center mb-8">
              <div className="bg-blue-100 p-4 rounded-full">
                <Users className="w-12 h-12 text-blue-600" />
              </div>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Team</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              VeriSync is built by a dedicated team of developers, designers, and trust advocates who believe
              in the power of transparency and verification to create a better digital world.
            </p>
            <div className="inline-block bg-blue-50 border-2 border-blue-200 rounded-xl px-8 py-4">
              <p className="text-lg font-semibold text-blue-900">
                VeriSync — Because Truth Builds Trust
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
