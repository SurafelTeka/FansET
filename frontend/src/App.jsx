import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import MessagesPage from './pages/MessagesPage';
import CollectionsPage from './pages/CollectionsPage';
import AddCardPage from './pages/AddCardPage';
import NotificationsPage from './pages/NotificationsPage';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import './App.css';

const AppLayout = ({ children }) => (
  <div className="app-layout">
    <Sidebar />
    <main className="app-main">{children}</main>
  </div>
);

const renderProtectedPage = (PageComponent) => (
  <ProtectedRoute>
    <AppLayout>
      <PageComponent />
    </AppLayout>
  </ProtectedRoute>
);

const App = () => (
  <Routes>
    <Route path="/" element={<LandingPage />} />

    <Route path="/home" element={renderProtectedPage(HomePage)} />
    <Route path="/profile" element={renderProtectedPage(ProfilePage)} />
    <Route path="/messages" element={renderProtectedPage(MessagesPage)} />
    <Route path="/collections" element={renderProtectedPage(CollectionsPage)} />
    <Route path="/add-card" element={renderProtectedPage(AddCardPage)} />
    <Route path="/notifications" element={renderProtectedPage(NotificationsPage)} />

    <Route
      path="/home"
      element={(
        <ProtectedRoute>
          <AppLayout>
            <HomePage />
          </AppLayout>
        </ProtectedRoute>
      )}
    />
    <Route
      path="/profile"
      element={(
        <ProtectedRoute>
          <AppLayout>
            <ProfilePage />
          </AppLayout>
        </ProtectedRoute>
      )}
    />
    <Route
      path="/messages"
      element={(
        <ProtectedRoute>
          <AppLayout>
            <MessagesPage />
          </AppLayout>
        </ProtectedRoute>
      )}
    />
    <Route
      path="/collections"
      element={(
        <ProtectedRoute>
          <AppLayout>
            <CollectionsPage />
          </AppLayout>
        </ProtectedRoute>
      )}
    />
    <Route
      path="/add-card"
      element={(
        <ProtectedRoute>
          <AppLayout>
            <AddCardPage />
          </AppLayout>
        </ProtectedRoute>
      )}
    />
    <Route
      path="/notifications"
      element={(
        <ProtectedRoute>
          <AppLayout>
            <NotificationsPage />
          </AppLayout>
        </ProtectedRoute>
      )}
    />

    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default App;
