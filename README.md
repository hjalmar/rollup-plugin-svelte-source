# rollup-plugin-svelte-source
### Installing
```
npm i -D rollup-plugin-svelte-source
```

### Implementation
In your rollup config file. import the plugin and enable it under plugins.
```js
// rollup.config.js
import svelteSource from 'rollup-plugin-svelte-source';

//...
plugins: [
  // make sure to initialize plugin 
  // before the svelte plugin
  svelteSource(options),
  //...
]
```

## Options
By default these options are implemented.
```js
{
  // the variable and export name for the stringified sourcecode
  label: 'ಠ_ಠ', 
  // what characters to be replaced. as we are working with html code the default is replacing 
  // the base htmlentities. Any occurence of a ending </script> tag will terminate the script. 
  // So at the minimum you'd have to escape that.
  // https://github.com/sveltejs/svelte/issues/5024
  replace: {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    '‘': '&apos;',
  },
  // what extensions to allow. Unless having some custom file extensions for svelte files, 
  // this option can be left as is and you'd do the filtering with the include/exclude options. 
  // expects an array and is checking that the filename ends with any one of these values
  extensions: ['.svelte'],
  // include and exclude uses @rollup/pluginutils filter which you can read more about here
  // https://github.com/rollup/plugins/tree/master/packages/pluginutils#createfilter 
  // and also for the matching features
  // https://github.com/micromatch/picomatch#globbing-features
  include: undefined,
  exclude: undefined
}
```
### Usage
```html
// Parent.svelte
<script>
  import Component, { ಠ_ಠ } from './Component.svelte';
</script>

<pre>
  {@html ಠ_ಠ}
</pre>

<Component />
```

### Options example
I do not recommend leaving include/exclude undefined(default) then every svelte component
would have a custom source code being exported. Either come up with your own file naming convention or only include certain directories/files. 
```js
svelteSource({
  // inside component you have access to 'source' and outside as an export
  // import Component, { source } from './subfolder/demos/testing/Component.svelte'; 
  label: 'source', 
  // match all svelte files that is at least under a 'demos' folder 
  include: ['**/demos/**'],
  // but exclude all files named Index.svelte
  exclude: ['**/Index.svelte']
})
```

```html
// Parent.svelte
<script>
  import Component, { source } from './Component.svelte';
</script>

<pre>
  {@html source}
</pre>

<Component />
```