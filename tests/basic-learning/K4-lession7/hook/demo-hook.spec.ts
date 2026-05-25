import test from "@playwright/test";

test.describe("Lession - Demo Hook", () => {

    test.beforeAll(() => {
        console.log("Run BeforeAll Test");
    });

    test.afterAll(() => {
        console.log("Run AfterAll Test");
    });

    test.beforeEach(() => {
        console.log("   Run BeforeEach Test");
    });

    test.afterEach(() => {
        console.log("   Run AfterEach Test");
    })

    test("Test 1", () => {
        console.log("       Run test 1");
    });

    test("Test 2", () => {
        console.log("       Run Test 2");
    });
});


// Run BeforeAll Test
//    Run BeforeEach Test
//        Run test 1
//    Run AfterEach Test

//    Run BeforeEach Test
//        Run Test 2
//    Run AfterEach Test
// Run AfterAll Test