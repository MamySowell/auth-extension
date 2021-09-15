"use strict";
const path = require("path");
function extendConf(conf) {
    conf.boot.push("~@gastienne/quasar-app-extension-auth/src/boot/register.ts");
    conf.build.transpileDependencies.push(/quasar-app-extension-auth[\\/]src/);
    const requiredPlugins = ["Notify"];
    requiredPlugins.forEach((plugin) => {
        if (!conf.framework.plugins.includes(plugin)) {
            conf.framework.plugins.push(plugin);
        }
    });
    console.log("Boot sowell auth");
}
const chainWebpack = (ctx, chain) => {
    chain.resolve.alias.set("@gastienne/auth", path.resolve(__dirname, "./components"));
};
module.exports = function (api) {
    api.compatibleWith("quasar", "^2.0.0");
    api.compatibleWith("@quasar/app", "^3.0.0");
    api.chainWebpack((chain) => chainWebpack(api.ctx, chain));
    api.extendQuasarConf(extendConf);
};
