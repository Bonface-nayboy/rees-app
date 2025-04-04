import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const { name, category } = req.body;
      // Simulate database save (replace with actual DB logic)
      res.status(201).json({ message: "Item created successfully", name, category });
    } catch (error) {
      res.status(500).json({ error: "Failed to create item" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
