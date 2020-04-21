const _ = require('lodash')

const ZMap = function ({BMap, map}) {
    // this.initCenter = new BMap.Point(116.404, 39.915); //初始化的中心点，同时为了定义网格的中心点
    // this.id = id; //div的id
    this.level = 12; //地图级别
    this.spanX = 0.00899322 * 3 // 当前网格纬度跨度
    this.spanY = 0.01033179 * 3 // 当前网格经度跨度
    // this.center = center ? center : this.initCenter; //中心点
    this.BMap = BMap; // 类
    this.map = map; //百度地图实例
    this.plysOverlay = []; // 边界覆盖物集合
    this.markerOverlay = [] // 点覆盖物集合
    this.rectangleOverlay = [] // 矩形覆盖物集合
    this.mergeList = [] // 选中的矩形覆盖物坐标集合
    this.selectId = 0 // 给选中的矩形覆盖物添加一个id便于识别
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
        // this.addItem()
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
                    fillColor: "#16a085",
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
                for (let j = haha.y1; j < haha.y2; j += _this.spanY) {
                    for (let k = haha.x1; k < haha.x2; k += _this.spanX) {
                        let rectangle1 = new _this.BMap.Polygon([
                            new _this.BMap.Point(k, j),
                            new _this.BMap.Point(k + _this.spanX, j),
                            new _this.BMap.Point(k + _this.spanX, j + _this.spanY),
                            new _this.BMap.Point(k, j + _this.spanY)
                        ], {strokeColor:"red", strokeWeight:2, strokeOpacity:1,fillOpacity: 0.1});  //创建矩形
                        rectangle1.addEventListener('click', function(e) {
                            console.log(e.target)
                            let target = e.target
                            // 给每一个点击过的矩形覆盖物加上id
                            if (!target.selectId && target.selectId !== 0) {
                                target.selectId = _this.selectId++
                            }
                            if (target.clicked) {
                                target.clicked = false
                                target.setFillColor('transparent')
                                // 如果取消矩形块选中，则将其经纬度信息从mergeList剔除
                                let arr = Object.assign(_this.mergeList)
                                // _this.mergeList.length = 0
                                console.log(target.selectId)
                                _this.mergeList = _.filter(arr, e => {
                                    return !e[target.selectId]
                                })
                            } else {
                                target.clicked = true
                                target.setFillColor('red')
                                // 将选中的矩形覆盖物四个点经纬度存到mergeList集合中
                                let obj = {}
                                obj[target.selectId] = _this.getPoint(e.target)
                                _this.mergeList.push(obj)
                            }
                            // let id = target.customData.id
                            // console.log("id="+id+"当前覆盖物的位置是" + p.getPosition().lng + "," + p.getPosition().lat)
                        })
                        _this.rectangleOverlay.push(rectangle1)
                        console.log('画区块')
                        _this.map.addOverlay(rectangle1)
                        _this.addItem(rectangle1)
                    }
                }
                console.log(_this.rectangleOverlay)
            }
        })
    },
    // 添加右键菜单
    addItem (overlay) {
        let _this = this
        let menu = new _this.BMap.ContextMenu() // 创建右键菜单实例
        let textMenuItem = [
            {
                text: '合并',
                callback: function() {
                    console.log('合并')
                    let pointArr = []
                    // 循环选中的矩形覆盖物集合
                    _this.mergeList.forEach(e => {
                        for (const key in e) {
                            if (e.hasOwnProperty(key)) {
                                pointArr = pointArr.concat(e[key]) // 将矩形覆盖物的坐标集合集中到一个arr内
                                for (var i in _this.rectangleOverlay) {
                                    if (_this.rectangleOverlay[i].selectId == key) {
                                        _this.map.removeOverlay(_this.rectangleOverlay[i]) // 删除选中的矩形覆盖物
                                        _this.rectangleOverlay.splice(i, 1) // 将此覆盖物从rectangleOverlay中删除
                                    }
                                }
                            }
                        }
                    })
                    console.log(pointArr)
                    // 开始对pointArr操作，去掉两个矩形覆盖物重合的点，只保留4个不同的坐标点
                    let point_diff1 = _.difference(pointArr, _.uniqWith(pointArr, _.isEqual))
                    let point_diff2 = _.differenceWith(pointArr, point_diff1, _.isEqual)
                    let mark = []
                    point_diff2.forEach((e, i) => {
                        mark.push(new _this.BMap.Point(e[0], e[1]))
                    })
                    console.log(point_diff2)
                    let rectangle1 = new _this.BMap.Polygon(mark, {strokeColor:"red", strokeWeight:2, strokeOpacity:1,fillOpacity: 0.1});  //创建矩形
                    _this.map.addOverlay(rectangle1)
                    _this.rectangleOverlay.push(rectangle1)
                    // 操作完毕，将mergeList置空
                    _this.mergeList = []
                }
            },
            {
                text: '拆分',
                callback: function() {
                    console.log('拆分')
                }
            }
        ]
        textMenuItem.forEach(e => {
            let MenuItem = new _this.BMap.MenuItem(e.text, e.callback, 100) // 创建一个菜单项实例，接收两个参数，一个是菜单名称，另外一个是点击菜单的回调函数
            menu.addItem(MenuItem) // 将菜单项实例传入右键菜单项实例中
        })
        overlay.addContextMenu(menu) // 将右键菜单实例放入到map实例地图中
    },
    // 获取矩形覆盖物边界点的集合
    getPoint (ply) {
        let bounds = {
            x1: ply.getBounds().getSouthWest().lng, // 西南（左下角）
            y1: ply.getBounds().getSouthWest().lat,
            x2: ply.getBounds().getNorthEast().lng, // 东北（右上角）
            y2: ply.getBounds().getNorthEast().lat
        }
        let point1 = [bounds.x1, bounds.y1] // 左下角坐标
        let point2 = [bounds.x2, bounds.y1] // 右下角坐标
        let point3 = [bounds.x2, bounds.y2] // 右上角坐标
        let point4 = [bounds.x1, bounds.y2] // 左上角坐标
        return [point1, point2, point3, point4]
    },
    // 合并矩形覆盖物
    mergeCell () {

    }
}

export default ZMap