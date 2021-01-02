"use strict";
var a;
(function (a) {
    var EventType;
    (function (EventType) {
        EventType[EventType["test"] = 0] = "test";
    })(EventType || (EventType = {}));
    function fn(event) {
        console.log(EventType[event]);
    }
    fn(EventType.test);
})(a || (a = {}));
