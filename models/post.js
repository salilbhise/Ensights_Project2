// sign in functionality
module.exports = function(sequelize, DataTypes) {
    const Post = sequelize.define("Post", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        body: {
            type: DataTypes.TEXT,
            allowNull: false,
            len: [1]
        }
    });

    Post.associate = function(models) {
        Post.belongsTo(models.multipleUsers, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Post;
};
