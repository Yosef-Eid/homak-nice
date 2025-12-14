"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FaBed,
  FaBoxes,
  FaHome,
  FaDesktop,
  FaPalette,
  FaStar,
  FaTags,
  FaTh
} from "react-icons/fa";

// البيانات كما طلبت - فقط التصنيفات الرئيسية بدون فرعية
const categoryMap = [
  {
    displayName: "ديكور",
    dbName: "decor",
    icon: FaPalette,
    color: "from-amber-500 to-orange-500"
  },
  {
    displayName: "مكاتب",
    dbName: "desks",
    icon: FaDesktop,
    color: "from-blue-500 to-cyan-500"
  },
  {
    displayName: "غرف نوم",
    dbName: "bedrooms",
    icon: FaHome,
    color: "from-purple-500 to-pink-500"
  },
  {
    displayName: "تخزين",
    dbName: "storage",
    icon: FaBoxes,
    color: "from-indigo-500 to-violet-500"
  },
  {
    displayName: "سراير",
    dbName: "beds",
    icon: FaBed,
    color: "from-green-500 to-emerald-500"
  }
];

export default function CategoriesBar({ selectedCategory }: { selectedCategory?: string }) {
  const router = useRouter();

  const handleCategoryClick = (dbCategoryName: string) => {
    router.push(`/?category=${encodeURIComponent(dbCategoryName)}`);
  };

  return (
    <div className="w-full border-b border-gray-100 py-2">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* عنوان مضغوط */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <FaTh className="text-indigo-600 text-sm" />
            <h3 className="text-sm font-semibold text-gray-700">التصنيفات</h3>
          </div>
          
          <Link
            href="/"
            className="text-xs text-gray-500 hover:text-indigo-600 transition-colors flex items-center gap-1"
          >
            <FaTags className="text-xs" />
            عرض الكل
          </Link>
        </div>

        {/* شبكة التصنيفات المضغوطة */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
          {categoryMap.map((category) => {
            const Icon = category.icon;
            const isSelected = selectedCategory === category.dbName;
            
            return (
              <button
                key={category.dbName}
                onClick={() => handleCategoryClick(category.dbName)}
                className={`
                  flex flex-col items-center justify-center 
                  rounded-xl transition-all duration-200
                  px-4 py-3 min-w-[90px] sm:min-w-[100px]
                  ${isSelected 
                    ? `bg-gradient-to-br ${category.color} text-white shadow-md` 
                    : "bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200"
                  }
                `}
              >
                {/* أيقونة التصنيف */}
                <div className={`
                  mb-2 p-2 rounded-lg
                  ${isSelected 
                    ? "bg-white/20" 
                    : `bg-gradient-to-br ${category.color} bg-opacity-10`
                  }
                `}>
                  <Icon className={`
                    text-lg sm:text-xl
                    ${isSelected ? "text-white" : `text-gradient ${category.color.replace('from-', '').split(' ')[0]}`}
                  `} />
                </div>
                
                {/* اسم التصنيف */}
                <span className={`
                  text-xs sm:text-sm font-medium
                  ${isSelected ? "text-white" : "text-gray-800"}
                `}>
                  {category.displayName}
                </span>
                
                {/* مؤشر التحديد */}
                {isSelected && (
                  <div className="absolute -top-1 -right-1 bg-white border border-gray-300 p-1 rounded-full">
                    <FaStar className="text-amber-500 text-[8px]" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}