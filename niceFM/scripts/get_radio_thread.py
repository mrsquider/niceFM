
from urllib2 import urlopen
import json
import os
import time


def get_jsonparsed_data(url):
	response = urlopen(url)
	data = response.read().decode("utf-8")
	return json.loads(data)

filename="../stats/thread_link_updated"

try:
	file = open (filename, 'r')
	oldtime = float(file.read())
except IOError:
	file = open (filename, 'w')
	file.write(str(time.time()-21))
	oldtime = time.time()-21
finally:
	file.close()

filename="../stats/thread_link"

if time.time() - 20 > oldtime:
	s4s = get_jsonparsed_data('http://a.4cdn.org/s4s/catalog.json');
	for x in xrange(len(s4s)):
		for y in xrange(len(s4s[x]["threads"])):
			if "sub" in s4s[x]["threads"][y]:
				if len(s4s[x]["threads"][y]["sub"].replace("OC Albume", "")) < len(s4s[x]["threads"][y]["sub"]):
					url =  "http://boards.4chan.org/s4s/thread/" + str(s4s[x]["threads"][y]["no"])
					file2 = open (filename, 'w')
					file2.write(url)
					file2.close()
					filename="../stats/thread_link_updated"
					f = open (filename, 'w')
					f.write(str(time.time()))
					f.close()
else:
	try:
		file = open (filename, 'r')
		url = file.read()
	except IOError:
		file = open (filename, 'w')
		file.write("")
		url = ""
	finally:
		file.close()

print url
