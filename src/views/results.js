define([
    "text!src/templates/results.html"
], function(resultsTemplate) {
    var $ = codebox.require("hr/dom");
    var _ = codebox.require("hr/utils");
    var commands = codebox.require("core/commands");

    var ResultsTab = codebox.tabs.Panel.extend({
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

    return ResultsTab;
});