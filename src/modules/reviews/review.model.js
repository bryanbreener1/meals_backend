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
        allowNull:false,
        field: 'restaurant_id'
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
    status:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    }
},{
    indexes:[
        {
            unique:true,
            fields:['restaurant_id','user_id']
        }
    ]
});

export default Review;