#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

trap exit SIGINT

VAL=0

if ! python -m pycodestyle "${DIR}/../rmj_oss/populate.py" ; then
    VAL=1
fi

if ! python -m pycodestyle "${DIR}/../rmj_oss/server.py" ; then
    VAL=1
fi

if ! python -m pycodestyle "${DIR}/../rmj_oss/database_setup.py" ; then
    VAL=1
fi

exit ${VAL}

