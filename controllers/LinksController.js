import links from '../models/links.js';
import users from '../models/users.js';
const LinksController={
    getList:async(req, res)=>{
        try{
            const list = await links.find();
            res.json(list)
        }
        catch (e){
            res.status(400).json({message: e.message});
        }
    },

    getById: async (req, res)=>{
        try{
            const link = await links.findById(req.params.id);
            res.json(link);
        }catch (e){
            res.status(400).json({message: e.message});
        }
    },

    add: async (req, res) => {
      const { originalUrl, userID, targetParamName, targetValues } = req.body;
        try {
          const user = await users.findById(userID);
          if (!user)
            return res.status(404).json({ message: "User not found" });    
          const newLink = await links.create({ originalUrl, userID, targetParamName, targetValues });
          
          user.link.push(newLink.userID);
          await user.save();
          res.json(newLink);
        } catch (e) {
          res.status(400).json({ message: e.message });
        }
    },

    update: async (req, res) => {
        const { id } = req.params;
        const { originalUrl } = req.body;
        try {
          const updatedLink = await links.findByIdAndUpdate(id, req.body,
            {originalUrl:originalUrl}, {new:true});//עדכון לפי מזהה
          res.json(updatedLink);
        } catch (e) {
          res.status(400).json({ message: e.message });
        }
    },
    
    delete: async (req, res) => {
      const { id } = req.params;
      const { userId } = req.body;
        try {
          const user = await users.findById(userId);
          if(!user)
            return res.status(401).json({ message: " the user not found" });    
          const deleted = await links.findByIdAndDelete(id);//מחיקה לפי מזהה
          user.links.remove(id);
          await user.save();
          res.json(deleted);
        } catch (e) {
          res.status(400).json({ message: e.message });
        }
      },
      getClicksByLink: async (req, res) => {
        try {
          const link = await links.findById(req.params.id);//שליפה לפי מזהה
          const arr = [];
          link.targetValues.forEach(element => {
            arr.push({ "name": element.name, "value": 0 })
          });
          link.clicks.forEach(click => {
            const a = arr.find(e => e.name == click.targetParamValue)
            if (a) a.value++;
          });
          res.json(arr);
    
        } catch (e) {
          res.status(400).json({ message: e.message });
        }
    
      }
};

export default LinksController;