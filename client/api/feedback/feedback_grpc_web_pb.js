/**
 * @fileoverview gRPC-Web generated client stub for feedback
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.feedback = require('./feedback_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.feedback.FeedbackServiceClient =
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
proto.feedback.FeedbackServicePromiseClient =
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
 *   !proto.feedback.CommentRequest,
 *   !proto.feedback.CommentResponse>}
 */
const methodDescriptor_FeedbackService_SendFeedback = new grpc.web.MethodDescriptor(
  '/feedback.FeedbackService/SendFeedback',
  grpc.web.MethodType.UNARY,
  proto.feedback.CommentRequest,
  proto.feedback.CommentResponse,
  /**
   * @param {!proto.feedback.CommentRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.feedback.CommentResponse.deserializeBinary
);


/**
 * @param {!proto.feedback.CommentRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.feedback.CommentResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.feedback.CommentResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.feedback.FeedbackServiceClient.prototype.sendFeedback =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/feedback.FeedbackService/SendFeedback',
      request,
      metadata || {},
      methodDescriptor_FeedbackService_SendFeedback,
      callback);
};


/**
 * @param {!proto.feedback.CommentRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.feedback.CommentResponse>}
 *     Promise that resolves to the response
 */
proto.feedback.FeedbackServicePromiseClient.prototype.sendFeedback =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/feedback.FeedbackService/SendFeedback',
      request,
      metadata || {},
      methodDescriptor_FeedbackService_SendFeedback);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.feedback.ListFeedbackRequest,
 *   !proto.feedback.ListFeedbackResponse>}
 */
const methodDescriptor_FeedbackService_ListFeedback = new grpc.web.MethodDescriptor(
  '/feedback.FeedbackService/ListFeedback',
  grpc.web.MethodType.UNARY,
  proto.feedback.ListFeedbackRequest,
  proto.feedback.ListFeedbackResponse,
  /**
   * @param {!proto.feedback.ListFeedbackRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.feedback.ListFeedbackResponse.deserializeBinary
);


/**
 * @param {!proto.feedback.ListFeedbackRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.feedback.ListFeedbackResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.feedback.ListFeedbackResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.feedback.FeedbackServiceClient.prototype.listFeedback =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/feedback.FeedbackService/ListFeedback',
      request,
      metadata || {},
      methodDescriptor_FeedbackService_ListFeedback,
      callback);
};


/**
 * @param {!proto.feedback.ListFeedbackRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.feedback.ListFeedbackResponse>}
 *     Promise that resolves to the response
 */
proto.feedback.FeedbackServicePromiseClient.prototype.listFeedback =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/feedback.FeedbackService/ListFeedback',
      request,
      metadata || {},
      methodDescriptor_FeedbackService_ListFeedback);
};


module.exports = proto.feedback;

