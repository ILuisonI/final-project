# User Commands:
* Make a new user using POST: http://localhost:8181/api/users + a request body containing all the required information.
* Login using POST: http://localhost:8181/api/users/login + request body containing email + password.
* Get all users using GET: http://localhost:8181/api/users. This requires you to be an ADMIN.
* Get a specific user using GET: http://localhost:8181/api/users/:id + the user's ID. This requires you to be the same user or an ADMIN.
* Update a specific user using PUT: http://localhost:8181/api/users/:id + the user's ID + a request body containing all the required information. This requires you to be the same user.
* Change a user's business status using PATCH: http://localhost:8181/api/users/:id + the user's ID. This requires you to be the same user.
* Delete a specific user using DELETE: http://localhost:8181/api/users/:id + the user's ID. This requires you to be the same user or an ADMIN.

# Card Commands:
* Get all cards using GET: http://localhost:8181/api/cards.
* Get all cards that you created using GET: http://localhost:8181/api/cards/my-cards. This requires you to be the card owner.
* Get a specific card using GET: http://localhost:8181/api/cards/:id + the card's ID.
* Make a new card using POST: http://localhost:8181/api/cards + a request body containing all the required information.
* Update a specific card using PUT: http://localhost:8181/api/cards/:id + the user's ID + a request body containing all the required information. This requires you to be the card owner.
* Add or remove a like from a card using PATCH: http://localhost:8181/api/cards/:id + the card's ID. This requires you to be a registered user.
* Delete a specific card using DELETE: http://localhost:8181/api/users/:id + the card's ID. This requires you to be the card owner or an ADMIN.