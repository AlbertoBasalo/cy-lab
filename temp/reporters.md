# Cypress Reporters

https://docs.cypress.io/guides/tooling/reporters

> "test:junit": "cypress run -C cypress-production-junit.json",

```json
{
  "reporter": "junit",
  "reporterOptions": {
    "mochaFile": "cypress/reports/results/[hash].xml",
    "toConsole": true
  }
}
```

> "test:city": "cypress run -C cypress-production-city.json --spec > cypress/reports/city.txt",

```json
{ "reporter": "teamcity", "reporterOptions": {} }
```

> "test:spec": "cypress run -C cypress-production-spec.json --spec ",

```json
{
  "reporter": "spec",
  "reporterOptions": {
    "reportFilename": "cypress/reports/results.txt",
    "overwrite": true,
    "toConsole": true
  }
}
```
