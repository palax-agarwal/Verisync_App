import { motion } from 'framer-motion';

export const TrustMeter = ({ score, size = 'normal' }) => {
  const getColor = (score) => {
    if (score >= 75) return 'bg-green-500';
    if (score >= 50) return 'bg-blue-500';
    if (score >= 25) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getLabel = (score) => {
    if (score >= 75) return 'Excellent';
    if (score >= 50) return 'Good';
    if (score >= 25) return 'Fair';
    return 'Poor';
  };

  const isLarge = size === 'large';
  const barHeight = isLarge ? 'h-8' : 'h-4';
  const textSize = isLarge ? 'text-2xl' : 'text-lg';

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className={`font-semibold text-gray-700 ${isLarge ? 'text-xl' : 'text-base'}`}>
          Trust Score
        </span>
        <span className={`font-bold ${textSize}`}>
          {score}/100
        </span>
      </div>

      <div className={`w-full bg-gray-200 rounded-full overflow-hidden ${barHeight}`}>
        <motion.div
          className={`${barHeight} ${getColor(score)} rounded-full flex items-center justify-center`}
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          {isLarge && (
            <span className="text-white font-semibold text-sm">
              {getLabel(score)}
            </span>
          )}
        </motion.div>
      </div>

      {!isLarge && (
        <p className="text-sm text-gray-600 mt-1 text-right">
          {getLabel(score)}
        </p>
      )}
    </div>
  );
};
