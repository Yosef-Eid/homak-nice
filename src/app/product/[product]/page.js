'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ShoppingCart, Heart, Share2, Shield, Truck, Package, Maximize2 } from 'lucide-react'
import Loader from '../../components/loader'
import Link from 'next/link'

export default function ProductPage() {
  const { product } = useParams()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedColor, setSelectedColor] = useState(null)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [isImageZoomed, setIsImageZoomed] = useState(false)

  useEffect(() => {
    const fetchProduct = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', product)
        .single()

      if (!error) {
        setData(data)
        if (data.colors?.length > 0) {
          setSelectedColor(data.colors[0])
        }
      }
      setLoading(false)
    }

    fetchProduct()
  }, [product])

  if (loading) {
    return <Loader />
  }

  if (!data) {
    window.location.reload()
  }

  console.log(data)

  return (
    <>
      {/* Background Layer with Blurred Product Image */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `url(${data.image_url})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          filter: 'blur(20px) brightness(0.7)',
          transform: 'scale(1.1)',
        }}
      />
      
      {/* Overlay Gradient */}
      <div className="fixed inset-0 z-1 bg-gradient-to-b from-black/40 via-black/20 to-black/40" />

      <div className="relative z-10 min-h-screen py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8"
          >
            <button 
              onClick={() => window.history.back()}
              className="flex items-center gap-2 text-white/90 hover:text-white transition-colors backdrop-blur-sm bg-white/10 px-4 py-2 rounded-xl"
            >
              <ChevronLeft className="w-5 h-5" />
              <span>رجوع</span>
            </button>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Product Image Section */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="space-y-4"
            >
              {/* Main Image Container */}
              <div className="relative aspect-square w-full rounded-3xl overflow-hidden shadow-2xl ring-2 ring-white/20 backdrop-blur-sm">
                <img
                  src={data.image_url}
                  alt={data.title}
                  className="object-cover w-full h-full"
                />
                
                {/* Image Zoom Button */}
                <button
                  onClick={() => setIsImageZoomed(!isImageZoomed)}
                  className="absolute top-4 left-4 p-3 rounded-full bg-black/40 backdrop-blur-sm text-white hover:bg-black/60 transition-all hover:scale-105"
                >
                  <Maximize2 className="w-5 h-5" />
                </button>
                
                {/* Floating Wishlist Button */}
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className="absolute top-4 right-4 p-3 rounded-full bg-black/40 backdrop-blur-sm text-white hover:bg-black/60 transition-all hover:scale-105"
                >
                  <Heart 
                    className={`w-6 h-6 ${isWishlisted ? 'fill-rose-400 text-rose-400' : 'text-white'}`}
                  />
                </button>
              </div>

              {/* Zoomed Image Modal */}
              <AnimatePresence>
                {isImageZoomed && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90"
                    onClick={() => setIsImageZoomed(false)}
                  >
                    <motion.img
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0.9 }}
                      src={data.image_url}
                      alt={data.title}
                      className="max-w-full max-h-full object-contain rounded-lg"
                      onClick={(e) => e.stopPropagation()}
                    />
                    <button
                      onClick={() => setIsImageZoomed(false)}
                      className="absolute top-4 right-4 p-3 text-white hover:text-gray-300"
                    >
                      ✕
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Color Selection */}
              {data.colors?.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/20"
                >
                  <h3 className="text-lg font-semibold text-white mb-4">
                    الألوان المتاحة
                  </h3>
                  <div className="flex gap-3 flex-wrap">
                    {data.colors.map((color, i) => (
                      <motion.button
                        key={i}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedColor(color)}
                        className={`relative w-12 h-12 rounded-full border-2 transition-all ${selectedColor === color ? 'border-white scale-110 shadow-lg' : 'border-white/30'}`}
                        style={{ backgroundColor: color }}
                      >
                        {selectedColor === color && (
                          <motion.div
                            layoutId="color-ring"
                            className="absolute inset-0 rounded-full ring-2 ring-white ring-offset-2"
                          />
                        )}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* Product Details Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="space-y-8"
            >
              {/* Header */}
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <h1 className="text-3xl lg:text-4xl font-bold text-white leading-tight">
                    {data.title}
                  </h1>
                  <button className="p-2 rounded-full hover:bg-white/20 transition-colors">
                    <Share2 className="w-6 h-6 text-white" />
                  </button>
                </div>

                {/* Price */}
                <div className="flex items-center gap-4">
                  <p className="text-3xl font-bold bg-gradient-to-r from-blue-300 to-teal-300 bg-clip-text text-transparent">
                    {data.price.toLocaleString()} جنيه
                  </p>
                  {data.originalPrice && (
                    <p className="text-xl text-white/60 line-through">
                      {data.originalPrice.toLocaleString()} جنيه
                    </p>
                  )}
                </div>

                {/* Rating and Stock */}
                <div className="flex items-center gap-6 text-white/80">
                  <div className="flex items-center gap-2">
                    <div className="flex text-amber-300">
                      {"★".repeat(5)}
                    </div>
                    <span className="text-sm">(4.8)</span>
                  </div>
                  <span className="text-green-300 font-medium">
                    ✓ متوفر في المخزن
                  </span>
                </div>
              </div>

              {/* Description */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/20"
              >
                <h3 className="text-xl font-semibold text-white mb-4">
                  الوصف
                </h3>
                <p className="text-white/80 leading-relaxed text-lg">
                  {data.description}
                </p>
              </motion.div>

              {/* Specifications */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/20"
              >
                <h3 className="text-xl font-semibold text-white mb-6">
                  المواصفات
                </h3>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                  <div className="bg-gradient-to-br from-blue-500/20 to-transparent p-4 rounded-xl text-center border border-blue-400/30">
                    <div className="text-2xl font-bold text-white">{data.width} سم</div>
                    <div className="text-sm text-white/70 mt-1">العرض</div>
                  </div>
                  <div className="bg-gradient-to-br from-teal-500/20 to-transparent p-4 rounded-xl text-center border border-teal-400/30">
                    <div className="text-2xl font-bold text-white">{data.height} سم</div>
                    <div className="text-sm text-white/70 mt-1">الارتفاع</div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-500/20 to-transparent p-4 rounded-xl text-center border border-purple-400/30">
                    <div className="text-2xl font-bold text-white">{data.Length} سم</div>
                    <div className="text-sm text-white/70 mt-1">الطول</div>
                  </div>
                </div>

                {/* Detailed Specs */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-3 border-b border-white/10">
                    <span className="text-white/70">نوع الخشب</span>
                    <span className="font-semibold text-white">{data.wood}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-white/10">
                    <span className="text-white/70">مواصفات المعدن</span>
                    <span className="font-semibold text-white">{data.metalSpecifications}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-white/10">
                    <span className="text-white/70">الطلاء</span>
                    <span className="font-semibold text-white">{data.paint}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-white/10">
                    <span className="text-white/70">التغليف</span>
                    <span className="font-semibold text-white">{data.packaging}</span>
                  </div>
                </div>
              </motion.div>

              {/* Warranty & Shipping */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-emerald-500/20 to-transparent rounded-2xl p-5 shadow-xl border border-emerald-400/30">
                  <div className="flex items-center gap-3 mb-3">
                    <Shield className="w-6 h-6 text-emerald-300" />
                    <h4 className="font-semibold text-white">الضمان</h4>
                  </div>
                  <p className="text-white/80">{data.warranty}</p>
                </div>
                <div className="bg-gradient-to-br from-amber-500/20 to-transparent rounded-2xl p-5 shadow-xl border border-amber-400/30">
                  <div className="flex items-center gap-3 mb-3">
                    <Truck className="w-6 h-6 text-amber-300" />
                    <h4 className="font-semibold text-white">الشحن</h4>
                  </div>
                  <p className="text-white/80">توصيل سريع خلال 3-5 أيام عمل</p>
                </div>
              </div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="sticky bottom-6 bg-gradient-to-r from-blue-600/90 to-teal-600/90 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-white/30"
              >
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link 
                    href='https://wa.me/+201552299121' 
                    target='_blank' 
                    className="flex-1 bg-white text-blue-600 font-bold py-4 px-8 rounded-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3"
                  >
                    <ShoppingCart className="w-6 h-6" />
                    <span>شراء عبر واتساب</span>
                  </Link>
                  <button className="flex-1 border-2 border-white/30 text-white font-semibold py-4 px-8 rounded-xl hover:bg-white/10 transition-colors hover:border-white/50">
                    طلب مخصص
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  )
}