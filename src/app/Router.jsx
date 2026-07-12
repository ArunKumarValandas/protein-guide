import { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate, RouterProvider, useLocation } from 'react-router-dom';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { AppLayout } from '@/components/layout/AppLayout';
import { PageLoader } from '@/components/common/LoadingSpinner';
import { ROUTES } from '@/config/routes';
import { useAppStore } from '@/store/useAppStore';

const LandingPage = lazy(() =>
  import('@/pages/landing/LandingPage').then((m) => ({ default: m.LandingPage })),
);
const LoginPage = lazy(() =>
  import('@/pages/auth/LoginPage').then((m) => ({ default: m.LoginPage })),
);
const RegisterPage = lazy(() =>
  import('@/pages/auth/RegisterPage').then((m) => ({ default: m.RegisterPage })),
);
const DashboardPage = lazy(() =>
  import('@/pages/dashboard/DashboardPage').then((m) => ({ default: m.DashboardPage })),
);
const SortingPage = lazy(() =>
  import('@/pages/algorithms/sorting/SortingPage').then((m) => ({ default: m.SortingPage })),
);
const SortingVisualizer = lazy(() =>
  import('@/pages/algorithms/sorting/SortingVisualizer').then((m) => ({ default: m.SortingVisualizer })),
);
const SearchingPage = lazy(() =>
  import('@/pages/algorithms/searching/SearchingPage').then((m) => ({ default: m.SearchingPage })),
);
const SearchingVisualizer = lazy(() =>
  import('@/pages/algorithms/searching/SearchingVisualizer').then((m) => ({ default: m.SearchingVisualizer })),
);
const LinkedListPage = lazy(() =>
  import('@/pages/algorithms/linked-list/LinkedListPage').then((m) => ({ default: m.LinkedListPage })),
);
const LinkedListVisualizer = lazy(() =>
  import('@/pages/algorithms/linked-list/LinkedListVisualizer').then((m) => ({ default: m.LinkedListVisualizer })),
);
const StackPage = lazy(() =>
  import('@/pages/algorithms/stack/StackPage').then((m) => ({ default: m.StackPage })),
);
const StackVisualizer = lazy(() =>
  import('@/pages/algorithms/stack/StackVisualizer').then((m) => ({ default: m.StackVisualizer })),
);
const QueuePage = lazy(() =>
  import('@/pages/algorithms/queue/QueuePage').then((m) => ({ default: m.QueuePage })),
);
const QueueVisualizer = lazy(() =>
  import('@/pages/algorithms/queue/QueueVisualizer').then((m) => ({ default: m.QueueVisualizer })),
);
const TreesPage = lazy(() =>
  import('@/pages/algorithms/trees/TreesPage').then((m) => ({ default: m.TreesPage })),
);
const TreeVisualizerPage = lazy(() =>
  import('@/pages/algorithms/trees/TreeVisualizerPage').then((m) => ({ default: m.TreeVisualizerPage })),
);
const GraphPage = lazy(() =>
  import('@/pages/algorithms/graph/GraphPage').then((m) => ({ default: m.GraphPage })),
);
const GraphVisualizerPage = lazy(() =>
  import('@/pages/algorithms/graph/GraphVisualizerPage').then((m) => ({ default: m.GraphVisualizerPage })),
);
const PathfindingPage = lazy(() =>
  import('@/pages/algorithms/pathfinding/PathfindingPage').then((m) => ({ default: m.PathfindingPage })),
);
const PathfindingVisualizerPage = lazy(() =>
  import('@/pages/algorithms/pathfinding/PathfindingVisualizerPage').then((m) => ({ default: m.PathfindingVisualizerPage })),
);
const DpPage = lazy(() =>
  import('@/pages/algorithms/dynamic-programming/DpPage').then((m) => ({ default: m.DpPage })),
);
const DpVisualizerPage = lazy(() =>
  import('@/pages/algorithms/dynamic-programming/DpVisualizerPage').then((m) => ({ default: m.DpVisualizerPage })),
);
const GreedyPage = lazy(() =>
  import('@/pages/algorithms/greedy/GreedyPage').then((m) => ({ default: m.GreedyPage })),
);
const GreedyVisualizerPage = lazy(() =>
  import('@/pages/algorithms/greedy/GreedyVisualizerPage').then((m) => ({ default: m.GreedyVisualizerPage })),
);
const BacktrackingPage = lazy(() =>
  import('@/pages/algorithms/backtracking/BacktrackingPage').then((m) => ({ default: m.BacktrackingPage })),
);
const BacktrackingVisualizerPage = lazy(() =>
  import('@/pages/algorithms/backtracking/BacktrackingVisualizerPage').then((m) => ({ default: m.BacktrackingVisualizerPage })),
);
const ComparisonPage = lazy(() =>
  import('@/pages/comparison/ComparisonPage').then((m) => ({ default: m.ComparisonPage })),
);
const BenchmarkPage = lazy(() =>
  import('@/pages/benchmark/BenchmarkPage').then((m) => ({ default: m.BenchmarkPage })),
);
const QuizPage = lazy(() =>
  import('@/pages/quiz/QuizPage').then((m) => ({ default: m.QuizPage })),
);
const PracticePage = lazy(() =>
  import('@/pages/practice/PracticePage').then((m) => ({ default: m.PracticePage })),
);
const AchievementsPage = lazy(() =>
  import('@/pages/achievements/AchievementsPage').then((m) => ({ default: m.AchievementsPage })),
);
const SettingsPage = lazy(() =>
  import('@/pages/SettingsPage').then((m) => ({ default: m.SettingsPage })),
);
const NotFoundPage = lazy(() =>
  import('@/pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })),
);

function LazyPage({ children }) {
  return <Suspense fallback={<PageLoader />}>{children}</Suspense>;
}

function RequireAuth({ children }) {
  const currentUser = useAppStore((s) => s.currentUser);
  const location = useLocation();

  if (!currentUser) {
    return <Navigate to={ROUTES.LOGIN} replace state={{ from: location }} />;
  }

  return children;
}

const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      {
        path: ROUTES.HOME,
        element: (
          <LazyPage>
            <LandingPage />
          </LazyPage>
        ),
      },
      {
        path: ROUTES.LOGIN,
        element: (
          <LazyPage>
            <LoginPage />
          </LazyPage>
        ),
      },
      {
        path: ROUTES.REGISTER,
        element: (
          <LazyPage>
            <RegisterPage />
          </LazyPage>
        ),
      },
    ],
  },
  {
    element: (
      <RequireAuth>
        <AppLayout />
      </RequireAuth>
    ),
    children: [
      {
        path: ROUTES.DASHBOARD,
        element: (
          <LazyPage>
            <DashboardPage />
          </LazyPage>
        ),
      },
      {
        path: ROUTES.SORTING,
        element: (
          <LazyPage>
            <SortingPage />
          </LazyPage>
        ),
      },
      {
        path: ROUTES.SORTING_ALGO,
        element: (
          <LazyPage>
            <SortingVisualizer />
          </LazyPage>
        ),
      },
      {
        path: ROUTES.SEARCHING,
        element: (
          <LazyPage>
            <SearchingPage />
          </LazyPage>
        ),
      },
      {
        path: ROUTES.SEARCHING_ALGO,
        element: (
          <LazyPage>
            <SearchingVisualizer />
          </LazyPage>
        ),
      },
      {
        path: ROUTES.LINKED_LIST,
        element: (
          <LazyPage>
            <LinkedListPage />
          </LazyPage>
        ),
      },
      {
        path: ROUTES.LINKED_LIST_ALGO,
        element: (
          <LazyPage>
            <LinkedListVisualizer />
          </LazyPage>
        ),
      },
      {
        path: ROUTES.STACK,
        element: (
          <LazyPage>
            <StackPage />
          </LazyPage>
        ),
      },
      {
        path: ROUTES.STACK_ALGO,
        element: (
          <LazyPage>
            <StackVisualizer />
          </LazyPage>
        ),
      },
      {
        path: ROUTES.QUEUE,
        element: (
          <LazyPage>
            <QueuePage />
          </LazyPage>
        ),
      },
      {
        path: ROUTES.QUEUE_ALGO,
        element: (
          <LazyPage>
            <QueueVisualizer />
          </LazyPage>
        ),
      },
      {
        path: ROUTES.TREES,
        element: (
          <LazyPage>
            <TreesPage />
          </LazyPage>
        ),
      },
      {
        path: ROUTES.TREE_ALGO,
        element: (
          <LazyPage>
            <TreeVisualizerPage />
          </LazyPage>
        ),
      },
      {
        path: ROUTES.GRAPH,
        element: (
          <LazyPage>
            <GraphPage />
          </LazyPage>
        ),
      },
      {
        path: ROUTES.GRAPH_ALGO,
        element: (
          <LazyPage>
            <GraphVisualizerPage />
          </LazyPage>
        ),
      },
      {
        path: ROUTES.PATHFINDING,
        element: (
          <LazyPage>
            <PathfindingPage />
          </LazyPage>
        ),
      },
      {
        path: ROUTES.PATHFINDING_ALGO,
        element: (
          <LazyPage>
            <PathfindingVisualizerPage />
          </LazyPage>
        ),
      },
      {
        path: ROUTES.DP,
        element: (
          <LazyPage>
            <DpPage />
          </LazyPage>
        ),
      },
      {
        path: ROUTES.DP_ALGO,
        element: (
          <LazyPage>
            <DpVisualizerPage />
          </LazyPage>
        ),
      },
      {
        path: ROUTES.GREEDY,
        element: (
          <LazyPage>
            <GreedyPage />
          </LazyPage>
        ),
      },
      {
        path: ROUTES.GREEDY_ALGO,
        element: (
          <LazyPage>
            <GreedyVisualizerPage />
          </LazyPage>
        ),
      },
      {
        path: ROUTES.BACKTRACKING,
        element: (
          <LazyPage>
            <BacktrackingPage />
          </LazyPage>
        ),
      },
      {
        path: ROUTES.BACKTRACKING_ALGO,
        element: (
          <LazyPage>
            <BacktrackingVisualizerPage />
          </LazyPage>
        ),
      },
      {
        path: ROUTES.COMPARISON,
        element: (
          <LazyPage>
            <ComparisonPage />
          </LazyPage>
        ),
      },
      {
        path: ROUTES.BENCHMARK,
        element: (
          <LazyPage>
            <BenchmarkPage />
          </LazyPage>
        ),
      },
      {
        path: ROUTES.QUIZ,
        element: (
          <LazyPage>
            <QuizPage />
          </LazyPage>
        ),
      },
      {
        path: ROUTES.PRACTICE,
        element: (
          <LazyPage>
            <PracticePage />
          </LazyPage>
        ),
      },
      {
        path: ROUTES.ACHIEVEMENTS,
        element: (
          <LazyPage>
            <AchievementsPage />
          </LazyPage>
        ),
      },
      {
        path: ROUTES.SETTINGS,
        element: (
          <LazyPage>
            <SettingsPage />
          </LazyPage>
        ),
      },
    ],
  },
  {
    path: ROUTES.NOT_FOUND,
    element: (
      <LazyPage>
        <NotFoundPage />
      </LazyPage>
    ),
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
