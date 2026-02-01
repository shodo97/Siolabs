import Link from 'next/link';
import { ArrowRight, BookOpen, Users, Trophy, Play, CheckCircle, Star } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Navigation */}
      <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500">
              <span className="text-lg font-bold text-white">S</span>
            </div>
            <span className="text-xl font-bold text-white">SioLabs</span>
          </Link>
          <div className="hidden items-center gap-8 md:flex">
            <Link href="#features" className="text-sm text-slate-300 transition hover:text-white">
              Features
            </Link>
            <Link href="#courses" className="text-sm text-slate-300 transition hover:text-white">
              Courses
            </Link>
            <Link href="#testimonials" className="text-sm text-slate-300 transition hover:text-white">
              Testimonials
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="hidden rounded-lg px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10 sm:block"
            >
              Sign In
            </Link>
            <Link
              href="/dashboard"
              className="rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-cyan-500/25 transition hover:shadow-cyan-500/40"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-32">
        {/* Background effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 left-1/2 h-[800px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 blur-3xl" />
          <div className="absolute top-1/4 right-0 h-[600px] w-[600px] rounded-full bg-purple-500/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-sm text-cyan-300">
              <Star className="h-4 w-4 fill-cyan-400 text-cyan-400" />
              Trusted by 10,000+ learners across India
            </div>

            {/* Headline */}
            <h1 className="mx-auto max-w-4xl text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
              Master{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                AI & Machine Learning
              </span>{' '}
              with Expert Mentorship
            </h1>

            {/* Subheadline */}
            <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400 sm:text-xl">
              Structured courses, hands-on projects, and live mentorship sessions designed for Indian students and early-career professionals.
            </p>

            {/* CTAs */}
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/dashboard"
                className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 px-8 py-4 text-lg font-semibold text-white shadow-2xl shadow-cyan-500/25 transition hover:shadow-cyan-500/40"
              >
                Start Learning Free
                <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
              </Link>
              <button className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-8 py-4 text-lg font-semibold text-white backdrop-blur transition hover:bg-white/10">
                <Play className="h-5 w-5" />
                Watch Demo
              </button>
            </div>

            {/* Stats */}
            <div className="mt-16 grid grid-cols-2 gap-8 sm:grid-cols-4">
              {[
                { value: '10K+', label: 'Active Learners' },
                { value: '50+', label: 'Expert Mentors' },
                { value: '200+', label: 'Hours of Content' },
                { value: '95%', label: 'Completion Rate' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl font-bold text-white sm:text-4xl">{stat.value}</div>
                  <div className="mt-1 text-sm text-slate-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Everything you need to succeed
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-400">
              A complete learning experience designed to take you from beginner to job-ready
            </p>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: BookOpen,
                title: 'Structured Curriculum',
                description: 'Follow a clear path from basics to advanced topics with courses designed by industry experts.',
                gradient: 'from-cyan-500 to-blue-500',
              },
              {
                icon: Users,
                title: 'Live Mentorship',
                description: 'Weekly live sessions with mentors to clarify doubts, review projects, and get career guidance.',
                gradient: 'from-purple-500 to-pink-500',
              },
              {
                icon: Trophy,
                title: 'Hands-on Projects',
                description: 'Build real-world projects that showcase your skills and add to your portfolio.',
                gradient: 'from-orange-500 to-red-500',
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="group rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur transition hover:border-white/20 hover:bg-white/10"
              >
                <div className={`inline-flex rounded-xl bg-gradient-to-br ${feature.gradient} p-3`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-white">{feature.title}</h3>
                <p className="mt-3 text-slate-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Preview */}
      <section id="courses" className="relative py-20 sm:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Popular Learning Paths
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-400">
              Choose your path and start building expertise in AI/ML
            </p>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: 'AI Fundamentals',
                description: 'Master the foundations of Artificial Intelligence',
                modules: 12,
                hours: '8.5',
                level: 'Beginner',
                color: 'cyan',
              },
              {
                title: 'Machine Learning',
                description: 'Learn ML algorithms and implementation',
                modules: 15,
                hours: '12',
                level: 'Intermediate',
                color: 'purple',
              },
              {
                title: 'Deep Learning',
                description: 'Neural networks and advanced architectures',
                modules: 18,
                hours: '16',
                level: 'Advanced',
                color: 'orange',
              },
            ].map((course) => (
              <div
                key={course.title}
                className="group overflow-hidden rounded-2xl border border-white/10 bg-slate-900/50 transition hover:border-white/20"
              >
                <div className={`h-2 bg-gradient-to-r from-${course.color}-500 to-${course.color}-400`} />
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <span className={`rounded-full bg-${course.color}-500/10 px-3 py-1 text-xs font-medium text-${course.color}-400`}>
                      {course.level}
                    </span>
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-white">{course.title}</h3>
                  <p className="mt-2 text-sm text-slate-400">{course.description}</p>
                  <div className="mt-6 flex items-center gap-4 text-sm text-slate-500">
                    <span>{course.modules} modules</span>
                    <span>•</span>
                    <span>{course.hours}h content</span>
                  </div>
                  <Link
                    href="/dashboard"
                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg border border-white/20 py-2.5 text-sm font-medium text-white transition hover:bg-white/10"
                  >
                    View Course
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="relative py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Loved by learners
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-400">
              See what our community has to say about their learning journey
            </p>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                quote: "SioLabs helped me transition from a traditional software role to ML engineering. The mentorship was invaluable!",
                name: 'Priya Sharma',
                role: 'ML Engineer at Google',
                avatar: 'PS',
              },
              {
                quote: "The structured approach and live sessions made complex concepts easy to understand. Highly recommended!",
                name: 'Rahul Verma',
                role: 'Data Scientist at Flipkart',
                avatar: 'RV',
              },
              {
                quote: "Best investment in my career. The projects I built here helped me land my dream job.",
                name: 'Ananya Patel',
                role: 'AI Researcher at Microsoft',
                avatar: 'AP',
              },
            ].map((testimonial) => (
              <div
                key={testimonial.name}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur"
              >
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="mt-4 text-slate-300">&ldquo;{testimonial.quote}&rdquo;</p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 text-sm font-semibold text-white">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-medium text-white">{testimonial.name}</div>
                    <div className="text-sm text-slate-400">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 sm:py-32">
        <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/10 to-transparent" />
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white sm:text-5xl">
            Start your AI journey today
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400">
            Join thousands of learners who are building the future with AI and Machine Learning
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/dashboard"
              className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 px-8 py-4 text-lg font-semibold text-white shadow-2xl shadow-cyan-500/25 transition hover:shadow-cyan-500/40"
            >
              Get Started Free
              <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
            </Link>
          </div>
          <p className="mt-6 text-sm text-slate-500">
            <CheckCircle className="mr-1 inline h-4 w-4 text-emerald-400" />
            No credit card required • Start learning immediately
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500">
                <span className="text-sm font-bold text-white">S</span>
              </div>
              <span className="font-bold text-white">SioLabs</span>
            </div>
            <div className="flex gap-6 text-sm text-slate-400">
              <Link href="#" className="transition hover:text-white">About</Link>
              <Link href="#" className="transition hover:text-white">Courses</Link>
              <Link href="#" className="transition hover:text-white">Blog</Link>
              <Link href="#" className="transition hover:text-white">Contact</Link>
            </div>
            <p className="text-sm text-slate-500">
              © 2026 SioLabs. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
