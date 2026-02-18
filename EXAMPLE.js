// Example: Adding a new user endpoint

// 1. Add validation schema in src/utils/validators.js
const createUserSchema = Joi.object({
  name: Joi.string().required().trim().min(2).max(100),
  email: Joi.string().email().required().trim(),
  age: Joi.number().integer().min(18).optional(),
});

// 2. Create controller in src/controllers/userController.js
const createUser = async (req, res, next) => {
  try {
    const { name, email, age } = req.validatedData;
    
    // Business logic - e.g., save to database
    const user = {
      id: require('uuid').v4(),
      name,
      email,
      age,
      createdAt: new Date(),
    };

    // Simulated database save
    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

// 3. Add route in src/routes/api.js
const userController = require('../controllers/userController');
const schemas = require('../utils/validators');
const { validate } = require('../middleware/validation');

router.post('/users', validate(schemas.createUserSchema), userController.createUser);

// 4. Test with curl
/*
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "age": 25
  }'
*/
