Examples Node-RED "Flows" that can be used for your Raspberry Shake Personal Earth Monitor: https://raspberryshake.org/

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


# How to upload an example Flow to your instance of Node-RED

1. Open Node-RED in your browser
2. Click to hamburger menu on the right hand side
3. Import
4. Clipboard
5. Copy and paste and click the "Import" button



# How to interface with the Raspberry Shake via Node-RED's UDP input

See: https://manual.raspberryshake.org/udp.html

Example code for translating UDP output into an array:

```javascript
// this function gets UDP data
// and converts it to array

var input = msg.payload;
input = input.replace(new RegExp("'", 'g'), "\"")
  .replace(new RegExp("{", 'g'), "[")
  .replace(new RegExp("}", 'g'), "]");

var data = JSON.parse(input)

msg.payload = data;
return msg;
```

Example code for measure shaking level:
```javascript
var data = msg.payload;   // get this from previous function
var value = 0;
for(var i=2; i < data.length; i++) {
    if(data[i] < 0)
        value += data[i];
}

value = Math.abs(value);
msg.payload = value;
```

# How to get access to GPIO for blinking LEDs
For example to blink with green and red LEDs you need to fix permissions.
SSH to your device and execute:
```
sudo chmod 666 /sys/class/leds/led*/brightness
```







