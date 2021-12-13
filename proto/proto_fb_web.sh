protoc -I=feedback feedback.proto \
    --js_out=import_style=commonjs:../client/api/feedback \
    --grpc-web_out=import_style=commonjs,mode=grpcwebtext:../client/api/feedback
                                                                            
protoc -I=feedback feedback.proto \
    --js_out=import_style=commonjs+dts:../client/api/feedback \
    --grpc-web_out=import_style=commonjs+dts,mode=grpcwebtext:../client/api/feedback
