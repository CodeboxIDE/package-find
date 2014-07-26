define([
    "src/settings",
    "src/views/results",
    "text!src/templates/file.html",
    "less!src/stylesheets/main.less"
], function(settings, ResultsTab, fileTemplate) {
    var _ = codebox.require("hr/utils");
    var commands = codebox.require("core/commands");
    var rpc = codebox.require("core/rpc");
    var dialogs = codebox.require("utils/dialogs");

    var lastFind = "";

    // Browse/Find files
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

    // Browse/Find code
    commands.register({
        id: "find.code",
        title: "Find: Find in Files",
        shortcuts: [
            "shift+mod+f"
        ],
        run: function() {
            var tab;

            return dialogs.prompt("Find", lastFind)
            .then(function(query) {
                lastFind = query;

                tab = codebox.tabs.add(ResultsTab, {
                    query: query,
                    result: null
                }, {
                    title: "Find Results"
                });

                return rpc.execute("find/code", {
                    query: query,
                    start: 0,
                    maxresults: settings.data.get("code.limit")
                });
            })
            .then(function(result) {
                tab.options.result = result;
                tab.update();
            });
        }
    });
});