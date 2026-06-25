import React, { lazy } from 'react'
import {Routes,Route} from 'react-router-dom';
import Home from './components/pages/Home';
import Layout from './components/pages/Layout';

// Lazy load page components
const Dashboard = lazy(() => import('./components/pages/Dashboard'));
const WriteArticle = lazy(() => import('./components/pages/WriteArticle'));
const BlogTitles = lazy(() => import('./components/pages/BlogTitles'));
const GenerateImages = lazy(() => import('./components/pages/GenerateImages'));
const RemoveBackground = lazy(() => import('./components/pages/RemoveBackground'));
const RemoveObject = lazy(() => import('./components/pages/RemoveObject'));
const ReviewResume = lazy(() => import('./components/pages/ReviewResume'));
const Community = lazy(() => import('./components/pages/Community'));

import {Toaster} from 'react-hot-toast';
import { Protect } from '@clerk/clerk-react';
import LockedFeature from './components/LockedFeature';

const App = () => {
  return (
    <div>
      <Toaster/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/ai' element={<Layout />}>
          <Route index element={<Dashboard />}/>
          <Route path='write-article' element={<WriteArticle/>} />
          <Route path='blog-titles' element={<BlogTitles/>} />
          <Route path='generate-images' element={<GenerateImages />} />
          <Route path='remove-background' element={<RemoveBackground />} />
          <Route path='remove-object' element={<RemoveObject />} />
          <Route path='review-resume' element={<ReviewResume />} />
          <Route path='community' element={<Community/>} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
