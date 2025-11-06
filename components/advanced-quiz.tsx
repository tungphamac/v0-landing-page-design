"use client"

import { useState } from "react"

interface QuizQuestion {
  id: number
  question: string
  options: string[]
  correct: number
  explanation: string
  difficulty: "easy" | "medium" | "hard"
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "Vật liệu nào được sử dụng đầu tiên trong lịch sử nhân loại?",
    options: ["Thép", "Đá", "Nhựa", "Bán dẫn"],
    correct: 1,
    explanation: "Đá là vật liệu đầu tiên được con người sử dụng, từ 3 triệu năm trước để tạo công cụ.",
    difficulty: "easy",
  },
  {
    id: 2,
    question: "Quy trình Bessemer (1856) chủ yếu giải quyết vấn đề gì?",
    options: ["Giảm chi phí sản xuất thép", "Tăng độ cứng của sắt", "Phát minh ra thép", "Cải thiện màu sắc của thép"],
    correct: 0,
    explanation: "Quy trình Bessemer cho phép sản xuất thép hàng loạt, giảm giá thép 90% trong 30 năm.",
    difficulty: "medium",
  },
  {
    id: 3,
    question: "Transistor được phát minh năm bao nhiêu?",
    options: ["1920", "1947", "1960", "1980"],
    correct: 1,
    explanation: "Transistor được phát minh tại Bell Labs năm 1947, thay thế ống chân không.",
    difficulty: "medium",
  },
  {
    id: 4,
    question: "Graphene mạnh hơn thép bao nhiêu lần?",
    options: ["50 lần", "100 lần", "200 lần", "500 lần"],
    correct: 2,
    explanation: "Graphene mạnh hơn thép 200 lần nhưng mỏng hơn một lớp nguyên tử.",
    difficulty: "hard",
  },
  {
    id: 5,
    question: "Vật liệu nào có tiềm năng cứu hành tinh trong tương lai?",
    options: ["Thép", "Nhựa truyền thống", "Vật liệu sinh học", "Aluminum"],
    correct: 2,
    explanation: "Vật liệu sinh học từ nấm, tảo, rơm rạ có thể phân hủy hoàn toàn và giảm phát thải carbon.",
    difficulty: "medium",
  },
]

export default function AdvancedQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [answered, setAnswered] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [quizComplete, setQuizComplete] = useState(false)

  const question = quizQuestions[currentQuestion]

  const handleAnswer = (optionIndex: number) => {
    setSelectedAnswer(optionIndex)
    setAnswered(true)

    if (optionIndex === question.correct) {
      setScore(score + 1)
    }
  }

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setAnswered(false)
      setSelectedAnswer(null)
    } else {
      setQuizComplete(true)
    }
  }

  const handleRestart = () => {
    setCurrentQuestion(0)
    setScore(0)
    setAnswered(false)
    setSelectedAnswer(null)
    setQuizComplete(false)
  }

  if (quizComplete) {
    const percentage = (score / quizQuestions.length) * 100

    return (
      <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-card/30 to-background">
        <div className="max-w-2xl mx-auto">
          <div className="bg-gradient-to-br from-card to-background border-2 border-primary rounded-2xl p-12 text-center animate-scale-up">
            <div className="text-6xl mb-6">
              {percentage === 100 ? "🏆" : percentage >= 80 ? "🎉" : percentage >= 60 ? "👍" : "📚"}
            </div>

            <h2 className="text-4xl font-bold mb-4">Hoàn Thành!</h2>
            <p className="text-2xl text-primary font-bold mb-2">
              {score}/{quizQuestions.length} Câu Đúng
            </p>
            <p className="text-xl text-muted-foreground mb-8">{percentage.toFixed(0)}%</p>

            <div className="bg-primary/10 border border-primary/20 rounded-lg p-6 mb-8 text-left">
              <p className="font-bold mb-3">Đánh Giá:</p>
              {percentage === 100 && <p>Tuyệt vời! Bạn là chuyên gia lịch sử vật liệu!</p>}
              {percentage >= 80 && percentage < 100 && <p>Rất tốt! Bạn hiểu rõ về lịch sử vật liệu.</p>}
              {percentage >= 60 && percentage < 80 && <p>Tốt! Bạn có kiến thức cơ bản tốt.</p>}
              {percentage < 60 && <p>Hãy xem lại các phần để hiểu rõ hơn!</p>}
            </div>

            <button
              onClick={handleRestart}
              className="px-8 py-3 bg-gradient-to-r from-primary to-accent text-primary-foreground font-bold rounded-lg hover:shadow-lg hover:shadow-primary/50 transition-all hover:scale-105"
            >
              Làm Lại
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-background to-card/20">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-balance">Quiz Nâng Cao</h2>
        <p className="text-center text-muted-foreground mb-12 text-balance">
          Kiểm tra kiến thức của bạn về lịch sử vật liệu
        </p>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium">
              Câu {currentQuestion + 1}/{quizQuestions.length}
            </span>
            <span className="text-sm font-medium text-primary">
              {question.difficulty === "easy" && "Dễ"}
              {question.difficulty === "medium" && "Trung Bình"}
              {question.difficulty === "hard" && "Khó"}
            </span>
          </div>
          <div className="w-full bg-card rounded-full h-2 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-gradient-to-br from-card to-background border-2 border-border rounded-2xl p-8 mb-8 animate-scale-up">
          <h3 className="text-2xl font-bold mb-8">{question.question}</h3>

          {/* Options */}
          <div className="space-y-3 mb-8">
            {question.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => !answered && handleAnswer(idx)}
                disabled={answered}
                className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                  selectedAnswer === idx
                    ? idx === question.correct
                      ? "border-green-500 bg-green-500/10"
                      : "border-red-500 bg-red-500/10"
                    : answered && idx === question.correct
                      ? "border-green-500 bg-green-500/10"
                      : "border-border hover:border-primary/50"
                } ${answered ? "cursor-default" : "cursor-pointer hover:scale-105"}`}
              >
                <div className="flex items-center justify-between">
                  <span>{option}</span>
                  {answered && idx === question.correct && <span className="text-green-500">✓</span>}
                  {answered && selectedAnswer === idx && idx !== question.correct && (
                    <span className="text-red-500">✗</span>
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Explanation */}
          {answered && (
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-8 animate-scale-up">
              <p className="font-bold mb-2">Giải Thích:</p>
              <p className="text-sm">{question.explanation}</p>
            </div>
          )}

          {/* Next Button */}
          {answered && (
            <button
              onClick={handleNext}
              className="w-full py-3 bg-gradient-to-r from-primary to-accent text-primary-foreground font-bold rounded-lg hover:shadow-lg hover:shadow-primary/50 transition-all hover:scale-105 animate-scale-up"
            >
              {currentQuestion === quizQuestions.length - 1 ? "Hoàn Thành" : "Câu Tiếp Theo"}
            </button>
          )}
        </div>

        {/* Score Display */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Điểm hiện tại: <span className="text-primary font-bold">{score}</span>
          </p>
        </div>
      </div>
    </section>
  )
}
