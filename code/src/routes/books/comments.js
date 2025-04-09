import express from "express";
import {
  getComments,
  addComment,
} from "../../controllers/commentsController.js";

const router = express.Router({ mergeParams: true });

/**
 * @swagger
 * /api/books/{id}/comments:
 *   get:
 *     tags: [Comments]
 *     summary: Get all comments for a book
 *     description: Retrieve all comments associated with a specific book
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Book ID
 *     responses:
 *       200:
 *         description: List of comments retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   content:
 *                     type: string
 *                   user_id:
 *                     type: integer
 *                   book_id:
 *                     type: integer
 *                   created:
 *                     type: string
 *                     format: date-time
 *       404:
 *         description: Book not found
 *       500:
 *         description: Server error
 */
router.get("/:id/comments", getComments);

/**
 * @swagger
 * /api/books/{id}/comments:
 *   post:
 *     tags: [Comments]
 *     summary: Add a comment to a book
 *     description: Create a new comment for a specific book
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Book ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *               - user_id
 *             properties:
 *               content:
 *                 type: string
 *                 description: The comment text
 *               user_id:
 *                 type: integer
 *                 description: ID of the user making the comment
 *     responses:
 *       201:
 *         description: Comment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     content:
 *                       type: string
 *                     user_id:
 *                       type: integer
 *                     book_id:
 *                       type: integer
 *       400:
 *         description: Invalid request body
 *       404:
 *         description: Book not found
 *       500:
 *         description: Server error
 */
router.post("/:id/comments", addComment);

export default router;
