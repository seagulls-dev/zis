#!/usr/bin/env python3
#
# Read Application Version from FS
#
import json
import os


VERSION_FILE = 'package.json'

curr_path = os.path.dirname(os.path.realpath(__file__))
curr_path = os.path.dirname(curr_path)

if __name__ == '__main__':

    try:
        path = os.path.join(curr_path, VERSION_FILE)
        with open(path, 'r') as f:
            data = json.load(f)

        version = data.get('version', '0.0.0.0')
        print(version)
    except Exception as e:
        print(e)
        exit(1)
