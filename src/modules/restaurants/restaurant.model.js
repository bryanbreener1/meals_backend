import sequelize from "../../config/database/database.js";
import { DataTypes, ENUM } from "sequelize";

const Restaurant = sequelize.define('restaurant', {
    id: {
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      type: DataTypes.INTEGER,
      field: 'restaurant_id'
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address:{
        type: DataTypes.STRING,
        allowNull: false
    },
    rating:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    status:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue:true
    }
});

export default Restaurant;