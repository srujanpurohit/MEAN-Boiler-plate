const mongoose = require('mongoose');
/**
 * This Function will handle transaction for session creation, transaction errors, and session closing.\
 * This will require MongoDB deployment in replica sets.
 * For converting standalone to replica set check out  {@link https://docs.mongodb.com/manual/tutorial/convert-standalone-to-replica-set/}
 * @param {function(session)} callback
 */
exports.transactionHandler = async callback => {
  // Create a mongo session session with transaction initiated
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    await callback(session);
  } catch (error) {
    // Rollback any changes made in this session;
    await session.abortTransaction();

    throw error;
  } finally {
    // end the session
    session.endSession();
  }
};
