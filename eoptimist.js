var fs, PARENT_PATH, info, PACKAGE_JSON, e, optimist, yaml_path, yaml, argv;
fs = require('fs');
require('colors');
require('js-yaml');
PARENT_PATH = require('path').dirname(process.mainModule.filename);
info = '';
try {
  PACKAGE_JSON = require(PARENT_PATH + "/package.json");
  info = PACKAGE_JSON.name + " " + PACKAGE_JSON.version;
} catch (e$) {
  e = e$;
  console.log("Error retrieving package.json".red.bold);
  console.log(e);
}
optimist = require('optimist');
optimist.extendedHelp = function(){
  var help, e, wrap, k, example;
  help = optimist.help();
  if (e = optimist.examples) {
    help += "Examples:\n";
    wrap = require('wordwrap')(2, 80);
    for (k in e) {
      example = wrap(e[k]);
      help += example + "\n";
    }
  }
  return help;
};
optimist.showExtendedHelp = function(fn){
  if (!fn) {
    fn = console.error;
  }
  fn(optimist.extendedHelp());
};
optimist.options({
  'version': {
    alias: 'info',
    boolean: true
  },
  'usage': {
    alias: 'help',
    boolean: true
  }
}).describe({
  'version': 'Display current version',
  'usage': 'Display help'
}).wrap(80);
yaml_path = PARENT_PATH + '/CLI.yaml';
yaml = null;
if (fs.existsSync(yaml_path)) {
  try {
    yaml = require(yaml_path);
  } catch (e$) {
    e = e$;
    console.log("Yaml: ".red.bold, e);
  }
  if (yaml != null) {
    optimist.options(yaml.options);
    optimist.usage("Usage: " + yaml.usage);
    optimist.examples = yaml.examples;
  }
}
argv = optimist.argv;
if (argv.version) {
  console.log(info);
} else if (argv.usage) {
  optimist.showExtendedHelp();
}
module.exports = optimist;