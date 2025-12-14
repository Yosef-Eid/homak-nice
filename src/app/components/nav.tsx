'use client'

import { useState } from 'react'
import { FaSearch, FaTimes, FaShoppingBag, FaUser, FaBars } from 'react-icons/fa'

interface NavProps {
  query: string
  setQuery: (query: string) => void
  onClearFilters?: () => void
  hasFilters?: boolean
}

export default function Nav({ query, setQuery, onClearFilters, hasFilters }: NavProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchExpanded, setIsSearchExpanded] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* الشعار */}
          <div className="flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 mr-2"
            >
              <FaBars className="text-gray-600" />
            </button>
            
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg"></div>
              <span className="text-xl font-bold text-gray-900">متجر الأثاث</span>
            </div>
          </div>

          {/* شريط البحث (على الأجهزة الكبيرة) */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="ابحث عن سرير، مكتب، ديكور..."
                className="w-full px-6 py-3 pl-12 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                <FaSearch />
              </div>
              
              {query && (
                <button
                  onClick={() => {
                    setQuery('')
                    onClearFilters?.()
                  }}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <FaTimes />
                </button>
              )}
            </div>
          </div>

          {/* الأيقونات */}
          <div className="flex items-center gap-4">
            {/* زر البحث على الهواتف */}
            <button
              onClick={() => setIsSearchExpanded(!isSearchExpanded)}
              className="md:hidden p-2"
            >
              <FaSearch className="text-gray-600" />
            </button>
            
            {/* حساب المستخدم */}
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <FaUser className="text-gray-600" />
            </button>
            
            {/* سلة التسوق */}
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
              <FaShoppingBag className="text-gray-600" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                3
              </span>
            </button>
          </div>
        </div>

        {/* شريط البحث المنبثق (على الهواتف) */}
        {isSearchExpanded && (
          <div className="md:hidden py-3 border-t border-gray-100">
            <div className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="ابحث في المنتجات..."
                className="w-full px-4 py-3 pl-12 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                autoFocus
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                <FaSearch />
              </div>
              <button
                onClick={() => setIsSearchExpanded(false)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <FaTimes />
              </button>
            </div>
            
            {hasFilters && onClearFilters && (
              <button
                onClick={onClearFilters}
                className="mt-3 text-sm text-blue-600 hover:text-blue-800"
              >
                مسح جميع الفلاتر
              </button>
            )}
          </div>
        )}

        {/* القائمة المنبثقة (على الهواتف) */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-100 py-3">
            <div className="flex flex-col gap-2">
              <a href="#" className="px-4 py-2 hover:bg-gray-50 rounded">الرئيسية</a>
              <a href="#" className="px-4 py-2 hover:bg-gray-50 rounded">المنتجات</a>
              <a href="#" className="px-4 py-2 hover:bg-gray-50 rounded">العروض</a>
              <a href="#" className="px-4 py-2 hover:bg-gray-50 rounded">اتصل بنا</a>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}