/**
 * @fileoverview
 * @enhanceable
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!

goog.provide('proto.feedback.ListFeedbackResponse');

goog.require('jspb.BinaryReader');
goog.require('jspb.BinaryWriter');
goog.require('jspb.Message');
goog.require('proto.feedback.Comment');


/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.feedback.ListFeedbackResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.feedback.ListFeedbackResponse.repeatedFields_, null);
};
goog.inherits(proto.feedback.ListFeedbackResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.feedback.ListFeedbackResponse.displayName = 'proto.feedback.ListFeedbackResponse';
}
/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.feedback.ListFeedbackResponse.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.feedback.ListFeedbackResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.feedback.ListFeedbackResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.feedback.ListFeedbackResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.feedback.ListFeedbackResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    commentList: jspb.Message.toObjectList(msg.getCommentList(),
    proto.feedback.Comment.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.feedback.ListFeedbackResponse}
 */
proto.feedback.ListFeedbackResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.feedback.ListFeedbackResponse;
  return proto.feedback.ListFeedbackResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.feedback.ListFeedbackResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.feedback.ListFeedbackResponse}
 */
proto.feedback.ListFeedbackResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.feedback.Comment;
      reader.readMessage(value,proto.feedback.Comment.deserializeBinaryFromReader);
      msg.addComment(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.feedback.ListFeedbackResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.feedback.ListFeedbackResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.feedback.ListFeedbackResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.feedback.ListFeedbackResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getCommentList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.feedback.Comment.serializeBinaryToWriter
    );
  }
};


/**
 * repeated Comment comment = 1;
 * @return {!Array.<!proto.feedback.Comment>}
 */
proto.feedback.ListFeedbackResponse.prototype.getCommentList = function() {
  return /** @type{!Array.<!proto.feedback.Comment>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.feedback.Comment, 1));
};


/** @param {!Array.<!proto.feedback.Comment>} value */
proto.feedback.ListFeedbackResponse.prototype.setCommentList = function(value) {
  jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.feedback.Comment=} opt_value
 * @param {number=} opt_index
 * @return {!proto.feedback.Comment}
 */
proto.feedback.ListFeedbackResponse.prototype.addComment = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.feedback.Comment, opt_index);
};


proto.feedback.ListFeedbackResponse.prototype.clearCommentList = function() {
  this.setCommentList([]);
};

