module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: ["airbnb-base", "prettier", "eslint:recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended"],
    parserOptions: {
        ecmaVersion: 12,
        sourceType: "module",
    },
    overrides: [
        {
            files: ["src/*.ts"],
            parser: "@typescript-eslint/parser",
            parserOptions: {
                project: "./tsconfig.json",
            },
            plugins: ["@typescript-eslint/eslint-plugin"],
            rules: {
                "no-param-reassign": "off",
                "no-useless-constructor": "off",
                "@typescript-eslint/no-useless-constructor": ["error"],
                "import/extensions": [
                    "error",
                    "ignorePackages",
                    {
                        ts: "never",
                        js: "never",
                    },
                ],
                "max-len": [
                    "error",
                    {
                        ignoreComments: true,
                        code: 120,
                    },
                ],
            },
        },
    ],
    settings: {
        "import/resolver": {
            node: {
                extensions: [".ts", ".js"],
            },
        },
    },
};
