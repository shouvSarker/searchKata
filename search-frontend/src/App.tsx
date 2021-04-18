import React from "react";
import { Form, IFields, required } from "./Form";
import { Field } from "./Field";
import { lambdaUrl } from "./Config";

const App = () => {
  // For field definitions with validation rules.
  const fields: IFields = {
    searchKeyword: {
      id: "searchKeyword",
      label: "Search keyword",
      validation: { rule: required },
    },
    lookupString: {
      id: "lookupString",
      label: "Look up string",
      validation: { rule: required },
    },
    searchEngine: {
      id: "searchEngine",
      label: "Search engine",
      editor: "dropdown",
      options: ["", "google", "bing"],
      validation: { rule: required },
    },
    maxResults: {
      id: "maxResults",
      label: "Number of search results to scan",
      validation: { rule: required },
    },
  };

  return (
    <Form
      action={lambdaUrl}
      fields={fields}
      render={() => (
        <React.Fragment>
          <div className="alert alert-info" role="alert">
            Enter details to bring up positions of look up string in search
            results.
          </div>
          <Field {...fields.searchKeyword} />
          <Field {...fields.lookupString} />
          <Field {...fields.searchEngine} />
          <Field {...fields.maxResults} />
        </React.Fragment>
      )}
    />
  );
};

export default App;
