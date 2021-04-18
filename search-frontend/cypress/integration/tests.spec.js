describe("Query interface", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3001");
  });

  it("it shows error message if submitted without input", () => {
    cy.get("form").submit();
    cy.get('*[class^="form-group"]').eq(3).contains("This must be populated");
  });

  it("it shows error message for input if validation fails", () => {
    cy.get("input").first().focus().should("have.class", "form-control");
    cy.get("input").eq(2).focus().should("have.class", "form-control");
    cy.get('*[class^="form-group"]').first().contains("This must be populated");
  });

  it("it submits a form and shows expected value on the screen", () => {
    const searchKeyword = "Test keyword";
    const lookupString = "https://www.infotrack.com.au";
    const maxResults = 50;

    cy.get("input")
      .eq(0)
      .type(searchKeyword)
      .should("have.value", searchKeyword);
    cy.get("input").eq(1).type(lookupString).should("have.value", lookupString);
    cy.get("select").select("google");
    cy.get("input").eq(2).type(maxResults).should("have.value", maxResults);
    cy.get("form").submit();
    cy.wait(3000);
    cy.contains(
      `The form was successfully submitted! Your search results are:{"outcome":[1,11]}`
    );
    cy.get("select").select("bing");
    cy.get("form").submit();
    cy.wait(3000);
    cy.contains(
      `The form was successfully submitted! Your search results are:{"outcome":[28]}`
    );
  });
});
