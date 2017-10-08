# Talk
When a user visits the `/talk` an algorithm kicks off that seeks to connect them with a user.
We are fundamentally assuming that there will always be more talkers than listeners (kind of like how there are probably
always more women than men on Tinder), but we don't really on that fact.

The algorithm works like this:

* Find another user that is:
  * a listener
  * is online
  * is not engaged (already in a room)
  * TODO: connect based on branch, MOS, time in service, age, campaigns, etc.
* This query runs every 5 seconds, for 30 seconds.
* If no online users are found, then the following - find 5 other users that are:
  * listeners
  * are not online
  * have set the preference "listen anytime" to true
* These listeners receive an email with a link to a hash of the room `/listen/:roomHash`.
* The first listener who visits this link will be sent to the room link and registered as the room's
listener.
* Any subsequent listener who clicks on the link will get some sort of message and a redirect to `/listen` - "Thanks so much for being willing to listen.  The person that wanted to talk found someone to listen to them already.  Want to listen to someone else, hang tight, we'll find someone."

Another scenario:
* Talker leaves the app
* One of the offline listeners goes to the room via `/listen/:roomHash`
* Talker receives a notification, "your listener is in the room" with a direct link to the room `/rooms/:roomSlug`

Another scenario:
* Talker stays "connected", but is not on the `/talk` page
* Listener connects to room
* Talker receives a `<Notif />` with `/rooms/:roomSlug`
