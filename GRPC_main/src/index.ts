import path from "path";
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";

// Load the protobuf definition
const PROTO_PATH = path.resolve(__dirname, "./a.proto");
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const personProto = grpc.loadPackageDefinition(packageDefinition) as grpc.GrpcObject & {
  addressbook: {
    AddressBookService: grpc.ServiceClientConstructor;
  };
};

// Mock data
const PERSONS: { name: string; age: number }[] = [
  {
    name: "harkirat",
    age: 21,
  },
  {
    name: "nishant",
    age: 21,
  },
];

// AddPerson function implementation
function addPerson(
  call: grpc.ServerUnaryCall<any, any>,
  callback: grpc.sendUnaryData<any>
) {
  console.log("Received call:", call.request);

  const person = {
    name: call.request.name,
    age: call.request.age,
  };

  PERSONS.push(person);
  console.log("Updated PERSONS:", PERSONS);
  callback(null, person);
}

// Create the gRPC server
const server = new grpc.Server();

// Check if AddressBookService exists in the proto definition
if (personProto.addressbook?.AddressBookService) {
  const addressBookService = personProto.addressbook
    .AddressBookService;

  // Add the service implementation
  server.addService(addressBookService.service, {
    addPerson: addPerson,
  });

  // Bind the server to a port
  server.bindAsync(
    "0.0.0.0:50051",
    grpc.ServerCredentials.createInsecure(),
    (err, port) => {
      if (err) {
        console.error("Failed to bind server:", err);
        return;
      }
      console.log(`Server running on port ${port}`);
      server.start();
    }
  );
} else {
  console.error("AddressBookService not found in the proto definition.");
}
