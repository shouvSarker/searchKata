import * as React from "react";
import { IErrors, IFormContext, FormContext, IValues } from "./Form";

// The available editors for the fields
type Editor = "textbox" | "dropdown";

export interface IValidation {
  rule: (values: IValues, fieldName: string, args: any) => string;
  args?: any;
}

export interface IFieldProps {
  // The unique field name.
  id: string;

  // Displayed label text for the field.
  label?: string;

  // Editor type for the field.
  editor?: Editor;

  // Options for the drop down items.
  // Only passed for editor type dropdown.
  options?: string[];

  // The field value.
  value?: any;

  // The field validator function.
  validation?: IValidation;
}

export const Field: React.FunctionComponent<IFieldProps> = ({
  id,
  label,
  editor,
  options,
  value,
}) => {
  /**
   * Gets the validation error for the field
   * @param {IErrors} errors - All the errors from the form
   * @returns {string[]} - The validation error
   */
  const getError = (errors: IErrors | undefined): string =>
    errors ? errors[id] : "";

  /**
   * Gets the inline styles for editor
   * @param {IErrors} errors - All the errors from the form
   * @returns {any} - The style object
   */
  const getEditorStyle = (errors: IErrors | undefined): any =>
    getError(errors) ? { borderColor: "red" } : {};

  return (
    <FormContext.Consumer>
      {(context: IFormContext | undefined) => {
        return (
          <div className="form-group">
            {label && <label htmlFor={id}>{label}</label>}

            {editor!.toLowerCase() === "textbox" && (
              <input
                id={id}
                type="text"
                value={value}
                style={getEditorStyle(context?.errors)}
                onChange={(e: React.FormEvent<HTMLInputElement>) =>
                  context?.setValues({ [id]: e.currentTarget.value })
                }
                onBlur={() => context?.validate(id)}
                className="form-control"
              />
            )}

            {editor!.toLowerCase() === "dropdown" && (
              <select
                id={id}
                name={id}
                value={value}
                style={getEditorStyle(context?.errors)}
                onChange={(e: React.FormEvent<HTMLSelectElement>) =>
                  context?.setValues({ [id]: e.currentTarget.value })
                }
                onBlur={() => context?.validate(id)}
                className="form-control"
              >
                {options &&
                  options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
              </select>
            )}

            {getError(context?.errors) && (
              <div style={{ color: "red", fontSize: "80%" }}>
                <p>{getError(context?.errors)}</p>
              </div>
            )}
          </div>
        );
      }}
    </FormContext.Consumer>
  );
};

Field.defaultProps = {
  editor: "textbox",
};
