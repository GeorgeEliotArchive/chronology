# George Eliot Chronology

## Description

The George Eliot Chronology is a subproject of the George Eliot Archive. The group of visualizations collects dated information from primary source documents and displays more than 3,000 dates meant to support biographical research on Victorian author, George Eliot. A more detailed introduction to the project and the home page of the project [will be found here: ](https://georgeeliotarchive.org/chronology/)

## Setup

If on Ubuntu, you can clone this repository and run `UbuntuFirstTimeSetup.sh`.

Otherwise,

1. Clone this git repository to a folder in your home directory.
2. Install npm and nodejs.
3. Run `npm install` to install the node packages.

## Development

Use the following commands to run the two visualizations locally.

`npm run getData`: Generate csv files from the Omeka collection. Must be run before the calendar or tree.

`npm run calendar`: run the calendar visualization on `localhost:8000`

`npm run tree`: run the chronology tree on `localhost:8001`

These will auto-update as you make changes to the source files.
