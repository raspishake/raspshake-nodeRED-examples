Example Node-RED "Flows" that can be used for your Raspberry Shake Personal Earth Monitor: https://raspberryshake.org/

Visit https://nodered.org/ for more information on Node-RED


# How to install Node-RED on your computer (or another Raspberry Pi)

Example: Ubuntu 18.04

	$ curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
	$ sudo apt-get install -y nodejs
	$ sudo npm install -g --unsafe-perm node-red

For installation on other systems: https://nodered.org/#get-started

<span style="color:blue">WARNING: We do not recommend installaing Node-RED on your Raspberry Shake. It will consume a lot of CPU causing the processor to heat up a lot!</span>


# How to open Node-RED in your browser and start playing around

	$ node-red

Then navigate to: localhost:1880

# Examples Provided
## Examples that require UDP streaming
- blinkingLEDs_RPi.txt - configure seismic thresholds and blink your Raspberry Pi's LEDs
- chart.txt - display data from your Raspberry Shake using Chart tool
- realtime-plot.txt - display real-time data from your Raspberry Shake
- seismicDataStorage.txt - store data from your Raspberry Shake on disk

## Examples that do not require streaming
- retweet.txt - retweets posts containing @raspishake and/ or #raspberryshake on your Twitter feed

# How to upload an example Flow to your instance of Node-RED

1. Open Node-RED in your browser
2. Click to hamburger menu on the right hand side
3. Import
4. Clipboard
5. Copy and paste and click the "Import" button



# How to interface with the Raspberry Shake via Node-RED's UDP input

See here for description of UDP output: https://manual.raspberryshake.org/udp.html

We have developed and submitted a function to Node-RED's NPM that translates the UDP output into an array. This is available at: https://www.npmjs.com/~raspishake (see: node-red-rshake-udp-parser). To add this node to your local instance of Node-RED:

```
$ cd $HOME/.node-red
$ npm install node-red-rshake-udp-parser
```

Then, 

1. enable UDP data streaming on your Raspberry Shake. This is explained here: https://manual.raspberryshake.org/udp.html
2. use UDP input in Node-RED and connect it with 'rshake udp parser'
3. make sure you changed 'output' to 'a string' at UDP input configuration


# How to get access to GPIO for blinking LEDs
For example to blink with green and red LEDs you need to fix permissions.
SSH to your device and execute:
```
sudo chmod 666 /sys/class/leds/led*/brightness
```

# HAVE FUN!!!!!







