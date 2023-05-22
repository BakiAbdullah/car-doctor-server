/**
 * Why Use JWT Token: Secure Our Api
 * ---------------------------------------
 *              CREATE TOKEN
 * --------------------------------------
 *! 1. Client-Side: after user login send user basic info to create token
 *
 * 2. In the Server Side: install npm i jsonwebtoken
 * 3. import jsonwebtoken
 * 4. jwt.sign(payload, secret, {expires} )
 * 5. return token to the client side
 *
 * 6. After receiving the token store it either http only cookies or localstorage (second best solution)
 *
 * 7. Use a general/ Central space onAuthStateChange > AuthProvider
 * -------------------------------------
 *              SEND TOKEN TO SERVER
 * ---------------------------------------
 * 1. for sensitive api call ( ) send authorization headers
 *  { authorization: 'Bearer ${token}'}
 *
 * -------------------------------------
 *              VERIFY TOKEN
 * --------------------------------------
 *
 *! 1. Create a function called verifyJWT (middleware)
 * 2. this function will have three params: req, res, next
 * 3. First check whether the authorization headers exists
 * 4. if not send 401
 * 5. get the token out of the authorization header
 * 6. now call jwt.verify(token, secret, (err, decoded))
 * 7. if err => send 401
 * 8. set decoded to the req object so that we can retrieve it later
 * 9. call the next() to go to the next function
 *
 * -----------------------
 * 1. Check wether token has the email that matches with the request email
 *
 */
