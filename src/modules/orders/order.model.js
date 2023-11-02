import { DataTypes } from 'sequelize';
import sequelize from '../../config/database/database.js';

const Order = sequelize.define('order', {
    id: {
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      type: DataTypes.INTEGER,
      field: 'order_id'
    },
    mealId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'meal_id'
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull:false,
        field: 'user_id'
    },
    totalPrice: {
        type: DataTypes.FLOAT,
        allowNull: false,
        field: 'total_price'
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status:{
        type: DataTypes.ENUM('active', 'cancelled', 'completed'),
        allowNull: false,
        defaultValue: 'active'
    }
});

export default Order;