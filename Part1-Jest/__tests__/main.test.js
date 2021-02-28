// source: https://jestjs.io/docs/en/using-matchers
// I think the tests are simple enought to be basically self-documenting

// import function
const formatVolumeIconPath = require("../assets/scripts/main");


// link tests together
describe("tests formatVolumeIconPath", () => {

      // value = 0
      test("Value <= 0", () => {
        expect(formatVolumeIconPath(0)).toMatch(
          "./assets/media/icons/volume-level-0.svg"
        );
        expect(formatVolumeIconPath(-1000)).toMatch(
          "./assets/media/icons/volume-level-0.svg"
        );
      });

      // value in [1, 33]
      test("Value in [1, 33]", () => {
        expect(formatVolumeIconPath(2)).toMatch(
          "./assets/media/icons/volume-level-1.svg"
        );
      });

      // Value in [34, 65]
      test("Value in [34, 65]", () => {
        expect(formatVolumeIconPath(35)).toMatch(
          "./assets/media/icons/volume-level-2.svg"
        );
      });

      // Value in [66, inf)
      test("Value in [66, 100]", () => {
        expect(formatVolumeIconPath(67)).toMatch(
          "./assets/media/icons/volume-level-3.svg"
        );
        expect(formatVolumeIconPath(30000)).toMatch(
          "./assets/media/icons/volume-level-3.svg"
        );
      });

    });
