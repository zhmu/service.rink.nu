#!/bin/sh
docker run -p 49170:8080 -it -v $PWD:/vue vue-dev /bin/bash
