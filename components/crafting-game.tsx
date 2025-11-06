"use client"

import { useState, useCallback, useMemo } from "react"
import { Sparkles, Zap, Trophy } from "lucide-react"

interface Material {
  id: string
  name: string
  era: string
  icon: string
  color: string
}

interface Recipe {
  id: string
  name: string
  description: string
  inputs: string[]
  output: string
  rarity: "common" | "uncommon" | "rare" | "epic" | "legendary"
  icon: string
  era: string
  historicalFact: string
}

interface CraftedItem {
  id: string
  name: string
  icon: string
  rarity: string
  era: string
  timestamp: number
}

const MATERIALS: Material[] = [
  { id: "stone", name: "Đá", era: "Thời Đá", icon: "🪨", color: "gray" },
  { id: "wood", name: "Gỗ", era: "Thời Đá", icon: "🪵", color: "amber" },
  { id: "copper", name: "Đồng", era: "Thời Đồng", icon: "🟠", color: "orange" },
  { id: "iron", name: "Sắt", era: "Thời Sắt", icon: "⚫", color: "slate" },
  { id: "steel", name: "Thép", era: "Thời Công Nghiệp", icon: "⚙️", color: "zinc" },
  { id: "plastic", name: "Nhựa", era: "Thời Hiện Đại", icon: "🟡", color: "yellow" },
  { id: "silicon", name: "Silicon", era: "Thời Số", icon: "💎", color: "cyan" },
  { id: "graphene", name: "Graphene", era: "Tương Lai", icon: "✨", color: "purple" },
]

const RECIPES: Recipe[] = [
  {
    id: "stone-axe",
    name: "Rìu Đá",
    description: "Công cụ cơ bản từ thời đá",
    inputs: ["stone", "wood"],
    output: "Rìu Đá",
    rarity: "common",
    icon: "🪓",
    era: "Thời Đá",
    historicalFact: "Rìu đá là công cụ đầu tiên giúp con người khai thác tài nguyên hiệu quả hơn",
  },
  {
    id: "bronze-sword",
    name: "Kiếm Đồng",
    description: "Vũ khí từ thời đồng",
    inputs: ["copper", "stone"],
    output: "Kiếm Đồng",
    rarity: "uncommon",
    icon: "⚔️",
    era: "Thời Đồng",
    historicalFact: "Đồng là kim loại đầu tiên được con người sử dụng để tạo vũ khí",
  },
  {
    id: "iron-armor",
    name: "Áo Giáp Sắt",
    description: "Áo giáp bảo vệ từ thời sắt",
    inputs: ["iron", "wood"],
    output: "Áo Giáp Sắt",
    rarity: "rare",
    icon: "🛡️",
    era: "Thời Sắt",
    historicalFact: "Sắt cứng hơn đồng, cho phép tạo ra vũ khí và áo giáp mạnh mẽ hơn",
  },
  {
    id: "steel-sword",
    name: "Kiếm Thép",
    description: "Vũ khí tối ưu từ thời công nghiệp",
    inputs: ["steel", "iron"],
    output: "Kiếm Thép",
    rarity: "epic",
    icon: "⚔️✨",
    era: "Thời Công Nghiệp",
    historicalFact: "Thép là hợp kim của sắt và carbon, mạnh mẽ hơn sắt thuần chủng",
  },
  {
    id: "plastic-container",
    name: "Hộp Nhựa",
    description: "Vật chứa từ thời hiện đại",
    inputs: ["plastic", "silicon"],
    output: "Hộp Nhựa",
    rarity: "uncommon",
    icon: "📦",
    era: "Thời Hiện Đại",
    historicalFact: "Nhựa cách mạng hóa cách chúng ta lưu trữ và vận chuyển hàng hóa",
  },
  {
    id: "smartphone",
    name: "Điện Thoại Thông Minh",
    description: "Thiết bị công nghệ cao từ thời số",
    inputs: ["silicon", "plastic", "steel"],
    output: "Điện Thoại Thông Minh",
    rarity: "epic",
    icon: "📱",
    era: "Thời Số",
    historicalFact: "Silicon là nền tảng của tất cả các thiết bị điện tử hiện đại",
  },
  {
    id: "graphene-battery",
    name: "Pin Graphene",
    description: "Công nghệ pin tương lai",
    inputs: ["graphene", "silicon"],
    output: "Pin Graphene",
    rarity: "legendary",
    icon: "🔋✨",
    era: "Tương Lai",
    historicalFact: "Graphene có thể cách mạng hóa lưu trữ năng lượng và công nghệ",
  },
  {
    id: "ultimate-artifact",
    name: "Tạo Tác Tối Thượng",
    description: "Kết hợp tất cả các vật liệu qua các thời kỳ",
    inputs: ["stone", "copper", "iron", "steel", "plastic", "silicon", "graphene"],
    output: "Tạo Tác Tối Thượng",
    rarity: "legendary",
    icon: "👑✨",
    era: "Tất Cả Thời Kỳ",
    historicalFact: "Sự phát triển của vật liệu là chìa khóa của tiến bộ nhân loại",
  },
]

export default function CraftingGame() {
  const [inventory, setInventory] = useState<Record<string, number>>({
    stone: 5,
    wood: 5,
    copper: 3,
    iron: 3,
    steel: 2,
    plastic: 2,
    silicon: 1,
    graphene: 0,
  })

  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([])
  const [craftedItems, setCraftedItems] = useState<CraftedItem[]>([])
  const [currentRecipe, setCurrentRecipe] = useState<Recipe | null>(null)
  const [isCrafting, setIsCrafting] = useState(false)
  const [message, setMessage] = useState("")
  const [score, setScore] = useState(0)

  const toggleMaterial = useCallback((materialId: string) => {
    setSelectedMaterials((prev) =>
      prev.includes(materialId) ? prev.filter((id) => id !== materialId) : [...prev, materialId],
    )
  }, [])

  const findMatchingRecipe = useMemo(() => {
    const sorted = [...selectedMaterials].sort()
    const recipe = RECIPES.find((r) => {
      const recipeInputs = [...r.inputs].sort()
      return JSON.stringify(sorted) === JSON.stringify(recipeInputs)
    })
    return recipe
  }, [selectedMaterials])

  const getRarityColor = useCallback((rarity: string) => {
    const colors: Record<string, string> = {
      common: "text-gray-400",
      uncommon: "text-blue-400",
      rare: "text-purple-400",
      epic: "text-violet-400",
      legendary: "text-yellow-400",
    }
    return colors[rarity] || "text-gray-400"
  }, [])

  const getRarityBg = useCallback((rarity: string) => {
    const colors: Record<string, string> = {
      common: "bg-gray-900 border-gray-600",
      uncommon: "bg-blue-900 border-blue-600",
      rare: "bg-purple-900 border-purple-600",
      epic: "bg-violet-900 border-violet-600",
      legendary: "bg-yellow-900 border-yellow-600",
    }
    return colors[rarity] || "bg-gray-900 border-gray-600"
  }, [])

  const handleCraft = useCallback(async () => {
    const recipe = findMatchingRecipe

    if (!recipe) {
      setMessage("❌ Công thức không hợp lệ! Thử kết hợp các vật liệu khác.")
      setCurrentRecipe(null)
      return
    }

    setCurrentRecipe(recipe)
    setIsCrafting(true)
    setMessage("⚙️ Đang chế tạo...")

    await new Promise((resolve) => setTimeout(resolve, 2000))

    setInventory((prev) => {
      const newInventory = { ...prev }
      recipe.inputs.forEach((input) => {
        newInventory[input] = (newInventory[input] || 0) - 1
      })
      return newInventory
    })

    const newItem: CraftedItem = {
      id: `${recipe.id}-${Date.now()}`,
      name: recipe.output,
      icon: recipe.icon,
      rarity: recipe.rarity,
      era: recipe.era,
      timestamp: Date.now(),
    }
    setCraftedItems((prev) => [newItem, ...prev])

    const rarityScore = { common: 10, uncommon: 25, rare: 50, epic: 100, legendary: 250 }
    setScore((prev) => prev + rarityScore[recipe.rarity])

    setMessage(`✨ Thành công! Bạn đã tạo ra ${recipe.output}!`)
    setSelectedMaterials([])
    setIsCrafting(false)

    setTimeout(() => setMessage(""), 3000)
  }, [findMatchingRecipe])

  return (
    <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-background to-background/50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-8 h-8 text-primary" />
            <h2 className="text-4xl md:text-5xl font-bold text-balance">Trò Chơi Chế Tạo Vật Liệu</h2>
            <Sparkles className="w-8 h-8 text-primary" />
          </div>
          <p className="text-lg text-muted-foreground mb-4">
            Kết hợp các vật liệu từ các thời kỳ khác nhau để tạo ra những vật phẩm tuyệt vời!
          </p>
          <div className="flex items-center justify-center gap-2 text-2xl font-bold text-primary">
            <Trophy className="w-6 h-6" />
            Điểm: {score}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Material Inventory */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span>📦</span> Kho Vật Liệu
              </h3>

              <div className="space-y-3 max-h-96 overflow-y-auto">
                {MATERIALS.map((material) => (
                  <button
                    key={material.id}
                    onClick={() => toggleMaterial(material.id)}
                    disabled={inventory[material.id] === 0}
                    className={`w-full p-3 rounded-lg border-2 transition-all text-left ${
                      selectedMaterials.includes(material.id)
                        ? "border-primary bg-primary/20"
                        : "border-border bg-card hover:border-primary/50"
                    } ${inventory[material.id] === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{material.icon}</span>
                        <div>
                          <div className="font-semibold">{material.name}</div>
                          <div className="text-xs text-muted-foreground">{material.era}</div>
                        </div>
                      </div>
                      <div className="text-lg font-bold text-primary">{inventory[material.id]}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Middle: Crafting Interface */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-lg p-6 h-full flex flex-col">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span>⚙️</span> Chế Tạo
              </h3>

              {/* Selected Materials */}
              <div className="mb-6 flex-1">
                <div className="text-sm text-muted-foreground mb-2">Vật liệu đã chọn:</div>
                <div className="flex flex-wrap gap-2 min-h-12 p-3 bg-background rounded-lg border border-border">
                  {selectedMaterials.length === 0 ? (
                    <span className="text-muted-foreground text-sm">Chọn vật liệu để bắt đầu...</span>
                  ) : (
                    selectedMaterials.map((id) => {
                      const material = MATERIALS.find((m) => m.id === id)
                      return (
                        <div
                          key={id}
                          className="flex items-center gap-1 px-2 py-1 bg-primary/20 border border-primary rounded-full text-sm"
                        >
                          <span>{material?.icon}</span>
                          <span>{material?.name}</span>
                        </div>
                      )
                    })
                  )}
                </div>
              </div>

              {/* Recipe Preview */}
              {currentRecipe && (
                <div className={`mb-6 p-4 rounded-lg border-2 ${getRarityBg(currentRecipe.rarity)}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-3xl">{currentRecipe.icon}</span>
                    <div>
                      <div className={`font-bold ${getRarityColor(currentRecipe.rarity)}`}>{currentRecipe.name}</div>
                      <div className="text-xs text-muted-foreground">{currentRecipe.era}</div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{currentRecipe.description}</p>
                  <p className="text-xs italic text-muted-foreground">💡 {currentRecipe.historicalFact}</p>
                </div>
              )}

              {/* Message */}
              {message && (
                <div className="mb-4 p-3 bg-primary/20 border border-primary rounded-lg text-sm text-center">
                  {message}
                </div>
              )}

              {/* Craft Button */}
              <button
                onClick={handleCraft}
                disabled={selectedMaterials.length === 0 || isCrafting}
                className="w-full py-3 px-4 bg-primary text-primary-foreground font-bold rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
              >
                <Zap className="w-5 h-5" />
                {isCrafting ? "Đang chế tạo..." : "Chế Tạo"}
              </button>

              <button
                onClick={() => setSelectedMaterials([])}
                className="w-full mt-2 py-2 px-4 bg-secondary text-secondary-foreground font-semibold rounded-lg hover:bg-secondary/90 transition-all"
              >
                Xóa Lựa Chọn
              </button>
            </div>
          </div>

          {/* Right: Crafted Items */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span>🎁</span> Vật Phẩm Tạo Ra ({craftedItems.length})
              </h3>

              <div className="space-y-3 max-h-96 overflow-y-auto">
                {craftedItems.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>Chưa có vật phẩm nào</p>
                    <p className="text-sm">Hãy chế tạo vật phẩm đầu tiên của bạn!</p>
                  </div>
                ) : (
                  craftedItems.map((item) => (
                    <div key={item.id} className={`p-3 rounded-lg border-2 ${getRarityBg(item.rarity)} animate-bounce`}>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{item.icon}</span>
                        <div className="flex-1">
                          <div className={`font-semibold ${getRarityColor(item.rarity)}`}>{item.name}</div>
                          <div className="text-xs text-muted-foreground">{item.era}</div>
                        </div>
                        <div className={`text-xs font-bold px-2 py-1 rounded ${getRarityColor(item.rarity)}`}>
                          {item.rarity.toUpperCase()}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Recipe Guide */}
        <div className="mt-12 bg-card border border-border rounded-lg p-6">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <span>📖</span> Hướng Dẫn Công Thức
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {RECIPES.map((recipe) => (
              <div
                key={recipe.id}
                className={`p-4 rounded-lg border-2 ${getRarityBg(recipe.rarity)} hover:scale-105 transition-transform cursor-help`}
                title={recipe.historicalFact}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{recipe.icon}</span>
                  <div className={`font-bold text-sm ${getRarityColor(recipe.rarity)}`}>{recipe.name}</div>
                </div>
                <div className="text-xs text-muted-foreground mb-2">
                  {recipe.inputs.map((input) => MATERIALS.find((m) => m.id === input)?.icon).join(" + ")}
                </div>
                <div className="text-xs text-muted-foreground">{recipe.era}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
