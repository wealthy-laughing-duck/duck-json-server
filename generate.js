var jsonfile = require('jsonfile');
var jsf = require('json-schema-faker');

var schemaDir = 'duck-raml/schemas';
var collections = {
  "users": "user-collection",
  "incomes": "income-collection",
  "outcomes": "income-collection"
};

var outputFile = "dist/db.json";
var outputData = {};
var promises = [];

Object.keys(collections).forEach((collectionName) => {
  var dfd = Promise.defer();
  promises.push(dfd.promise);
  var path = schemaDir + "/" + collections[collectionName] + ".json";
  jsonfile.readFile(path, function(err, jsonSchema) {
    var tmpCollection = jsf(jsonSchema);
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
