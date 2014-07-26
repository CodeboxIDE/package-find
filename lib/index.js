var Q = require("q");
var cfind = require("cfind");

module.exports = function(codebox) {
    codebox.logger.log("start files find services");

    codebox.rpc.service("find", {
        files: function(args) {
            return codebox.workspace.path(args.root || "./")
            .then(function(_path) {
                args.root = _path;

                return Q.nfcall(cfind.files, args);
            });
        }
    });
};
