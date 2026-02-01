import { PrismaClient, ResourceType, SessionStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { addDays, addHours } from 'date-fns';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Clean existing data
  await prisma.videoProgress.deleteMany();
  await prisma.lessonProgress.deleteMany();
  await prisma.enrollment.deleteMany();
  await prisma.resource.deleteMany();
  await prisma.lesson.deleteMany();
  await prisma.assignment.deleteMany();
  await prisma.liveSession.deleteMany();
  await prisma.module.deleteMany();
  await prisma.course.deleteMany();
  await prisma.user.deleteMany();

  console.log('✅ Cleaned existing data');

  // Create test user
  const hashedPassword = await bcrypt.hash('Password123!', 12);
  const user = await prisma.user.create({
    data: {
      email: 'student@siolabs.com',
      password: hashedPassword,
      name: 'Test Student',
    },
  });
  console.log(`✅ Created user: ${user.email}`);

  // Create AI Fundamentals Course
  const course1 = await prisma.course.create({
    data: {
      title: 'AI Fundamentals',
      description:
        'Master the foundations of Artificial Intelligence. Learn key concepts, algorithms, and practical applications that power modern AI systems.',
      thumbnailUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
      durationMinutes: 510, // 8.5 hours
    },
  });

  // Create modules for AI Fundamentals
  const modules1 = await Promise.all([
    prisma.module.create({
      data: {
        courseId: course1.id,
        title: 'Introduction to AI',
        description: 'Understanding what AI is and its real-world applications',
        objective: 'Define AI and distinguish between different types of AI systems',
        order: 1,
      },
    }),
    prisma.module.create({
      data: {
        courseId: course1.id,
        title: 'Machine Learning Basics',
        description: 'Core concepts of machine learning',
        objective: 'Understand supervised, unsupervised, and reinforcement learning',
        order: 2,
      },
    }),
    prisma.module.create({
      data: {
        courseId: course1.id,
        title: 'Neural Networks',
        description: 'Deep dive into neural network architecture',
        objective: 'Build and train basic neural networks',
        order: 3,
      },
    }),
  ]);

  // Create lessons for Module 1
  const lessonsM1 = await Promise.all([
    prisma.lesson.create({
      data: {
        moduleId: modules1[0].id,
        title: 'What is Artificial Intelligence?',
        description: 'An introduction to the field of AI',
        objective: 'Understand the definition and scope of AI',
        videoUrl: 'https://example.com/videos/ai-intro.mp4',
        durationMinutes: 15,
        order: 1,
      },
    }),
    prisma.lesson.create({
      data: {
        moduleId: modules1[0].id,
        title: 'History of AI',
        description: 'From Turing to modern deep learning',
        objective: 'Trace the evolution of AI research',
        videoUrl: 'https://example.com/videos/ai-history.mp4',
        durationMinutes: 20,
        order: 2,
      },
    }),
    prisma.lesson.create({
      data: {
        moduleId: modules1[0].id,
        title: 'Types of AI Systems',
        description: 'Narrow AI, General AI, and Super AI',
        objective: 'Classify different AI capabilities',
        videoUrl: 'https://example.com/videos/ai-types.mp4',
        durationMinutes: 18,
        order: 3,
      },
    }),
  ]);

  // Create lessons for Module 2
  const lessonsM2 = await Promise.all([
    prisma.lesson.create({
      data: {
        moduleId: modules1[1].id,
        title: 'Introduction to Machine Learning',
        description: 'What is ML and how does it differ from traditional programming',
        objective: 'Understand the ML paradigm',
        videoUrl: 'https://example.com/videos/ml-intro.mp4',
        durationMinutes: 22,
        order: 1,
      },
    }),
    prisma.lesson.create({
      data: {
        moduleId: modules1[1].id,
        title: 'Supervised Learning',
        description: 'Learning from labeled data',
        objective: 'Apply supervised learning techniques',
        videoUrl: 'https://example.com/videos/supervised.mp4',
        durationMinutes: 25,
        order: 2,
      },
    }),
    prisma.lesson.create({
      data: {
        moduleId: modules1[1].id,
        title: 'Unsupervised Learning',
        description: 'Finding patterns in unlabeled data',
        objective: 'Apply clustering and dimensionality reduction',
        videoUrl: 'https://example.com/videos/unsupervised.mp4',
        durationMinutes: 25,
        order: 3,
      },
    }),
  ]);

  // Create lessons for Module 3
  const lessonsM3 = await Promise.all([
    prisma.lesson.create({
      data: {
        moduleId: modules1[2].id,
        title: 'Introduction to Neurons',
        description: 'Understanding artificial neurons',
        objective: 'Describe how artificial neurons work',
        videoUrl: 'https://example.com/videos/neurons.mp4',
        durationMinutes: 15,
        order: 1,
      },
    }),
    prisma.lesson.create({
      data: {
        moduleId: modules1[2].id,
        title: 'Activation Functions',
        description: 'ReLU, Sigmoid, Tanh and more',
        objective: 'Choose appropriate activation functions',
        videoUrl: 'https://example.com/videos/activations.mp4',
        durationMinutes: 20,
        order: 2,
      },
    }),
    prisma.lesson.create({
      data: {
        moduleId: modules1[2].id,
        title: 'Backpropagation',
        description: 'How neural networks learn',
        objective: 'Explain the backpropagation algorithm',
        videoUrl: 'https://example.com/videos/backprop.mp4',
        durationMinutes: 25,
        order: 3,
      },
    }),
    prisma.lesson.create({
      data: {
        moduleId: modules1[2].id,
        title: 'Training Your First Network',
        description: 'Hands-on neural network training',
        objective: 'Train a neural network from scratch',
        videoUrl: 'https://example.com/videos/training.mp4',
        durationMinutes: 30,
        order: 4,
      },
    }),
  ]);

  // Add resources to some lessons
  await prisma.resource.createMany({
    data: [
      {
        lessonId: lessonsM1[0].id,
        title: 'Lecture Slides',
        type: ResourceType.SLIDE,
        url: 'https://example.com/slides/ai-intro.pdf',
      },
      {
        lessonId: lessonsM1[0].id,
        title: 'Further Reading: AI Overview',
        type: ResourceType.LINK,
        url: 'https://example.com/reading/ai-overview',
      },
      {
        lessonId: lessonsM3[2].id,
        title: 'Backpropagation Notes',
        type: ResourceType.PDF,
        url: 'https://example.com/notes/backprop.pdf',
      },
      {
        lessonId: lessonsM3[2].id,
        title: 'Code Notebook',
        type: ResourceType.CODE,
        url: 'https://example.com/notebooks/backprop.ipynb',
      },
    ],
  });

  // Create assignments
  await prisma.assignment.createMany({
    data: [
      {
        moduleId: modules1[1].id,
        title: 'Build a Simple Classifier',
        description:
          'Use supervised learning to build a classifier that predicts customer churn.',
        dueDate: addDays(new Date(), 14),
      },
      {
        moduleId: modules1[2].id,
        title: 'Neural Network from Scratch',
        description:
          'Implement a basic neural network without using high-level frameworks.',
        dueDate: addDays(new Date(), 21),
      },
    ],
  });

  // Create live sessions
  await prisma.liveSession.createMany({
    data: [
      {
        courseId: course1.id,
        moduleId: modules1[2].id,
        title: 'Q&A: Neural Networks Deep Dive',
        description: 'Live session to discuss neural network concepts and answer questions',
        scheduledAt: addDays(new Date(), 2),
        durationMinutes: 60,
        status: SessionStatus.SCHEDULED,
      },
      {
        courseId: course1.id,
        title: 'Office Hours: AI Fundamentals',
        description: 'Open office hours for course-related questions',
        scheduledAt: addDays(new Date(), 5),
        durationMinutes: 45,
        status: SessionStatus.SCHEDULED,
      },
    ],
  });

  console.log(`✅ Created course: ${course1.title}`);

  // Create second course: Python for Data Science
  const course2 = await prisma.course.create({
    data: {
      title: 'Python for Data Science',
      description:
        'Learn Python programming with a focus on data science applications. Master pandas, NumPy, and visualization libraries.',
      thumbnailUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800',
      durationMinutes: 420, // 7 hours
    },
  });

  const modules2 = await prisma.module.create({
    data: {
      courseId: course2.id,
      title: 'Python Basics',
      description: 'Core Python programming concepts',
      objective: 'Write basic Python programs',
      order: 1,
    },
  });

  await prisma.lesson.createMany({
    data: [
      {
        moduleId: modules2.id,
        title: 'Getting Started with Python',
        videoUrl: 'https://example.com/videos/python-start.mp4',
        durationMinutes: 20,
        order: 1,
      },
      {
        moduleId: modules2.id,
        title: 'Variables and Data Types',
        videoUrl: 'https://example.com/videos/python-vars.mp4',
        durationMinutes: 25,
        order: 2,
      },
    ],
  });

  console.log(`✅ Created course: ${course2.title}`);

  // Enroll user in courses
  await prisma.enrollment.createMany({
    data: [
      { userId: user.id, courseId: course1.id },
      { userId: user.id, courseId: course2.id },
    ],
  });

  // Add some progress for the user
  await prisma.lessonProgress.createMany({
    data: [
      { userId: user.id, lessonId: lessonsM1[0].id, completed: true, completedAt: new Date() },
      { userId: user.id, lessonId: lessonsM1[1].id, completed: true, completedAt: new Date() },
      { userId: user.id, lessonId: lessonsM1[2].id, completed: true, completedAt: new Date() },
      { userId: user.id, lessonId: lessonsM2[0].id, completed: true, completedAt: new Date() },
      { userId: user.id, lessonId: lessonsM2[1].id, completed: true, completedAt: new Date() },
      { userId: user.id, lessonId: lessonsM3[0].id, completed: true, completedAt: new Date() },
      { userId: user.id, lessonId: lessonsM3[1].id, completed: true, completedAt: new Date() },
    ],
  });

  // Add video progress (partially watched lesson)
  await prisma.videoProgress.create({
    data: {
      userId: user.id,
      lessonId: lessonsM3[2].id,
      positionSeconds: 420, // 7 minutes into a 25 minute video
    },
  });

  console.log('✅ Added user enrollment and progress');

  console.log('');
  console.log('🎉 Seed completed successfully!');
  console.log('');
  console.log('📧 Test account:');
  console.log('   Email: student@siolabs.com');
  console.log('   Password: Password123!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
