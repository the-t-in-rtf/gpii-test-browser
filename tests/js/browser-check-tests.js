/*

    Test checking checkboxes and radio buttons.

 */
"use strict";
var fluid = require("infusion");
var gpii  = fluid.registerNamespace("gpii");

require("../../index");
gpii.tests.browser.loadTestingSupport();

var url     = require("url");
var typeDemoUrl = url.resolve(url.resolve("file://", __dirname), "./static/html/check.html");

fluid.defaults("gpii.tests.browser.tests.check", {
    gradeNames: ["gpii.tests.browser.caseHolder.static"],
    rawModules: [{
        tests: [
            {
                name: "Test checking a checkbox...",
                sequence: [
                    {
                        func: "{gpii.tests.browser.environment}.browser.goto",
                        args: [typeDemoUrl]
                    },
                    {
                        event:    "{gpii.tests.browser.environment}.browser.events.onGotoComplete",
                        listener: "{gpii.tests.browser.environment}.browser.check",
                        args:     ["[name='checked']"]
                    },
                    {
                        event:    "{gpii.tests.browser.environment}.browser.events.onCheckComplete",
                        listener: "{gpii.tests.browser.environment}.browser.evaluate",
                        args:     [gpii.tests.browser.tests.valueLookupFunction, ":checked"]
                    },
                    {
                        event:     "{gpii.tests.browser.environment}.browser.events.onEvaluateComplete",
                        listener: "jqUnit.assertEquals",
                        args:      ["The checkbox should be checked...", "yes", "{arguments}.0"]
                    }
                ]
            },
            {
                name: "Test checking a radio button...",
                sequence: [
                    {
                        func: "{gpii.tests.browser.environment}.browser.goto",
                        args: [typeDemoUrl]
                    },
                    {
                        event:    "{gpii.tests.browser.environment}.browser.events.onGotoComplete",
                        listener: "{gpii.tests.browser.environment}.browser.check",
                        args:     ["#redButton"]
                    },
                    {
                        event:    "{gpii.tests.browser.environment}.browser.events.onCheckComplete",
                        listener: "{gpii.tests.browser.environment}.browser.evaluate",
                        args:     [gpii.tests.browser.tests.valueLookupFunction, ":checked"]
                    },
                    {
                        event:     "{gpii.tests.browser.environment}.browser.events.onEvaluateComplete",
                        listener: "jqUnit.assertEquals",
                        args:      ["The checkbox should be checked...", "red", "{arguments}.0"]
                    }
                ]
            }
        ]
    }]
});

gpii.tests.browser.environment({
    components: {
        caseHolder: {
            type: "gpii.tests.browser.tests.check"
        }
    }
});
