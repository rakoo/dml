# Distributed Magnet Links

This database aims to be a distributed magnet links place where everyone
can add its own MLs, search and share them with other, with the least
difficulty.

Work has been started after the release of a somewhat famous torrent :
the whole TPB magnet links archive

The database holds both the data AND the logic/view, so that anyone
willing to use it will only have to clone/sync one thing. It is based on
couchdb (http://couchdb.apache.org/) which main features are : 

* built-in replication over any number of nodes, with multi versions
* RESTful API
* Lightweight core

Those features seemed pretty neat for a "distributed \<anything\>"
project, so here you go : insert you magnet links, synchronize with
everyone, search through the whole data at home !

## Demo
You can test a live demo [here[(http://krakotztest.iriscouch.com/magnet_links_test/_design/dml/index.html)


It doesn't contain all the links at the moment, only a little (10000)
subset to test.

## Installation
This is a simple couchapp. You will need CouchDB and the couchapp
script.

Once you have them, the installation is very easy : 

```
  git clone git://github.com/rakoo/dml.git
  cd dml
  couchapp push . http://localhost:5984/magnet_links
```

And there you go : a personal magnet link index. If you want to use it
with The Pirate Bay torrents, just replicate from [my
couch](http://krakotztest.iriscouch.com/magnet_links_test). Add this
document to your ```_replicator``` database : 

```
{
  "source": "http://krakotztest.iriscouch.com/magnet_links_test",
  "target": "magnet_links_test",
}
```

You now have a subset of the 90M archive (I keep it at 10000 records for
    the tests)

## Importing from the archive
You can also import the magnet links from the archive. The model for a
magnet link is fairly easy, a script can easily be done : 

```
{
   "_id": "7ec39f2b8a517405f62dc9205d01b657",
   "_rev": "1-19ee5d5c458b8e0d01e5646a2f31249c",
   "tpb_url": "http://thepiratebay.se/torrent/3244891",
   "name": "AdwareX Eliminator 2.0",
   "size": 1924027,
   "hash": "5e39d0428be5fed5ca00286e6e732a4e29b07f30"
}
```

I have purposedly not included the number of seeds and peers; these are
highly volatile data, and I don't want to update the database frequently
for something that does not add something of great value.
If you want to, feel free to do so =]

## View

As the whole thing has to be included in couchdb, the only view used
(```search_index_with_name```) is really dumb : it indexes every name in the data,
	splits the words, and adds each of them as an entry in the index.

This has several disadvantages :

* cannot search for only some parts of a word
* custom parsing/splitting method which doesn't manage special cases


## TODO
* add a magnet link adding/editing option
* real REST ! (maybe through something like sammy.js ?)
* proper security
* use ```_changes``` goodness

## CHANGELOG

2012-05-13: Adding multiple word in the search bar now does a AND

## UNLICENSE
This project is placed in the public domain.

If you don't understand what that means, it basically says that it you
can do about everything you want with it, except for the parts licensed,
such as 

* couchDB, which is under the Apache License
* jQuery, which is licensed under the MIT or the GPL License
* various other parts I might have forgotten along the road

In the very sad case you really don't understand what "you can do
about everything you want" means, here is a more formal way to say it :

This is free and unencumbered software released into the public domain.

Anyone is free to copy, modify, publish, use, compile, sell, or
distribute this software, either in source code form or as a compiled
binary, for any purpose, commercial or non-commercial, and by any
means.

In jurisdictions that recognize copyright laws, the author or authors
of this software dedicate any and all copyright interest in the
software to the public domain. We make this dedication for the benefit
of the public at large and to the detriment of our heirs and
successors. We intend this dedication to be an overt act of
relinquishment in perpetuity of all present and future rights to this
software under copyright law.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
DEALINGS IN THE SOFTWARE.

For more information, please refer to <http://unlicense.org/>
