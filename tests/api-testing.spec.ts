import { test, expect } from "@playwright/test";
import pageTwoAllUsers from "../test-data/api-users.repons.json";

//Site: https://restful-api.dev/

test.describe("API Testing", () => {
  //1.Get ALL whatever
  test("Get ALL stuff - matched saved response", async ({ request }) => {
    const response = await request.get("https://api.restful-api.dev/objects");

    //verify status from headers
    expect(response.status()).toBe(200);

    //parse response body
    const body = await response.json();

    //compare full structure with saved response
    expect(body).toEqual(pageTwoAllUsers);
  });

  //2. Get ONE stuff - field-by-field assertions
  test("Get SINGLE thing - check fields", async ({ request }) => {
    const response = await request.get("https://api.restful-api.dev/objects/7");
    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.id).toBe("7"),
      expect(body.data.year).toBe(2019),
      expect(body.data.price).toBe(1849.99),
      expect(body.data["CPU model"]).toBe("Intel Core i9");
  });

  //3. POST - Create object
  test.only("Post - create stuff", async ({ request }) => {
    const payload = {
      name: "Test Stuff Luck",
      data: {
        year: 2025,
        price: 666.66,
        "CPU Model": "Idk motherf",
        "Hard disk size": "My size 1tb",
      },
    };

    const response = await request.post("https://api.restful-api.dev/objects", {
      //   headers: { se tivesse CHAVE ela ficazria por aqui, mas NUNCA feria assim obvio
      //     Authorization: `Bearer ${process.env.API_TOKEN}`,
      //   },
      data: payload,
    });

    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    console.log(responseBody);
    expect(responseBody.name).toBe(payload.name);
    expect(responseBody.data.year).toBe(2025);
    expect(responseBody).toHaveProperty("id");
    expect(responseBody).toHaveProperty("createdAt");
  });

  //4. PUT - update
  test("PUT - Update stuff", async ({ request }) => {
    const payload = {
      name: "Test Stuff Luck",
      data: {
        year: 2025,
        price: 666.66,
        "CPU Model": "Idk motherf",
        "Hard disk size": "My size 1tb",
        color: "silver",
      },
    };

    const response = await request.put(
      "https://api.restful-api.dev/objects/ff8081819782e69e019b5d27794101d3",
      {
        data: payload,
      }
    );

    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    console.log(responseBody);
    expect(responseBody.name).toBe(payload.name);
    expect(responseBody.data.year).toBe(2025);
    expect(responseBody).toHaveProperty("id");
    expect(responseBody).toHaveProperty("updatedAt");
  });

  //5. Delete - remove stuff (sempre criar antes)
  test("DELETE Stuff", async ({request}) => {
    const response = await request.delete("https://api.restful-api.dev/objects/ff8081819782e69e019b5d27794101d3")

    expect(response.status()).toBe(200)

    const responseBody = await response.json();
    expect(responseBody.message).toBe("Object with id = ff8081819782e69e019b5d27794101d3 has been deleted.")
  })

  test("POST + DELETE - create and remove stuff", async ({ request }) => {
  // 1. CREATE
  const payload = {
    name: "Test Stuff Luck",
    data: {
      year: 2025,
      price: 666.66,
      "CPU Model": "Idk motherf",
      "Hard disk size": "My size 1tb",
    },
  };

  const createResponse = await request.post(
    "https://api.restful-api.dev/objects",
    { data: payload }
  );

  expect(createResponse.status()).toBe(200);

  const createdBody = await createResponse.json();
  const id = createdBody.id;

  expect(id).toBeTruthy(); 

  // 2. DELETE (usando o ID criado)
  const deleteResponse = await request.delete(
    `https://api.restful-api.dev/objects/${id}`
  );

  expect(deleteResponse.status()).toBe(200);

  const deleteBody = await deleteResponse.json();
  expect(deleteBody.message).toContain(id);
});


});
