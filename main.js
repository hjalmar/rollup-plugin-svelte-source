const { createFilter } = require('@rollup/pluginutils');

const htmlEntities = (s, c) => s.replace(new RegExp(Object.keys(c).join('|'), 'g'), m => c[m] || m);

module.exports = (o = {}) => {
  // default options
  const defaults = {
    label: 'ಠ_ಠ',
    replace: {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      '‘': '&apos;',
    },
    extensions: ['.svelte'],
    include: null,
    exclude: null,
  };
  // assign options
  const options = Object.assign({}, defaults, o);
  // create the filter
  const filter = createFilter(options.include, options.exclude);
  
  return {
    name: 'svelte-source',
    transform(code, id){
      // allowed by filter
      if(!filter(id)){
        return null;
      }
      // make sure we are allowed
      if(Array.isArray(options.extensions) && options.extensions.length){
        if(!options.extensions.some(ext => id.endsWith(ext))){
          return null;
        }
      }
      // find and replace context module script and inject our source export
      let output = '';
      let match = code.match(/\<script(.*)context\=\"module\"(.*)\>/);
      if(match){
        output = code.replace(/\<script(.*)context\=\"module\"(.*)\>/, `$&\nexport const ${options.label} = ${JSON.stringify(htmlEntities(code, options.replace))};`);
      }else{
        output = `<script context="module">export const ${options.label} = ${JSON.stringify(htmlEntities(code, options.replace))};</script>${code}`;
      }
      return {
        code: `${output}`,
        map: null
      };
    }
  }
}