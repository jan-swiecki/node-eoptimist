var fs, PARENT_PATH, info, PACKAGE_JSON, e, options, yaml_path, yaml, argv, extendedHelp, showExtendedHelp;
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
options = {
  'version': {
    alias: 'info',
    boolean: true,
    description: 'Display current version'
  },
  'usage': {
    alias: 'help',
    boolean: true,
    description: 'Display help'
  }
};
yaml_path = PARENT_PATH + '/CLI.yaml';
yaml = {
  usage: '',
  options: {}
};
if (fs.existsSync(yaml_path)) {
  try {
    yaml = require(yaml_path);
  } catch (e$) {
    e = e$;
    console.log("Yaml: ".red.bold, e);
  }
  if (yaml) {
    yaml.usage = "Usage: " + yaml.usage;
    import$(options, yaml.options);
    yaml.options = undefined;
  }
}
module.exports = require('optimist').wrap(80).options(options).usage(yaml.usage);
argv = module.exports.argv;
if (argv.version) {
  console.log(info);
} else if (argv.usage) {
  extendedHelp = function(){
    var help, e, wrap, k, example;
    help = module.exports.help();
    if (yaml && (e = yaml.examples)) {
      help += "Examples:\n";
      wrap = require('wordwrap')(2, 80);
      for (k in e) {
        example = wrap(e[k]);
        help += example + "\n";
      }
    }
    return help;
  };
  showExtendedHelp = function(fn){
    if (!fn) {
      fn = console.error;
    }
    fn(extendedHelp());
  };
  showExtendedHelp();
}
function import$(obj, src){
  var own = {}.hasOwnProperty;
  for (var key in src) if (own.call(src, key)) obj[key] = src[key];
  return obj;
}