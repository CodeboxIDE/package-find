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
                            "description": "Limit of filesto get",
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