# Distributed Magnet Links

This database aims to be a distributed magnet links place where everyone
can add its own MLs, search and share them with other, with the least
difficulty.

Work has been started after the release of a somewhat famous torrent :
the whole TPB magnet links archive

The database holds both the data AND the logic/view, so that anyone
willing to use it will only have to clone/sync one thing.

## View

As the whole thing has to be included in couchdb, the only view used
(search_index) is really dumb : it indexes every name in the data,
	splits the words, and adds each of them as an entry in the index.

This has several disadvantages :
* cannot search for only some parts of a word
* custom parsing/splitting method which doesn't manage special cases

## TODO
* add a magnet link adding/editing option
* real REST ! (maybe through something like sammy.js ?)
* proper security
* use _changes goodness
* implement a proper multiword search
