// source: https://docs.cypress.io/api/commands/should.html#Syntax
// source: https://docs.cypress.io/guides/references/assertions.html#Chai
describe('Party Horn Tests', () => {
  beforeEach(() => {
    // this edit shouldn't change functionality
    cy.visit('http://127.0.0.1:5500/index.html');
  });

  // default test
  it('First Test', () => {
    expect(true).to.equal(true);
  });

  // volume-number coupling
  it('Test volume slider changes with number', () => {
    // set volume # and then check
    cy.get("#volume-number").clear().type("75").then(($el) => {
      expect($el).to.have.value(75);
    });
    cy.get("#volume-slider").should('have.value', 75);
  });

  // volume-number coupling (reverse)
  it('Test volume number changes with slider', () => {
    // change slider
    cy.get("#volume-slider").invoke("val", 33).trigger("input");
    // check volume number using should and chai assertion chains
    cy.get("#volume-number").should('have.value', 33);
  });

  // volume-image coupling
  it('Test audio volume changes with slider', () => {
    cy.get("#volume-slider").invoke("val", 33).trigger("input");
    cy.get("#horn-sound")
      .should("have.prop", "volume")
      .should("equal", 0.33);
  });

  // radio updates sources (car)
  it("check image and sound sources change on audio select (car)", () => {
    // check car radio button
    cy.get("#radio-car-horn").check();

    // check attribute links to correct source
    cy.get("#sound-image")
      .should("have.attr", "src")
      .should("contains", "car.svg");
    cy.get('#horn-sound')
      .should("have.attr", "src")
      .should("contains", "car-horn.mp3");
  });

  // radio updates sources (party)
  it("check image and sound sources change on audio select (party)", () => {
    // check party horn radio
    cy.get("#radio-party-horn").check();

    // check attribute links to correct source (party)
    cy.get("#sound-image")
      .should("have.attr", "src")
      .should("contains", "party-horn.svg");
    cy.get("#horn-sound")
      .should("have.attr", "src")
      .should("contains", "party-horn.mp3");
  });

  // volume updates icon (muted)
  it("muted volume icon", () => {
    // set volume value
    cy.get("#volume-number").clear().type("0");

    // check image links to correct source
    cy.get("#volume-image")
      .should("have.attr", "src")
      .should("contains", "volume-level-0.svg");
  });

  // volume updates icon (stage 1)
  it("stage 1 volume icon", () => {
    // see "muted volume icon" test for comments
    cy.get("#volume-number").clear().type("20");
    cy.get("#volume-image")
      .should("have.attr", "src")
      .should("contains", "volume-level-1.svg");
  });

  // volume updates icon (stage 2)
  it("stage 2 volume icon", () => {
    // see "muted volume icon" test for comments
    cy.get("#volume-number").clear().type("50");
    cy.get("#volume-image")
      .should("have.attr", "src")
      .should("contains", "volume-level-2.svg");
  });

  // volume updates icon (stage 3)
  it("stage 3 volume icon", () => {
    // see "muted volume icon" test for comments
    cy.get("#volume-number").clear().type("70");
    cy.get("#volume-image")
      .should("have.attr", "src")
      .should("contains", "volume-level-3.svg");
  });

  // edge case OOB
  it("Check out of bounds input", () => {
    // set text value to "30000"
    cy.get("#volume-number").clear().type("30000");
    // check if error is thrown properly
    cy.get("input:invalid").should("have.length", 1);
  });

  // edge case \epsilon
  it("Disable button for empty volume field", () => {
    // set text value to epsilon
    cy.get("#volume-number").clear();
    // check if button is interactable
    cy.get("#honk-btn").should("have.prop", "disabled");
  });

  // edge case NAN
  it("Disable button for NAN volume field", () => {
    // set above
    cy.get("#volume-number").clear().type("Austin");
    cy.get("#honk-btn").should("have.prop", "disabled");
  });
});
