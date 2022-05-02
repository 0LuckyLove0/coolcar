//import { formatDuration, formatFee } from "../../utils/format"
//import { routing } from "../../utils/routing"
var updateIntervalSec = 5;
var initialLat = 30;
var initialLng = 120;
var centPerSec = 2;
function formatDuration(sec) {
    var padString = function (n) {
        return n < 10 ? '0' + n.toFixed(0) : n.toFixed(0);
    };
    var h = Math.floor(sec / 3600);
    sec -= 3600 * h;
    var m = Math.floor(sec / 60);
    sec -= 60 * m;
    var s = Math.floor(sec);
    return "".concat(padString(h), ":").concat(padString(m), ":").concat(padString(s));
}
function formatFee(cents) {
    return (cents / 100).toFixed(2);
}
Page({
    timer: undefined,
    tripID: '',
    data: {
        location: {
            latitude: initialLat,
            longitude: initialLng
        },
        scale: 12,
        elapsed: '00:00:00',
        fee: '0.00',
        markers: [
            {
                iconPath: "/resources/car.png",
                id: 0,
                latitude: initialLat,
                longitude: initialLng,
                width: 20,
                height: 20
            },
        ]
    },
    onLoad: function () {
        this.setupLocationUpdator();
        this.setupTimer();
    },
    onUnload: function () {
        wx.stopLocationUpdate();
        if (this.timer) {
            clearInterval(this.timer);
        }
    },
    setupLocationUpdator: function () {
        var _this = this;
        wx.startLocationUpdate({
            fail: console.error
        });
        wx.onLocationChange(function (loc) {
            _this.setData({
                location: {
                    latitude: loc.latitude,
                    longitude: loc.longitude
                }
            });
        });
    },
    setupTimer: function () {
        var _this = this;
        var elapsedSec = 0;
        var cents = 0;
        this.timer = setInterval(function () {
            elapsedSec++;
            cents += centPerSec;
            _this.setData({
                elapsed: formatDuration(elapsedSec),
                fee: formatFee(cents)
            });
        }, 1000);
    }
});
