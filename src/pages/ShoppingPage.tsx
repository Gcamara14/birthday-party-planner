import { ShoppingItemCard } from '../components/ShoppingItemCard'
import { boatQuestions } from '../data/boatQuestions'
import { shoppingCategories, shoppingItems, type ShoppingBlocker } from '../data/shopping'
import { useBoatQuestionAnswers } from '../hooks/useBoatQuestionAnswers'
import { useFoodPlan } from '../hooks/useFoodPlan'
import { useShoppingPlan } from '../hooks/useShoppingPlan'

const blockerPatterns: Record<ShoppingBlocker, RegExp> = {
  food: /outside food allowed|Costco pizzas/i,
  alcohol: /beer allowed|Prosecco|hard liquor|glass bottles|alcohol containers/i,
  cooler: /provide a cooler|drink storage|refrigerator/i,
  cake: /bring a birthday cake/i,
  candles: /birthday candles|flameless candles/i,
  decor: /decorations allowed|balloons allowed|banners\/tape|attachment methods|decorations that are prohibited/i,
  speaker: /bring our own backup speaker/i,
}

export function ShoppingPage() {
  const { plan, updateItem } = useShoppingPlan()
  const { plan: foodPlan, setValue: setFoodValue, setPurchased: setFoodPurchased } = useFoodPlan()
  const { answerFor } = useBoatQuestionAnswers()
  const isBlocked = (blocker?: ShoppingBlocker) => {
    if (!blocker) return false
    const relevant = boatQuestions.filter((question) => blockerPatterns[blocker].test(question.title))
    return relevant.some((question) => answerFor(question.id).status !== 'Answered')
  }
  const packedCount = shoppingItems.filter((item) => plan[item.id]?.packed).length
  const neededCount = shoppingItems.filter((item) => plan[item.id]?.needed ?? item.defaultNeeded).length

  return (
    <section className="master-shopping-page" aria-labelledby="master-shopping-title">
      <header className="master-shopping-heading"><p className="eyebrow">Shopping & packing</p><h1 id="master-shopping-title">Buy it. Pack it. Bring it.</h1><p>A phone-friendly master checklist for everything that needs to make it onto the boat.</p></header>
      <div className="packing-progress"><div><strong>{packedCount}</strong><span>packed</span></div><div><strong>{neededCount}</strong><span>currently needed</span></div><p>Conditional items stay blocked until Aaron's rules are recorded.</p></div>

      <div className="shopping-categories">
        {shoppingCategories.map((category) => {
          const items = shoppingItems.filter((item) => item.category === category)
          const categoryPacked = items.filter((item) => plan[item.id]?.packed).length
          return (
            <section className="master-shopping-category" key={category} aria-labelledby={`shopping-${category.replace(/\W+/g, '-').toLowerCase()}`}>
              <div className="master-category-heading"><h2 id={`shopping-${category.replace(/\W+/g, '-').toLowerCase()}`}>{category}</h2><span>{categoryPacked} / {items.length} packed</span></div>
              <ul>{items.map((item) => {
                const state = plan[item.id] ?? {}
                const purchased = item.foodPlanId ? foodPlan.purchased[item.foodPlanId] ?? false : state.purchased ?? false
                const quantity = item.foodPlanId ? foodPlan.values[item.foodPlanId] ?? state.quantity ?? '' : state.quantity ?? ''
                return <ShoppingItemCard key={item.id} item={item} state={state} blocked={isBlocked(item.blocker)} purchased={purchased} quantity={quantity} onUpdate={(update) => updateItem(item.id, update)} onPurchased={(value) => item.foodPlanId ? setFoodPurchased(item.foodPlanId, value) : updateItem(item.id, { purchased: value })} onQuantity={(value) => item.foodPlanId ? setFoodValue(item.foodPlanId, value) : updateItem(item.id, { quantity: value })} />
              })}</ul>
            </section>
          )
        })}
      </div>
    </section>
  )
}
