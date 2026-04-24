/**
 * @swagger
 * tags:
 *   - name: Diary
 *     description: Daily food tracking operations
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     AddDiaryRequest:
 *       type: object
 *       required:
 *         - productId
 *         - date
 *         - amount
 *         - calories
 *       properties:
 *         productId:
 *           type: string
 *           pattern: '^[0-9a-fA-F]{24}$'
 *           example: '5d51694902b2373622ff5770'
 *         date:
 *           type: string
 *           pattern: '^\d{4}-\d{2}-\d{2}$'
 *           example: '2024-01-15'
 *           description: Date in YYYY-MM-DD format
 *         amount:
 *           type: number
 *           minimum: 0.000001
 *           example: 150
 *           description: Amount in grams
 *         calories:
 *           type: number
 *           minimum: 0.000001
 *           example: 320
 *     DiaryEntry:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: '664f7ad9c5a0f6049a4b4d31'
 *         userId:
 *           type: string
 *           example: '664f7a31c5a0f6049a4b4d30'
 *         productId:
 *           type: string
 *           example: '5d51694902b2373622ff5770'
 *         date:
 *           type: string
 *           pattern: '^\d{4}-\d{2}-\d{2}$'
 *           example: '2024-01-15'
 *         amount:
 *           type: number
 *           example: 150
 *         calories:
 *           type: number
 *           example: 320
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     DiaryListResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           example: success
 *         code:
 *           type: integer
 *           example: 200
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/DiaryEntry'
 *     DiaryCreateResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           example: success
 *         code:
 *           type: integer
 *           example: 201
 *         message:
 *           type: string
 *           example: Diary created successfully
 *         data:
 *           $ref: '#/components/schemas/DiaryEntry'
 *     DiaryDeleteResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           example: success
 *         code:
 *           type: integer
 *           example: 200
 *         message:
 *           type: string
 *           example: Record successfully deleted.
 *         data:
 *           $ref: '#/components/schemas/DiaryEntry'
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           example: error
 *         code:
 *           type: integer
 *           example: 400
 *         message:
 *           type: string
 *           example: Invalid date format. Use YYYY-MM-DD.
 */

/**
 * @swagger
 * /api/diary:
 *   get:
 *     summary: Get diary entries for current user
 *     tags: [Diary]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: date
 *         required: false
 *         schema:
 *           type: string
 *           pattern: '^\d{4}-\d{2}-\d{2}$'
 *         description: Filter by date in YYYY-MM-DD format
 *     responses:
 *       200:
 *         description: Diary entries fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DiaryListResponse'
 *       400:
 *         description: Invalid query format
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Unauthorized
 *   post:
 *     summary: Create a new diary entry
 *     tags: [Diary]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddDiaryRequest'
 *     responses:
 *       201:
 *         description: Diary entry created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DiaryCreateResponse'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/diary/{id}:
 *   delete:
 *     summary: Delete diary entry by id
 *     tags: [Diary]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           pattern: '^[0-9a-fA-F]{24}$'
 *         description: Diary entry id
 *     responses:
 *       200:
 *         description: Diary entry deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DiaryDeleteResponse'
 *       400:
 *         description: Invalid id format
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Entry not found
 */

export {};
