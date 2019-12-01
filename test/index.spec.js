'use strict';

const path = require("path");
const fs = require("fs").promises;
const xml2json = require('../');

describe("index.js tests", () => {

  it('converts simple xml to json', async () => {
    const xmlString = `<person><name>Test</name><age>21</age></person>`
    const jsonString = await xml2json(xmlString);
    const obj = JSON.parse(jsonString);

    expect(obj).toBeTruthy();
    expect(obj).toEqual({
      person: {
        name: 'Test',
        age: '21'
      }
    });
  });

  it("converts complex xml to json", async () => {
    const xmlString = await fs.readFile(
      path.join(__dirname, "./fixture.xml"),
      "utf8"
    );
    const jsonString = await xml2json(xmlString);
    const obj = JSON.parse(jsonString);

    expect(obj).toBeTruthy();
    expect(obj).toEqual({
      wmWalletAuthorize: {
        RequestID: "1",
        session: {
          sessionId: "6aa64f7b-e2e5-4b70-8634-9a2544d96cd4"
        },
        storeData: {
          addressLine1: "123 MAIN ST",
          addressLine2: null,
          city: "ANYTOWN",
          stateOrProvince: "NJ",
          zipCode: "123450000",
          country: "US",
          storeType: "supercenter",
          utcOffset: "-300"
        },
        cart: {
          items: {
            item: [
              {
                name: "RX ITEM 0",
                price: "1",
                quantity: "1",
                quantityType: "unit",
                gtin: "2000000000000000000038",
                department: "38",
                category: "0",
                subcategory: "0"
              },
              {
                name: "RX ITEM 1",
                price: "1",
                quantity: "1",
                quantityType: "unit",
                gtin: "2000000000000000000038",
                department: "50",
                category: "0",
                subcategory: "0"
              }
            ]
          }
        },
        metadata: {
          GSALevel: "gsa391900",
          GSABuildDate: "3919001014",
          Rx: {
            configRead: "false",
            tlogFile: "94261130.161",
            time: {
              preprocess: "50",
              binLookup: "6230",
              auth: "6180",
              ereceipt: "0",
              config: "130",
              parse: "0",
              other: "690",
              total: "13280"
            }
          }
        },
        transaction: {
          transactionId: "9426",
          store: "5752",
          terminal: "82",
          authorizationRequestDate: "2019-11-30",
          authorizationRequestTime: "16:15:42",
          transactionDate: "2019-11-30",
          transactionTime: "16:15:42",
          transactionAmount: "0",
          transactionType: "reverse",
          aborted: "true",
          mode: "CHK",
          orderType: "RX",
          amountSplit: {
            split: {
              splitId: "000",
              amount: "800",
              paymentPreferenceId: "9d48160f-c16f-4536-8b17-8d9e92d5194e",
              customerId: "0fbf5619-e044-475e-9ecf-901a7fec4d88"
            }
          }
        }
      }
    });
  });
});
