define([
    "text!src/templates/results.html"
], function(resultsTemplate) {
    var _ = codebox.require("hr/utils");
    var TabPanelView = codebox.tabs.Panel;

    var ResultsTab = TabPanelView.extend({
        className: "component-tab-results",
        template: resultsTemplate,
        templateContext: function() {
            return this.options;
        }
    })

    return ResultsTab;
});