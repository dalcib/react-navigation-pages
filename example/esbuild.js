const esbuild = require('esbuild')
const { createServer, request } = require('http')
const spawn = require('child_process').spawn
const { parse, resolve } = require('path')
//const plugin = require('../dist/esbuild.cjs')

let app
try {
  app = require('./app.json')
} catch {
  app = {}
}

var isDev = !(process.argv[2] === 'build')
const clients = []

esbuild
  .build({
    entryPoints: ['App.tsx'],
    outfile: './public/bundle.js',
    tsconfig: 'tsconfig.json',
    define: {
      'process.env.APP_MANIFEST': JSON.stringify(app),
      'process.env.JEST_WORKER_ID': 'false',
      __DEV__: isDev,
      global: 'window',
    },
    loader: { '.png': 'file', '.jpg': 'file', '.ttf': 'file', '.js': 'jsx' },
    resolveExtensions: [".web.tsx", ".web.ts", ".web.jsx", ".web.js", ".tsx", ".ts", ".jsx", ".js"], //prettier-ignore
    format: 'esm',
    bundle: true,
    minify: !isDev,
    assetNames: 'assets/[name]-[hash]',
    sourcemap: true,
    plugins: [
      //plugin('./AutoNavigator.js', resolve('./pages'), resolve('.'), true)(),
      {
        name: 'alias',
        setup(build) {
          build.onResolve({ filter: /^react-native$/ }, (args) => ({
            path: resolve(`./node_modules/react-native-web/dist/index.js`),
          }))
        },
      },
    ],
    incremental: isDev,
    publicPath: '/',
    banner: isDev
      ? { js: ' (() => new EventSource("/esbuild").onmessage = () => location.reload())();' }
      : {},
    watch: isDev && {
      onRebuild(error, result) {
        clients.forEach((res) => res.write('data: update\n\n'))
        clients.length = 0
        console.log(error ? error : '...')
      },
    },
  })
  .then((result, error) => {})
  .catch(() => process.exit(1))

isDev &&
  esbuild.serve({ servedir: './public' }, {}).then(() => {
    createServer((req, res) => {
      const { url, method, headers } = req
      if (req.url === '/esbuild')
        return clients.push(
          res.writeHead(200, {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            Connection: 'keep-alive',
          })
        )
      const path = ~url.split('/').pop().indexOf('.') ? url : `/index.html` //for PWA with router
      req.pipe(
        request({ hostname: '0.0.0.0', port: 8000, path, method, headers }, (prxRes) => {
          res.writeHead(prxRes.statusCode, prxRes.headers)
          prxRes.pipe(res, { end: true })
        }),
        { end: true }
      )
    }).listen(3000)

    setTimeout(() => {
      const op = { darwin: ['open'], linux: ['xdg-open'], win32: ['cmd', '/c', 'start'] }
      const ptf = process.platform
      if (clients.length === 0 && isDev)
        spawn(op[ptf][0], [...[op[ptf].slice(1)], `http://localhost:3000`])
    }, 1000) //open the default browser only if it is not opened yet
  })
