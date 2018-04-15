
import os
from urllib2 import urlopen
import json
import time
import re
import sys
import datetime

def get_jsonparsed_data(url):
    response = urlopen(url)
    data = response.read().decode("utf-8")
    #print ("\ngetting data from " + url)
    time.sleep(2.5)
    return json.loads(data)

def getcoord(ip):

    for line in open("../stats/ipdatabase").readlines():
        if re.match(ip, line):
            linedata=line.replace('\n', '').split(' ')
            return [linedata[1], linedata[2]];

    dta = get_jsonparsed_data("http://ip-api.com/json/" + ip)
    if dta["status"] != "fail":
    	#print "writine " + ip
    	ipdb = open ("../stats/ipdatabase", "a")
    	ipdb.write(ip + " " + str(dta["lat"]) + " " + str(dta["lon"]) + "\n")
        ipdb.close()
        return [dta["lat"], dta["lon"]];
    else:
        return [0.0, 0.0];

def convertTime(seconds):
	m, s = divmod(seconds, 60)
	h, m = divmod(m, 60)
	return "%d:%02d:%02d" % (h, m, s)

def getIcon(seconds):
	icon=""
	if seconds < 3600:
		icon="red-dot"
	elif seconds < 10800:
		icon="orange-dot"
	elif seconds < 18000:
		icon="yellow-dot"
	elif seconds < 36000:
		icon="green-dot"
	elif seconds < 72000:
		icon="blue-dot"
	elif seconds < 108000:
		icon="pink-dot"
	else:
		icon="ltblue-dot"
	return "http://maps.google.com/mapfiles/ms/icons/" + icon + ".png"

directory="../ips/"

ips=[]

#structure
#  ip      |    seconds  | converted time   |  icon url |   [lat, long]
#  0            1          2                   3          4  0    1
fcount = len(os.listdir(directory))
cntr = 0

for filename in os.listdir(directory):
    if filename.endswith(".txt"): 
        f = open(os.path.join(directory, filename), 'r')
        fdat = float(f.read())
        thisip = filename.replace('.txt', '')
        tappend = [thisip, fdat, convertTime(fdat), getIcon(fdat), getcoord(thisip)]
        ips.append(tappend)
        f.close();

        #sys.stdout.write("\033[2K\r" + str( ( (cntr + 1) * 100) / fcount) + "% done")
        #sys.stdout.flush()

        cntr += 1
    else:
        continue

ips = sorted(ips, key=lambda a_entry: a_entry[1], reverse=True)

for x in xrange(0,5):
	ips[x][3] = "http://maps.google.com/mapfiles/kml/paddle/" + str(x + 1) + ".png"

thedate = datetime.datetime.now()
datestring = str(thedate.year) + "." + str(thedate.month) + "." + str(thedate.day) + ", " + str(thedate.hour) + ":" + str(thedate.minute) + ":" + str(thedate.second)

mscript = open("mapscript.js", "w")

mscript.write("function placepoints(){")
for x in xrange(len(ips)):
	mscript.write("var marker = new google.maps.Marker({position: {lat: " + str(ips[x][4][0]) + ", lng: " + str(ips[x][4][1]) + "}, map: map, title: '" + ips[x][2] + "', icon: '" + ips[x][3] + "'});")
mscript.write('window.listener_map_last_refresh_date="' + datestring + '";')
mscript.write("}")

mscript.close();

print "map updated!"
