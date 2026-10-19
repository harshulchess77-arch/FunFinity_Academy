// Simple script to seed demo data for FunFinity Academy
// This can be run in the browser console or adapted for Supabase SQL

const demoCourses = [
  {
    id: 'demo-1',
    title: 'Introduction to Mathematics',
    description: 'Learn the fundamentals of mathematics including algebra, geometry, and basic calculus concepts.',
    subject: 'Mathematics',
    difficulty: 'Beginner',
    duration: '4 weeks',
    instructor: 'Dr. Sarah Johnson',
    published: true,
    created_at: new Date().toISOString(),
    modules: [
      {
        id: 'm1',
        title: 'Foundations',
        order: 1,
        lessons: [
          { id: 'l1', title: 'Numbers and Operations', duration: 15, order: 1 },
          { id: 'l2', title: 'Basic Algebra', duration: 20, order: 2 },
          { id: 'l3', title: 'Geometry Basics', duration: 25, order: 3 }
        ]
      }
    ]
  },
  {
    id: 'demo-2',
    title: 'Web Development Fundamentals',
    description: 'Master HTML, CSS, and JavaScript to build modern web applications.',
    subject: 'Coding',
    difficulty: 'Intermediate',
    duration: '6 weeks',
    instructor: 'Prof. Michael Chen',
    published: true,
    created_at: new Date().toISOString(),
    modules: [
      {
        id: 'm1',
        title: 'HTML & CSS',
        order: 1,
        lessons: [
          { id: 'l1', title: 'HTML Structure', duration: 30, order: 1 },
          { id: 'l2', title: 'CSS Styling', duration: 45, order: 2 },
          { id: 'l3', title: 'Responsive Design', duration: 40, order: 3 }
        ]
      }
    ]
  },
  {
    id: 'demo-3',
    title: 'Biology: The Science of Life',
    description: 'Explore the fascinating world of living organisms, cells, and ecosystems.',
    subject: 'Biology',
    difficulty: 'Beginner',
    duration: '5 weeks',
    instructor: 'Dr. Emily Williams',
    published: true,
    created_at: new Date().toISOString(),
    modules: [
      {
        id: 'm1',
        title: 'Cell Biology',
        order: 1,
        lessons: [
          { id: 'l1', title: 'Cell Structure', duration: 35, order: 1 },
          { id: 'l2', title: 'Cell Processes', duration: 40, order: 2 }
        ]
      }
    ]
  }
];

console.log('Demo courses data:', JSON.stringify(demoCourses, null, 2));
console.log('Copy this data and insert into your Supabase courses table');