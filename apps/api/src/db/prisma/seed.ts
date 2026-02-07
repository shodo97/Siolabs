import { PrismaClient, ResourceType, SessionStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

// ===========================================
// FIXED IDs FOR DETERMINISTIC SEEDING
// ===========================================
const IDS = {
  // User
  USER_DEMO: 'user_demo_001',

  // Course
  COURSE_AI: 'course_ai_fundamentals',

  // Modules
  MODULE_AI_INTRO: 'module_ai_intro',
  MODULE_ML_BASICS: 'module_ml_basics',
  MODULE_NEURAL_NETS: 'module_neural_nets',

  // Lessons - Module 1 (Introduction to AI)
  LESSON_WHAT_IS_AI: 'lesson_what_is_ai',
  LESSON_HISTORY_AI: 'lesson_history_ai',
  LESSON_TYPES_AI: 'lesson_types_ai',

  // Lessons - Module 2 (ML Basics)
  LESSON_ML_INTRO: 'lesson_ml_intro',
  LESSON_SUPERVISED: 'lesson_supervised',
  LESSON_UNSUPERVISED: 'lesson_unsupervised',

  // Lessons - Module 3 (Neural Networks)
  LESSON_NEURONS: 'lesson_neurons',
  LESSON_ACTIVATIONS: 'lesson_activations',
  LESSON_BACKPROP: 'lesson_backprop',
  LESSON_TRAINING: 'lesson_training',

  // Sessions
  SESSION_QA: 'session_qa_neural',
  SESSION_OFFICE: 'session_office_hours',
};

// Public sample video URLs (Big Buck Bunny - Creative Commons)
const VIDEO_URLS = {
  SHORT: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  MEDIUM: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
  LONG: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  ALT1: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
  ALT2: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
};

async function main() {
  console.log('🌱 Starting database seed...\n');

  // ===========================================
  // CLEAN EXISTING DATA
  // ===========================================
  console.log('🧹 Cleaning existing data...');
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
  console.log('✅ Cleaned existing data\n');

  // ===========================================
  // CREATE DEMO USER
  // ===========================================
  console.log('👤 Creating demo user...');
  const hashedPassword = await bcrypt.hash('Password123!', 12);
  const user = await prisma.user.create({
    data: {
      id: IDS.USER_DEMO,
      email: 'student@siolabs.com',
      password: hashedPassword,
      name: 'Rahul Sharma',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    },
  });
  console.log(`✅ Created user: ${user.email}\n`);

  // ===========================================
  // CREATE COURSE: AI FUNDAMENTALS
  // ===========================================
  console.log('📚 Creating course: AI Fundamentals...');
  const course = await prisma.course.create({
    data: {
      id: IDS.COURSE_AI,
      title: 'AI Fundamentals',
      description:
        'Master the foundations of Artificial Intelligence. Learn key concepts, algorithms, and practical applications that power modern AI systems. Perfect for beginners looking to start their AI journey.',
      thumbnailUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=450&fit=crop',
      durationMinutes: 215, // Sum of all lessons
    },
  });
  console.log(`✅ Created course: ${course.title}\n`);

  // ===========================================
  // CREATE MODULES
  // ===========================================
  console.log('📦 Creating modules...');

  const moduleIntro = await prisma.module.create({
    data: {
      id: IDS.MODULE_AI_INTRO,
      courseId: course.id,
      title: 'Introduction to AI',
      description: 'Understanding what AI is and its real-world applications',
      objective: 'Define AI and distinguish between different types of AI systems',
      order: 1,
    },
  });

  const moduleML = await prisma.module.create({
    data: {
      id: IDS.MODULE_ML_BASICS,
      courseId: course.id,
      title: 'Machine Learning Basics',
      description: 'Core concepts of machine learning algorithms',
      objective: 'Understand supervised, unsupervised, and reinforcement learning',
      order: 2,
    },
  });

  const moduleNN = await prisma.module.create({
    data: {
      id: IDS.MODULE_NEURAL_NETS,
      courseId: course.id,
      title: 'Neural Networks',
      description: 'Deep dive into neural network architecture and training',
      objective: 'Build and train basic neural networks',
      order: 3,
    },
  });

  console.log(`✅ Created ${3} modules\n`);

  // ===========================================
  // CREATE LESSONS
  // ===========================================
  console.log('🎬 Creating lessons...');

  // Module 1 Lessons (Introduction to AI) - 3 lessons
  const lesson1 = await prisma.lesson.create({
    data: {
      id: IDS.LESSON_WHAT_IS_AI,
      moduleId: moduleIntro.id,
      title: 'What is Artificial Intelligence?',
      description: 'An introduction to the field of AI and its core concepts',
      objective: 'Understand the definition and scope of AI',
      videoUrl: VIDEO_URLS.SHORT,
      durationMinutes: 15,
      order: 1,
    },
  });

  const lesson2 = await prisma.lesson.create({
    data: {
      id: IDS.LESSON_HISTORY_AI,
      moduleId: moduleIntro.id,
      title: 'History of AI',
      description: 'From Turing to modern deep learning - the evolution of AI',
      objective: 'Trace the key milestones in AI research',
      videoUrl: VIDEO_URLS.MEDIUM,
      durationMinutes: 20,
      order: 2,
    },
  });

  const lesson3 = await prisma.lesson.create({
    data: {
      id: IDS.LESSON_TYPES_AI,
      moduleId: moduleIntro.id,
      title: 'Types of AI Systems',
      description: 'Narrow AI, General AI, and Super AI explained',
      objective: 'Classify different AI capabilities and limitations',
      videoUrl: VIDEO_URLS.ALT1,
      durationMinutes: 18,
      order: 3,
    },
  });

  // Module 2 Lessons (ML Basics) - 3 lessons
  const lesson4 = await prisma.lesson.create({
    data: {
      id: IDS.LESSON_ML_INTRO,
      moduleId: moduleML.id,
      title: 'Introduction to Machine Learning',
      description: 'What is ML and how does it differ from traditional programming',
      objective: 'Understand the machine learning paradigm',
      videoUrl: VIDEO_URLS.MEDIUM,
      durationMinutes: 22,
      order: 1,
    },
  });

  const lesson5 = await prisma.lesson.create({
    data: {
      id: IDS.LESSON_SUPERVISED,
      moduleId: moduleML.id,
      title: 'Supervised Learning',
      description: 'Learning from labeled data - classification and regression',
      objective: 'Apply supervised learning techniques',
      videoUrl: VIDEO_URLS.ALT2,
      durationMinutes: 25,
      order: 2,
    },
  });

  const lesson6 = await prisma.lesson.create({
    data: {
      id: IDS.LESSON_UNSUPERVISED,
      moduleId: moduleML.id,
      title: 'Unsupervised Learning',
      description: 'Finding patterns in unlabeled data - clustering',
      objective: 'Apply clustering and dimensionality reduction',
      videoUrl: VIDEO_URLS.SHORT,
      durationMinutes: 25,
      order: 3,
    },
  });

  // Module 3 Lessons (Neural Networks) - 4 lessons
  await prisma.lesson.create({
    data: {
      id: IDS.LESSON_NEURONS,
      moduleId: moduleNN.id,
      title: 'Introduction to Neurons',
      description: 'Understanding artificial neurons and perceptrons',
      objective: 'Describe how artificial neurons work',
      videoUrl: VIDEO_URLS.SHORT,
      durationMinutes: 15,
      order: 1,
    },
  });

  await prisma.lesson.create({
    data: {
      id: IDS.LESSON_ACTIVATIONS,
      moduleId: moduleNN.id,
      title: 'Activation Functions',
      description: 'ReLU, Sigmoid, Tanh and when to use them',
      objective: 'Choose appropriate activation functions for different tasks',
      videoUrl: VIDEO_URLS.MEDIUM,
      durationMinutes: 20,
      order: 2,
    },
  });

  const lesson9 = await prisma.lesson.create({
    data: {
      id: IDS.LESSON_BACKPROP,
      moduleId: moduleNN.id,
      title: 'Backpropagation',
      description: 'How neural networks learn from data',
      objective: 'Explain the backpropagation algorithm step by step',
      videoUrl: VIDEO_URLS.ALT1,
      durationMinutes: 25,
      order: 3,
    },
  });

  const lesson10 = await prisma.lesson.create({
    data: {
      id: IDS.LESSON_TRAINING,
      moduleId: moduleNN.id,
      title: 'Training Your First Network',
      description: 'Hands-on neural network training with Python',
      objective: 'Train a neural network from scratch',
      videoUrl: VIDEO_URLS.LONG,
      durationMinutes: 30,
      order: 4,
    },
  });

  console.log(`✅ Created ${10} lessons\n`);

  // ===========================================
  // CREATE RESOURCES (on at least 2 lessons)
  // ===========================================
  console.log('📎 Creating resources...');

  // Resources for Lesson 1 (What is AI?)
  await prisma.resource.createMany({
    data: [
      {
        lessonId: lesson1.id,
        title: 'Lecture Slides: Introduction to AI',
        type: ResourceType.SLIDE,
        url: 'https://example.com/slides/ai-intro.pdf',
      },
      {
        lessonId: lesson1.id,
        title: 'Stanford AI Index Report 2024',
        type: ResourceType.LINK,
        url: 'https://aiindex.stanford.edu/report/',
      },
    ],
  });

  // Resources for Lesson 9 (Backpropagation)
  await prisma.resource.createMany({
    data: [
      {
        lessonId: lesson9.id,
        title: 'Backpropagation Math Notes',
        type: ResourceType.PDF,
        url: 'https://example.com/notes/backprop-math.pdf',
      },
      {
        lessonId: lesson9.id,
        title: 'Jupyter Notebook: Backprop Implementation',
        type: ResourceType.CODE,
        url: 'https://github.com/example/backprop-notebook',
      },
      {
        lessonId: lesson9.id,
        title: '3Blue1Brown: Neural Networks',
        type: ResourceType.LINK,
        url: 'https://www.youtube.com/watch?v=aircAruvnKk',
      },
    ],
  });

  // Resources for Lesson 10 (Training)
  await prisma.resource.createMany({
    data: [
      {
        lessonId: lesson10.id,
        title: 'Starter Code: PyTorch Basics',
        type: ResourceType.CODE,
        url: 'https://github.com/example/pytorch-starter',
      },
    ],
  });

  console.log(`✅ Created ${6} resources\n`);

  // ===========================================
  // CREATE ASSIGNMENTS
  // ===========================================
  console.log('📝 Creating assignments...');

  await prisma.assignment.createMany({
    data: [
      {
        moduleId: moduleML.id,
        title: 'Build a Simple Classifier',
        description:
          'Use supervised learning to build a classifier that predicts customer churn based on historical data.',
        dueDate: new Date('2026-02-15T23:59:59Z'),
      },
      {
        moduleId: moduleNN.id,
        title: 'Neural Network from Scratch',
        description:
          'Implement a basic feedforward neural network without using high-level frameworks like TensorFlow or PyTorch.',
        dueDate: new Date('2026-02-22T23:59:59Z'),
      },
    ],
  });

  console.log(`✅ Created ${2} assignments\n`);

  // ===========================================
  // CREATE LIVE SESSIONS (Feb 5-10, 2026)
  // ===========================================
  console.log('📅 Creating live sessions...');

  await prisma.liveSession.createMany({
    data: [
      {
        id: IDS.SESSION_QA,
        courseId: course.id,
        moduleId: moduleNN.id,
        title: 'Q&A: Neural Networks Deep Dive',
        description:
          'Live session to discuss neural network concepts, answer questions, and work through examples together.',
        scheduledAt: new Date('2026-02-05T14:00:00Z'), // Feb 5, 2026 at 2 PM UTC
        durationMinutes: 60,
        joinUrl: 'https://meet.siolabs.com/session-neural-qa',
        status: SessionStatus.SCHEDULED,
      },
      {
        id: IDS.SESSION_OFFICE,
        courseId: course.id,
        title: 'Office Hours: AI Fundamentals',
        description: 'Open office hours for any course-related questions. Bring your doubts!',
        scheduledAt: new Date('2026-02-08T10:00:00Z'), // Feb 8, 2026 at 10 AM UTC
        durationMinutes: 45,
        joinUrl: 'https://meet.siolabs.com/office-hours-ai',
        status: SessionStatus.SCHEDULED,
      },
    ],
  });

  console.log(`✅ Created ${2} live sessions\n`);

  // ===========================================
  // CREATE ENROLLMENT
  // ===========================================
  console.log('🎓 Creating enrollment...');

  await prisma.enrollment.create({
    data: {
      userId: user.id,
      courseId: course.id,
      enrolledAt: new Date('2026-01-15T10:00:00Z'), // Enrolled 2 weeks ago
    },
  });

  console.log(`✅ Enrolled user in course\n`);

  // ===========================================
  // CREATE PROGRESS (Demo user has completed some lessons)
  // ===========================================
  console.log('📈 Creating progress data...');

  // User has completed Module 1 (3 lessons) and part of Module 2
  await prisma.lessonProgress.createMany({
    data: [
      // Module 1 - All completed
      {
        userId: user.id,
        lessonId: lesson1.id,
        completed: true,
        completedAt: new Date('2026-01-16T12:00:00Z'),
      },
      {
        userId: user.id,
        lessonId: lesson2.id,
        completed: true,
        completedAt: new Date('2026-01-17T14:30:00Z'),
      },
      {
        userId: user.id,
        lessonId: lesson3.id,
        completed: true,
        completedAt: new Date('2026-01-18T11:00:00Z'),
      },
      // Module 2 - First 2 completed
      {
        userId: user.id,
        lessonId: lesson4.id,
        completed: true,
        completedAt: new Date('2026-01-20T16:00:00Z'),
      },
      {
        userId: user.id,
        lessonId: lesson5.id,
        completed: true,
        completedAt: new Date('2026-01-22T10:30:00Z'),
      },
      // Lesson 6 - In progress (not completed)
      {
        userId: user.id,
        lessonId: lesson6.id,
        completed: false,
      },
    ],
  });

  // Video progress for the lesson in progress
  await prisma.videoProgress.create({
    data: {
      userId: user.id,
      lessonId: lesson6.id,
      positionSeconds: 720, // 12 minutes into a 25 minute video
    },
  });

  console.log(`✅ Created progress: 5 completed, 1 in progress\n`);

  // ===========================================
  // SUMMARY
  // ===========================================
  console.log('═══════════════════════════════════════════════════════════');
  console.log('🎉 SEED COMPLETED SUCCESSFULLY!');
  console.log('═══════════════════════════════════════════════════════════\n');

  // Count records
  const counts = {
    users: await prisma.user.count(),
    courses: await prisma.course.count(),
    modules: await prisma.module.count(),
    lessons: await prisma.lesson.count(),
    resources: await prisma.resource.count(),
    sessions: await prisma.liveSession.count(),
    enrollments: await prisma.enrollment.count(),
    lessonProgress: await prisma.lessonProgress.count(),
  };

  console.log('📊 Database Summary:');
  console.log(`   Users:           ${counts.users}`);
  console.log(`   Courses:         ${counts.courses}`);
  console.log(`   Modules:         ${counts.modules}`);
  console.log(`   Lessons:         ${counts.lessons}`);
  console.log(`   Resources:       ${counts.resources}`);
  console.log(`   Live Sessions:   ${counts.sessions}`);
  console.log(`   Enrollments:     ${counts.enrollments}`);
  console.log(`   Lesson Progress: ${counts.lessonProgress}\n`);

  console.log('🔑 Demo Account:');
  console.log('   Email:    student@siolabs.com');
  console.log('   Password: Password123!\n');

  console.log('📅 Live Sessions (Feb 5-8, 2026):');
  console.log('   - Feb 5: Q&A Neural Networks (2 PM UTC)');
  console.log('   - Feb 8: Office Hours (10 AM UTC)\n');

  console.log('💡 Next steps:');
  console.log('   npx prisma studio  → View data in browser');
  console.log('   npm run dev:api    → Start the API server\n');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
