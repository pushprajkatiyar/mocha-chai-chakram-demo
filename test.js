/**
 * Created by pushp.katiyar on 8/25/2017.
 */

var  mocha = require("mocha");
var chakram = require("chakram");
var chai = require("chai");

var expect = chakram.expect;
describe("HTTP assertions", function () {
    it("should make HTTP assertions easy", function () {
        var response = chakram.get("https://deckofcardsapi.com/api/deck/new/shuffle/");
        response
        expect(response).to.have.status(200);
        expect(response).to.have.header("content-type", "application/json");
        expect(response).not.to.be.encoded.with.gzip;
        return chakram.wait();
    });
});


describe("Promises", function () {
    it("should support asserting Biggie's best track", function () {
        return chakram.get("https://deckofcardsapi.com/api/deck/new/shuffle/")
            .then(function (searchResponse) {
                var bigID = searchResponse.body;
                return chakram.get("https://deckofcardsapi.com/api/deck/"+bigID.deck_id+"/draw");
            })
            .then(function (topTrackResponse) {
                var topTrack = topTrackResponse.body;
                expect(topTrack.success).to.be.true;
            });
    });
});