/**
 * @swagger
 * tags:
 *   - name: Products
 *     description: Product listing, searching and calorie calculation operations
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 6807d6c3e8f7b2c8190c1234
 *         title:
 *           type: string
 *           example: Apple
 *         category:
 *           type: string
 *           example: Fruit
 *         calories:
 *           type: number
 *           example: 52
 *         weight:
 *           type: number
 *           example: 100
 *         createdAt:
 *           type: string
 *           example: 2026-04-23T10:15:00.000Z
 *         updatedAt:
 *           type: string
 *           example: 2026-04-23T10:15:00.000Z
 *
 *     ProductListData:
 *       type: object
 *       properties:
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Product'
 *         page:
 *           type: integer
 *           example: 1
 *         perPage:
 *           type: integer
 *           example: 10
 *         totalItems:
 *           type: integer
 *           example: 50
 *         totalPages:
 *           type: integer
 *           example: 5
 *         hasPreviousPage:
 *           type: boolean
 *           example: false
 *         hasNextPage:
 *           type: boolean
 *           example: true
 *
 *     ProductListResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: integer
 *           example: 200
 *         message:
 *           type: string
 *           example: Products fetched successfully
 *         data:
 *           $ref: '#/components/schemas/ProductListData'
 *
 *     DailyCaloriesRequest:
 *       type: object
 *       required:
 *         - age
 *         - height
 *         - weight
 *         - gender
 *         - activityLevel
 *       properties:
 *         age:
 *           type: integer
 *           example: 25
 *         height:
 *           type: number
 *           example: 180
 *         weight:
 *           type: number
 *           example: 75
 *         gender:
 *           type: string
 *           enum: [male, female]
 *           example: male
 *         activityLevel:
 *           type: string
 *           enum: [sedentary, light, moderate, active, veryActive]
 *           example: moderate
 *
 *     DailyCaloriesResult:
 *       type: object
 *       properties:
 *         bmr:
 *           type: integer
 *           example: 1730
 *         dailyCalories:
 *           type: integer
 *           example: 2682
 *         activityLevel:
 *           type: string
 *           example: moderate
 *
 *     DailyCaloriesResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: integer
 *           example: 200
 *         message:
 *           type: string
 *           example: Daily calories calculated successfully
 *         data:
 *           $ref: '#/components/schemas/DailyCaloriesResult'
 *
 *     BasicErrorResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: integer
 *           example: 400
 *         message:
 *           type: string
 *           example: Search query "q" is required
 */

/**
 * @swagger
 * /api/product:
 *   get:
 *     summary: Get products list
 *     description: Returns a paginated list of products with optional filters and sorting.
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: perPage
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page
 *       - in: query
 *         name: category
 *         required: false
 *         schema:
 *           type: string
 *         description: Filter products by category
 *         example: Fruit
 *       - in: query
 *         name: minCalories
 *         required: false
 *         schema:
 *           type: number
 *         description: Minimum calories filter
 *         example: 10
 *       - in: query
 *         name: maxCalories
 *         required: false
 *         schema:
 *           type: number
 *         description: Maximum calories filter
 *         example: 300
 *       - in: query
 *         name: sortBy
 *         required: false
 *         schema:
 *           type: string
 *           enum: [title, category, calories, createdAt]
 *         description: Sort field
 *         example: title
 *       - in: query
 *         name: sortOrder
 *         required: false
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: Sort direction
 *         example: asc
 *     responses:
 *       200:
 *         description: Products fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductListResponse'
 *       400:
 *         description: Invalid query parameters
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BasicErrorResponse'
 */

/**
 * @swagger
 * /api/product/search:
 *   get:
 *     summary: Search products
 *     description: Search products by title or category.
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema:
 *           type: string
 *         description: Search text
 *         example: apple
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: perPage
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: Search completed successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductListResponse'
 *       400:
 *         description: Search query is required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BasicErrorResponse'
 */

/**
 * @swagger
 * /api/product/calculate-daily-calories:
 *   post:
 *     summary: Calculate daily calories
 *     description: Calculates daily calorie need using body information and activity level.
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DailyCaloriesRequest'
 *     responses:
 *       200:
 *         description: Daily calories calculated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DailyCaloriesResponse'
 *       400:
 *         description: Invalid request body
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BasicErrorResponse'
 */

export {};