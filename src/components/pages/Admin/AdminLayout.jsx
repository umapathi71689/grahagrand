import { Outlet, Link } from 'react-router-dom';
import { useState } from 'react';
import '../../styles/admin.css';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="admin-layout min-h-screen bg-gray-100 text-gray-900 flex">
      {/* Sidebar */}
      <div className={`admin-sidebar bg-darker text-light w-64 p-4 transition-all duration-300 ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="admin-sidebar-header flex items-center justify-between mb-8">
          <h1 className="admin-sidebar-title text-xl font-bold">Admin Dashboard</h1>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="text-light hover:text-accent"
          >
            &times;
          </button>
        </div>
        
        <nav className="admin-sidebar-nav">
          <ul className="admin-nav-list space-y-2">
            <li>
              <Link 
                to="/admin/properties" 
                className="admin-nav-link block px-4 py-2 rounded hover:bg-dark hover:text-accent"
              >
                Properties
              </Link>
            </li>
            <li>
              <Link 
                to="/admin/upcoming-properties" 
                className="admin-nav-link block px-4 py-2 rounded hover:bg-dark hover:text-accent"
              >
                Upcoming Properties
              </Link>
            </li>
            <li>
              <Link 
                to="/admin/future-properties" 
                className="admin-nav-link block px-4 py-2 rounded hover:bg-dark hover:text-accent"
              >
                Future Developments
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="admin-main flex-1 overflow-auto">
        <header className="admin-header bg-light shadow p-4">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-darker hover:text-accent"
          >
            ☰
          </button>
        </header>
        
        <main className="admin-content p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;