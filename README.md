# Where39
Use BIP39 words to locate anywhere in the world!

Any3words is cool, but it's closed, and there is no guarantee they wont change their words :(

Where39 uses BIP39 word list, the most distributed word list in the world https://github.com/bitcoin/bips/blob/master/bip-0039/bip-0039-wordlists.md

Locate anywhere to extreme accuracy using only 4-5 words!

x4 words for 5 m<sup>2</sup> accuracy

x5 words for 1 ft<sup>2</sup> accuracy

![privacy map where39](https://i.imgur.com/cnnDgSF.png)

* "My location" will give you your current location words

* You can also click on the map to get location words

* By using the 4 word search you can find a specific location anywhere in the world

* For extra privacy the shuffle function, shuffles the BIP39 wordlist, so unless you have the number entered the word locations are useless.


# How it works
## 1st word
First we break the earth into tiles 32/64, 2048 tiles (the amount of words in the BIP32 wordlist). We allocate each tile a word, this is achieved by using the earths latitude (180 degrees) and logitude (360 degrees). 
Each tile is 5.625/5.625 degrees.

![privacy map where39](https://i.imgur.com/5Fc3SYL.png)

## 2nd word
This square is split into 2025 smaller tiles 45/45, which works out 0.125/0.125 degrees per tile.

![privacy map where39](https://i.imgur.com/uPGTz1C.png)

## 3rd word
This square is split into 2025 smaller tiles 45/45, which works out 0.00277777777/0.00277777777 degrees per tile.

![privacy map where39](https://i.imgur.com/apoxgI2.png)

## 4th word
This square is split into 2025 smaller tiles 45/45, which works out 0.00006172839/0.00006172839 degrees per tile.

![privacy map where39](https://i.imgur.com/o4LHkAE.png)

## 5th word
The 5th word is the tresure word, and usually not necessary. We can break this square into 400 smaller tiles 20/20, which works out 0.00000308642/0.00000308642 degrees per tile.

![ESP32 GPIO Map](https://i.imgur.com/FwO6Tkd.png)


# To use locally

Download the repo and run a little webserver pointing at the folder

In Linux, navigate to the folder and run,

    python3 -m http.server 5000
    
Or you could just a tool like,

https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb?hl=en 

