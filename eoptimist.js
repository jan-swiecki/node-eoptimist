var fs, PARENT_PATH, info, PACKAGE_JSON, e, optimist_fns, options, yaml_path, yaml, optimist, argv;
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
optimist_fns = {
  extendedHelp: function(){
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
  },
  showExtendedHelp: function(fn){
    if (!fn) {
      fn = console.error;
    }
    fn(optimist.extendedHelp());
  }
};
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
yaml = {};
if (fs.existsSync(yaml_path)) {
  try {
    yaml = require(yaml_path);
  } catch (e$) {
    e = e$;
    console.log("Yaml: ".red.bold, e);
  }
  if (yaml) {
    import$(options, yaml.options);
    yaml.options = undefined;
  }
}
optimist = require('optimist').wrap(80).options(options);
import$(optimist, optimist_fns);
if (yaml) {
  import$(optimist, yaml);
}
module.exports = optimist;
argv = optimist.argv;
if (argv.version) {
  console.log(info);
} else if (argv.usage) {
  optimist.showExtendedHelp();
}
function import$(obj, src){
  var own = {}.hasOwnProperty;
  for (var key in src) if (own.call(src, key)) obj[key] = src[key];
  return obj;
}