var m = require("mithril")
var Segmentation = require("../models/Segmentation")

module.exports = {
    oninit: function(vnode) {
        Segmentation.loadData(706, true)
        // Segmentation.loadData(vnode.attrs.deid, vnode.attrs.bending)
    },
    view: function() {
        return m(".dualsampa-list", Segmentation.data.map(function(d) {
            return m(".dualsampa-list-item", d.ID)
        }))
    }
}
