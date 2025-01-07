"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const grpc = __importStar(require("@grpc/grpc-js"));
const protoLoader = __importStar(require("@grpc/proto-loader"));
// Load the protobuf definition
const PROTO_PATH = path_1.default.resolve(__dirname, "./a.proto");
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
});
const personProto = grpc.loadPackageDefinition(packageDefinition);
// Mock data
const PERSONS = [
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
function addPerson(call, callback) {
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
if ((_a = personProto.addressbook) === null || _a === void 0 ? void 0 : _a.AddressBookService) {
    const addressBookService = personProto.addressbook
        .AddressBookService;
    // Add the service implementation
    server.addService(addressBookService.service, {
        addPerson: addPerson,
    });
    // Bind the server to a port
    server.bindAsync("0.0.0.0:50051", grpc.ServerCredentials.createInsecure(), (err, port) => {
        if (err) {
            console.error("Failed to bind server:", err);
            return;
        }
        console.log(`Server running on port ${port}`);
        server.start();
    });
}
else {
    console.error("AddressBookService not found in the proto definition.");
}
