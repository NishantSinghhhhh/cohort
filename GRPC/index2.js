const protobuf = require("protobufjs");

// Load the updated example.proto file
protobuf.load("example.proto", (err, root) => {
    if (err) {
        throw err;
    }

    // Lookup the User message type
    const User = root.lookupType("User");

    // Create a payload with the new age field
    const userPayload = {
        id: 1,
        name: "Alice",
        age: 25, // New field added
        email: "alice@example.com",
    };

    // Verify the payload against the User message type
    const errMsg = User.verify(userPayload);
    if (errMsg) {
        throw Error(errMsg);
    }

    // Encode the payload into a buffer
    const buffer = User.encode(User.create(userPayload)).finish();
    console.log("Encoded Buffer:", buffer);

    // Decode the buffer back into a User object
    const decodedUser = User.decode(buffer);
    console.log("Decoded User:", decodedUser);
});
