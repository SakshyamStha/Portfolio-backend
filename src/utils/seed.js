const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const Admin = require('../models/Admin');
const Skill = require('../models/Skill');
const Project = require('../models/Project');
const Testimonial = require('../models/Testimonial');

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    // Clear existing data
    await Admin.deleteMany({});
    await Skill.deleteMany({});
    await Project.deleteMany({});
    await Testimonial.deleteMany({});
    
    // Create admin user
    const admin = new Admin({
      username: 'admin',
      email: 'admin@portfolio.com',
      password: 'Admin@123',
      role: 'admin'
    });
    await admin.save();
    
    // Seed skills
    const skills = [
      { name: 'React', category: 'Frontend', proficiency: 95, icon: 'fab fa-react', order: 1 },
      { name: 'Angular', category: 'Frontend', proficiency: 90, icon: 'fab fa-angular', order: 2 },
      { name: 'Node.js', category: 'Backend', proficiency: 88, icon: 'fab fa-node-js', order: 3 },
      { name: 'Express.js', category: 'Backend', proficiency: 85, icon: 'fas fa-server', order: 4 },
      { name: 'MongoDB', category: 'Backend', proficiency: 82, icon: 'fas fa-database', order: 5 },
      { name: 'TypeScript', category: 'Frontend', proficiency: 92, icon: 'fas fa-code', order: 6 },
      { name: 'Docker', category: 'Tools', proficiency: 75, icon: 'fab fa-docker', order: 7 },
      { name: 'AWS', category: 'Cloud', proficiency: 78, icon: 'fab fa-aws', order: 8 }
    ];
    await Skill.insertMany(skills);
    
    // Seed projects
    const projects = [
      {
        title: 'E-Commerce Platform',
        description: 'Full-featured online shopping platform',
        longDescription: 'Built a comprehensive e-commerce platform with product management, cart, checkout, and payment integration.',
        techStack: ['React', 'Node.js', 'MongoDB', 'Stripe'],
        images: ['project1.jpg'],
        thumbnail: 'project1-thumb.jpg',
        liveLink: 'https://example.com',
        githubLink: 'https://github.com/username/project',
        featured: true,
        order: 1
      },
      {
        title: 'Task Management App',
        description: 'Collaborative project management tool',
        longDescription: 'Real-time task management application with team collaboration features.',
        techStack: ['Angular', 'Express.js', 'PostgreSQL', 'Socket.io'],
        images: ['project2.jpg'],
        thumbnail: 'project2-thumb.jpg',
        liveLink: 'https://example.com',
        githubLink: 'https://github.com/username/project',
        featured: true,
        order: 2
      }
    ];
    await Project.insertMany(projects);
    
    // Seed testimonials
    const testimonials = [
      {
        name: 'John Doe',
        role: 'CEO',
        company: 'TechCorp',
        image: 'avatar1.jpg',
        testimonial: 'Exceptional work! Delivered the project on time with outstanding quality.',
        rating: 5,
        order: 1
      },
      {
        name: 'Jane Smith',
        role: 'Product Manager',
        company: 'StartupXYZ',
        image: 'avatar2.jpg',
        testimonial: 'Great communication and technical skills. Highly recommended!',
        rating: 5,
        order: 2
      }
    ];
    await Testimonial.insertMany(testimonials);
    
    console.log('✅ Database seeded successfully!');
    console.log('Admin credentials:');
    console.log('Username: admin');
    console.log('Password: Admin@123');
    
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedDatabase();