import clientPromise from "../../lib/mongodb";

export default async (req, res) => {
   try {
       const client = await clientPromise;
       const db = client.db("notetaker2");

       const notes = await db
           .collection("notes")
           .find({})
           .sort({ metacritic: -1 })
           .limit(10)
           .toArray();

       res.json(notes);
   } catch (e) {
       console.error(e);
   }
};