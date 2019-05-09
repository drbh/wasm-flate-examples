from flask import Flask, request
from datetime import datetime
import json
import zlib
import sys


def human_size(bytes, units=[' bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB']):
    """ Returns a human readable string reprentation of bytes"""
    return str(bytes) + units[0] if bytes < 1024 else human_size(bytes >> 10, units[1:])


app = Flask(__name__)


@app.route('/', methods=["POST"])
def main():
    # start a timer
    start = datetime.now()
    # pull the data out of the request
    original_data = request.data
    # we get the size and make it human readable
    original_size = human_size(sys.getsizeof(original_data))
    print("Recieved data:",  original_size)
    # we decompress the deflate algo with zlib
    decompressed_data = zlib.decompress(original_data, -zlib.MAX_WBITS)
    # we get the size and make it human readable
    decompressed_size = human_size(sys.getsizeof(decompressed_data))
    print("Decompressed data:", decompressed_size)
    # print out the runtime
    print('Execution time (hr): %s' % str(datetime.now()-start))

    ## save file to filesystem - was using to validate output
    ## if you want to check against JSON file, use something like jq
    ## to standardize the format otherwise there will be alot of spacing
    ## differences.

    # my_details = json.loads(decompressed_data)
    # with open('final.json', 'w') as json_file:
    #     json.dump(my_details, json_file, indent=4)

    return "ok"


if __name__ == '__main__':
    app.run(port="8000")
