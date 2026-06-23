export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  image: string;
  author: string;
  date: string;
  readTime: string;
  content: {
    introduction: string;
    sections: {
      heading: string;
      content: string;
      list?: string[];
    }[];
    conclusion: string;
  };
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: '5-high-protein-indian-breakfast-ideas',
    title: '5 Easy High-Protein Indian Breakfast Ideas',
    category: 'Recipes',
    excerpt: 'Start your day right with these delicious and nutritious Indian breakfast options packed with protein.',
    image: '/blog/breakfast.jpg',
    author: 'Dt. Aadiba Azeemuddin',
    date: 'June 15, 2026',
    readTime: '5 min read',
    content: {
      introduction: 'Protein is essential for building and repairing tissues, maintaining muscle mass, and keeping you full throughout the morning. Many traditional Indian breakfasts are carb-heavy, but with a few smart tweaks, you can boost your protein intake significantly. Here are 5 easy, delicious, and protein-rich Indian breakfast ideas that you can prepare in under 30 minutes.',
      sections: [
        {
          heading: '1. Moong Dal Chilla (Lentil Pancake)',
          content: 'Moong dal chilla is a protein powerhouse that\'s both filling and nutritious. Made from split green gram, these savory pancakes are loaded with protein, fiber, and essential nutrients.',
          list: [
            'Soak 1 cup moong dal overnight',
            'Blend with ginger, green chili, and a pinch of salt',
            'Add chopped onions, tomatoes, and coriander',
            'Cook on a non-stick pan like a dosa',
            'Serve with mint chutney or low-fat yogurt',
          ],
        },
        {
          heading: '2. Paneer Bhurji (Scrambled Cottage Cheese)',
          content: 'Paneer is an excellent source of complete protein. This quick scramble is perfect for busy mornings and keeps you satiated for hours.',
          list: [
            'Crumble 200g paneer (cottage cheese)',
            'Sauté onions, tomatoes, and bell peppers',
            'Add turmeric, cumin, and red chili powder',
            'Mix in the paneer and cook for 5 minutes',
            'Garnish with coriander and serve with whole wheat roti',
          ],
        },
        {
          heading: '3. Sprouts Poha (Flattened Rice with Sprouts)',
          content: 'Traditional poha gets a protein boost with the addition of sprouts. This combination provides both complex carbs and plant-based protein.',
          list: [
            'Use 1 cup poha (flattened rice) and 1 cup mixed sprouts',
            'Rinse poha and keep aside',
            'Sauté mustard seeds, curry leaves, and peanuts',
            'Add sprouts, turmeric, and cook for 5 minutes',
            'Mix in the poha, add lemon juice, and garnish',
          ],
        },
        {
          heading: '4. Besan Cheela with Vegetables',
          content: 'Gram flour (besan) is rich in protein and makes for a quick, savory pancake. Adding vegetables increases the nutrient density even further.',
          list: [
            'Mix 1 cup besan with water to make a batter',
            'Add grated carrots, onions, and spinach',
            'Season with ajwain, turmeric, and chili powder',
            'Pour on a hot pan and cook both sides',
            'Serve hot with green chutney',
          ],
        },
        {
          heading: '5. Greek Yogurt Bowl with Nuts and Seeds',
          content: 'A modern Indian twist on breakfast, this protein-rich bowl is refreshing and incredibly nutritious. Greek yogurt contains almost double the protein of regular yogurt.',
          list: [
            'Take 1 cup thick Greek yogurt or hung curd',
            'Top with chopped almonds, walnuts, and pumpkin seeds',
            'Add chia seeds or flax seeds for omega-3s',
            'Drizzle with a little honey or add fresh berries',
            'Optional: Add a pinch of cardamom powder',
          ],
        },
      ],
      conclusion: 'These high-protein Indian breakfast options are not only delicious but also help you stay full, maintain energy levels, and support your health goals. The key is to include at least 20-25g of protein in your breakfast to kickstart your metabolism and reduce cravings throughout the day. Remember, consistency is more important than perfection. Start with one or two recipes and gradually incorporate variety into your morning routine.',
    },
  },
  {
    id: 2,
    slug: 'balanced-plate-without-counting-calories',
    title: 'How to Build a Balanced Plate Without Counting Calories',
    category: 'Nutrition Tips',
    excerpt: 'Learn the simple plate method to create nutritious meals without the hassle of calorie counting.',
    image: '/blog/balanced-plate.jpg',
    author: 'Dt. Aadiba Azeemuddin',
    date: 'June 10, 2026',
    readTime: '6 min read',
    content: {
      introduction: 'Counting calories can be time-consuming, stressful, and often unsustainable for long-term health. The good news? You don\'t need to track every morsel to eat healthy and maintain a balanced diet. The "plate method" is a simple, visual approach to portion control that ensures you\'re getting the right balance of nutrients without pulling out a calculator at every meal.',
      sections: [
        {
          heading: 'Understanding the Plate Method',
          content: 'The plate method is a visual guide that helps you portion your meals correctly. Imagine your plate divided into sections, each representing different food groups. This method naturally controls portions while ensuring nutritional balance.',
          list: [
            'Use a standard 9-10 inch plate (not oversized platters)',
            'Fill half your plate with vegetables',
            'One quarter with lean protein',
            'One quarter with complex carbohydrates',
            'Add a small portion of healthy fats',
          ],
        },
        {
          heading: 'Half Your Plate: Non-Starchy Vegetables',
          content: 'Vegetables should be the star of your plate. They\'re low in calories but high in fiber, vitamins, and minerals. This helps you feel full while keeping calorie intake in check.',
          list: [
            'Leafy greens: spinach, lettuce, kale, methi',
            'Cruciferous vegetables: broccoli, cauliflower, cabbage',
            'Other vegetables: tomatoes, cucumbers, bell peppers, carrots, beans',
            'Cook with minimal oil or enjoy them raw in salads',
            'Aim for colorful variety throughout the week',
          ],
        },
        {
          heading: 'One Quarter: Lean Protein',
          content: 'Protein is essential for muscle maintenance, satiety, and overall health. Include a palm-sized portion of protein with every meal.',
          list: [
            'Plant-based: dal, chickpeas, rajma, tofu, paneer',
            'Animal-based: chicken breast, fish, eggs, lean meat',
            'Portion guide: About the size and thickness of your palm',
            'Cooking methods: Grilled, baked, steamed, or lightly sautéed',
            'Avoid deep-fried or heavily processed proteins',
          ],
        },
        {
          heading: 'One Quarter: Complex Carbohydrates',
          content: 'Carbohydrates provide energy, but quality matters. Choose whole grains and starchy vegetables over refined options.',
          list: [
            'Whole grains: brown rice, quinoa, whole wheat roti, millets',
            'Starchy vegetables: sweet potato, corn, peas',
            'Portion size: About the size of your fist',
            'Avoid: white bread, maida products, refined rice in excess',
            'Time your carbs: Slightly more at breakfast and lunch, less at dinner',
          ],
        },
        {
          heading: 'The Additions: Healthy Fats and Extras',
          content: 'While not taking up visible plate space, healthy fats are crucial for nutrient absorption and hormone health.',
          list: [
            'Cooking oils: Use 1-2 teaspoons per meal (olive oil, mustard oil)',
            'Nuts and seeds: A small handful as snacks or salad toppers',
            'Avocado or ghee: In moderation',
            'Yogurt: Unsweetened, low-fat options',
            'Limit: Fried foods, heavy cream-based dishes',
          ],
        },
        {
          heading: 'Practical Tips for Indian Meals',
          content: 'Adapting the plate method to traditional Indian cuisine is simple and effective.',
          list: [
            'Thali concept: Naturally follows the plate method',
            'Reduce roti/rice to 1-2 servings per meal',
            'Increase dal and vegetable portions',
            'Use smaller katoris for rice and kadhi',
            'Save sweets and fried items for special occasions',
          ],
        },
      ],
      conclusion: 'The plate method simplifies healthy eating by removing the need for meticulous calorie tracking. It\'s flexible, sustainable, and works with any cuisine. Remember, this is a guideline, not a strict rule. Listen to your hunger cues, eat mindfully, and adjust portions based on your activity level and goals. Over time, this intuitive approach becomes second nature, helping you maintain a healthy relationship with food while achieving your wellness goals.',
    },
  },
  {
    id: 3,
    slug: 'pcos-friendly-food-habits',
    title: 'PCOS-Friendly Food Habits You Can Start Today',
    category: 'Health',
    excerpt: 'Practical dietary changes to help manage PCOS symptoms and improve your overall well-being.',
    image: '/blog/pcos.jpg',
    author: 'Dt. Aadiba Azeemuddin',
    date: 'June 5, 2026',
    readTime: '7 min read',
    content: {
      introduction: 'Polycystic Ovary Syndrome (PCOS) affects 1 in 10 women of reproductive age, and diet plays a crucial role in managing its symptoms. While there\'s no one-size-fits-all approach, certain dietary habits can significantly improve insulin sensitivity, hormonal balance, and overall quality of life. The good news? You don\'t need a complete dietary overhaul. Small, consistent changes can make a big difference.',
      sections: [
        {
          heading: 'Understanding PCOS and Diet Connection',
          content: 'PCOS is closely linked to insulin resistance, which affects about 70% of women with the condition. When your body doesn\'t respond well to insulin, it produces more of it, leading to increased androgen production and worsening PCOS symptoms.',
          list: [
            'Insulin resistance triggers inflammation and hormonal imbalance',
            'Diet can improve insulin sensitivity by 30-50%',
            'Blood sugar management is key to symptom control',
            'Weight loss of even 5-10% can significantly improve symptoms',
            'Focus on anti-inflammatory, nutrient-dense foods',
          ],
        },
        {
          heading: '1. Prioritize Low Glycemic Index (GI) Foods',
          content: 'Low GI foods release sugar slowly into the bloodstream, preventing insulin spikes. This is perhaps the most important dietary change for PCOS management.',
          list: [
            'Choose: Whole grains, oats, quinoa, brown rice, whole wheat',
            'Avoid: White bread, maida, white rice, refined cereals',
            'Pair carbs with protein or healthy fats to lower GI',
            'Include: Sweet potatoes, legumes, most vegetables',
            'Limit: Sugary drinks, pastries, processed snacks',
          ],
        },
        {
          heading: '2. Increase Protein Intake',
          content: 'Protein helps stabilize blood sugar, reduces cravings, and supports weight management. Women with PCOS benefit from having protein at every meal.',
          list: [
            'Target: 20-30g protein per meal',
            'Plant sources: Dal, chickpeas, tofu, quinoa, nuts',
            'Animal sources: Eggs, chicken, fish, Greek yogurt',
            'Breakfast protein prevents afternoon cravings',
            'Protein-rich snacks: Roasted chickpeas, nuts, boiled eggs',
          ],
        },
        {
          heading: '3. Embrace Anti-Inflammatory Foods',
          content: 'PCOS creates chronic low-grade inflammation. Anti-inflammatory foods can help reduce this and improve overall symptoms.',
          list: [
            'Berries and colorful fruits (in moderation)',
            'Leafy greens: Spinach, kale, methi',
            'Fatty fish: Salmon, mackerel (omega-3 rich)',
            'Turmeric, ginger, cinnamon (add to daily cooking)',
            'Green tea, herbal teas',
            'Nuts and seeds: Especially walnuts, flaxseeds, chia seeds',
          ],
        },
        {
          heading: '4. Manage Carbohydrate Portions',
          content: 'You don\'t need to eliminate carbs, but portion control and timing matter. Distribute carbs evenly throughout the day and avoid large carb-heavy meals.',
          list: [
            'Limit to 1-2 servings of grains per meal',
            'Choose whole grains over refined options',
            'Have larger carb portions at breakfast and lunch',
            'Reduce carbs at dinner for better sleep and fat burning',
            'Fill remaining plate space with vegetables and protein',
          ],
        },
        {
          heading: '5. Include Healthy Fats',
          content: 'Healthy fats support hormone production, reduce inflammation, and improve satiety. Don\'t fear fats—choose the right ones.',
          list: [
            'Cooking oils: Olive oil, mustard oil, coconut oil (in moderation)',
            'Nuts: Almonds, walnuts, cashews (small handful daily)',
            'Seeds: Flax, chia, pumpkin, sunflower',
            'Avocado (if available)',
            'Limit: Trans fats, excessive saturated fats, fried foods',
          ],
        },
        {
          heading: '6. Time Your Meals Strategically',
          content: 'When you eat matters almost as much as what you eat. Regular meal timing helps regulate insulin and hormones.',
          list: [
            'Eat within 1 hour of waking up',
            'Have 3 main meals and 1-2 small snacks',
            'Avoid long gaps (more than 4-5 hours)',
            'Finish dinner 2-3 hours before bed',
            'Avoid late-night snacking and midnight meals',
          ],
        },
        {
          heading: '7. Specific Foods to Include',
          content: 'Certain foods have been shown to particularly benefit women with PCOS.',
          list: [
            'Cinnamon: Improves insulin sensitivity (1/2 tsp daily)',
            'Spearmint tea: May reduce excess hair growth',
            'Methi (fenugreek) seeds: Helps regulate blood sugar',
            'Flaxseeds: Balance hormones (1-2 tbsp ground daily)',
            'Amla (Indian gooseberry): Rich in antioxidants',
          ],
        },
        {
          heading: 'Foods to Limit or Avoid',
          content: 'Some foods can worsen insulin resistance and inflammation in PCOS.',
          list: [
            'Refined sugars and sweets',
            'Processed foods and packaged snacks',
            'Fried and deep-fried foods',
            'Excessive dairy (some women are sensitive)',
            'High-sodium foods',
            'Excessive caffeine (limit to 1-2 cups)',
          ],
        },
      ],
      conclusion: 'Managing PCOS through diet is a journey, not a destination. Start with 2-3 changes that feel most doable for you, and gradually build from there. Remember, consistency beats perfection. Focus on progress, not perfection. Many women see improvements in energy, skin, hair, and menstrual regularity within 2-3 months of dietary changes. Pair these habits with regular movement, stress management, and adequate sleep for best results. If you\'re struggling with PCOS, consider working with a dietitian who can create a personalized plan tailored to your specific symptoms, preferences, and lifestyle.',
    },
  },
];

export const getBlogBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find(post => post.slug === slug);
};

export const getRelatedBlogs = (currentSlug: string, count: number = 2): BlogPost[] => {
  return blogPosts.filter(post => post.slug !== currentSlug).slice(0, count);
};
