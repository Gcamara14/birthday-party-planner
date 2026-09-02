import { boatQuestions } from '../data/boatQuestions'
import { foodPlanFields, knownFoodDirection } from '../data/foodPlan'
import { eventDetails } from '../data/event'
import { useBoatQuestionAnswers } from '../hooks/useBoatQuestionAnswers'
import { useFoodPlan } from '../hooks/useFoodPlan'
import type { FoodPlanField } from '../data/foodPlan'

const blockerPatterns = {
  alcohol: /beer allowed|prosecco|hard liquor|glass bottles|alcohol containers/i,
  byob: /BYOB allowed/i,
  cooler: /provide a cooler|drink storage|refrigerator/i,
}

export function FoodPage() {
  const { plan, setValue, setPurchased } = useFoodPlan()
  const { answerFor } = useBoatQuestionAnswers()
  const isResolved = (blocker: NonNullable<FoodPlanField['blocker']>) => {
    const relevant = boatQuestions.filter((question) => blockerPatterns[blocker].test(question.title))
    return relevant.length > 0 && relevant.every((question) => answerFor(question.id).status === 'Answered')
  }
  const plannedItems = foodPlanFields.filter((field) => field.shoppingItem)
  const checkedCount = plannedItems.filter((field) => plan.purchased[field.id]).length

  return (
    <section className="food-page" aria-labelledby="food-title">
      <div className="food-heading">
        <p className="eyebrow">Food & drinks</p>
        <h1 id="food-title">Plan quantities, then shop.</h1>
        <p>Keep estimates in one place without treating them as final purchasing decisions.</p>
      </div>

      <aside className="guest-ask"><div><span>Primary guest ask</span><strong>${eventDetails.cost.suggestedContribution} suggested contribution</strong></div><p>BYOB may be mentioned only if Aaron confirms it.</p></aside>

      <section className="known-direction" aria-labelledby="direction-title">
        <div className="food-section-heading"><div><p className="eyebrow">Current direction</p><h2 id="direction-title">What hosts plan to provide</h2></div><span className="direction-label">Direction, not quantities</span></div>
        <ul>{knownFoodDirection.map((item) => <li key={item}>{item}</li>)}</ul>
        <div className={`byob-status ${isResolved('byob') ? 'rules-recorded' : ''}`}><strong>{isResolved('byob') ? 'BYOB answer recorded' : 'BYOB is pending'}</strong><span>{isResolved('byob') ? "Review Aaron's recorded answer before messaging guests." : 'Waiting on Aaron before including BYOB in Partiful.'}</span></div>
      </section>

      <section className="quantity-planner" aria-labelledby="quantity-title">
        <div className="food-section-heading"><div><p className="eyebrow">Editable plan</p><h2 id="quantity-title">Quantities & requirements</h2></div></div>
        <div className="planner-grid">
          {foodPlanFields.map((field) => {
            const blocked = field.blocker && !isResolved(field.blocker)
            return (
              <label className={`planner-field ${blocked ? 'planner-blocked' : ''}`} key={field.id}>
                <span className="planner-label"><strong>{field.label}</strong>{blocked && <em>Waiting on Aaron</em>}{field.blocker && !blocked && <em className="resolved-tag">Rules recorded</em>}</span>
                <span className="input-with-unit"><input type={field.type} min={field.type === 'number' ? 0 : undefined} inputMode={field.type === 'number' ? 'numeric' : 'text'} value={plan.values[field.id] ?? ''} placeholder={field.placeholder} onChange={(event) => setValue(field.id, event.target.value)} />{field.unit && <span>{field.unit}</span>}</span>
                {field.note && <small>{field.note}</small>}
              </label>
            )
          })}
        </div>
      </section>

      <section className="shopping-section" aria-labelledby="shopping-title">
        <div className="food-section-heading"><div><p className="eyebrow">Eventual checklist</p><h2 id="shopping-title">Shopping progress</h2></div><span className="shopping-count">{checkedCount} / {plannedItems.length}</span></div>
        <p className="shopping-intro">Checking an item means it has been purchased or secured. Blank quantities remain undecided.</p>
        <ul className="shopping-list">
          {plannedItems.map((field) => (
            <li key={field.id}>
              <label><input type="checkbox" checked={plan.purchased[field.id] ?? false} onChange={(event) => setPurchased(field.id, event.target.checked)} /><span><strong>{field.shoppingItem}</strong><small>{plan.values[field.id] || 'Quantity not decided'}</small></span></label>
              {field.blocker && !isResolved(field.blocker) && <span className="shopping-blocked">Blocked</span>}
            </li>
          ))}
        </ul>
      </section>
    </section>
  )
}
