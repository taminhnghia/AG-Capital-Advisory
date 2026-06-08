/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Language } from '../types';
import { 
  BarChart2, PieChart as PieIcon, TrendingUp, Building, 
  MapPin, Layers, Info, ChevronRight, Briefcase, HelpCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface VietnameseClientMapProps {
  language: Language;
}

interface SectorData {
  name: string;
  value: number;
}

interface RegionData {
  id: string;
  nameEn: string;
  nameVi: string;
  clientsCount: number;
  outletsCount: number;
  capitalStructuredEn: string;
  capitalStructuredVi: string;
  descriptionEn: string;
  descriptionVi: string;
  sectorData: SectorData[];
  hubsEn: string;
  hubsVi: string;
}

export default function VietnameseClientMap({ language }: VietnameseClientMapProps) {
  const isEn = language === 'EN';
  const [selectedRegion, setSelectedRegion] = useState<string>('south');
  const [activeTab, setActiveTab] = useState<'distribution' | 'comparison'>('distribution');
  const [hoveredBar, setHoveredBar] = useState<{ region: string; type: 'clients' | 'outlets' } | null>(null);

  const [distViewMode, setDistViewMode] = useState<'regions' | 'sectors'>('regions');
  const [hoveredSegment, setHoveredSegment] = useState<string | null>(null);
  const [hoveredData, setHoveredData] = useState<{
    title: string;
    clientValue: string;
    percentageValue: string;
    extra?: string;
    color: string;
    x: number;
    y: number;
  } | null>(null);

  // Grounded transactional statistics for premium feel
  const regionalData: Record<string, RegionData> = {
    north: {
      id: 'north',
      nameEn: 'Northern Vietnam',
      nameVi: 'Miền Bắc',
      clientsCount: 9,
      outletsCount: 280,
      capitalStructuredEn: '$18.5M USD',
      capitalStructuredVi: '18,5 triệu USD',
      descriptionEn: 'Core focus on industrial-scale F&B logistics, premium retail networks, and traditional distribution hubs across Hanoi and the Red River Delta.',
      descriptionVi: 'Trọng tâm phát triển chuỗi bán lẻ cao cấp, mạng lưới logistics lương thực quy mô lớn, và các hạt nhân phân phối truyền thống tại Hà Nội và các tỉnh Đồng bằng sông Hồng.',
      hubsEn: 'Hanoi, Hai Phong, Bac Ninh',
      hubsVi: 'Hà Nội, Hải Phòng, Bắc Ninh',
      sectorData: [
        { name: isEn ? 'FMCG & Food' : 'Tiêu dùng & Thực phẩm', value: 35 },
        { name: isEn ? 'Retail & Spa Chains' : 'Chuỗi Bán lẻ & Spa', value: 40 },
        { name: isEn ? 'Logistics & Distribution' : 'Logistics & Phân phối', value: 25 },
      ]
    },
    central: {
      id: 'central',
      nameEn: 'Central Vietnam',
      nameVi: 'Miền Trung',
      clientsCount: 4,
      outletsCount: 110,
      capitalStructuredEn: '$8.0M USD',
      capitalStructuredVi: '8,0 triệu USD',
      descriptionEn: 'Focused on sustainable agricultural commerce, marine supply chains, and boutique coastal hospitality/retail networks.',
      descriptionVi: 'Hỗ trợ nâng cao giá trị chuỗi cung ứng thủy hải sản, thương mại nông sản bền vững và hệ thống khách sạn, bán lẻ phân khúc nghỉ dưỡng biển.',
      hubsEn: 'Da Nang, Nha Trang, Hue',
      hubsVi: 'Đà Nẵng, Nha Trang, Huế',
      sectorData: [
        { name: isEn ? 'FMCG & Food' : 'Tiêu dùng & Thực phẩm', value: 50 },
        { name: isEn ? 'Logistics & Distribution' : 'Logistics & Phân phối', value: 30 },
        { name: isEn ? 'F&B Franchises' : 'Nhượng quyền F&B', value: 20 },
      ]
    },
    south: {
      id: 'south',
      nameEn: 'Southern Vietnam',
      nameVi: 'Miền Nam',
      clientsCount: 12,
      outletsCount: 420,
      capitalStructuredEn: '$28.0M USD',
      capitalStructuredVi: '28,0 triệu USD',
      descriptionEn: 'The high-velocity consumer epicentre. Broad leverage across multi-city cosmetic chains, fast-casual franchise restaurants, and advanced manufacturing platforms.',
      descriptionVi: 'Trung tâm tăng trưởng bán lẻ quy mô lớn toàn quốc. Thống lĩnh thị trường ở các ngành mỹ phẩm, chuỗi dịch vụ ăn uống F&B và nhà xưởng sản xuất hiện đại.',
      hubsEn: 'Ho Chi Minh City, Binh Duong, Dong Nai',
      hubsVi: 'TP. Hồ Chí Minh, Bình Dương, Đồng Nai',
      sectorData: [
        { name: isEn ? 'FMCG & Food' : 'Tiêu dùng & Thực phẩm', value: 45 },
        { name: isEn ? 'Retail & Spa Chains' : 'Chuỗi Bán lẻ & Spa', value: 30 },
        { name: isEn ? 'F&B Franchises' : 'Nhượng quyền F&B', value: 25 },
      ]
    }
  };

  const activeData = regionalData[selectedRegion];
  const regionsList = Object.values(regionalData);

  // Premium institutional color scale
  const COLORS = ['#C9A227', '#E5C043', '#967417', '#475569'];

  // Global reach aggregated metrics
  const totalClients = regionsList.reduce((sum, r) => sum + r.clientsCount, 0);
  const totalOutlets = regionsList.reduce((sum, r) => sum + r.outletsCount, 0);

  const radius = 65;
  const strokeWidth = 14;
  const circumference = 2 * Math.PI * radius; // ~408.4

  // Helper 1: Render Regional Client Share Doughnut (Total = 25 clients)
  const renderRegionalDoughnut = () => {
    let accumulatedPercent = 0;
    const regionColors = ['#475569', '#967417', '#C9A227'];

    return regionsList.map((r, index) => {
      const percentage = (r.clientsCount / totalClients) * 100;
      const strokeLength = (percentage / 100) * circumference;
      const strokeOffset = circumference - strokeLength;
      const rotationAngle = (accumulatedPercent / 100) * 360 - 90; // Start top center (-90deg)
      accumulatedPercent += percentage;

      const strokeColor = regionColors[index % regionColors.length];
      const isHovered = hoveredSegment === r.id;

      return (
        <circle
          key={`region-seg-${r.id}`}
          cx="100"
          cy="100"
          r={radius}
          fill="transparent"
          stroke={strokeColor}
          strokeWidth={isHovered ? 18 : strokeWidth}
          strokeDasharray={`${strokeLength} ${strokeOffset}`}
          strokeDashoffset={0}
          transform={`rotate(${rotationAngle} 100 100)`}
          className="transition-all duration-300 ease-in-out cursor-pointer"
          style={{ transformOrigin: 'center' }}
          onMouseEnter={() => setHoveredSegment(r.id)}
          onMouseLeave={() => {
            setHoveredSegment(null);
            setHoveredData(null);
          }}
          onClick={() => setSelectedRegion(r.id)}
          onMouseMove={(e) => {
            const rect = e.currentTarget.ownerSVGElement?.getBoundingClientRect() || e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            setHoveredData({
              title: isEn ? r.nameEn : r.nameVi,
              clientValue: `${r.clientsCount} ${isEn ? 'Platforms' : 'Doanh nghiệp'}`,
              percentageValue: `${percentage.toFixed(1)}%`,
              extra: isEn ? `Hubs: ${r.hubsEn}` : `Trung tâm: ${r.hubsVi}`,
              color: strokeColor,
              x,
              y
            });
          }}
        />
      );
    });
  };

  // Helper 2: Render Sector Concentration Doughnut of Chosen Region
  const renderSectorDoughnut = () => {
    const data = activeData.sectorData;
    const total = data.reduce((sum, item) => sum + item.value, 0);
    let accumulatedPercent = 0;

    return data.map((item, index) => {
      const percentage = (item.value / total) * 100;
      const strokeLength = (percentage / 100) * circumference;
      const strokeOffset = circumference - strokeLength;
      const rotationAngle = (accumulatedPercent / 100) * 360 - 90; // Start top center
      accumulatedPercent += percentage;

      const strokeColor = COLORS[index % COLORS.length];
      const isHovered = hoveredSegment === `sector-${index}`;
      const approxClients = Math.round((item.value / 100) * activeData.clientsCount);

      return (
        <circle
          key={`sector-seg-${index}`}
          cx="100"
          cy="100"
          r={radius}
          fill="transparent"
          stroke={strokeColor}
          strokeWidth={isHovered ? 18 : strokeWidth}
          strokeDasharray={`${strokeLength} ${strokeOffset}`}
          strokeDashoffset={0}
          transform={`rotate(${rotationAngle} 100 100)`}
          className="transition-all duration-300 ease-in-out cursor-pointer"
          style={{ transformOrigin: 'center' }}
          onMouseEnter={() => setHoveredSegment(`sector-${index}`)}
          onMouseLeave={() => {
            setHoveredSegment(null);
            setHoveredData(null);
          }}
          onMouseMove={(e) => {
            const rect = e.currentTarget.ownerSVGElement?.getBoundingClientRect() || e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            setHoveredData({
              title: item.name,
              clientValue: `${approxClients} ${isEn ? 'Platforms' : 'Doanh nghiệp'}`,
              percentageValue: `${percentage.toFixed(0)}%`,
              extra: isEn ? `In ${activeData.nameEn}` : `Tại ${activeData.nameVi}`,
              color: strokeColor,
              x,
              y
            });
          }}
        />
      );
    });
  };

  return (
    <section className="py-20 bg-[#000] border-t border-b border-slate-900" id="vietnam-geographics-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header - Styled with extreme precision */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#C9A227] inline-flex items-center gap-1.5 bg-slate-950 px-3 py-1 rounded border border-slate-900">
            <Layers size={11} className="text-[#C9A227]" />
            {isEn ? "PORTFOLIO DISTRIBUTION" : "PHÂN BỔ DANH MỤC ĐẦU TƯ"}
          </span>
          <h2 className="text-3xl sm:text-4xl font-sans font-medium tracking-tight text-white leading-tight">
            {isEn ? "Grounded Reach & Regional Operations" : "Phân Tích Quy Mô & Độ Phủ Hoạt Động"}
          </h2>
          <p className="text-sm text-slate-400 max-w-2xl mx-auto leading-relaxed">
            {isEn 
              ? "Comprehensive financial analytics displaying our active mandates, structured capitals, and multi-endpoint retail scale across Vietnam's prime economic corridors."
              : "Báo cáo phân bổ chi tiết số lượng dự án, lượng vốn cấu trúc và quy mô mạng lưới cửa hàng trong danh mục tư vấn của chúng tôi tại các vùng miền trọng điểm."}
          </p>
        </div>

        {/* Global Key Metrics Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-slate-950/60 p-6 rounded border border-slate-900 flex justify-between items-center">
            <div>
              <span className="font-mono text-[9px] uppercase tracking-wider text-slate-400 block">
                {isEn ? "TOTAL PORTFOLIO VOLUME" : "TỔNG QUY MÔ DANH MỤC"}
              </span>
              <span className="text-2xl font-bold font-sans text-white text-gradient-gold block mt-1">
                {totalClients} {isEn ? "Active Platforms" : "Doanh Nghiệp Nền Tảng"}
              </span>
            </div>
            <div className="w-10 h-10 bg-[#C9A227]/5 border border-[#C9A227]/15 rounded flex items-center justify-center text-[#C9A227]">
              <Briefcase size={16} />
            </div>
          </div>

          <div className="bg-slate-950/60 p-6 rounded border border-slate-900 flex justify-between items-center">
            <div>
              <span className="font-mono text-[9px] uppercase tracking-wider text-slate-400 block">
                {isEn ? "RETAIL FOOTPRINT COVERED" : "HỆ THỐNG ĐIỂM SỨC CHỨA"}
              </span>
              <span className="text-2xl font-bold font-sans text-white text-gradient-gold block mt-1">
                {totalOutlets}+ {isEn ? "Active Locations" : "Điểm Bán & Logistics"}
              </span>
            </div>
            <div className="w-10 h-10 bg-[#C9A227]/5 border border-[#C9A227]/15 rounded flex items-center justify-center text-[#C9A227]">
              <Building size={16} />
            </div>
          </div>

          <div className="bg-slate-950/60 p-6 rounded border border-slate-900 flex justify-between items-center">
            <div>
              <span className="font-mono text-[9px] uppercase tracking-wider text-slate-400 block">
                {isEn ? "TOTAL UNDER advisement VAluE" : "TỔNG GIÁ TRỊ VỐN BẢO CHỨNG"}
              </span>
              <span className="text-2xl font-bold font-sans text-white text-gradient-gold block mt-1">
                $54.5M USD
              </span>
            </div>
            <div className="w-10 h-10 bg-[#C9A227]/5 border border-[#C9A227]/15 rounded flex items-center justify-center text-[#C9A227]">
              <TrendingUp size={16} />
            </div>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex justify-center mb-8">
          <div className="bg-slate-950 p-1 rounded-lg border border-slate-900 inline-flex gap-2">
            <button
              onClick={() => setActiveTab('distribution')}
              className={`px-5 py-2 rounded text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                activeTab === 'distribution' 
                  ? 'bg-[#C9A227] text-slate-950 font-bold' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <PieIcon size={13} />
              {isEn ? "Circular Regional Share" : "Vòng Tròn Phân Bổ Ngành"}
            </button>
            <button
              onClick={() => setActiveTab('comparison')}
              className={`px-5 py-2 rounded text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                activeTab === 'comparison' 
                  ? 'bg-[#C9A227] text-slate-950 font-bold' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <BarChart2 size={13} />
              {isEn ? "Direct Scale Bar Chart" : "Cột Quy Mô Toàn Quốc"}
            </button>
          </div>
        </div>

        {/* Dynamic Display Area with Framer Motion transitions */}
        <AnimatePresence mode="wait">
          {activeTab === 'distribution' ? (
            <motion.div
              key="distribution"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
            >
              
              {/* Left Column: Interactive Regional Controller (5 cols) */}
              <div className="lg:col-span-5 bg-slate-950 p-8 rounded-lg border border-slate-900 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <span className="font-mono text-[9px] text-[#C9A227] uppercase tracking-widest block font-bold">
                    {isEn ? "REGIONAL BREAKDOWN" : "CHI TIẾT VÙNG MIỀN"}
                  </span>
                  
                  {/* Selectors */}
                  <div className="space-y-2">
                    {Object.values(regionalData).map((r) => (
                      <button
                        key={r.id}
                        onClick={() => setSelectedRegion(r.id)}
                        className={`w-full text-left p-4 rounded border transition-all duration-300 flex justify-between items-center group cursor-pointer ${
                          selectedRegion === r.id 
                            ? 'bg-[#C9A227]/5 border-[#C9A227] text-white shadow-[inset_0_0_12px_rgba(201,162,39,0.06)]' 
                            : 'bg-slate-900/40 border-slate-900 text-slate-400 hover:text-white hover:border-slate-800'
                        }`}
                      >
                        <div>
                          <p className="text-xs font-mono font-bold uppercase tracking-wider block">
                            {isEn ? r.nameEn : r.nameVi}
                          </p>
                          <p className={`text-[11px] leading-relaxed mt-1 font-sans ${selectedRegion === r.id ? 'text-slate-300' : 'text-slate-500'}`}>
                            {isEn ? `Infrastructure Hub: ${r.hubsEn}` : `Trung tâm chính: ${r.hubsVi}`}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`text-sm font-bold font-mono ${selectedRegion === r.id ? 'text-[#C9A227]' : 'text-slate-500'}`}>
                            {r.clientsCount} Units
                          </span>
                          <ChevronRight size={14} className={`transition-transform duration-200 group-hover:translate-x-0.5 ${selectedRegion === r.id ? 'text-[#C9A227]' : 'text-slate-600'}`} />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Regional Highlight metrics */}
                <div className="space-y-4 pt-4 border-t border-slate-900">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-mono text-slate-500 uppercase block">{isEn ? "Structured Capital Reserve" : "Dòng Vốn Bảo Chứng"}</span>
                      <strong className="text-xl font-bold font-sans text-white text-gradient-gold block mt-1">
                        {isEn ? activeData.capitalStructuredEn : activeData.capitalStructuredVi}
                      </strong>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-mono text-slate-500 uppercase block">{isEn ? "Physical Retail Scale" : "Tổng Số Điểm Chi Nhánh"}</span>
                      <strong className="text-xl font-bold font-sans text-white text-gradient-gold block mt-1">
                        {activeData.outletsCount}+ Points
                      </strong>
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed italic">
                    {isEn ? activeData.descriptionEn : activeData.descriptionVi}
                  </p>
                </div>
              </div>

              {/* Right Column: Doughnut/Pie representation of Selected Region (7 cols) - Pure SVG */}
              <div className="lg:col-span-7 bg-slate-950 p-8 rounded-lg border border-slate-900 flex flex-col justify-between space-y-6">
                
                {/* Header Block and Filter Toggle */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-900/85 pb-4 gap-4">
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold font-mono uppercase tracking-wider text-white">
                      {distViewMode === 'regions'
                        ? (isEn ? "National Client Distribution" : "Cấu Trúc Hợp Đồng Vùng Miền")
                        : (isEn ? `${activeData.nameEn} Sector Concentration` : `Phân Bổ Ngành Toàn Miền - ${activeData.nameVi}`)
                      }
                    </h3>
                    <p className="text-[11px] text-slate-500 max-w-[340px] leading-relaxed">
                      {distViewMode === 'regions'
                        ? (isEn ? "Relative percentage and mandate counts across primary regions" : "Tỷ lệ phân cấp hợp đồng thù lao thâu tóm theo khu vực địa lý")
                        : (isEn ? "Radial relative weight of structured capital deployments" : "Trọng số phân bổ danh mục ngành của riêng khu vực đang chọn")
                      }
                    </p>
                  </div>
                  
                  {/* Premium Segmented Toggle Controller */}
                  <div className="bg-slate-900/50 p-1 rounded-md border border-slate-900 inline-flex self-start sm:self-auto gap-1 shrink-0">
                    <button
                      onClick={() => {
                        setDistViewMode('regions');
                        setHoveredData(null);
                        setHoveredSegment(null);
                      }}
                      className={`px-3 py-1 text-[10px] font-bold font-mono uppercase tracking-wider rounded transition-all duration-200 cursor-pointer ${
                        distViewMode === 'regions'
                          ? 'bg-[#C9A227] text-slate-950 font-bold shadow-[0_2px_8px_rgba(201,162,39,0.2)]'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {isEn ? "By Regions" : "Vùng Miền"}
                    </button>
                    <button
                      onClick={() => {
                        setDistViewMode('sectors');
                        setHoveredData(null);
                        setHoveredSegment(null);
                      }}
                      className={`px-3 py-1 text-[10px] font-bold font-mono uppercase tracking-wider rounded transition-all duration-200 cursor-pointer ${
                        distViewMode === 'sectors'
                          ? 'bg-[#C9A227] text-slate-950 font-bold shadow-[0_2px_8px_rgba(201,162,39,0.2)]'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {isEn ? "By Sectors" : "Ngành Hàng"}
                    </button>
                  </div>
                </div>

                {/* Core SVG Doughnut Layout - 100% stable & bug-free */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center flex-grow py-4">
                  <div className="md:col-span-7 h-[220px] flex justify-center items-center relative select-none">
                    
                    {/* Visual center labels */}
                    <div className="absolute flex flex-col items-center justify-center text-center z-10 pointer-events-none">
                      <span className="text-3xl font-bold font-sans text-white tracking-tight text-gradient-gold">
                        {distViewMode === 'regions'
                          ? (hoveredSegment && regionalData[hoveredSegment] ? regionalData[hoveredSegment].clientsCount : totalClients)
                          : activeData.clientsCount
                        }
                      </span>
                      <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block mt-0.5">
                        {distViewMode === 'regions'
                          ? (hoveredSegment ? (isEn ? "Mandates" : "Hợp Đồng") : (isEn ? "Platforms" : "Doanh Nghiệp"))
                          : (isEn ? "Sector Units" : "Nhóm Ngành")
                        }
                      </span>
                    </div>

                    <svg width="200" height="200" className="relative group max-w-full drop-shadow-[0_0_20px_rgba(201,162,39,0.08)]">
                      {/* Doughnut segments rendered from state data */}
                      {distViewMode === 'regions' ? renderRegionalDoughnut() : renderSectorDoughnut()}
                    </svg>

                    {/* Cursor floating hover tooltip */}
                    <AnimatePresence>
                      {hoveredData && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute pointer-events-none bg-[#070a13]/95 border text-white p-3 py-2.5 rounded shadow-[0_12px_32px_rgba(0,0,0,0.9)] font-mono text-[10px] z-50 flex flex-col gap-1 min-w-[170px]"
                          style={{ 
                            left: `${hoveredData.x + 20}px`, 
                            top: `${hoveredData.y - 10}px`,
                            borderColor: hoveredData.color 
                          }}
                        >
                          <div className="flex items-center gap-1.5">
                            <span 
                              className="w-2 h-2 rounded-full shrink-0 animate-pulse" 
                              style={{ backgroundColor: hoveredData.color }} 
                            />
                            <span className="font-sans font-bold text-xs text-slate-100 truncate">{hoveredData.title}</span>
                          </div>
                          
                          <div className="border-t border-slate-900 my-0.5"></div>
                          
                          <div className="flex justify-between items-center text-[10px]">
                            <span className="text-slate-400">{isEn ? "Advisory Mandates:" : "Hợp đồng:"}</span>
                            <span className="font-bold text-white">{hoveredData.clientValue}</span>
                          </div>
                          
                          <div className="flex justify-between items-center text-[10px]">
                            <span className="text-slate-400">{isEn ? "National Weight:" : "Tỷ trọng:"}</span>
                            <span className="font-bold text-[#C9A227]">{hoveredData.percentageValue}</span>
                          </div>

                          {hoveredData.extra && (
                            <div className="text-[9px] text-slate-500 border-t border-slate-900 pt-1 mt-0.5 italic">
                              {hoveredData.extra}
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Legends Details panel */}
                  <div className="md:col-span-5 space-y-3 text-left">
                    <span className="text-[10px] font-mono text-slate-400 uppercase block tracking-wider font-bold">
                      {distViewMode === 'regions'
                        ? (isEn ? "REGIONAL BREAKDOWN" : "PHÂN BỔ QUY MÔ VÙNG")
                        : (isEn ? "ACTIVE SECTORS" : "PHÂN CẤP SẢN NGÀNH CHÍNH")
                      }
                    </span>
                    
                    {distViewMode === 'regions' ? (
                      regionsList.map((r, index) => {
                        const segmentColors = ['#475569', '#967417', '#C9A227'];
                        const rColor = segmentColors[index % segmentColors.length];
                        const count = r.clientsCount;
                        const pct = ((count / totalClients) * 100).toFixed(0);
                        const isMainActive = selectedRegion === r.id;

                        return (
                          <div 
                            key={`reg-legend-${r.id}`} 
                            onClick={() => setSelectedRegion(r.id)}
                            onMouseEnter={() => setHoveredSegment(r.id)}
                            onMouseLeave={() => {
                              setHoveredSegment(null);
                              setHoveredData(null);
                            }}
                            className={`p-2.5 rounded border transition-all duration-200 cursor-pointer flex flex-col gap-1 ${
                              isMainActive 
                                ? 'bg-[#C9A227]/5 border-[#C9A227] shadow-[inset_0_0_8px_rgba(201,162,39,0.04)] text-white' 
                                : 'border-slate-900/60 bg-slate-900/10 hover:border-slate-800 text-slate-400 hover:text-white'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span 
                                  className="w-2 h-2 rounded-full shrink-0" 
                                  style={{ backgroundColor: rColor }} 
                                />
                                <span className="text-xs truncate font-bold">
                                  {isEn ? r.nameEn : r.nameVi}
                                </span>
                              </div>
                              {isMainActive && (
                                <span className="text-[8px] tracking-widest font-mono text-[#C9A227] uppercase bg-[#C9A227]/10 px-1.5 border border-[#C9A227]/20 rounded">
                                  {isEn ? "Active" : "Chọn"}
                                </span>
                              )}
                            </div>
                            <div className="flex justify-between items-center text-[10px] font-mono pl-4">
                              <span className="text-slate-500">{isEn ? "Mandates:" : "Đầu tư:"}</span>
                              <span className={`font-semibold ${isMainActive ? 'text-white' : 'text-slate-300'}`}>{count} ({pct}%)</span>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      activeData.sectorData.map((entry, index) => (
                        <div 
                          key={`pie-legend-${index}`} 
                          onMouseEnter={() => setHoveredSegment(`sector-${index}`)}
                          onMouseLeave={() => {
                            setHoveredSegment(null);
                            setHoveredData(null);
                          }}
                          className="p-2.5 rounded border border-slate-900/60 bg-slate-900/10 flex flex-col gap-1 hover:border-slate-800 transition-all duration-150"
                        >
                          <div className="flex items-center gap-2">
                            <span 
                              className="w-2 h-2 rounded-full shrink-0" 
                              style={{ backgroundColor: COLORS[index % COLORS.length] }} 
                            />
                            <span className="text-xs text-slate-200 truncate font-semibold">{entry.name}</span>
                          </div>
                          <div className="flex justify-between items-center text-[10px] font-mono pl-4">
                            <span className="text-slate-500">{isEn ? "Structured Weight:" : "Thế Lực Phân Bổ:"}</span>
                            <span className="text-[#C9A227] font-bold">{entry.value}%</span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                <div className="bg-slate-900/10 p-3.5 rounded border border-slate-900 flex items-start gap-2.5 text-[11px] text-slate-400">
                  <Info size={13} className="text-[#C9A227] shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    {isEn 
                      ? "Capital distributions align strictly with strategic mandates, safeguarding intellectual assets and brand rights."
                      : "Trực quan phân bổ danh mục đầu tư phản ánh kế hoạch nâng tầm quản trị doanh nghiệp kết hợp phòng vệ pha loãng dài hạn."}
                  </p>
                </div>

              </div>
            </motion.div>
          ) : (
            <motion.div
              key="comparison"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="bg-slate-950 p-8 rounded-lg border border-slate-900 flex flex-col justify-between space-y-6 text-left"
            >
              <div className="flex flex-wrap justify-between items-start border-b border-slate-900 pb-3 gap-4">
                <div>
                  <h3 className="text-sm font-bold font-mono uppercase tracking-wider text-white">
                    {isEn ? "National Operational Reach Comparison" : "Đối Chiếu Quy Mô Hoạt Động Bản Bản Địa"}
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {isEn 
                      ? "Handcrafted responsive column grid comparing advisory projects alongside physical retail networks." 
                      : "Biểu đồ cột thiết kế thủ công hiển thị trực quan số dự án đầu tư và độ phủ chuỗi cửa hàng vật lý."}
                  </p>
                </div>
                
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-gradient-to-t from-[#8C701B] to-[#C9A227] rounded-sm" />
                    <span className="text-[10px] font-mono text-slate-400 uppercase font-semibold">{isEn ? "Corporate Clients (Left Axis)" : "Dự án Nền tảng (Trục Trái)"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-gradient-to-t from-slate-800 to-[#475569] rounded-sm" />
                    <span className="text-[10px] font-mono text-slate-400 uppercase font-semibold">{isEn ? "Outlets Scale (Right Axis)" : "Mạng lưới Điểm bán (Trục Phải)"}</span>
                  </div>
                </div>
              </div>

              {/* Handcrafted Custom Bar Chart Component - 100% Crisp & Fully Interactive */}
              <div className="h-[340px] w-full relative select-none mt-4 border border-slate-900 bg-slate-950/20 rounded px-6 pt-8 pb-4 flex flex-col justify-between">
                
                {/* Horizontal reference lines & indicators */}
                <div className="absolute inset-x-0 top-8 bottom-12 flex flex-col justify-between pointer-events-none z-0">
                  {[100, 75, 50, 25, 0].map((percent, idx) => {
                    const leftVal = Math.round((percent / 100) * 12);
                    const rightVal = Math.round((percent / 100) * 450);

                    return (
                      <div key={`grid-line-${idx}`} className="w-full relative flex items-center h-0">
                        {/* Left YAxis Label */}
                        <span className="absolute -left-2 text-[10px] font-mono text-[#C9A227] font-bold pr-2 -translate-x-full">
                          {leftVal}
                        </span>
                        
                        {/* Dashed Gridline */}
                        <div className="w-full border-t border-slate-900 border-dashed opacity-50" />
                        
                        {/* Right YAxis Label */}
                        <span className="absolute -right-2 text-[10px] font-mono text-slate-400 font-bold pl-2 translate-x-full">
                          {rightVal}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Left & Right Vertical Axis name labels inside chart */}
                <div className="absolute left-1 top-2 flex items-center gap-1 text-[9px] font-mono text-slate-400">
                  <span className="w-1.5 h-1.5 bg-[#C9A227] rounded-full" />
                  <span>{isEn ? "UNITS" : "DỰ ÁN"}</span>
                </div>
                <div className="absolute right-1 top-2 flex items-center gap-1 text-[9px] font-mono text-slate-400">
                  <span className="w-1.5 h-1.5 bg-[#475569] rounded-full" />
                  <span>{isEn ? "STORES" : "CỬA HÀNG"}</span>
                </div>

                {/* Bars Plot Area */}
                <div className="relative flex-grow flex justify-around items-end z-10 h-full max-w-[580px] mx-auto w-full pb-2">
                  {Object.values(regionalData).map((r) => {
                    // Normalize values for perfect height rendering (max labels: clients=12, outlets=450)
                    const clientHeightPercent = (r.clientsCount / 12) * 100;
                    const outletHeightPercent = (r.outletsCount / 450) * 100;

                    const regionLabel = isEn ? r.nameEn : r.nameVi;

                    return (
                      <div key={`scale-group-${r.id}`} className="flex flex-col items-center justify-end h-full w-[140px] px-2">
                        
                        {/* Twin columns container */}
                        <div className="flex gap-4 items-end justify-center w-full flex-grow relative h-[180px] mb-3">
                          
                          {/* CLIENTS BAR */}
                          <div 
                            className="w-8 relative group cursor-pointer flex flex-col justify-end h-full"
                            onMouseEnter={() => setHoveredBar({ region: r.id, type: 'clients' })}
                            onMouseLeave={() => setHoveredBar(null)}
                          >
                            <AnimatePresence>
                              {hoveredBar?.region === r.id && hoveredBar?.type === 'clients' && (
                                <motion.div 
                                  initial={{ opacity: 0, y: -4, scale: 0.95 }}
                                  animate={{ opacity: 1, y: -8, scale: 1 }}
                                  exit={{ opacity: 0, scale: 0.95 }}
                                  className="absolute -top-12 left-1/2 -translate-x-1/2 bg-[#090d16] border border-[#C9A227] px-2 py-1 rounded text-[10px] font-mono text-white text-center z-35 shadow-lg whitespace-nowrap"
                                >
                                  <strong>{r.clientsCount}</strong> {isEn ? "Platforms" : "Nền Tảng"}
                                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-[#C9A227]" />
                                </motion.div>
                              )}
                            </AnimatePresence>

                            <motion.div 
                              initial={{ height: 0 }}
                              animate={{ height: `${clientHeightPercent}%` }}
                              transition={{ duration: 0.8, ease: "easeOut" }}
                              className="w-full bg-gradient-to-t from-[#8C701B] to-[#C9A227] rounded-t-sm shadow-[0_0_12px_rgba(201,162,39,0.15)] group-hover:brightness-125 transition-all duration-200"
                            />
                            {/* Short inline badge if not hovered */}
                            <span className="text-[10px] text-[#C9A227] font-bold font-mono text-center block mt-1">
                              {r.clientsCount}
                            </span>
                          </div>

                          {/* OUTLETS BAR */}
                          <div 
                            className="w-8 relative group cursor-pointer flex flex-col justify-end h-full"
                            onMouseEnter={() => setHoveredBar({ region: r.id, type: 'outlets' })}
                            onMouseLeave={() => setHoveredBar(null)}
                          >
                            <AnimatePresence>
                              {hoveredBar?.region === r.id && hoveredBar?.type === 'outlets' && (
                                <motion.div 
                                  initial={{ opacity: 0, y: -4, scale: 0.95 }}
                                  animate={{ opacity: 1, y: -8, scale: 1 }}
                                  exit={{ opacity: 0, scale: 0.95 }}
                                  className="absolute -top-12 left-1/2 -translate-x-1/2 bg-[#090d16] border border-slate-500 px-2 py-1 rounded text-[10px] font-mono text-white text-center z-35 shadow-lg whitespace-nowrap"
                                >
                                  <strong>{r.outletsCount}</strong> {isEn ? "Locations" : "Điểm bán"}
                                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-slate-500" />
                                </motion.div>
                              )}
                            </AnimatePresence>

                            <motion.div 
                              initial={{ height: 0 }}
                              animate={{ height: `${outletHeightPercent}%` }}
                              transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
                              className="w-full bg-gradient-to-t from-slate-800 to-[#475569] rounded-t-sm shadow-[0_0_10px_rgba(71,85,105,0.15)] group-hover:brightness-125 transition-all duration-200"
                            />
                            {/* Short inline badge if not hovered */}
                            <span className="text-[10px] text-slate-400 font-bold font-mono text-center block mt-1">
                              {r.outletsCount}
                            </span>
                          </div>

                        </div>

                        {/* Region Name label */}
                        <div className="text-center font-mono text-[11px] font-semibold text-slate-300 mt-1 uppercase tracking-wider">
                          {regionLabel}
                        </div>

                      </div>
                    );
                  })}
                </div>

              </div>

              {/* Aggregation summary card */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-900 text-left">
                {Object.values(regionalData).map((r) => (
                  <div key={`bar-agg-${r.id}`} className="bg-slate-900/20 p-4 rounded border border-slate-900 flex justify-between items-center">
                    <div>
                      <span className="font-mono text-[9px] text-[#C9A227] uppercase tracking-wide block font-semibold">
                        {isEn ? r.nameEn : r.nameVi}
                      </span>
                      <p className="text-xs font-semibold text-white mt-1">
                        {r.clientsCount} {isEn ? "Advisory Mandates" : "Hợp Đồng Cố Vấn"}
                      </p>
                    </div>
                    <div className="text-right font-mono text-[11px] text-slate-400">
                      <strong>{r.outletsCount}</strong> {isEn ? "Stores" : "Cửa Hàng"}
                    </div>
                  </div>
                ))}
              </div>

            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
