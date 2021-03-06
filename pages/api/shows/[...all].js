import nc from 'next-connect';
import checkAuth from 'database/middleware/checkauth'
import connectToDb from 'database/db';
import { checkRole } from 'database/utils/tools'

import { addShow, paginateShows, removeById, updateBySlug, getAllShows } from 'database/services/showService';


const handler = nc();


handler.post("/api/shows/add_show", checkAuth, async (req, res) => {
    try {
        await connectToDb();
        /// permission

        const permission = await checkRole(req, ['createAny', 'shows']);
        if (!permission) {
            return res.status(401).json({ message: 'Unauthorized' })
        }

        const show = await addShow(req)
        res.status(200).json({ show })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

handler.post("/api/shows/paginate", async (req, res) => {
    await connectToDb();
    try {
        const page = req.body.page ? req.body.page : 1;
        const limit = req.body.limit ? req.body.limit : 5;

        const shows = await paginateShows(page, limit);
        res.status(200).json(shows);
    } catch (error) {
        res.status(400).json({ message: 'Oops I did it again' })
    }
})


handler.delete("/api/shows/remove", checkAuth, async (req, res) => {
    await connectToDb();
    try {
        /// permission
        const permission = await checkRole(req, ['deleteAny', 'shows']);
        if (!permission) {
            return res.status(401).json({ message: 'Unauthorized' })
        }

        const show = await removeById(req.body.id);
        res.status(200).json(show);
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})


handler.patch("/api/shows/edit", checkAuth, async (req, res) => {
    try {
        await connectToDb();
        /// permission
        const permission = await checkRole(req, ['updateAny', 'shows']);
        if (!permission) {
            return res.status(401).json({ message: 'Unauthorized' })
        }

        const slug = req.body.current;
        const show = await updateBySlug(slug, req.body.data);
        res.status(200).json(show);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})




handler.get("/api/shows/getAll", async (req, res) => {
    try {
        await connectToDb();
        const sortBy = req.query.sort ? req.query.sort : '_id';
        const order = req.query.order ? req.query.order : 'desc';
        const limit = req.query.limit ? req.query.limit : '10';
        const skip = req.query.skip ? req.query.skip : '0';

        const shows = await getAllShows(sortBy, order, limit, skip);
        res.status(200).json({ shows: shows })
    } catch (error) {
        res.status(400).json({ message: 'Try again later', error: error })
    }
})


export default handler;