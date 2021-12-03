#!/bin/bash
protoc --go_out=../launch/api --go_opt=paths=source_relative \
    --go-grpc_out=../launch/api --go-grpc_opt=paths=source_relative \
    launch/launch.proto