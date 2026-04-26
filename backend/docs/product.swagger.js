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
 *         - height
 *         - age
 *         - currentWeight
 *         - desiredWeight
 *         - bloodType
 *       properties:
 *         height:
 *           type: number
 *           example: 180
 *         age:
 *           type: number
 *           example: 25
 *         currentWeight:
 *           type: number
 *           example: 80
 *         desiredWeight:
 *           type: number
 *           example: 70
 *         bloodType:
 *           type: number
 *           enum: [1, 2, 3, 4]
 *           example: 1
 *
 *     NotRecommendedProduct:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 6807d6c3e8f7b2c8190c1234
 *         title:
 *           type: string
 *           example: Pork
 *         category:
 *           type: string
 *           example: Meat
 *         calories:
 *           type: number
 *           example: 320
 *         groupBloodNotAllowed:
 *           type: array
 *           items:
 *             type: boolean
 *           example: [true, false, true, false]
 *
 *     DailyCaloriesResult:
 *       type: object
 *       properties:
 *         dailyCalories:
 *           type: number
 *           example: 1560
 *         notRecommendedProducts:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/NotRecommendedProduct'
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
 *     description: Calculates daily calories and returns products that are not recommended for the selected blood type.
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
 *             examples:
 *               missingFields:
 *                 summary: Missing required fields
 *                 value:
 *                   status: 400
 *                   message: height, age, currentWeight, desiredWeight ve bloodType alanları zorunludur
 *               invalidBloodType:
 *                 summary: Invalid blood type
 *                 value:
 *                   status: 400
 *                   message: bloodType yalnızca 1, 2, 3 veya 4 olabilir
 */

export {};