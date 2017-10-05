# Listen
Anytime a user that is a registered listener is online (`{online: true, listener: true}`), they will automatically be prioritized
in connecting with a talker.

* If a listener is in the app, they receive a Notif with the link to the room they are to visit
* If a listener is on `/listen` they A listener who has set listen anytime to true
will automatically be redirected to `/rooms/:roomSlug`
* If a listener was offline but the clicks the link emailed to them `/listen/:roomHash`
they will be redirected to the room.
* If a listener was offline, clicks on the link sent `/listen/:roomHash`, but another listener has already
joined the room, they will get a message saying something like - "Thanks so much for joining.  Hangtight, there are other folks that want to connect with you."
