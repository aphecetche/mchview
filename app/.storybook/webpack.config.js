const path = require('path')
const postcssNesting = require( "postcss-nesting")
const autoprefixer = require('autoprefixer')

module.exports = async ({ config }) => {

    config.module.rules.map(x => {
        if (x.test.toString() == '/\\.css$/') {
            x.use.map(x=> {
                if (x.loader) {
                    if (x.loader.match('/css-loader/')) {
                        x.options = { ... x.options,
                            modules: true }
                    }
                    if (x.loader.match('/postcss-loader/')) {
                        x.options = { ...x.options,
                            plugins: () => [ postcssNesting(),
                                autoprefixer()
                            ]
                        }
                        console.log(x)
                    }
                }
            })
        }
    }
    )

    // console.dir(config, { depth: null })

    return config;
}
