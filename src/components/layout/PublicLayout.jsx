import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';

export function PublicLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header showNav={false} />
      <main id="main-content" role="main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
