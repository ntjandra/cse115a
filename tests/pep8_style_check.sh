#!/bin/bash

readonly THIS_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

trap exit SIGINT

if ! python -m pycodestyle "${THIS_DIR}/../rmj_oss/populate.py" ; then
    echo "At least one style issue found"
    exit 1
fi

if ! python -m pycodestyle "${THIS_DIR}/../rmj_oss/server.py" ; then
    echo "At least one style issue found"
    exit 1
fi

if ! python -m pycodestyle "${THIS_DIR}/../rmj_oss/database_setup.py" ; then
    echo "At least one style issue found"
    exit 1
fi

echo "No issues found"
exit 0
