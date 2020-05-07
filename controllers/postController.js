const { Publication, User, Comment } = require("../models");
const moment = require('moment')
const postController = {
  create: (_req, res) => res.render("post"),

  store: async (req, res) => {
    const [photo] = req.files;
    const { user } = req.session;

    const newPost = await Publication.create({
      image: `/posts/${photo.filename}`,
      like: 0,
      users_id: user.id,
      create_ate: new Date(), 
      update_at: new Date(),
    });

    return res.redirect("/home");
  },

  delete: async (req, res) => {
    const { user } = req.session;
    const {publicationId} = req.params;

    const deletePost = await Publication.destroy({
      where: [{id:publicationId },
      ]
    });

    return res.redirect("/home");
  },

  index: async (req,res) => {
      const {user} = req.session;
      const publications = await Publication.findAll({
        limit: 10, //
        include:[ {
          model: User,
          as: 'user',
        },{
          model: Comment,
          as:'comments',
          include: {
            model: User,
          as: 'user',
          }
        }],

        order: [['create_ate', 'DESC']],
        
        })

      return res.render('index', {publications, moment})

  }

  
};



module.exports = postController;
