import users from '../models/users.js'
import links from '../models/links.js';

const RedirectController = {
    redirect: async (req, res) => {
        try {
            const getLink = await links.findById(req.params.id);
            console.log(getLink);
            if (!getLink)
                return res.status(404).json({ message: "404 the page not found" });

            const target = req.query[getLink.targetParamName]
            let targetValue = null

            if (target)
                targetValue = getLink.targetValues?.find(t => t.value == target)
            const click = {
                insertedAt: new Date(),
                ipAddress: req.ip,
                targetParamValue: targetValue?.name
            }

            await getLink.clicks?.push(click)
            await getLink.save();

            res.redirect(getLink.originalUrl)
        }
        catch (e) {
            res.status(400).json({ message: e.message });
        }
    }
};

export default RedirectController