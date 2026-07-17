import { Heart, Apple, Activity, Droplet, Scale, Baby, Dumbbell, Sprout } from 'lucide-react';

export const siteConfig = {
  name: 'Arisa Nutrition',
  tagline: 'NUTRITION',
  dietician: {
    name: 'Dt. Aadiba Azeemuddin',
    phone: '+91 955-022-0704',
    whatsapp: 'https://wa.me/919550220704',
    email: 'aadibaa004@gmail.com',
    instagram: '@dt.aadiba',
  },
  seo: {
    title: 'Arisa Nutrition | Personalized Diet Plans by Dt. Aadiba Azeemuddin',
    description: 'Personalized diet plans, weight management, PCOS nutrition, diabetes support, gut health, pregnancy nutrition, and lifestyle coaching by Dt. Aadiba Azeemuddin.',
  },
};

export const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '/services' },
  { label: 'Programs', href: '#programs' },
  { label: 'Reviews', href: '#testimonials' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '#contact' },
];

export const services = [
  {
    id: 1,
    title: 'Weight Loss',
    description: 'Sustainable fat loss with balanced nutrition.',
    icon: Scale,
  },
  {
    id: 2,
    title: 'Weight Gain',
    description: 'Healthy weight gain and muscle-building nutrition.',
    icon: Dumbbell,
  },
  {
    id: 3,
    title: 'PCOS / PCOD',
    description: 'Hormone-friendly nutrition to support your body.',
    icon: Heart,
  },
  {
    id: 4,
    title: 'Diabetes',
    description: 'Smart food choices for better blood-sugar management.',
    icon: Droplet,
  },
  {
    id: 5,
    title: 'Thyroid Care',
    description: 'Nutrition support for better energy and metabolism.',
    icon: Activity,
  },
  {
    id: 6,
    title: 'Gut Health',
    description: 'Improve digestion and feel lighter every day.',
    icon: Sprout,
  },
  {
    id: 7,
    title: 'Pregnancy Nutrition',
    description: 'Nourishment for you and your little one.',
    icon: Baby,
  },
  {
    id: 8,
    title: 'Sports Nutrition',
    description: 'Fuel your workouts and achieve your fitness goals.',
    icon: Apple,
  },
];

export const trustIndicators = [
  'Personalized Plans',
  'Expert Guidance',
  'Progress Tracking',
  'Ongoing Support',
];

export const qualifications = [
  "Bachelor's in Nutrition",
  'Healthy Lifestyle & Dietetics',
  'Advanced Nutritional Science Course',
  'Certified in Therapeutic Nutrition',
  'Customized Practical Diet Planning',
];

export const whyChoosePoints = [
  'No crash diets or starvation',
  'Indian food-friendly plans',
  'Personalized and practical approach',
  'Affordable and sustainable',
  'Ongoing support and motivation',
  'Focus on long-term results',
];

// Default fallback testimonials shown while API data loads or as backup
export const testimonials = [
  {
    id: '1',
    name: 'Sana K.',
    rating: 5,
    text: 'The plan was simple and easy to follow. I lost 8 kgs in 3 months without starving myself.',
    avatar: '',
  },
  {
    id: '2',
    name: 'Ayesha M.',
    rating: 5,
    text: 'I finally learned how to eat right for my PCOS. My energy and skin improved a lot.',
    avatar: '',
  },
  {
    id: '3',
    name: 'Rohan S.',
    rating: 5,
    text: 'Very supportive and understanding. The best decision for my health.',
    avatar: '',
  },
];

export const programs = [
  {
    id: 1,
    title: 'One-Time Consultation',
    features: [
      'Detailed nutrition assessment',
      'Lifestyle and food habit discussion',
      'Personalized meal guidance',
      'Basic diet plan',
      '45–60 minute consultation',
    ],
    cta: 'Book Now',
    popular: false,
  },
  {
    id: 2,
    title: '4-Week Nutrition Program',
    features: [
      'Detailed consultation',
      'Personalized diet plan',
      'Weekly follow-ups',
      'Progress tracking',
      'Meal swaps and alternatives',
      'WhatsApp support',
    ],
    cta: 'Start Your Journey',
    popular: true,
  },
  {
    id: 3,
    title: '8-Week Transformation Program',
    features: [
      'Complete nutrition transformation plan',
      'Weekly follow-ups',
      'Progress tracking',
      'Meal diary review',
      'Lifestyle coaching',
      'Recipe and meal-prep ideas',
      'Ongoing WhatsApp support',
    ],
    cta: 'Transform Your Health',
    popular: false,
  },
];

export const howItWorksSteps = [
  {
    id: 1,
    title: 'Book Your Consultation',
    description: 'Choose a convenient time through WhatsApp or the booking form.',
  },
  {
    id: 2,
    title: 'Share Your Health Details',
    description: 'Fill out a short health and lifestyle questionnaire.',
  },
  {
    id: 3,
    title: 'Attend Your Consultation',
    description: 'Discuss your goals, routine, food preferences, and challenges.',
  },
  {
    id: 4,
    title: 'Receive Your Personalized Plan',
    description: 'Get a practical nutrition plan tailored to your lifestyle.',
  },
  {
    id: 5,
    title: 'Track Progress and Improve',
    description: 'Receive follow-ups, support, and adjustments when needed.',
  },
];

export const blogPosts = [
  {
    id: 1,
    title: '5 Easy High-Protein Indian Breakfast Ideas',
    category: 'Recipes',
    description: 'Start your day right with these delicious and nutritious Indian breakfast options packed with protein.',
    image: '/blog/breakfast.jpg',
    link: '#',
  },
  {
    id: 2,
    title: 'How to Build a Balanced Plate Without Counting Calories',
    category: 'Nutrition Tips',
    description: 'Learn the simple plate method to create nutritious meals without the hassle of calorie counting.',
    image: '/blog/balanced-plate.jpg',
    link: '#',
  },
  {
    id: 3,
    title: 'PCOS-Friendly Food Habits You Can Start Today',
    category: 'Health',
    description: 'Practical dietary changes to help manage PCOS symptoms and improve your overall well-being.',
    image: '/blog/pcos.jpg',
    link: '#',
  },
];

export const footerLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Programs', href: '#programs' },
  { label: 'Success Stories', href: '#testimonials' },
  { label: 'Blog', href: '#blog' },
  { label: 'Contact', href: '#contact' },
];
