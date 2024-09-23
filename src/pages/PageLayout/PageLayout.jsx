import React, 
{lazy, Suspense} 
from 'react';
import HomePage from '../HomePage/HomePage';
import QuantFormPage from '../QuantFormPage/QuantFormPage';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import HeaderLayout from '../../components/HeaderLayout/HeaderLayout';
import GlycoFormPage from '../GlycoFormPage/GlycoFormPage';
import QuantChartsPage from '../QuantChartsPage/QuantChartsPage';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

const ContactPage = lazy(() => import('../ContactPage/ContactPage'))
export default function PageLayout() {
  return (
    <Router>
      <HeaderLayout>
        <ErrorBoundary
          fallback={
            <div>
              Something went wrong. Please return <a href="/">home.</a> If the
              problem continues, please <a href="/contact">contact us here.</a>
            </div>
          }
        >
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route path="/quant" element={<QuantFormPage />} />
            <Route path="/glyco" element={<GlycoFormPage />} />
            <Route path="/contact" element={<Suspense fallback={<LoadingSpinner />} ><ContactPage /></Suspense>} />
            <Route exact path="/quant/charts" element={<QuantChartsPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </ErrorBoundary>
      </HeaderLayout>
    </Router>
  );
}
