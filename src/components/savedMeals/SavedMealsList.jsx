import React from "react"
import SavedMealItem from "./SavedMealItem"

export default function SavedMealsList({ countMealItems, mealItems }) {
  return (
    <div>
      <div className="foodList">
        <SavedMealItem countMealItems={countMealItems} mealItems={mealItems} />
      </div>
    </div>
  )
}
