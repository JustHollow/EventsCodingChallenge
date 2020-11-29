import { NextApiRequest, NextApiResponse } from "next";
import firebaseAdmin from "fb/node";

const questionsHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { displayName, password, email, role } = req.body;

        const fbAuth = firebaseAdmin.auth();

        if (!displayName || !password || !email || !role) {
            return res.status(400).send({ message: "Missing fields" });
        }

        const { uid } = await fbAuth.createUser({
            displayName,
            password,
            email,
        });

        await fbAuth.setCustomUserClaims(uid, { role });

        return res.status(200).send({ uid });
    } catch (err) {
        res.status(500).json({ statusCode: 500, message: err.message });
    }
};

export default questionsHandler;
