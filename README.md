## xml2json-node
> Node wrapper around Cheedoong's c++ xml2json library with updated rapidjson and rapidxml libraries.

[![travis][travis-image]][travis-url]

[travis-image]: https://travis-ci.org/maxnachlinger/xml2json-node.svg?branch=master
[travis-url]: https://travis-ci.org/maxnachlinger/xml2json-node

Inspired by this awesome, unmaintained, library: https://github.com/node-monk/xml-conv-json

### Install
```bash
npm i xml2json-node
```

### Example / API
```javascript
const xml2json = require('xml2json-node')

const xmlString = `<person><name>Test</name><age>21</age></person>`
const jsonString = xml2json(xmlString); // {"person":{"name":"Test","age":"21"}}
const person = JSON.parse(jsonString); // { person: { name: 'Test', age: 21 } }
```

###  C++ sources:
- [`src/include/xml2json.hpp`](https://github.com/Cheedoong/xml2json/blob/master/include/xml2json.hpp)
- [`src/include/rapidjson`](https://github.com/Tencent/rapidjson/tree/master/include/rapidjson)
- [`src/include/rapidxml`](https://github.com/dwd/rapidxml)
