import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Play,
  ArrowRight,
  Zap,
  Eye,
  BookOpen,
  BarChart3,
  Code2,
  Trophy,
  Users,
  Star,
  ChevronDown,
} from 'lucide-react';
import { AnimatedBackground } from '@/components/landing/AnimatedBackground';
import { Button } from '@/components/common/Button';
import { Card } from '@/components/common/Card';
import { ROUTES } from '@/config/routes';

const FEATURES = [
  { icon: Eye, title: 'Visual Learning', description: 'Watch algorithms come to life with smooth 60fps animations and step-by-step visualization.' },
  { icon: BookOpen, title: 'Comprehensive Content', description: 'Detailed explanations, pseudocode, dry runs, and multi-language code implementations.' },
  { icon: BarChart3, title: 'Performance Analytics', description: 'Real-time statistics for comparisons, swaps, execution time, and space complexity.' },
  { icon: Code2, title: 'Code Viewer', description: 'View implementations in Java, C++, Python, and JavaScript with one-click copy.' },
  { icon: Trophy, title: 'Gamification', description: 'Earn XP, unlock achievements, maintain streaks, and complete daily challenges.' },
  { icon: Zap, title: 'Compare & Benchmark', description: 'Side-by-side algorithm comparison and benchmark mode with interactive charts.' },
];

const WHY_CHOOSE = [
  { title: 'Production Quality', description: 'Built with enterprise-grade architecture, not a toy demo.' },
  { title: '50+ Algorithms', description: 'Sorting, searching, graphs, trees, DP, greedy, and backtracking.' },
  { title: 'Interactive Controls', description: 'Play, pause, step through, adjust speed, and customize input.' },
  { title: '5 Beautiful Themes', description: 'Light, Dark, Hacker, Neon, and Cyberpunk themes with persistence.' },
];

const TECH_STACK = ['React', 'Vite', 'Tailwind CSS', 'Framer Motion', 'D3.js', 'React Flow', 'Recharts', 'Zustand'];

const STATS = [
  { value: '50+', label: 'Algorithms' },
  { value: '5', label: 'Themes' },
  { value: '4', label: 'Languages' },
  { value: '100%', label: 'Free & Open' },
];

const TESTIMONIALS = [
  { name: 'Sarah Chen', role: 'Software Engineer @ Google', text: 'AlgoVision Pro made understanding complex graph algorithms intuitive. The visualizations are incredibly clear.', rating: 5 },
  { name: 'Marcus Johnson', role: 'CS Student @ MIT', text: 'Best DSA learning tool I have used. The step-by-step mode helped me ace my technical interviews.', rating: 5 },
  { name: 'Priya Sharma', role: 'Tech Lead @ Amazon', text: 'I recommend this to my entire team. The benchmark mode is perfect for understanding algorithm trade-offs.', rating: 5 },
];

const FAQ = [
  { q: 'Is AlgoVision Pro free to use?', a: 'Yes, AlgoVision Pro is completely free and open source. All features are available without any subscription.' },
  { q: 'Do I need to install anything?', a: 'No installation required for the web version. Simply open the app in your browser and start learning.' },
  { q: 'Which algorithms are supported?', a: 'We support 50+ algorithms across sorting, searching, linked lists, stacks, queues, trees, graphs, pathfinding, DP, greedy, and backtracking.' },
  { q: 'Can I use this for interview preparation?', a: 'Absolutely! Our practice section includes easy, medium, and hard problems with interview tips and quiz mode.' },
  { q: 'Is my progress saved?', a: 'Yes, your progress, favorites, achievements, and theme preferences are saved locally in your browser.' },
];

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

export function LandingPage() {
  return (
    <div className="relative">
      <AnimatedBackground />

      {/* Hero */}
      <section className="relative px-4 py-20 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-7xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="badge bg-accent-muted text-accent mb-6 inline-flex">
              <Zap className="mr-1 h-3 w-3" /> Interactive DSA Platform
            </span>
            <h1 className="font-display text-4xl font-bold tracking-tight text-content sm:text-6xl lg:text-7xl">
              Visualize Algorithms.
              <br />
              <span className="gradient-text">Master DSA.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-content-muted">
              AlgoVision Pro is a production-grade interactive platform for learning data structures and
              algorithms through beautiful animations, detailed explanations, and hands-on practice.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link to={ROUTES.DASHBOARD}>
                <Button size="lg">
                  <Play className="h-5 w-5" />
                  Start Learning
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link to={ROUTES.SORTING}>
                <Button variant="secondary" size="lg">
                  Explore Algorithms
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            className="mx-auto mt-16 max-w-4xl"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="glass rounded-2xl p-2 shadow-2xl">
              <div className="rounded-xl bg-surface-muted p-8">
                <div className="flex h-48 items-end justify-center gap-2 sm:h-64 sm:gap-3">
                  {[40, 80, 30, 90, 50, 70, 20, 60, 45, 85, 35, 75].map((h, i) => (
                    <motion.div
                      key={i}
                      className="w-6 rounded-t-md bg-gradient-to-t from-accent to-primary-400 sm:w-8"
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ duration: 0.5, delay: i * 0.05 }}
                    />
                  ))}
                </div>
                <p className="mt-4 text-sm text-content-muted">Live sorting visualization preview</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="mt-12"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown className="mx-auto h-6 w-6 text-content-muted" aria-hidden="true" />
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="px-4 py-20 lg:px-8" id="features">
        <div className="mx-auto max-w-7xl">
          <motion.div className="text-center" {...fadeUp}>
            <h2 className="section-title">Powerful Features</h2>
            <p className="section-subtitle mx-auto">Everything you need to master data structures and algorithms</p>
          </motion.div>
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feature, i) => (
              <motion.div key={feature.title} {...fadeUp} transition={{ delay: i * 0.1 }}>
                <Card hover className="h-full">
                  <feature.icon className="h-10 w-10 text-accent" aria-hidden="true" />
                  <h3 className="mt-4 text-lg font-semibold text-content">{feature.title}</h3>
                  <p className="mt-2 text-sm text-content-muted">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="bg-surface-elevated px-4 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div className="text-center" {...fadeUp}>
            <h2 className="section-title">Why Choose AlgoVision Pro?</h2>
          </motion.div>
          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {WHY_CHOOSE.map((item, i) => (
              <motion.div key={item.title} className="flex gap-4" {...fadeUp} transition={{ delay: i * 0.1 }}>
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-accent-muted text-accent font-bold">
                  {i + 1}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-content">{item.title}</h3>
                  <p className="mt-1 text-content-muted">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="px-4 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <motion.div {...fadeUp}>
            <h2 className="section-title">Built With Modern Tech</h2>
            <p className="section-subtitle mx-auto">Production-grade stack for performance and scalability</p>
          </motion.div>
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            {TECH_STACK.map((tech) => (
              <span key={tech} className="badge border border-border bg-surface-elevated px-4 py-2 text-sm text-content">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="bg-surface-elevated px-4 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {STATS.map((stat, i) => (
              <motion.div key={stat.label} className="text-center" {...fadeUp} transition={{ delay: i * 0.1 }}>
                <div className="font-display text-4xl font-bold text-accent lg:text-5xl">{stat.value}</div>
                <div className="mt-2 text-content-muted">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-4 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div className="text-center" {...fadeUp}>
            <h2 className="section-title">Loved by Learners</h2>
            <p className="section-subtitle mx-auto">Join thousands of students and engineers</p>
          </motion.div>
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <motion.div key={t.name} {...fadeUp} transition={{ delay: i * 0.1 }}>
                <Card className="h-full">
                  <div className="flex gap-1">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} className="h-4 w-4 fill-yellow-400 text-yellow-400" aria-hidden="true" />
                    ))}
                  </div>
                  <p className="mt-4 text-content-muted">&ldquo;{t.text}&rdquo;</p>
                  <div className="mt-6 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-muted text-accent font-semibold">
                      {t.name[0]}
                    </div>
                    <div>
                      <div className="font-medium text-content">{t.name}</div>
                      <div className="text-sm text-content-muted">{t.role}</div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-surface-elevated px-4 py-20 lg:px-8" id="faq">
        <div className="mx-auto max-w-3xl">
          <motion.div className="text-center" {...fadeUp}>
            <h2 className="section-title">Frequently Asked Questions</h2>
          </motion.div>
          <div className="mt-12 space-y-4">
            {FAQ.map((item, i) => (
              <motion.details key={i} className="card group" {...fadeUp} transition={{ delay: i * 0.05 }}>
                <summary className="cursor-pointer font-medium text-content marker:content-none">
                  <span className="flex items-center justify-between">
                    {item.q}
                    <ChevronDown className="h-5 w-5 transition-transform group-open:rotate-180" aria-hidden="true" />
                  </span>
                </summary>
                <p className="mt-4 text-content-muted">{item.a}</p>
              </motion.details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-20 lg:px-8">
        <motion.div className="mx-auto max-w-4xl text-center" {...fadeUp}>
          <Users className="mx-auto h-12 w-12 text-accent" aria-hidden="true" />
          <h2 className="section-title mt-6">Ready to Master DSA?</h2>
          <p className="section-subtitle mx-auto">Start your algorithm visualization journey today. No signup required.</p>
          <Link to={ROUTES.DASHBOARD} className="mt-8 inline-block">
            <Button size="lg">
              Get Started Free
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
