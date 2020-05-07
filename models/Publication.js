module.exports = (sequelize, DataTypes) => {
  const Publication = sequelize.define(
    "Publication",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      like: DataTypes.INTEGER,
      create_ate: DataTypes.DATE,
      update_at: DataTypes.DATE,
      users_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      
    },
    {
      timestamps: false, // não cria o create_at e update.
      
    }
  );

  Publication.associate = (models) => {
    Publication.belongsTo(models.User, {
      foreignKey: "users_id",
      as: "user",
    });

    Publication.hasMany(models.Comment, {
      foreignKey: "publications_id",
      as: 'comments'
    });
  };

  

  return Publication;
};
