"use client"

import { useState } from "react"

export default function InteractiveTimeline() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0)
  const [selectedMaterial, setSelectedMaterial] = useState<string | null>(null)

  const events = [
    {
      year: "3000 TCN",
      title: "Thời đại Đá",
      description: "Con người bắt đầu sử dụng đá để tạo công cụ, nền tảng của nền văn minh đầu tiên",
      icon: "🪨",
      details:
        "Đá là vật liệu đầu tiên được con người sử dụng. Nó cho phép tạo ra công cụ, vũ khí và nơi trú ẩn. Sự phát triển của công cụ đá đã thay đổi hoàn toàn cách con người sống và phát triển.",
      impact: "Tạo nền tảng cho nền văn minh",
    },
    {
      year: "1200 TCN",
      title: "Thời đại Đồng",
      description: "Phát hiện hợp kim đồng, mở ra kỷ nguyên mới của công nghệ và thương mại",
      icon: "⚙️",
      details:
        "Đồng là kim loại đầu tiên được con người sử dụng. Hợp kim đồng-thiếc tạo ra thép, vật liệu mạnh hơn và bền hơn. Điều này dẫn đến sự phát triển của thương mại và giao thương.",
      impact: "Cách mạng công nghệ và thương mại",
    },
    {
      year: "1200 SCN",
      title: "Thời đại Sắt",
      description: "Sắt trở thành vật liệu chủ đạo, cách mạng nông nghiệp và quân sự",
      icon: "🔨",
      details:
        "Sắt dễ tìm kiếm hơn đồng và có tính chất tốt hơn. Nó cho phép tạo ra công cụ nông nghiệp tốt hơn, vũ khí mạnh hơn và cơ sở hạ tầng bền vững hơn.",
      impact: "Cách mạng nông nghiệp và quân sự",
    },
    {
      year: "1760",
      title: "Cách mạng Công nghiệp",
      description: "Thép được sản xuất hàng loạt, xây dựng cơ sở hạ tầng hiện đại",
      icon: "🏭",
      details:
        "Phương pháp Bessemer cho phép sản xuất thép hàng loạt với chi phí thấp. Điều này dẫn đến sự phát triển của đường sắt, cầu, tòa nhà cao tầng và máy móc công nghiệp.",
      impact: "Xây dựng cơ sở hạ tầng hiện đại",
    },
    {
      year: "1950",
      title: "Kỷ nguyên Nhựa",
      description: "Nhựa tổng hợp thay đổi sản xuất, tiêu dùng và kinh tế toàn cầu",
      icon: "♻️",
      details:
        "Nhựa tổng hợp rẻ, nhẹ và dễ tạo hình. Nó được sử dụng trong mọi thứ từ đồ gia dụng đến công nghệ. Nhựa đã thay đổi cách chúng ta sống và tiêu dùng.",
      impact: "Cách mạng tiêu dùng toàn cầu",
    },
    {
      year: "2000+",
      title: "Vật liệu Tương lai",
      description: "Composite, graphene, và vật liệu bền vững định hình tương lai",
      icon: "🚀",
      details:
        "Graphene, carbon fiber, và các vật liệu bền vững đang định hình tương lai. Chúng có tính chất vượt trội và thân thiện với môi trường. Những vật liệu này sẽ cách mạng hóa công nghệ, năng lượng và vận chuyển.",
      impact: "Định hình tương lai bền vững",
    },
  ]

  return (
    <section id="timeline" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto relative z-10">
      <div className="text-center mb-16">
        <h2 className="text-4xl sm:text-5xl font-bold mb-4">Dòng thời gian tương tác</h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Nhấp vào các sự kiện để khám phá chi tiết. Từ những công cụ đá đơn giản đến các vật liệu tương lai
        </p>
      </div>

      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary via-accent to-primary" />

        {/* Timeline Events */}
        <div className="space-y-8">
          {events.map((event, index) => (
            <div
              key={index}
              className={`flex gap-8 animate-slide-in-up cursor-pointer ${
                index % 2 === 0 ? "flex-row" : "flex-row-reverse"
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
            >
              {/* Content */}
              <div className="w-full sm:w-5/12">
                <div
                  className={`bg-card border rounded-lg p-6 transition-all duration-300 transform hover:scale-105 ${
                    expandedIndex === index
                      ? "border-primary bg-card/80 shadow-lg shadow-primary/20 scale-105"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="text-3xl">{event.icon}</div>
                    <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">{event.year}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                  <p className="text-muted-foreground text-sm mb-3">{event.description}</p>

                  {/* Expanded Content */}
                  {expandedIndex === index && (
                    <div className="mt-4 pt-4 border-t border-border/50 animate-scale-up">
                      <p className="text-foreground mb-3">{event.details}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-primary font-semibold text-sm">💡 {event.impact}</span>
                      </div>
                    </div>
                  )}

                  <div className="mt-3 text-xs text-muted-foreground">
                    {expandedIndex === index ? "Nhấp để đóng" : "Nhấp để xem chi tiết"}
                  </div>
                </div>
              </div>

              {/* Timeline Dot */}
              <div className="w-2/12 flex justify-center">
                <div
                  className={`w-4 h-4 bg-primary rounded-full border-4 border-background mt-6 transition-all ${
                    expandedIndex === index ? "animate-pulse-glow scale-150" : ""
                  }`}
                />
              </div>

              {/* Spacer */}
              <div className="w-5/12 hidden sm:block" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
