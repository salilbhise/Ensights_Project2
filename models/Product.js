/* eslint-disable camelcase */
module.exports = function(sequelize, DataTypes) {
    const Product = sequelize.define("Product", {
        type: DataTypes.ENUM("dryer", "washer", "dishwasher", "fridge"),
        brand_name: DataTypes.STRING,
        additional_model_information: DataTypes.STRING,
        model_number: DataTypes.STRING,
        meets_most_efficient_criteria: DataTypes.STRING
    });
    return Product;
};
