import { DataTypes } from 'sequelize';
import sequelize from '../../config/database/database.js';

const Review = sequelize.define('review', {
    id: {
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      type: DataTypes.INTEGER,
      field: 'review_id'
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field:'user_id'
    },
    comment: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    restaurantId: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
    rating: {
        type: DataTypes.FLOAT,
        allowNull:false
    },
    status:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    }
});

export default Review;