import pathify from 'vuex-pathify'
export default pathify

pathify.options.mapping = (type, name, formatters) => {
  switch (type) {
    case 'mutations':
      return formatters.const('set', name) // SET_FOO
    case 'actions':
      return formatters.camel('act', name) // setFoo
    case 'getters':
      return formatters.camel('get', name) // getFoo
  }
  return name // foo
}
pathify.options.deep = 2
