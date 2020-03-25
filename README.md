# TS State Machine

A package which provides a base **Finite State Machine**, along with examples of abstractions for consuming events related to that machine, using a couple of different approaches.

## Installation

```sh
npm install
```

## Building the Library

This repository is broken in an FSM library, as well as sub-directories which contain examples. To build the library:

```sh
npm run build
```

## Tests

This repository utilizes `ts-jest` and stores the tests in the root:

```sh
npm test
```

## Running the Examples

All of the examples are nested under `examples`, and are projects in an of themselves, which consume the root FSM package as a file path dependency within their respective `package.json` files.

> Before running the examples, ensure you have run `npm install` in the root of the repo

### HTML FSM UI Toggle Example

In this example we utilize pure HTML and TS, implementing a toggle button from scratch, to demonstrate the principles of Finite State Machines and how they can be used with UI.

```sh
npm install
npm start
```

## Contributing and Issues

Please feel free to contribute or file issues, and refer to the corresponding documents within the root of the repository for information pertaining to the above.
