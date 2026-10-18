import React, { useEffect } from 'react';
import { 
  BrowserRouter, 
  Routes, 
  Route, 
  Navigate, 
  Link, 
  NavLink, 
  useNavigate, 
  useLocation, 
  useParams, 
  useSearchParams,
  Outlet 
} from 'react-router-dom';

// Re-export standard react-router-dom hooks and components
export {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Link,
  NavLink,
  useNavigate,
  useLocation,
  useParams,
  useSearchParams,
  Outlet
};

// Aliased BrowserRouter as Router for backward compatibility
export const Router = BrowserRouter;

// Helper component that automatically scrolls window to top on route change
export function ScrollToTopOnNavigate() {
  const { pathname } = useLocation();

  useEffect(() => {
    try {
      window.scrollTo(0, 0);
    } catch (e) {}
  }, [pathname]);

  return null;
}
