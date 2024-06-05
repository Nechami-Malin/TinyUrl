import users from '../models/users.js'
import links from '../models/links.js';

const RedirectController = {

    // redirect: async (req, res) => {
    //     try {
    //         const { linkId } = req.params; // Assume linkId is passed as a URL parameter
    //         const link = await links.findById(linkId);

    //         if (!link) {
    //             return res.status(404).json({ message: 'Link not found' });
    //         }

    //         const targetParamValue = req.query[link.targetParamName] || '';
    //         const ipAddress = req.ip;

    //         // Check for duplicate click
    //         const duplicateClick = link.clicks.find(click => click.ipAddress === ipAddress && click.targetParamValue === targetParamValue);

    //         if (!duplicateClick) {
    //             link.clicks.push({
    //                 insertedAt: new Date(),
    //                 ipAddress: ipAddress,
    //                 targetParamValue: targetParamValue
    //             });

    //             // Update the count of the corresponding target value
    //             const targetValue = link.targetValues.find(value => value.value === targetParamValue);
    //             if (targetValue) {
    //                 targetValue.clicksCount = (targetValue.clicksCount || 0) + 1;
    //             } else if (targetParamValue) {
    //                 link.targetValues.push({
    //                     name: targetParamValue,
    //                     value: targetParamValue,
    //                     clicksCount: 1
    //                 });
    //             }

    //             await link.save();
    //         }

    //         res.redirect(link.originalUrl);
    //     } catch (e) {
    //         res.status(400).json({ message: e.message });
    //     }
    // },
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