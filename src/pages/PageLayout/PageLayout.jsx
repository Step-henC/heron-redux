import React, 
{lazy, Suspense} 
from 'react';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import HeaderLayout from '../../components/HeaderLayout/HeaderLayout';
import GlycoFormPage from '../Glyco/GlycoFormPage/GlycoFormPage';
import QuantChartsPage from '../Quant/QuantChartsPage/QuantChartsPage';
import HomePage from '../HomePage/HomePage';
import QuantFormPage from '../Quant/QuantFormPage/QuantFormPage';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import GlycoChartsPage from '../Glyco/GlycoChartsPage/GlycoChartsPage';
import QuantTutorialPage from '../Quant/QuantTutorialPage/QuantTutorialPage';
import GlycoTutorial from '../Glyco/GlycoTutorial/GlycoTutorial';
import ContactError from '../ContactPage/ContactError';
import ContactSuccess from '../ContactPage/ContactSuccess';

const ContactPage = lazy(() => import('../ContactPage/ContactPage'))
export default function PageLayout() {
  return (
    <Router>
      <HeaderLayout>
        <ErrorBoundary
          fallback={
            <div className={'response-main'}>
              <h4>Something went wrong.
                </h4> Please return <a href="/">home.</a> If the
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
            <Route exact path='/glyco/charts' element={<GlycoChartsPage />} />
            <Route exact path="/quant-tutorial" element={<QuantTutorialPage />} />
            <Route exact path="/glyco-tutorial" element={<GlycoTutorial />} />
            <Route exact path="/contact/error" element={<ContactError />} />
            <Route exact path="/contact/success" element={<ContactSuccess />} />


            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </ErrorBoundary>
      </HeaderLayout>
    </Router>
  );
}
