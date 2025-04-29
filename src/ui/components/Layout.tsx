import { Outlet } from 'react-router-dom';
import Header from './Header'
import Footer from './Footer'

function Layout() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen">
      <Header />
      <main>
        <div className="@container max-w-screen-lg p-4 mx-auto">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Layout
