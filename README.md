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
You can test a live demo at
http://krakotztest.iriscouch.com/magnet_links_test/_design/dml/index.html


It doesn't contain all the links at the moment, only a little (10000)
subset to test.


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
* use _changes_ goodness
* implement a proper multiword search

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
