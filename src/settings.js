define(function() {
    return codebox.settings.schema("find",
        {
            "title": "Find",
            "type": "object",
            "properties": {
                "files": {
                    "description": "Browse Files",
                    "type": "object",
                    "properties": {
                        "limit": {
                            "description": "Limit of files to get",
                            "type": "number",
                            "minimum":  1,
                            "maximum": 1000,
                            "multipleOf": 1,
                            "default": 100
                        }
                    }
                },
                "code": {
                    "description": "Find Code",
                    "type": "object",
                    "properties": {
                        "limit": {
                            "description": "Limit of results to show",
                            "type": "number",
                            "minimum":  1,
                            "maximum": 1000,
                            "multipleOf": 1,
                            "default": 100
                        }
                    }
                }
            }
        }
    );
});