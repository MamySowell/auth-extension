const path = require('path')

function extendConf(conf: any) {
  conf.boot.push('~@gastienne/quasar-app-extension-auth/src/boot/register.ts')

  conf.boot.push('~@gastienne/quasar-app-extension-auth/src/boot/router-guard.ts')

  conf.build.transpileDependencies.push(/quasar-app-extension-auth[\\/]src/)

  const requiredPlugins:string[] = ["Notify"]

  requiredPlugins.forEach((plugin: string) => {
    if(!conf.framework.plugins.includes(plugin)) {
      conf.framework.plugins.push(plugin)
    }
  })


  console.log('Boot sowell auth')
}

const chainWebpack = (ctx: any, chain: any) => {
  chain.resolve.alias.set('@gastienne/auth', path.resolve(__dirname, "./components"))
}

export = function (api: any) {

  api.compatibleWith("quasar", "^2.0.0")
  api.compatibleWith("@quasar/app", "^3.0.0")

  api.chainWebpack((chain: any) => chainWebpack(api.ctx, chain))

  api.extendQuasarConf(extendConf)
}
