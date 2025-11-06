"use client"

import { useState } from "react"

interface TimelineEvent {
  year: number
  title: string
  description: string
  material: string
  icon: string
  details: {
    discovery: string
    impact: string
    technology: string
    legacy: string
  }
  color: string
}

const timelineEvents: TimelineEvent[] = [
  {
    year: 3000000,
    title: "Thời Đá",
    description: "Con người bắt đầu sử dụng đá",
    material: "Đá",
    icon: "🪨",
    details: {
      discovery: "Con người tìm thấy đá có thể được đẽo để tạo công cụ sắc nhọn",
      impact: "Cho phép con người săn bắt, xây dựng nơi trú ẩn",
      technology: "Công cụ đá, mũi tên, dao",
      legacy: "Nền tảng của tất cả công nghệ sau này",
    },
    color: "from-gray-600 to-gray-800",
  },
  {
    year: 3000,
    title: "Thời Đồng",
    description: "Phát hiện hợp kim đồng",
    material: "Đồng",
    icon: "🔔",
    details: {
      discovery: "Người cổ đại phát hiện trộn đồng và thiếc tạo ra đồng cứng hơn",
      impact: "Vũ khí tốt hơn, công cụ bền hơn, thương mại phát triển",
      technology: "Kiếm, mũi tên, đồng tiền",
      legacy: "Đánh dấu sự bắt đầu của nền văn minh",
    },
    color: "from-amber-600 to-amber-800",
  },
  {
    year: 1200,
    title: "Thời Sắt",
    description: "Sắt thay thế đồng",
    material: "Sắt",
    icon: "⚙️",
    details: {
      discovery: "Người cổ đại học cách luyện sắt từ quặng",
      impact: "Sắt phong phú hơn đồng, vũ khí mạnh hơn, nông nghiệp phát triển",
      technology: "Kiếm sắt, cày sắt, công cụ",
      legacy: "Cho phép xây dựng các đế chế lớn",
    },
    color: "from-slate-600 to-slate-800",
  },
  {
    year: 1856,
    title: "Cách Mạng Thép",
    description: "Quy trình Bessemer",
    material: "Thép",
    icon: "🏗️",
    details: {
      discovery: "Henry Bessemer phát minh quy trình sản xuất thép hàng loạt",
      impact: "Giá thép giảm 90%, tàu, cầu, tòa nhà cao tầng trở thành khả năng",
      technology: "Lò Bessemer, tàu thép, cầu sắt",
      legacy: "Cách mạng công nghiệp bắt đầu từ đây",
    },
    color: "from-slate-500 to-slate-700",
  },
  {
    year: 1907,
    title: "Nhựa Tổng Hợp",
    description: "Bakelite - nhựa đầu tiên",
    material: "Nhựa",
    icon: "🧪",
    details: {
      discovery: "Leo Baekeland tạo ra Bakelite, nhựa tổng hợp đầu tiên",
      impact: "Thay thế ngà voi, cao su tự nhiên, mở ra kỷ nguyên tiêu dùng",
      technology: "Bakelite, Celluloid, Nylon",
      legacy: "Tạo ngành công nghiệp 500 tỷ USD",
    },
    color: "from-blue-500 to-blue-700",
  },
  {
    year: 1947,
    title: "Transistor",
    description: "Bán dẫn thay đổi thế giới",
    material: "Bán Dẫn",
    icon: "💻",
    details: {
      discovery: "Transistor được phát minh tại Bell Labs",
      impact: "Thay thế ống chân không, cho phép máy tính nhỏ gọn, mạnh mẽ",
      technology: "Transistor, IC, Microprocessor",
      legacy: "Tạo kỷ nguyên số, ngành 1.5 nghìn tỷ USD",
    },
    color: "from-purple-600 to-pink-600",
  },
  {
    year: 2004,
    title: "Graphene",
    description: "Vật liệu kỳ diệu",
    material: "Graphene",
    icon: "⚛️",
    details: {
      discovery: "Graphene được tách ra từ graphite bằng phương pháp đơn giản",
      impact: "Mạnh hơn thép 200 lần, mỏng nhất nhưng mạnh nhất",
      technology: "Graphene, Nanotubes, 2D Materials",
      legacy: "Sẽ cách mạng hóa công nghệ trong tương lai",
    },
    color: "from-cyan-600 to-blue-600",
  },
  {
    year: 2024,
    title: "Vật Liệu Bền Vững",
    description: "Tương lai xanh",
    material: "Bio-Materials",
    icon: "🌱",
    details: {
      discovery: "Vật liệu từ nấm, tảo, rơm rạ được phát triển",
      impact: "Phân hủy hoàn toàn, giảm phát thải carbon 80%",
      technology: "Mycelium leather, Algae plastic, Bio-composites",
      legacy: "Cứu hành tinh, kinh tế tuần hoàn",
    },
    color: "from-green-600 to-emerald-600",
  },
]

export default function DeepTimeline() {
  const [selectedEvent, setSelectedEvent] = useState(4)

  const event = timelineEvents[selectedEvent]

  return (
    <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-background to-card/20">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-balance">Dòng Thời Gian Chi Tiết</h2>
        <p className="text-center text-muted-foreground mb-12 text-balance">
          Khám phá từng bước tiến của lịch sử vật liệu
        </p>

        {/* Timeline Visualization */}
        <div className="mb-12">
          <div className="relative h-2 bg-card rounded-full overflow-hidden mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-600 via-slate-600 via-blue-600 via-purple-600 to-green-600 opacity-30" />
            <div
              className="absolute h-full bg-gradient-to-r from-primary to-accent transition-all duration-300"
              style={{ width: `${((selectedEvent + 1) / timelineEvents.length) * 100}%` }}
            />
          </div>

          {/* Timeline Events */}
          <div className="flex justify-between gap-2 overflow-x-auto pb-4">
            {timelineEvents.map((evt, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedEvent(idx)}
                className={`flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center text-2xl transition-all ${
                  selectedEvent === idx
                    ? "scale-125 ring-4 ring-primary shadow-lg shadow-primary/50"
                    : "hover:scale-110 opacity-70 hover:opacity-100"
                }`}
                title={evt.title}
              >
                {evt.icon}
              </button>
            ))}
          </div>
        </div>

        {/* Event Details */}
        <div
          className={`bg-gradient-to-br ${event.color} bg-opacity-10 border-2 border-primary rounded-2xl p-8 animate-scale-up`}
        >
          <div className="flex items-start justify-between mb-6">
            <div>
              <p className="text-sm text-muted-foreground mb-2">
                {event.year > 1000 ? `${event.year} CN` : `${Math.abs(event.year)} TCN`}
              </p>
              <h3 className="text-4xl font-bold mb-2">{event.title}</h3>
              <p className="text-lg text-muted-foreground">{event.description}</p>
            </div>
            <div className="text-6xl">{event.icon}</div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-8 pt-8 border-t border-border/50">
            <div>
              <h4 className="font-bold mb-3 text-primary">Phát Hiện</h4>
              <p className="text-sm leading-relaxed">{event.details.discovery}</p>
            </div>
            <div>
              <h4 className="font-bold mb-3 text-accent">Ảnh Hưởng</h4>
              <p className="text-sm leading-relaxed">{event.details.impact}</p>
            </div>
            <div>
              <h4 className="font-bold mb-3" style={{ color: "var(--chart-2)" }}>
                Công Nghệ
              </h4>
              <p className="text-sm leading-relaxed">{event.details.technology}</p>
            </div>
            <div>
              <h4 className="font-bold mb-3" style={{ color: "var(--chart-3)" }}>
                Di Sản
              </h4>
              <p className="text-sm leading-relaxed">{event.details.legacy}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
