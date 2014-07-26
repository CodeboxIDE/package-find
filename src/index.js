define([
    "src/settings",
    "text!src/templates/file.html",
    "less!src/stylesheets/main.less"
], function(settings, fileTemplate) {
    var _ = codebox.require("hr/utils");
    var commands = codebox.require("core/commands");
    var rpc = codebox.require("core/rpc");
    var dialogs = codebox.require("utils/dialogs");

    commands.register({
        id: "find.files",
        title: "Find: Jump to file",
        shortcuts: [
            "mod+p"
        ],
        run: function() {
            return dialogs.list(function(query) {
                return rpc.execute("find/files", {
                    query: query,
                    start: 0,
                    limit: settings.data.get("files.limit")
                })
                .get("results")
                .then(function(results) {
                    return _.map(results, function(result) {
                        return {
                            'path': result,
                            'filename': result.split('/').pop()
                        }
                    });
                });
            }, {
                template: fileTemplate,
                placeholder: "Jump to a file"
            })
            .then(function(file) {
                return commands.run("file.open", {
                    'path': file.get("path")
                });
            });
        }
    });
});