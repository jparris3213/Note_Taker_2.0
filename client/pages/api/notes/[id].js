import dbConnect from '../../../lib/dbConnect'
import Note from '../../../models/Note'

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req

  await dbConnect()

  switch (method) {
    case 'GET' /* Get a model by its ID */:
      try {
        const note = await Note.findById(id)
        if (!note) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: note })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'PUT' /* Edit a model by its ID */:
      try {
        const note = await Note.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        })
        if (!note) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: note })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'DELETE' /* Delete a model by its ID */:
      try {
        const deletedNote = await Note.deleteOne({ _id: id })
        if (!deletedNote) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: {} })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    default:
      res.status(400).json({ success: false })
      break
  }
}
