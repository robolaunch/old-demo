#!/bin/bash
protoc --go_out=../feedback/api --go_opt=paths=source_relative \
    --go-grpc_out=../feedback/api --go-grpc_opt=paths=source_relative \
    feedback/feedback.proto