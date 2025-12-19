// app/components/Footer.tsx
"use client";

import React from "react";
import {
  FaPhone,
  FaFacebook,
  FaMapMarkerAlt,
  FaEnvelope,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaLinkedin,
  FaChevronLeft,
} from "react-icons/fa";
import { SiWhatsapp } from "react-icons/si";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-800 text-white pt-5 z-50">
        <div className="flex justify-center">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center gap-2"
          >
            <FaChevronLeft className="rotate-90" size={14} />
            العودة إلى الأعلى
          </button>
        </div>
      {/* 主內容區域 */}
      <div className="container mx-auto px-4 py-8 md:py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* 公司信息 */}
          <div className="space-y-4">
            <div className="flex items-center justify-start gap-4 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center mr-3">
                <span className="text-xl font-bold">H</span>
              </div>
              <h3 className="text-xl font-bold text-left">
              ألمختار</h3>
            </div>
            <p className="text-blue-100 text-right leading-relaxed text-sm">
              نقدم حلولاً مبتكرة تلبي احتياجات العصر. نلتزم بمعايير الجودة
              والتميز في كل ما نقدمه لعملائنا.
            </p>
            <div className="flex flex-wrap gap-3 justify-start mt-4">
              <a
                href="#"
                className="bg-blue-700/50 hover:bg-blue-600 p-2.5 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                <FaFacebook size={18} className="text-blue-200" />
              </a>
              <a
                href="#"
                className="bg-blue-700/50 hover:bg-sky-500 p-2.5 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                <FaTwitter size={18} className="text-blue-200" />
              </a>
              <a
                href="#"
                className="bg-blue-700/50 hover:bg-pink-500 p-2.5 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                <FaInstagram size={18} className="text-blue-200" />
              </a>
              <a
                href="#"
                className="bg-blue-700/50 hover:bg-red-500 p-2.5 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                <FaYoutube size={18} className="text-blue-200" />
              </a>
              <a
                href="#"
                className="bg-blue-700/50 hover:bg-blue-700 p-2.5 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                <FaLinkedin size={18} className="text-blue-200" />
              </a>
            </div>
          </div>

          <div className="space-y-4 ">
            <h3 className="text-xl font-bold mb-4 text-right relative pb-2">
              روابط سريعة
              <span className="absolute bottom-0 right-0 w-12 h-1 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full"></span>
            </h3>
            <div className="flex items-center justify-start ">
              <ul className="space-y-2.5 ">
                {[
                  "الرئيسية",
                  "من نحن",
                  "خدماتنا",
                  "منتجاتنا",
                  "المدونة",
                  "اتصل بنا",
                ].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-blue-100 hover:text-white transition-all duration-300 group flex items-center justify-end"
                    >
                      <span className="group-hover:translate-x-1 transition-transform duration-300">
                        {item}
                      </span>
                      <FaChevronLeft
                        className="mr-2 text-cyan-400 opacity-0 group-hover:opacity-100 transition-all duration-300"
                        size={12}
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 聯繫信息 */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-4 text-right relative pb-2">
              تواصل معنا
              <span className="absolute bottom-0 right-0 w-12 h-1 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full"></span>
            </h3>
            <div className="space-y-3.5  flex flex-col justify-start">
              <div className="flex gap-3 items-center justify-start space-x-3 space-x-reverse group hover:bg-blue-700/30 p-2 rounded-lg transition-all duration-300">
                <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-2 rounded-lg group-hover:scale-110 transition-transform duration-300">
                  <FaPhone className="text-white" size={16} />
                </div>
                <div className="text-right">
                  <a
                    href="tel:01552299121"
                    className="text-white font-medium group-hover:text-cyan-300 transition-colors duration-300"
                  >
                    01552299121
                  </a>
                </div>
              </div>

              <div className="flex gap-3 items-center justify-start space-x-3 space-x-reverse group hover:bg-blue-700/30 p-2 rounded-lg transition-all duration-300">
                <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-2 rounded-lg group-hover:scale-110 transition-transform duration-300">
                  <FaEnvelope className="text-white" size={16} />
                </div>
                <div className="text-right">
                  <a
                    href="mailto:info@example.com"
                    className="text-white font-medium group-hover:text-cyan-300 transition-colors duration-300"
                  >
                    info@example.com
                  </a>
                </div>
              </div>

              <div className="flex gap-3 items-center justify-start space-x-3 space-x-reverse group hover:bg-blue-700/30 p-2 rounded-lg transition-all duration-300">
                <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-2 rounded-lg group-hover:scale-110 transition-transform duration-300">
                  <SiWhatsapp className="text-white" size={16} />
                </div>
                <div className="text-right">
                  <a
                    href="https://wa.me/201552299121"
                    className="text-white font-medium group-hover:text-cyan-300 transition-colors duration-300"
                  >
                    01552299121
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* 地址地圖 */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-4 text-right relative pb-2">
              عنواننا
              <span className="absolute bottom-0 right-0 w-12 h-1 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full"></span>
            </h3>
            <div className="flex items-start justify-end space-x-3 space-x-reverse hover:bg-blue-700/30 p-3 rounded-lg transition-all duration-300">
              <div className="text-right">
                <p className="text-blue-100 leading-relaxed text-sm">
                  الإسكندرية - العامرية - أول كوبري العامرية اتجاه القاهرة
                </p>
              </div>
              <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-2 rounded-lg min-w-fit">
                <FaMapMarkerAlt className="text-white" size={16} />
              </div>
            </div>

            {/* 地圖預覽 */}
              <div className="overflow-hidden rounded-2xl h-auto flex flex-col items-center justify-center ">
                  <div className="relative z-10">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d1709.667312432856!2d29.794954995968165!3d31.016925338912944!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzHCsDAwJzU5LjQiTiAyOcKwNDcnNDguMSJF!5e0!3m2!1sen!2seg!4v1765796408290!5m2!1sen!2seg"
                      width="100%"
                      height="100%"
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
            </div>
          </div>
        </div>

        {/* 分隔線 */}
        <div className="my-8">
          <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
        </div>

        {/* 版權信息 */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-4">
          <div className="text-center md:text-right mb-4 md:mb-0">
            <p className="text-blue-300 text-sm">
              &copy; {currentYear} جميع الحقوق محفوظة لـ{" "}
              <span className="text-cyan-300 font-semibold">شركتنا</span>
            </p>
          </div>
        </div>

        {/* 返回頂部按鈕 */}
        
      </div>
    </footer>
  );
}
