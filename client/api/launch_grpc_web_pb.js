/**
 * @fileoverview gRPC-Web generated client stub for launch
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.launch = require('./launch_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.launch.LaunchServiceClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.launch.LaunchServicePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.launch.UserCreateRequest,
 *   !proto.launch.UserResponse>}
 */
const methodDescriptor_LaunchService_CreateUser = new grpc.web.MethodDescriptor(
  '/launch.LaunchService/CreateUser',
  grpc.web.MethodType.UNARY,
  proto.launch.UserCreateRequest,
  proto.launch.UserResponse,
  /**
   * @param {!proto.launch.UserCreateRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.launch.UserResponse.deserializeBinary
);


/**
 * @param {!proto.launch.UserCreateRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.launch.UserResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.launch.UserResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.launch.LaunchServiceClient.prototype.createUser =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/launch.LaunchService/CreateUser',
      request,
      metadata || {},
      methodDescriptor_LaunchService_CreateUser,
      callback);
};


/**
 * @param {!proto.launch.UserCreateRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.launch.UserResponse>}
 *     Promise that resolves to the response
 */
proto.launch.LaunchServicePromiseClient.prototype.createUser =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/launch.LaunchService/CreateUser',
      request,
      metadata || {},
      methodDescriptor_LaunchService_CreateUser);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.launch.UserDeleteRequest,
 *   !proto.launch.UserResponse>}
 */
const methodDescriptor_LaunchService_DeleteUser = new grpc.web.MethodDescriptor(
  '/launch.LaunchService/DeleteUser',
  grpc.web.MethodType.UNARY,
  proto.launch.UserDeleteRequest,
  proto.launch.UserResponse,
  /**
   * @param {!proto.launch.UserDeleteRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.launch.UserResponse.deserializeBinary
);


/**
 * @param {!proto.launch.UserDeleteRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.launch.UserResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.launch.UserResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.launch.LaunchServiceClient.prototype.deleteUser =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/launch.LaunchService/DeleteUser',
      request,
      metadata || {},
      methodDescriptor_LaunchService_DeleteUser,
      callback);
};


/**
 * @param {!proto.launch.UserDeleteRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.launch.UserResponse>}
 *     Promise that resolves to the response
 */
proto.launch.LaunchServicePromiseClient.prototype.deleteUser =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/launch.LaunchService/DeleteUser',
      request,
      metadata || {},
      methodDescriptor_LaunchService_DeleteUser);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.launch.LaunchCreateRequest,
 *   !proto.launch.LaunchResponse>}
 */
const methodDescriptor_LaunchService_CreateLaunch = new grpc.web.MethodDescriptor(
  '/launch.LaunchService/CreateLaunch',
  grpc.web.MethodType.UNARY,
  proto.launch.LaunchCreateRequest,
  proto.launch.LaunchResponse,
  /**
   * @param {!proto.launch.LaunchCreateRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.launch.LaunchResponse.deserializeBinary
);


/**
 * @param {!proto.launch.LaunchCreateRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.launch.LaunchResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.launch.LaunchResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.launch.LaunchServiceClient.prototype.createLaunch =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/launch.LaunchService/CreateLaunch',
      request,
      metadata || {},
      methodDescriptor_LaunchService_CreateLaunch,
      callback);
};


/**
 * @param {!proto.launch.LaunchCreateRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.launch.LaunchResponse>}
 *     Promise that resolves to the response
 */
proto.launch.LaunchServicePromiseClient.prototype.createLaunch =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/launch.LaunchService/CreateLaunch',
      request,
      metadata || {},
      methodDescriptor_LaunchService_CreateLaunch);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.launch.LaunchDeleteRequest,
 *   !proto.launch.LaunchResponse>}
 */
const methodDescriptor_LaunchService_DeleteLaunch = new grpc.web.MethodDescriptor(
  '/launch.LaunchService/DeleteLaunch',
  grpc.web.MethodType.UNARY,
  proto.launch.LaunchDeleteRequest,
  proto.launch.LaunchResponse,
  /**
   * @param {!proto.launch.LaunchDeleteRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.launch.LaunchResponse.deserializeBinary
);


/**
 * @param {!proto.launch.LaunchDeleteRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.launch.LaunchResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.launch.LaunchResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.launch.LaunchServiceClient.prototype.deleteLaunch =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/launch.LaunchService/DeleteLaunch',
      request,
      metadata || {},
      methodDescriptor_LaunchService_DeleteLaunch,
      callback);
};


/**
 * @param {!proto.launch.LaunchDeleteRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.launch.LaunchResponse>}
 *     Promise that resolves to the response
 */
proto.launch.LaunchServicePromiseClient.prototype.deleteLaunch =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/launch.LaunchService/DeleteLaunch',
      request,
      metadata || {},
      methodDescriptor_LaunchService_DeleteLaunch);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.launch.ListLaunchRequest,
 *   !proto.launch.ListLaunchResponse>}
 */
const methodDescriptor_LaunchService_ListLaunch = new grpc.web.MethodDescriptor(
  '/launch.LaunchService/ListLaunch',
  grpc.web.MethodType.UNARY,
  proto.launch.ListLaunchRequest,
  proto.launch.ListLaunchResponse,
  /**
   * @param {!proto.launch.ListLaunchRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.launch.ListLaunchResponse.deserializeBinary
);


/**
 * @param {!proto.launch.ListLaunchRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.launch.ListLaunchResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.launch.ListLaunchResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.launch.LaunchServiceClient.prototype.listLaunch =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/launch.LaunchService/ListLaunch',
      request,
      metadata || {},
      methodDescriptor_LaunchService_ListLaunch,
      callback);
};


/**
 * @param {!proto.launch.ListLaunchRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.launch.ListLaunchResponse>}
 *     Promise that resolves to the response
 */
proto.launch.LaunchServicePromiseClient.prototype.listLaunch =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/launch.LaunchService/ListLaunch',
      request,
      metadata || {},
      methodDescriptor_LaunchService_ListLaunch);
};


module.exports = proto.launch;

