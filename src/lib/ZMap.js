const ZMap = function ({BMap, map}) {
    // this.initCenter = new BMap.Point(116.404, 39.915); //初始化的中心点，同时为了定义网格的中心点
    // this.id = id; //div的id
    this.level = 12; //地图级别
    // this.center = center ? center : this.initCenter; //中心点
    this.BMap = BMap; // 类
    this.map = map; //百度地图实例
    this.plysOverlay = []; // 边界覆盖物集合
    this.markerOverlay = [] // 点覆盖物集合
    this.rectangleOverlay = [] // 矩形覆盖物集合

}
ZMap.prototype = {
    init (areaName) {
        // this.map = new BMap.Map(this.id, { enableMapClick: false });
        // this.map.centerAndZoom(this.center.point, this.level);
        this.map.centerAndZoom(areaName, this.level);
        this.map.enableScrollWheelZoom();
        this.map.disableInertialDragging();
        this.map.addControl(new this.BMap.NavigationControl({
            anchor: BMAP_ANCHOR_BOTTOM_RIGHT,
            type: BMAP_NAVIGATION_CONTROL_ZOOM
        })); //缩放按钮
        this.map.addControl(new this.BMap.ScaleControl({anchor: BMAP_ANCHOR_BOTTOM_LEFT, offset: new this.BMap.Size(80, 25)})); //比例尺
        this.map.disableDoubleClickZoom();
        this.map.setMapStyle({style: 'normal'});
        this.map.enableBizAuthLogo(); //开启
        this.getBounds(areaName) // 添加边界
        this.addItem()
    },
    // 添加边界
    getBounds: function (areaName) {
        let _this = this
        let plys = []
        let bdary = new this.BMap.Boundary()
        // 将原来的边界覆盖物去掉
        for (var i in _this.plysOverlay) {
            _this.map.removeOverlay(_this.plysOverlay[i]);
        }
        // 将原来的点覆盖物去掉
        for (var i in _this.markerOverlay) {
            _this.map.removeOverlay(_this.markerOverlay[i]);
        }
        // 将原来的矩形覆盖物去掉
        for (var i in _this.rectangleOverlay) {
            _this.map.removeOverlay(_this.rectangleOverlay[i]);
        }
        bdary.get(areaName, function(rs) {
            var count = rs.boundaries.length;
            console.log(count)
            //建立多边形覆盖物
            for (let i = 0; i < count; i++) {
                // console.log(rs.boundaries[i])
                let ply = new _this.BMap.Polygon(rs.boundaries[i], {
                    strokeWeight: 2,
                    strokeOpacity: 1,
                    StrokeStyle: "solid",
                    strokeColor: "#1abc9c",
                    // fillColor: "#16a085",
                    fillOpacity: 0.1
                })
                plys.push(ply)
                _this.plysOverlay.push(ply)
                _this.map.addOverlay(ply)  //添加边界覆盖物
                let haha = {
                    x1: ply.getBounds().getSouthWest().lng, // 西南（左下角）
                    y1: ply.getBounds().getSouthWest().lat,
                    x2: ply.getBounds().getNorthEast().lng, // 东北（右上角）
                    y2: ply.getBounds().getNorthEast().lat
                }
                let marker1 = new _this.BMap.Marker(new _this.BMap.Point(haha.x1, haha.y1))
                let marker2 = new _this.BMap.Marker(new _this.BMap.Point(haha.x2, haha.y2))
                _this.markerOverlay.push(marker1, marker2)
                // 添加点覆盖物
                _this.map.addOverlay(marker1)
                _this.map.addOverlay(marker2)
                // 添加矩形覆盖物
                let rectangle = new _this.BMap.Polygon([
                    new _this.BMap.Point(haha.x1, haha.y1),
                    new _this.BMap.Point(haha.x2, haha.y1),
                    new _this.BMap.Point(haha.x2, haha.y2),
                    new _this.BMap.Point(haha.x1, haha.y2)
                ], {strokeColor:"blue", strokeWeight:2, strokeOpacity:1,fillOpacity: 0.1});  //创建矩形
                _this.rectangleOverlay.push(rectangle)
                _this.map.addOverlay(rectangle)
                // 循环画矩形覆盖物
                // for (let j = haha.y1; j < haha.y2; j += 0.01033179) {
                let m = 0
                    for (let k = haha.x1; k < haha.x2; k += 0.00899322) {
                        let rectangle1 = new _this.BMap.Polygon([
                            new _this.BMap.Point(k, haha.y1),
                            new _this.BMap.Point(k + 0.00899322, haha.y1),
                            new _this.BMap.Point(k + 0.00899322, haha.y1 + 0.01033179),
                            new _this.BMap.Point(k, haha.y1 + 0.01033179)
                        ], {strokeColor:"red", strokeWeight:2, strokeOpacity:1,fillOpacity: 0.1});  //创建矩形
                        rectangle1.addEventListener('click', function(e) {
                            console.log(e)
                            let target = e.target
                            if (target.clicked) {
                                target.clicked = false
                                target.setFillColor('transparent')
                            } else {
                                target.clicked = true
                                target.setFillColor('red')
                            }
                            // let id = target.customData.id
                            // console.log("id="+id+"当前覆盖物的位置是" + p.getPosition().lng + "," + p.getPosition().lat)
                        })
                        _this.rectangleOverlay.push(rectangle1)
                        console.log('画区块')
                        _this.map.addOverlay(rectangle1)
                    }
                // }
            }
        })
    },
    // 添加右键菜单
    addItem () {
        let _this = this
        let menu = new _this.BMap.ContextMenu() // 创建右键菜单实例
        let textMenuItem = [
            {
                text: '放大',
                callback: function() {
                    console.log('放大')
                }
            },
            {
                text: '缩小',
                callback: function() {

                }
            }
        ]
        textMenuItem.forEach(e => {
            let MenuItem = new _this.BMap.MenuItem(e.text, e.callback, 100) // 创建一个菜单项实例，接收两个参数，一个是菜单名称，另外一个是点击菜单的回调函数
            menu.addItem(MenuItem) // 将菜单项实例传入右键菜单项实例中
            console.log(1111)
        })
        _this.map.addContextMenu(menu) // 将右键菜单实例放入到map实例地图中
    }
}

export default ZMap