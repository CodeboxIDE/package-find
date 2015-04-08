var resultsTemplate = require("../templates/results.html");

var $ = codebox.require("jquery");
var _ = codebox.require("hr.utils");
var View = codebox.require("hr.view");
var commands = codebox.require("core/commands");

var ResultsTab = codebox.tabs.Panel.inherit(View.Template).extend({
    className: "component-tab-results",
    template: resultsTemplate,
    templateContext: function() {
        return this.options;
    },
    events: {
        'dblclick *[data-file]': "onOpenFile"
    },

    onOpenFile: function(e) {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }

        commands.run("file.open", {
            'path': (this.options.args.root || ".")+"/"+$(e.currentTarget).data("file"),
            'line': parseInt($(e.currentTarget).data("line") || 0)
        });
    }
})

module.exports = ResultsTab;
