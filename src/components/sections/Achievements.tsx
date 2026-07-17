import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '../../utils/animations';
import { optimizeCloudinaryUrl } from '../../utils/imageCache';

interface AchievementItem {
  id: string;
  title: string;
  description: string;
  image: string;
}

const achievementsList: AchievementItem[] = [
  {
    id: 'alumni-meet',
    title: 'Alumni Meet',
    description: 'Community wellness engagement event',
    image: '/achievements/Alumni Meet.jpeg',
  },
  {
    id: 'diet-camp',
    title: 'Diet Camp',
    description: 'Nutrition awareness and counseling session',
    image: '/achievements/diet camp.jpeg',
  },
  {
    id: 'diet-camp-2',
    title: 'Diet Camp',
    description: 'Follow-up camp with personalized guidance',
    image: '/achievements/diet camp 2.jpeg',
  },
  {
    id: 'diet-camp-3',
    title: 'Diet Camp',
    description: 'Healthy lifestyle workshop activities',
    image: '/achievements/diet camp 3.jpg',
  },
  {
    id: 'diet-camp-4',
    title: 'Maasika Mahotsav',
    description: 'Practical meal-planning and coaching',
    image: '/achievements/diet camp 4.jpg',
  },
  {
    id: 'experience-certificate',
    title: 'Experience Certificate',
    description: 'Professional recognition and credentials',
    image: '/achievements/Experience Certificate.jpg',
  },
  {
    id: 'maasika-mohatsav',
    title: 'Maasika Mohatsav',
    description: 'Public health and nutrition outreach',
    image: '/achievements/Maasika Mohatsav.jpeg',
  },
  {
    id: 'maasika-mohatsav-2',
    title: 'Maasika Mohatsav',
    description: 'Extended participation and achievements',
    image: '/achievements/Maasika Mohatsav 2.jpeg',
  },
];

const Achievements: React.FC<{ isVisible?: boolean }> = ({ isVisible = true }) => {
  // Don't render if not visible
  if (!isVisible) {
    return null;
  }

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-sage-green/10 text-sage-green font-medium text-sm rounded-full mb-4">
            ✨ Achievements
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-gray-900 mb-4">
            Recognized Excellence
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Awards, certifications, and milestones that showcase our commitment to your health
          </p>
        </motion.div>

        {/* Achievement cards grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {achievementsList.length === 0 ? (
            <div className="col-span-full text-center text-gray-500 text-sm py-8">
              No achievement images found in /public/achievements.
            </div>
          ) : (
            achievementsList.map((achievement) => (
              <motion.div
                key={achievement.id}
                variants={fadeInUp}
                whileHover={{ y: -8 }}
                className="group cursor-pointer"
              >
                {/* Image container */}
                <div className="relative mb-4 overflow-hidden rounded-2xl bg-gray-100 h-[250px] flex items-center justify-center shadow-md hover:shadow-xl transition-all duration-300">
                  <img
                    src={optimizeCloudinaryUrl(achievement.image, 400)}
                    alt={achievement.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-white text-3xl">⭐</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="px-2">
                  <h3 className="font-serif font-bold text-gray-900 text-lg mb-2 group-hover:text-sage-green transition-colors">
                    {achievement.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {achievement.description}
                  </p>
                </div>
              </motion.div>
            ))
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Achievements;
