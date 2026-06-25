import React from 'react'
import { Lock, Sparkles, Gem, CheckCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const LockedFeature = ({ featureName }) => {
  const navigate = useNavigate()

  return (
    <div className='flex items-center justify-center min-h-[80vh] p-6'>
      <div className='w-full max-w-xl bg-white/80 backdrop-blur-md rounded-2xl border border-gray-200/50 p-8 shadow-xl text-center relative overflow-hidden'>
        {/* Decorative Top Gradient Border */}
        <div className='absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#FF61C5] via-[#9E53EE] to-[#3588F2]'></div>

        {/* Lock / Premium Icon Header */}
        <div className='mx-auto w-16 h-16 rounded-full bg-gradient-to-tr from-[#FF61C5] to-[#9E53EE] flex items-center justify-center text-white shadow-lg mb-6 animate-pulse'>
          <Lock className='w-7 h-7' />
        </div>

        {/* Title */}
        <h2 className='text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight'>
          Premium Feature
        </h2>
        {featureName && (
          <p className='mt-2 text-sm font-semibold text-purple-600 bg-purple-50 inline-block px-3 py-1 rounded-full border border-purple-100'>
            {featureName}
          </p>
        )}

        {/* Description */}
        <p className='mt-4 text-slate-600 max-w-md mx-auto leading-relaxed text-sm sm:text-base'>
          This is a premium-only feature. Upgrade your plan to unlock unlimited access to all advanced AI creation and editing tools.
        </p>

        {/* Features Comparison / What's Included */}
        <div className='mt-8 bg-slate-50/50 rounded-xl p-5 border border-slate-100 text-left'>
          <p className='text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5'>
            <Sparkles className='w-3.5 h-3.5 text-purple-500' /> Included with Premium
          </p>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
            <div className='flex items-center gap-2 text-sm text-slate-700'>
              <CheckCircle className='w-4 h-4 text-green-500 flex-shrink-0' />
              <span>AI Image Generator</span>
            </div>
            <div className='flex items-center gap-2 text-sm text-slate-700'>
              <CheckCircle className='w-4 h-4 text-green-500 flex-shrink-0' />
              <span>Background Removal</span>
            </div>
            <div className='flex items-center gap-2 text-sm text-slate-700'>
              <CheckCircle className='w-4 h-4 text-green-500 flex-shrink-0' />
              <span>Object Eraser</span>
            </div>
            <div className='flex items-center gap-2 text-sm text-slate-700'>
              <CheckCircle className='w-4 h-4 text-green-500 flex-shrink-0' />
              <span>AI Resume Reviewer</span>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className='mt-8 flex flex-col sm:flex-row gap-3 justify-center'>
          <button
            onClick={() => navigate('/')}
            className='px-6 py-3 bg-gradient-to-r from-[#FF61C5] to-[#9E53EE] hover:opacity-95 text-white font-medium text-sm rounded-xl cursor-pointer shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2'
          >
            <Gem className='w-4 h-4' />
            View Pricing Plans
          </button>
          <button
            onClick={() => navigate('/ai')}
            className='px-6 py-3 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-medium text-sm rounded-xl cursor-pointer transition-all'
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  )
}

export default LockedFeature
