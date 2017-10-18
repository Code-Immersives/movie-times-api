# NodeJS / ExpressJS / MongoDB  -> Module

### October 16 2017 Lesson Plan
> ISOMORPHIC RENDERING - have the server and client on the same computer
- Review model structure and client side
- Create everything for cinemas

### October 17 2017 Lesson Plan
## Authentication & Authorization
- User setup
  1. Create User model
  2. Create User routes
  3. Create User controller
- Encryption (Bcrypt)
  1. Hash password
  2. Middleware to encrypt before we save
  3. Schema method to decrypt password
- Token Authentication
  1. Add jwt node package
  2. Make the create token method
  3. Send token on login routes
  4. Add authorization middleware to specific routes
  5. Decode the token

### October 18 2017 Lesson Plan
## Review / Refactor / Client-Side Authentication
- Review
  1. API Auth flow
  2. Model methods (bcrypt/PWverify)
  3. Auth Middleware
- Refactor
  1. Move functions out of userRoutes
  2. Created static methods for userController class
  3. Moved auth functions to utils folder
- Client-Side Auth
  1. Create SignUp page and LogIn page
  2. Make a auth adapter to add the token to a fetch request
