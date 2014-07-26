define(function() {
    var commands = codebox.require("core/commands");
    var dialogs = codebox.require("utils/dialogs");

    commands.register({
        id: "find.files",
        title: "Find: Browse Files",
        shortcuts: [
            "mod+p"
        ],
        run: function() {
            return dialogs.list(function(query) {

            }, {
                "placeholder": "Browse Files"
            });
        }
    });
});