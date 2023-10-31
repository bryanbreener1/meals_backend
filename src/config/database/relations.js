import Review from "../../modules/reviews/review.model.js";
import User from "../../modules/users/user.model.js";
import Restaurant from '../../modules/restaurants/restaurant.model.js'
import Order from "../../modules/orders/order.model.js";
import Meal from "../../modules/meals/meal.model.js";

export const relations = () => {
    User.hasMany(Review,{foreignKey: 'user_id', as:'userCreateReview'})
    Review.belongsTo(User,{foreignKey: 'user_id'})

    Restaurant.hasMany(Review,{foreignKey: 'restaurant_id', as:'restaurantHasReviews'})
    Review.belongsTo(Restaurant,{foreignKey: 'restaurant_id'})

    Restaurant.hasMany(Meal,{foreignKey:'restaurant_id', as:'restaurantHasMeals'})
    Meal.belongsTo(Restaurant,{foreignKey:'restaurant_id', as:'mealBelongsRestaurant'})

    Order.belongsTo(Meal, {foreignKey:'meal_id', as:'mealHasOneOrder'})

    User.hasMany(Order, {foreignKey:'user_id', as:'userHasOrders'})
    Order.belongsTo(User, {foreignKey:'user_id'})

} 