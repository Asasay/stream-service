import clientPromise from "@lib/mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.query.text)
    try {
      const client = await clientPromise;

      const movies = client.db("sample_mflix").collection("movies");

      const query = {
        $text: { $search: req.query.text.toString() },
      };

      // Return only the `title` of each matched document
      const projection = {
        title: 1,
        poster: 1,
        year: 1,
      };

      // find documents based on our query and projection
      const result = await movies.find(query).project(projection).toArray();

      res.status(200).json(result);
    } catch (e) {
      console.error(e);
    }
  else res.status(500).json({ error: "text empty" });
}
