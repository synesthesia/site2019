module.exports = {
    "presets": [
      "@babel/preset-typescript",
      [
        "@babel/preset-env",
        {
          "targets": {
            "node": true
          }
        }
      ]
    ],
    "env" : {
      "test": {
      "presets": ["@babel/preset-typescript"]
    }
    },
    "plugins": [
      "@babel/plugin-proposal-class-properties",
      "@babel/plugin-transform-object-assign",
      "@babel/plugin-proposal-object-rest-spread"
    ]
  }
