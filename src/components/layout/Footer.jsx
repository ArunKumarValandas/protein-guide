import { Link } from 'react-router-dom';
import { BarChart3, Github, Twitter, Linkedin } from 'lucide-react';
import { ROUTES } from '@/config/routes';

const FOOTER_LINKS = {
  Product: [
    { label: 'Dashboard', path: ROUTES.DASHBOARD },
    { label: 'Sorting', path: ROUTES.SORTING },
    { label: 'Graph Algorithms', path: ROUTES.GRAPH },
    { label: 'Benchmark', path: ROUTES.BENCHMARK },
  ],
  Learn: [
    { label: 'Quiz', path: ROUTES.QUIZ },
    { label: 'Practice', path: ROUTES.PRACTICE },
    { label: 'Achievements', path: ROUTES.ACHIEVEMENTS },
    { label: 'Compare', path: ROUTES.COMPARISON },
  ],
  Algorithms: [
    { label: 'Dynamic Programming', path: ROUTES.DP },
    { label: 'Greedy', path: ROUTES.GREEDY },
    { label: 'Backtracking', path: ROUTES.BACKTRACKING },
    { label: 'Pathfinding', path: ROUTES.PATHFINDING },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface-elevated" role="contentinfo">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link to={ROUTES.HOME} className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent">
                <BarChart3 className="h-5 w-5 text-white" aria-hidden="true" />
              </div>
              <span className="font-display text-xl font-bold text-content">
                Algo<span className="text-accent">Vision</span> Pro
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm text-content-muted">
              Interactive DSA & Algorithm Visualization Platform. Learn, visualize, and master data
              structures and algorithms through beautiful animations.
            </p>
            <div className="mt-6 flex gap-4">
              <a href="https://github.com" className="text-content-muted hover:text-accent" aria-label="GitHub">
                <Github className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" className="text-content-muted hover:text-accent" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com" className="text-content-muted hover:text-accent" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold text-content">{title}</h3>
              <ul className="mt-4 space-y-3">
                {links.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-sm text-content-muted transition-colors hover:text-accent"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-sm text-content-muted">
            &copy; {new Date().getFullYear()} AlgoVision Pro. All rights reserved.
          </p>
          <p className="text-sm text-content-muted">Built with React, Vite, and passion for DSA.</p>
        </div>
      </div>
    </footer>
  );
}
