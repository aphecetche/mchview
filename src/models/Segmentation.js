var m = require("mithril")

var Segmentation = {
    data: [],
    loadData: function(deid, bending) {
        return m.request({
            method: "GET",
            url: "http://localhost:8080/dualsampas?deid=" + deid + "&" + "bending=" + bending,
        }).then(function(result) {
            console.log(result)
            Segmentation.data = result.DualSampas
        })
    }
}

module.exports = Segmentation
