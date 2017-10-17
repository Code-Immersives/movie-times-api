
# API Authentication with Express - Tokens

### Objectives
- Understand why authentication tokens are commonly used when interacting with APIs
- Add a token strategy to an application
- Authenticate a user based on their token

### Preparation

- Build a basic Express app
- Understand foundational concepts in authentication & encryption

 
##The authentication problem
The HTTP protocol is _stateless_. This means the server does not remember anything about a client between requests. So if we authenticate a user with a username and password, then on the next request, our application won't remember us. 


The _old_way_ of dealing with this was to store who was logged in on the server. Every time the server received a request from a client, it would check to see if that client was logged in or not. This is not very efficient:

1) Every time a user logs in, the server has to create a record somewhere on the server. If lots of users are logging in, the overhead on our server increases.

2) If the logged in information is stored in local memory on a server, the user will only be able to make requests to that server. This is not ideal - what if we have a bunch of servers, but most of the users are forced into using the original server they logged in at?

There are a few other problems, but these two are the main ones. 


## Tokens, The Basics - Intro (10 mins)
Token-based authentication is stateless. We are not storing any information about a logged in user on the server. No stored information means your applicaiton can scale and add more machines as necessary without worrying about where a user is logged in. 

Here is the JWT authentication flow:


	User requests access with username and password

					|
					|

	The app validates the credentials

					|
					|

	The app gives a signed token to the client

					|
					|

	The client stores the token and presents it with every request


## So what does a JWT look like?

Just three strings, separated by periods:

	aaaaaaaaaaaaaaa.bbbbbbbbbbbbbbbbbbbbb.ccccccccccccccccccc

The first part (aaaaaaaaaaaa) is the header

The second part (bbbbbbbbbbbb) is the payload - the good stuff, like who this person is, and their id in our database.

The third part (ccccccccccccc) is the signature. The signature is a hash of the header and the payload. It is hashed with a secret key, that we will provide.


Head on over to [jwt.io](http://jwt.io/#debugger) and see what I mean:

<img width="750" alt="JWTs" src="https://cloud.githubusercontent.com/assets/25366/9151601/2e3baf1a-3dbc-11e5-90f6-b22cda07a077.png">



#### Just like cookies, mmmm....

In the example above, you'll notice that there are 3 parts. The payload is the one we care the most about, and it holds whatever data we decide to put in there. It's very much like a cookie; we put as few things in there as possible – just the pieces we really need.

Applications can save a JWT somewhere on a user's computer, just like a cookie. Because JWTs can be encrypted into a single string, we can _also_ send it over HTTP really, really easily. Which means it'll work in any server/client scenario you can imagine. Quite nice.



## Let's PARTY ON CODE!

Let's start with an app that already has sign-up functionality. I.e. an app to which we can POST a new user, with a password, and then that user is stored in the database along with a hashed password. We can also make a get request to see all users.

What I want to do is limit our API so that you can only get the user data from it IF you have been authenticated. 

We will need to build a login/authenticate route that will check a user's password against the stored (and hashed) version in our database. If they match, our API will return a JWT. We then need to take that JWT and include it in all our later requests to prove that we are logged in. 




## Create a user

Send a request to POST http://localhost:8080/api/users with the following information:

```javascript
{
   "user":{
		"name": "Tony",
		"username": "toneloke",
		"password": "raiders"
	}
}
```

-------------------------------------------------------------------------
YOU GUYS KNOW HOW TO USE POSTMAN! Make sure you send raw json in the body
-------------------------------------------------------------------------

- select the POST method from the dropdown menu


- make sure we are posting to http://localhost:8080/api/users


- we need to give it a payload. Click on the "body" tab, then click the "raw" radio button. 


- make sure to select the type as JSON(application/json) 


- stick your payload in the body


Since we don't have our authentication machinery set up yet, the user will be created just fine


## Authenticating a user and returning a JWT

This authentication is going to take place in our routes file, where we previously said that authentication would take place. 

Let's first install the necessary JWT package:


```
$ npm install jsonwebtoken --save
```


Now, in our routes/userRoutes.js file, we want to grab the module so we can use it:

```
var jwt = require('jsonwebtoken')
```

We also need to provide a string that will serve as the secret signing key used in the hashing of the header and payload, to make up the third part of the JWT string

```
var mySpecialSecret = "boom"
```

Let's create a new route inside our API routes called POST http://localhost:8080/api/authenticate. This is where a user will send a POST request with a username and password. I.e. this is the route they will use to login. I guess we could have called it http://localhost:8080/api/login 

Either way, you get the idea. 

We need to put it before the below middleware that checks if someone is logged in, i.e. before this:

```
apiRouter.use(function(req, res, next){
	// this is going to run EVERY TIME someone goes to a url that starts with /api
	// so we should probably check to see if they are logged in here
	// We'll do that in the next lesson
	// in the meantime, let's just console.log something, so we know it works
	console.log("someone is visiting our API, we should check to see if they are logged in")

	// ...and then we'll let the request continue on to our app:
	next()
})
```

So let's write the machinery to generate a JWT:

Here's some pseudo-code of what I want to do - 

```
apiRouter.post('/authenticate', function(req, res){
	// What do we want to do?
	//
	// 1 - Find the user in our db by searching for the username in the body of the request 
	//		- if we can't find a user with that username, return an error
	//
	// 2 - If we find the user, check that the password matches
	//		- if it doesn't match, return an error
	//
	// 3 - Generate the JWT
	//
	// 4 - Send back a success message with the JWT
})
```


And here it is with real code -

```
apiRouter.post('/authenticate', function(req, res){
	// What do we want to do?
	//
	// 1 - Find the user in our db by searching for the username in the body of the request 

	User.findOne({
		email: req.body.email
	}).select('name email password').exec(function(err, user){
		if(err) throw err;

	//		- if we can't find a user with that username, return an error

		if(!user){
			res.json({success: false, message:"Auth failed, User not found"})
		} else if(user){

		// 2 - If we find the user, check that the password matches		
		//		- if it doesn't match, return an error

			var validPassword = user.comparePassword(req.body.password);
			if(!validPassword){
				res.json({success: false, message: "Auth failed, wrong password"})
			} else {

				// 3 - Generate the JWT		
				var token = jwt.sign({
					name: user.name,
					email: user.email
					}, mySpecialSecret, {
						expiresInMinutes: 1440
					});
				// 4 - Send back a success message with the JWT		
				res.json({
					success: true,
					message: 'YOU get a token! YOU get a token! YOU get a token!',
					token: token

				})		
			}
		}

	})

})
```

Now we have given our user a valid token, they have to make sure they use it in every request, because we are about to write some _middleware_ that will require every request to have one.

We will write this middleware as follows:

```
apiRouter.use(function(req, res, next){
	// 1 - let's check everywhere for the user's token (in the request body, headers, and params)
	// 2 - If we find a token, we will use mySpecialSecret to try and decode it
	// 		- if it can't be decoded, send the user an error that they don't have the right token
	//		- if it CAN be decoded, save the decoded token to the request, and we'll keep processing the request
	// 3 - If we can't find a token at all, we'll just send back an error message
})
```



```
apiRouter.use(function(req, res, next){
	// 1 - let's check everywhere for the user's token
	var token = req.body.token || req.param('token') || req.headers['x-access-token']

	// 2 - If we find a token, we will use mySpecialSecret to try and decode it
	// 		- if it can't be decoded, send the user an error that they don't have the right token
	
	if(token){
		jwt.verify(token, mySpecialSecret, function(err, decoded){
			if(err){
				return res.status(403).send({success:false, message:"can't authenticate token"})
	
			//		- if it CAN be decoded, save the decoded token to the request, and we'll keep processing the request

			} else {
				req.decoded = decoded;
				next()
			}
		})
	} else {

		// 3 - If we can't find a token at all, we'll just send back an error message
		return res.status(403).send({success: false, message: "no token provided"})
	}
})
```

##Testing our new middleware

1 - make a request to /api/authenticate with a username and password in the body that you know to be correct.

2 - The response should include a token. Try accessing /api/users without a token first, and see what happens

3 - Now make the request again, but with x-access-token as a header, and the token as its value

4 - Try it again, but by passing the token in as a param in the url, like this:

http://localhost:8080/api/users?token=aXruwefwSHhfiuhHHfiuhaewiukGVCJHX2948FuunakkJD


##Conclusion

- What is a JWT? Why is useful for authorizing an API?
- How do you create a JWT in an endpoint in your Express app?
- How do you secure an endpoint using a JWT?
