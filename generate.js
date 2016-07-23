var jsonfile = require('jsonfile');
var jsf = require('json-schema-faker');

var schemaDir = 'duck-raml/schemas';
var collections = {
  "users": {
    "file": "user-collection.json",
    "minItems": 2,
    "maxItems": 4
  },
  "incomeCategories": {
    "file": "category-collection.json",
    "minItems": 5,
    "maxItems": 10
  },
  "outcomeCategories": {
    "file": "category-collection.json",
    "minItems": 10,
    "maxItems": 30
  },
  "incomes": {
    "file": "income-collection.json",
    "minItems": 200,
    "maxItems": 500
  },
  "outcomes": {
    "file": "income-collection.json",
    "minItems": 1000,
    "maxItems": 3000
  }
};

var outputFile = "dist/db.json";
var outputData = {};
var promises = [];

function jsonClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

Object.keys(collections).forEach((collectionName) => {
  var collectionData = collections[collectionName];
  var dfd = Promise.defer();
  promises.push(dfd.promise);
  var path = schemaDir + "/" + collectionData.file;
  jsonfile.readFile(path, function(err, originalJSONSchema) {
    var JSONSchema = jsonClone(originalJSONSchema);
    JSONSchema.minItems = collectionData.minItems;
    JSONSchema.maxItems = collectionData.maxItems;
    var tmpCollection = jsf(JSONSchema);
    tmpCollection.forEach((el, ind) => {
      el.id = ind + 1;
    });
    outputData[collectionName] = tmpCollection;
    dfd.resolve();
  });
});

Promise.all(promises).then(() => {
  jsonfile.writeFile(outputFile, outputData, {spaces: 2}, function(err) {
    if (err) {
      console.error(err);
    } else {
      console.info("Generating", outputFile, "finished");
    }
  });
});
