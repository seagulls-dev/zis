#!/usr/bin/env python3
#
# Script will set provided version or increment build number
#
import json
import os
import re
import sys

from datetime import datetime

VERSION_FILE = 'package.json'

curr_path = os.path.dirname(os.path.realpath(__file__))
curr_path = os.path.dirname(curr_path)


def is_valid_version(version) -> bool:
    # 1.1.1.1
    regex = r'^(0|[1-9]\d*)(\.(0|[1-9]\d*))(\.(0|[1-9]\d*))(\.(0|[1-9]\d*))$'
    return re.fullmatch(regex, version) is not None


if __name__ == '__main__':
    if len(sys.argv) > 1:
        core_version = sys.argv[1]   # param core_version
    else:
        core_version = '0'

    # increment build if not valid core version is provided
    inc = not is_valid_version(core_version)
    print(f'core_version: {core_version}')
    print(f'inc: {inc}')
    version = '0.0.0.0'
    try:
        path = os.path.join(curr_path, VERSION_FILE)
        with open(path, 'r') as f:
            data = json.load(f)

        if not data:
            raise Exception(f'File is empty or not found. path={path}')

        version = data.get('version', '0.0.0.0')
        try:
            major, minor, patch, build = version.split('.')
        except:
            major, minor, patch, build = '0.0.0.0'.split('.')

        if inc:
            # increment build
            build = int(build)
            build += 1
            new_version = '.'.join([major, minor, patch, str(build)])
        else:
            # use core version
            new_version = core_version

        data['version'] = new_version
        now = datetime.now()
        data['created'] = now.strftime("%Y-%m-%d %H:%M:%S")
        path = os.path.join(curr_path, VERSION_FILE)
        with open(path, 'w') as f:
            json.dump(data, f, indent=4)

        # fix: No newline at end of file warning
        with open(path, 'r') as f:
            data = f.read()

        data = data + "\n"
        with open(path, 'w') as f:
            f.write(data)

        print(f'New version set: {new_version}')

    except Exception as e:
        print(f'Error in set_fe_version.py inc={inc}, version={version}')
        print(e)
        version = 0
