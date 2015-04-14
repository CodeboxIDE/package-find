require("./stylesheets/main.less");

var settings = require("./settings");
var ResultsTab = require("./views/results");
var fileTemplate = require("./templates/file.html");

var _ = codebox.require("hr.utils");
var commands = codebox.require("core/commands");
var rpc = codebox.require("core/rpc");
var dialogs = codebox.require("utils/dialogs");

var lastFind = {};

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
            placeholder: "Jump to a file",
            textIndex: function(model) {
                return model.get("path")
            }
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

        return dialogs.schema({
            "title": "Find in Files",
            "type": "object",
            "properties": {
                "query": {
                    "description": "Find",
                    "type": "string"
                },
                "root": {
                    "description": "Where",
                    "type": "string"
                }
            }
        }, lastFind)
        .then(function(args) {
            args.limit = settings.data.get("code.limit");

            tab = codebox.tabs.add(ResultsTab, {
                args: args,
                result: null
            }, {
                title: "Find Results"
            });

            return rpc.execute("find/code", args).fail(dialogs.error);
        })
        .then(function(result) {
            tab.options.result = result;
            tab.update();
        });
    }
});

if (codebox.menubar) {
    codebox.menubar.createMenu({
        caption: "Find",
        items: [
            {
                caption: "Jump to Files",
                command: "find.files"
            },
            {
                caption: "Find in Files",
                command: "find.code"
            }
        ]
    });
}
