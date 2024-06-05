import users from '../models/users.js'
const UserController={
    getList:async(req, res)=>{
        try{
            const user = await users.find();
            res.json(user)
        }
        catch (e){
            res.status(400).json({message: e.message});
        }
    },

    getById: async (req, res)=>{
        try{
            await users.find({_id:req.parans.id})
            const link = await UserModel.findById(req.params.id);
            res.json(link);
        }catch (e){
            res.status(400).json({message: e.message});
        }
    },

    add: async (req, res) => {
        try {
          const newUser = await users.create( req.body );
          res.json(newUser);
        } catch (e) {
          res.status(400).json({ message: e.message });
        }
    },

    update: async (req, res) => {
        const { id } = req.params;
        try {
          const updatedUser = await users.findByIdAndUpdate(id, req.body, {new:true});//עדכון לפי מזהה
          res.json(updatedUser);
        } catch (e) {
          res.status(400).json({ message: e.message });
        }
    },
    
    delete: async (req, res) => {
        const { id } = req.params;
        try {
          const deleted = await users.findByIdAndDelete(id);//מחיקה לפי מזהה
          res.json(deleted);
        } catch (e) {
          res.status(400).json({ message: e.message });
        }
      },
};

export default UserController