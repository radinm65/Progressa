import "./meal-card.css";

export function MealCard({ meal, onClick }) {
  const date = new Date(meal.created_at);

  const formattedDate = date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const calories = Math.round((meal.calories / 100) * meal.amount);

  const protein = Math.round((meal.protein / 100) * meal.amount);

  return (
    <div className="meal-card" onClick={() => onClick(meal)}>
      <img src={`/${meal.image_url}`} alt={meal.name} className="meal-image" />

      <div className="meal-main">
        <div className="meal-header">
          <div>
            <h4>{meal.name}</h4>
            <span>{meal.category}</span>
          </div>
        </div>
        <div>
          <small>Amount</small>
          <strong>{meal.amount}g</strong>
        </div>
        <div>
          <small>Calories</small>
          <strong>{calories} kcal</strong>
        </div>
        <div>
          <small>Protein</small>
          <strong>{protein}g</strong>
        </div>
        <time>{formattedDate}</time>
      </div>
      <div className="meal-arrow">→</div>

    </div>
  );
}
