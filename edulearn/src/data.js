export const images = {
  hero: '/images/site-pexels-com-students-laptop-online-l-2.jpg',
  learning: '/images/site-unsplash-com-diverse-professional-t-5.jpg',
  teacher: '/images/site-unsplash-com-diverse-professional-t-3.jpg',
  teacher2: '/images/site-pexels-com-students-laptop-online-l-3.jpg',
  coding: '/images/site-unsplash-com-web-developer-coding-w-2.webp',
  coding2: '/images/site-unsplash-com-web-developer-coding-w-4.jpg',
  coding3: '/images/site-unsplash-com-web-developer-coding-w-5.jpg',
  marketing: '/images/site-pexels-com-digital-marketing-busine-1.jpg',
  marketing2: '/images/site-pexels-com-digital-marketing-busine-5.jpg',
  analytics: '/images/site-pexels-com-digital-marketing-busine-2.jpg',
  team: '/images/site-pexels-com-digital-marketing-busine-3.jpg',
  meeting: '/images/site-pexels-com-digital-marketing-busine-4.jpg',
  mentor: '/images/site-unsplash-com-diverse-professional-t-2.jpg',
  lecturer: '/images/site-unsplash-com-diverse-professional-t-4.webp',
  remote: '/images/site-pexels-com-students-laptop-online-l-4.jpg',
  onlineTeacher: '/images/site-pexels-com-students-laptop-online-l-5.jpg',
  teacherDesk: '/images/site-unsplash-com-diverse-professional-t-1.webp',
  codingWoman: '/images/site-unsplash-com-web-developer-coding-w-1.webp',
  codingWoman2: '/images/site-unsplash-com-web-developer-coding-w-3.webp'
};

export const categories = [
  { name: 'Development', count: 24, color: 'lavender', icon: 'Code2' },
  { name: 'Design', count: 18, color: 'peach', icon: 'Palette' },
  { name: 'Business', count: 16, color: 'butter', icon: 'BriefcaseBusiness' },
  { name: 'Marketing', count: 14, color: 'mint', icon: 'Megaphone' },
  { name: 'IT & Software', count: 19, color: 'sky', icon: 'MonitorCog' },
  { name: 'Freelancing', count: 12, color: 'rose', icon: 'Rocket' },
  { name: 'Data Science', count: 11, color: 'lilac', icon: 'ChartNoAxesCombined' },
  { name: 'Personal Development', count: 9, color: 'sand', icon: 'Sparkles' }
];

export const instructors = [
  { name: 'Ayesha Malik', role: 'Product Designer & Mentor', expertise: 'UI/UX Design', courses: 8, rating: 4.9, image: images.mentor, initials: 'AM', accent: 'rose' },
  { name: 'Omar Khan', role: 'Senior Full-Stack Engineer', expertise: 'Web Development', courses: 12, rating: 4.9, image: images.codingWoman, initials: 'OK', accent: 'lavender' },
  { name: 'Sara Nadeem', role: 'Growth Marketing Strategist', expertise: 'Digital Marketing', courses: 6, rating: 4.8, image: images.teacherDesk, initials: 'SN', accent: 'butter' },
  { name: 'Bilal Shah', role: 'Data & AI Consultant', expertise: 'Data Science', courses: 7, rating: 4.9, image: images.lecturer, initials: 'BS', accent: 'sky' }
];

export const courses = [
  { id: 'modern-web-development', title: 'Modern Web Development Bootcamp', category: 'Development', level: 'Beginner', rating: 4.9, reviews: 1248, students: 8420, duration: '38h 20m', lessons: 142, price: 89, salePrice: 39, instructor: 'Omar Khan', image: images.coding, description: 'Build responsive, production-ready websites with HTML, CSS, JavaScript and React.', tag: 'Bestseller', color: 'lavender' },
  { id: 'ui-ux-design', title: 'UI/UX Design: From Brief to Beautiful', category: 'Design', level: 'Beginner', rating: 4.8, reviews: 876, students: 5640, duration: '24h 10m', lessons: 86, price: 75, salePrice: 32, instructor: 'Ayesha Malik', image: images.teacherDesk, description: 'Learn to turn thoughtful research into intuitive digital experiences.', tag: 'Popular', color: 'rose' },
  { id: 'digital-marketing', title: 'Digital Marketing Strategy Lab', category: 'Marketing', level: 'Intermediate', rating: 4.8, reviews: 613, students: 4930, duration: '19h 35m', lessons: 74, price: 69, salePrice: 29, instructor: 'Sara Nadeem', image: images.marketing2, description: 'Plan campaigns people notice, measure what matters, and grow with confidence.', tag: 'New', color: 'peach' },
  { id: 'python-data-analysis', title: 'Python for Data Analysis', category: 'Data Science', level: 'Beginner', rating: 4.9, reviews: 939, students: 6750, duration: '30h 45m', lessons: 118, price: 99, salePrice: 45, instructor: 'Bilal Shah', image: images.coding3, description: 'Transform raw data into clear decisions using Python, pandas and visualization.', tag: 'Bestseller', color: 'sky' },
  { id: 'freelance-launchpad', title: 'Freelance Launchpad: Find Your First Client', category: 'Freelancing', level: 'Beginner', rating: 4.7, reviews: 448, students: 3210, duration: '12h 25m', lessons: 49, price: 49, salePrice: 19, instructor: 'Hira Aziz', image: images.remote, description: 'Build a distinctive profile, price your skills and pitch with purpose.', tag: 'Career pick', color: 'butter' },
  { id: 'graphic-design', title: 'Graphic Design Essentials', category: 'Design', level: 'Beginner', rating: 4.8, reviews: 503, students: 4170, duration: '21h 15m', lessons: 68, price: 65, salePrice: 27, instructor: 'Ayesha Malik', image: images.marketing, description: 'Master hierarchy, colour and composition for memorable visual communication.', tag: 'Popular', color: 'rose' },
  { id: 'excel-business', title: 'Excel for Smart Business Decisions', category: 'Business', level: 'Beginner', rating: 4.7, reviews: 392, students: 2910, duration: '15h 40m', lessons: 61, price: 45, salePrice: 18, instructor: 'Nadia Rehman', image: images.analytics, description: 'Use formulas, dashboards and clean models to make your work easier to trust.', tag: 'Practical', color: 'mint' },
  { id: 'ai-for-creators', title: 'AI Tools for Creative Professionals', category: 'IT & Software', level: 'Intermediate', rating: 4.8, reviews: 298, students: 3860, duration: '11h 55m', lessons: 42, price: 79, salePrice: 35, instructor: 'Bilal Shah', image: images.coding2, description: 'Bring AI into your creative workflow responsibly, productively and thoughtfully.', tag: 'Trending', color: 'lilac' },
  { id: 'full-stack-react', title: 'Full-Stack React & Node', category: 'Development', level: 'Advanced', rating: 4.9, reviews: 731, students: 4550, duration: '42h 30m', lessons: 156, price: 119, salePrice: 54, instructor: 'Omar Khan', image: images.codingWoman2, description: 'Create complete web applications with robust APIs, authentication and deployment.', tag: 'In demand', color: 'lavender' },
  { id: 'content-marketing', title: 'Content Marketing That Connects', category: 'Marketing', level: 'Beginner', rating: 4.6, reviews: 211, students: 1820, duration: '10h 20m', lessons: 39, price: 42, salePrice: 17, instructor: 'Sara Nadeem', image: images.team, description: 'Tell brand stories people want to read, save and share.', tag: 'New', color: 'peach' },
  { id: 'product-management', title: 'Product Management Foundations', category: 'Business', level: 'Intermediate', rating: 4.8, reviews: 351, students: 2140, duration: '18h 10m', lessons: 64, price: 85, salePrice: 37, instructor: 'Nadia Rehman', image: images.meeting, description: 'Learn to discover opportunities, define a roadmap and ship with clarity.', tag: 'Career pick', color: 'mint' },
  { id: 'cybersecurity-basics', title: 'Cybersecurity for the Modern Workplace', category: 'IT & Software', level: 'Beginner', rating: 4.7, reviews: 189, students: 1650, duration: '9h 30m', lessons: 34, price: 49, salePrice: 21, instructor: 'Hamza Ali', image: images.onlineTeacher, description: 'Build safer digital habits and understand the foundations of cyber resilience.', tag: 'Essential', color: 'sky' },
  { id: 'power-bi', title: 'Power BI: Insight to Impact', category: 'Data Science', level: 'Intermediate', rating: 4.8, reviews: 472, students: 2790, duration: '17h 45m', lessons: 55, price: 72, salePrice: 31, instructor: 'Bilal Shah', image: images.analytics, description: 'Create polished dashboards that turn complex business questions into answers.', tag: 'Popular', color: 'lilac' },
  { id: 'communication', title: 'Confident Communication at Work', category: 'Personal Development', level: 'Beginner', rating: 4.7, reviews: 256, students: 1920, duration: '7h 50m', lessons: 27, price: 35, salePrice: 15, instructor: 'Hira Aziz', image: images.teacher, description: 'Speak with clarity, lead thoughtful conversations and grow your influence.', tag: 'Life skill', color: 'sand' },
  { id: 'wordpress-business', title: 'WordPress Websites for Small Business', category: 'Freelancing', level: 'Beginner', rating: 4.6, reviews: 327, students: 3040, duration: '13h 15m', lessons: 46, price: 44, salePrice: 18, instructor: 'Omar Khan', image: images.learning, description: 'Launch beautiful, client-ready websites without starting from scratch.', tag: 'Practical', color: 'butter' },
  { id: 'leadership', title: 'Leadership with Empathy', category: 'Personal Development', level: 'Intermediate', rating: 4.9, reviews: 144, students: 1080, duration: '8h 40m', lessons: 31, price: 55, salePrice: 24, instructor: 'Nadia Rehman', image: images.mentor, description: 'Develop the listening, feedback and decision-making skills of a trusted leader.', tag: 'Rated 4.9', color: 'sand' }
];

export const posts = [
  { slug: 'how-to-start-learning-web-development', category: 'Development', title: 'How to Start Learning Web Development (Without Getting Lost)', excerpt: 'A practical, no-pressure roadmap for making your first steps in a field that never stops evolving.', date: 'March 18, 2026', time: '7 min read', author: 'Omar Khan', image: images.coding2, featured: true },
  { slug: 'skills-every-freelancer-should-learn', category: 'Freelancing', title: '10 Skills Every Freelancer Should Learn Before Their Next Pitch', excerpt: 'The skills that help your good work turn into reliable, repeatable client relationships.', date: 'March 10, 2026', time: '6 min read', author: 'Hira Aziz', image: images.remote },
  { slug: 'why-digital-skills-matter-2026', category: 'Career', title: 'Why Digital Skills Matter More Than Ever in 2026', excerpt: 'The modern workplace is changing quickly. Here is how to keep your confidence and options growing.', date: 'March 04, 2026', time: '5 min read', author: 'Sara Nadeem', image: images.marketing2 },
  { slug: 'build-successful-career-online', category: 'Career', title: 'How to Build a Successful Career Online, One Project at a Time', excerpt: 'A portfolio is not a gallery. It is a story of how you think, make decisions and deliver value.', date: 'February 22, 2026', time: '8 min read', author: 'Nadia Rehman', image: images.team },
  { slug: 'beginners-guide-to-python', category: 'Data Science', title: "A Beginner's Guide to Python: What to Learn First", excerpt: 'Focus on the useful foundations before the buzzwords, and turn small wins into momentum.', date: 'February 14, 2026', time: '9 min read', author: 'Bilal Shah', image: images.coding3 },
  { slug: 'improve-your-productivity', category: 'Growth', title: 'A Gentler System for Improving Your Productivity', excerpt: 'Forget the colour-coded pressure. Build a learning rhythm that feels sustainable and human.', date: 'February 06, 2026', time: '4 min read', author: 'Ayesha Malik', image: images.teacherDesk }
];

export const testimonials = [
  { quote: 'I came for the course structure and stayed for the confidence it gave me. Three months later, I had a portfolio I was genuinely proud to send out.', name: 'Maham Iqbal', course: 'Modern Web Development Bootcamp', image: images.mentor, rating: 5 },
  { quote: 'EduLearn made data feel approachable. The projects were useful, the feedback was thoughtful, and I finally understood how to tell a story with numbers.', name: 'Zain Ahmed', course: 'Python for Data Analysis', image: images.lecturer, rating: 5 },
  { quote: 'The design course felt considered from start to finish. It did not just teach tools—it taught me how to make better decisions as a designer.', name: 'Anaya Siddiqui', course: 'UI/UX Design: From Brief to Beautiful', image: images.teacher, rating: 5 },
  { quote: 'I booked my first freelance client before I finished the final module. The templates alone helped me show up much more professionally.', name: 'Rayan Farooq', course: 'Freelance Launchpad', image: images.onlineTeacher, rating: 5 }
];

export const faqs = [
  { q: 'How do I start learning on EduLearn?', a: 'Create your free account, choose a course, and enrol. You can start the first lesson immediately and learn from any device.' },
  { q: 'Do courses include a certificate?', a: 'Yes. Courses with a certificate badge include a shareable digital certificate after you complete all required lessons and assessments.' },
  { q: 'How long do I have access to a course?', a: 'Your enrolled courses include lifetime access, including future lesson updates made by the instructor.' },
  { q: 'Can I learn at my own pace?', a: 'Absolutely. There are no fixed class times. Your progress saves automatically so you can pick up exactly where you left off.' },
  { q: 'Are the courses suitable for beginners?', a: 'Many of our courses start with beginner-friendly foundations. Use the level filter on the Courses page to find the right starting point.' },
  { q: 'What if a course is not the right fit?', a: 'Reach out to our learner support team within 14 days of enrolment. We will help you find a better fit or guide you through next steps.' }
];
