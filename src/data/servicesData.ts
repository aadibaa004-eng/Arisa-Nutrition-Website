export interface ServiceDetail {
  id: number;
  slug: string;
  title: string;
  shortDescription: string;
  icon: string;
  image: string;
  overview: string;
  whoIsItFor: string[];
  benefits: string[];
  approach: {
    title: string;
    description: string;
  }[];
  whatToExpect: string[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

export const servicesData: ServiceDetail[] = [
  {
    id: 1,
    slug: 'weight-loss',
    title: 'Weight Loss Program',
    shortDescription: 'Sustainable fat loss with balanced nutrition.',
    icon: 'Scale',
    image: '/services/weight-loss.jpg',
    overview: 'Our Weight Loss Program is designed to help you achieve sustainable fat loss through balanced nutrition, lifestyle modifications, and personalized meal planning. Unlike crash diets, we focus on creating healthy habits that last a lifetime. You\'ll learn how to make better food choices, understand portion control, and develop a positive relationship with food while achieving your weight goals.',
    whoIsItFor: [
      'Individuals looking to lose 5-30+ kg in a healthy way',
      'People tired of yo-yo dieting and looking for sustainable solutions',
      'Those who want to lose weight without feeling hungry or deprived',
      'Anyone struggling with emotional or stress eating',
      'People who have tried multiple diets without lasting success',
    ],
    benefits: [
      'Steady, sustainable weight loss of 2-4 kg per month',
      'Improved energy levels and mood',
      'Better sleep quality and digestion',
      'Reduced risk of lifestyle diseases',
      'Increased confidence and body positivity',
      'Learn lifelong healthy eating habits',
      'Personalized meal plans that fit your lifestyle',
    ],
    approach: [
      {
        title: 'Comprehensive Assessment',
        description: 'We start with understanding your current lifestyle, food preferences, medical history, activity level, and past diet attempts to create a truly personalized plan.',
      },
      {
        title: 'Customized Meal Planning',
        description: 'Get flexible meal plans based on Indian home-cooked foods. No extreme restrictions or expensive supplements required.',
      },
      {
        title: 'Behavioral Coaching',
        description: 'Address emotional eating, stress management, and develop mindful eating practices for long-term success.',
      },
      {
        title: 'Regular Monitoring',
        description: 'Weekly or bi-weekly check-ins to track progress, adjust plans, and keep you motivated and accountable.',
      },
    ],
    whatToExpect: [
      'Initial consultation to understand your goals and challenges',
      'Detailed body composition analysis',
      'Personalized meal plan with multiple options and swaps',
      'Weekly progress tracking and plan adjustments',
      'Guidance on eating out and social situations',
      'Recipe ideas and meal prep tips',
      '24/7 WhatsApp support for queries and motivation',
    ],
    faqs: [
      {
        question: 'How much weight can I expect to lose?',
        answer: 'Healthy weight loss is typically 2-4 kg per month. This varies based on your starting weight, metabolism, adherence, and lifestyle factors. Rapid weight loss often leads to muscle loss and is difficult to maintain.',
      },
      {
        question: 'Will I have to give up my favorite foods?',
        answer: 'No! We believe in moderation, not elimination. You\'ll learn how to enjoy your favorite foods in appropriate portions while making healthier choices most of the time.',
      },
      {
        question: 'Do I need to exercise?',
        answer: 'While diet is the primary driver of weight loss, physical activity enhances results and overall health. We recommend 30-45 minutes of moderate activity 4-5 times per week, but we\'ll work with your current fitness level.',
      },
      {
        question: 'What if I have dietary restrictions?',
        answer: 'All our plans are completely customizable. Whether you\'re vegetarian, vegan, have food allergies, or cultural preferences, we\'ll create a plan that works for you.',
      },
    ],
  },
  {
    id: 2,
    slug: 'weight-gain',
    title: 'Weight Gain Program',
    shortDescription: 'Healthy weight gain and muscle-building nutrition.',
    icon: 'Dumbbell',
    image: '/services/weight-gain.jpg',
    overview: 'Struggling to gain weight? Our Weight Gain Program helps you build healthy muscle mass and increase body weight through strategic nutrition and strength-focused eating plans. Whether you\'re naturally thin, recovering from illness, or looking to build muscle, we create personalized high-calorie, nutrient-dense meal plans that help you gain weight the healthy way.',
    whoIsItFor: [
      'Underweight individuals looking to reach a healthy BMI',
      'People with fast metabolism who struggle to gain weight',
      'Athletes and fitness enthusiasts aiming to build muscle',
      'Individuals recovering from illness or surgery',
      'Those who have poor appetite or digestive issues',
    ],
    benefits: [
      'Healthy weight gain of 2-3 kg per month',
      'Increased muscle mass and strength',
      'Improved energy and stamina',
      'Better immunity and overall health',
      'Enhanced athletic performance',
      'Boosted confidence and body image',
      'Sustainable eating habits for long-term maintenance',
    ],
    approach: [
      {
        title: 'Calorie Surplus Strategy',
        description: 'Calculate your exact calorie needs and create a slight surplus (300-500 calories) to promote steady, healthy weight gain without excessive fat accumulation.',
      },
      {
        title: 'Protein-Rich Nutrition',
        description: 'Emphasize high-quality proteins to support muscle growth, along with complex carbs and healthy fats for sustained energy.',
      },
      {
        title: 'Frequent Eating Schedule',
        description: 'Implement 5-6 smaller meals throughout the day to make calorie consumption manageable and support consistent nutrient intake.',
      },
      {
        title: 'Strength Training Guidance',
        description: 'Provide basic nutrition timing around workouts to maximize muscle building and recovery.',
      },
    ],
    whatToExpect: [
      'Detailed assessment of metabolism and calorie needs',
      'High-calorie meal plans with nutrient-dense foods',
      'Strategies to improve appetite and digestion',
      'Meal timing recommendations for optimal gain',
      'Smoothie and shake recipes for easy calories',
      'Guidance on healthy snacking between meals',
      'Regular monitoring of weight and body composition',
    ],
    faqs: [
      {
        question: 'How quickly can I expect to gain weight?',
        answer: 'Healthy weight gain is typically 2-3 kg per month. Gaining too quickly often results in excess fat rather than lean muscle. Patience and consistency are key.',
      },
      {
        question: 'Will I gain fat or muscle?',
        answer: 'With proper nutrition and strength training, you\'ll gain both muscle and some fat. The ratio depends on your training, genetics, and protein intake. We optimize nutrition to favor muscle gain.',
      },
      {
        question: 'Do I need supplements or protein powders?',
        answer: 'Not necessarily. Most people can meet their needs through food. However, protein supplements can be convenient if you struggle to meet protein goals through meals alone.',
      },
      {
        question: 'What if I have a poor appetite?',
        answer: 'We use strategies like calorie-dense foods, liquid calories (smoothies), smaller frequent meals, and appetite-stimulating herbs to make it easier to meet your calorie goals.',
      },
    ],
  },
  {
    id: 3,
    slug: 'pcos-management',
    title: 'PCOS / PCOD Management',
    shortDescription: 'Hormone-friendly nutrition to support your body.',
    icon: 'Heart',
    image: '/services/pcos.jpg',
    overview: 'PCOS (Polycystic Ovary Syndrome) affects millions of women and can significantly impact quality of life. Our PCOS Management Program uses evidence-based nutrition strategies to improve insulin sensitivity, balance hormones, manage weight, and reduce symptoms like irregular periods, acne, and unwanted hair growth. We focus on sustainable lifestyle changes that address the root cause, not just symptoms.',
    whoIsItFor: [
      'Women diagnosed with PCOS or PCOD',
      'Those experiencing irregular or missed periods',
      'Women struggling with PCOS-related weight gain',
      'Individuals with insulin resistance or prediabetes',
      'Those experiencing acne, hair loss, or excess hair growth',
      'Women trying to conceive with PCOS',
    ],
    benefits: [
      'Improved insulin sensitivity and blood sugar control',
      'More regular menstrual cycles',
      'Reduction in acne and skin improvements',
      'Better management of unwanted hair growth',
      'Weight loss (if needed) and easier weight management',
      'Increased energy and reduced fatigue',
      'Improved fertility outcomes',
      'Reduced risk of diabetes and heart disease',
    ],
    approach: [
      {
        title: 'Low Glycemic Index Diet',
        description: 'Focus on foods that don\'t spike blood sugar, improving insulin sensitivity and hormonal balance.',
      },
      {
        title: 'Anti-Inflammatory Nutrition',
        description: 'Incorporate foods that reduce inflammation, a key driver of PCOS symptoms.',
      },
      {
        title: 'Hormone-Balancing Foods',
        description: 'Include specific foods and supplements (like inositol, spearmint tea) proven to help with PCOS.',
      },
      {
        title: 'Lifestyle Integration',
        description: 'Address sleep, stress management, and gentle movement as part of holistic PCOS care.',
      },
    ],
    whatToExpect: [
      'Comprehensive PCOS-specific nutrition assessment',
      'Low-GI, high-protein meal plans',
      'Guidance on supplements that may help (inositol, vitamin D, etc.)',
      'Strategies to manage cravings and emotional eating',
      'Monthly cycle tracking and symptom monitoring',
      'Education on PCOS and how nutrition impacts hormones',
      'Ongoing support and plan adjustments based on progress',
    ],
    faqs: [
      {
        question: 'Can diet really help with PCOS?',
        answer: 'Absolutely! Research shows that diet and lifestyle changes can improve insulin sensitivity by 30-50%, leading to better hormonal balance, more regular periods, and reduced symptoms. For many women, diet is more effective than medication alone.',
      },
      {
        question: 'Do I need to follow a keto or very low-carb diet?',
        answer: 'Not necessarily. While some women benefit from lower carb intake, extreme restriction isn\'t required. We focus on quality carbs, proper portions, and balanced meals. Sustainability is more important than extreme approaches.',
      },
      {
        question: 'How long before I see results?',
        answer: 'Most women notice improvements in energy and cravings within 2-3 weeks. Menstrual regularity and weight changes typically take 2-3 months. Skin and hair improvements may take 3-6 months as these respond more slowly to dietary changes.',
      },
      {
        question: 'Will I need to take supplements?',
        answer: 'Common beneficial supplements for PCOS include inositol, vitamin D, omega-3, and magnesium. We assess your individual needs and recommend supplements based on your symptoms and blood work.',
      },
    ],
  },
  {
    id: 4,
    slug: 'diabetes-management',
    title: 'Diabetes Management',
    shortDescription: 'Smart food choices for better blood sugar management.',
    icon: 'Droplet',
    image: '/services/diabetes.jpg',
    overview: 'Managing diabetes doesn\'t mean giving up delicious food or living a restrictive life. Our Diabetes Management Program helps you control blood sugar levels through smart food choices, proper meal timing, and lifestyle modifications. Whether you have Type 1, Type 2, or prediabetes, we create personalized nutrition plans that keep your glucose stable while allowing you to enjoy a varied, satisfying diet.',
    whoIsItFor: [
      'Individuals with Type 2 diabetes',
      'People with prediabetes or insulin resistance',
      'Type 1 diabetics looking to improve blood sugar control',
      'Those on diabetes medication wanting to reduce dosage',
      'Anyone with a family history of diabetes',
      'Gestational diabetes during pregnancy',
    ],
    benefits: [
      'Better blood sugar control and stable glucose levels',
      'Reduced HbA1c levels',
      'Potential reduction in medication (with doctor approval)',
      'Weight loss and improved body composition',
      'Reduced risk of diabetes complications',
      'More energy and fewer blood sugar crashes',
      'Improved overall health markers',
    ],
    approach: [
      {
        title: 'Carbohydrate Management',
        description: 'Learn which carbs to choose, proper portions, and how to distribute them throughout the day for stable blood sugar.',
      },
      {
        title: 'Meal Timing & Consistency',
        description: 'Establish regular meal patterns that work with your medication schedule and prevent glucose spikes.',
      },
      {
        title: 'Balanced Plate Method',
        description: 'Create meals with the right balance of protein, healthy fats, and fiber-rich carbs to minimize blood sugar fluctuations.',
      },
      {
        title: 'Monitoring & Adjustment',
        description: 'Track blood glucose patterns and adjust the diet plan for optimal control.',
      },
    ],
    whatToExpect: [
      'Personalized carbohydrate counting and portion guidance',
      'Diabetes-friendly meal plans with Indian food options',
      'Education on reading food labels and making smart swaps',
      'Guidance on managing dining out and social events',
      'Support for medication timing and coordination',
      'Regular review of blood glucose logs',
      'Collaboration with your doctor for medication adjustments',
    ],
    faqs: [
      {
        question: 'Can I reverse Type 2 diabetes with diet?',
        answer: 'While "reversal" means different things to different people, many with Type 2 diabetes can achieve normal blood sugar levels and reduce or eliminate medications through diet, weight loss, and lifestyle changes. This is best done under medical supervision.',
      },
      {
        question: 'Do I have to give up rice, roti, and sweets completely?',
        answer: 'No! It\'s about smart choices and portions. You can include moderate amounts of whole grain roti, smaller portions of brown rice, and occasional sweets with proper meal planning and timing.',
      },
      {
        question: 'How often should I check my blood sugar?',
        answer: 'This depends on your type of diabetes and treatment. We\'ll work with your doctor\'s recommendations, typically 2-4 times daily for those on insulin, and less frequently for diet-controlled diabetes.',
      },
      {
        question: 'Can I eat fruits if I have diabetes?',
        answer: 'Yes! Fruits contain natural sugar but also fiber, vitamins, and antioxidants. Choose whole fruits over juice, pair them with protein, and stick to appropriate portions (1-2 servings daily).',
      },
    ],
  },
];

export const getServiceBySlug = (slug: string): ServiceDetail | undefined => {
  return servicesData.find(service => service.slug === slug);
};
