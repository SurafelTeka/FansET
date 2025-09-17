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
import './App.css';

const AppLayout = ({ children }) => (
  <div className="app-layout">
    <Sidebar />
    <main className="app-main">{children}</main>
  </div>
);

const App = () => (
  <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route
      path="/home"
      element={(
        <AppLayout>
          <HomePage />
        </AppLayout>
      )}
    />
    <Route
      path="/profile"
      element={(
        <AppLayout>
          <ProfilePage />
        </AppLayout>
      )}
    />
    <Route
      path="/messages"
      element={(
        <AppLayout>
          <MessagesPage />
        </AppLayout>
      )}
    />
    <Route
      path="/collections"
      element={(
        <AppLayout>
          <CollectionsPage />
        </AppLayout>
      )}
    />
    <Route
      path="/add-card"
      element={(
        <AppLayout>
          <AddCardPage />
        </AppLayout>
      )}
    />
    <Route
      path="/notifications"
      element={(
        <AppLayout>
          <NotificationsPage />
        </AppLayout>
      )}
    />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default App;
