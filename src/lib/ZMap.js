const _ = require('lodash')

const ZMap = function ({BMap, map}) {
    // this.initCenter = new BMap.Point(116.404, 39.915); //初始化的中心点，同时为了定义网格的中心点
    // this.id = id; //div的id
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
        this.map.centerAndZoom(areaName);
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
                    if (j + _this.spanY > haha.y2) {
                        for (let k = haha.x1; k < haha.x2; k = k + _this.spanX) {
                            if (k + _this.spanX > haha.x2) {
                                _this.Polygon([k, j], [haha.x2, haha.y2])
                            } else {
                                _this.Polygon([k, j], [k + _this.spanX, haha.y2])
                            }
                        }
                    } else {
                        for (let k = haha.x1; k < haha.x2; k = k + _this.spanX) {
                            if (k + _this.spanX > haha.x2) {
                                _this.Polygon([k, j], [haha.x2, j + _this.spanY])
                            } else {
                                _this.Polygon([k, j], [k + _this.spanX, j + _this.spanY])
                            }
                        }
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
                                pointArr.push(e[key]) // 将矩形覆盖物的坐标集合集中到一个arr内
                                for (var i in _this.rectangleOverlay) {
                                    if (_this.rectangleOverlay[i].selectId == key) {
                                        _this.map.removeOverlay(_this.rectangleOverlay[i]) // 删除选中的矩形覆盖物
                                        _this.rectangleOverlay.splice(i, 1) // 将此覆盖物从rectangleOverlay中删除
                                    }
                                }
                            }
                        }
                    })
                    // console.log(pointArr)
                    /**
                     * 限定合并规则：只允许两两合并，此时只有两种情况：左右两个区块合并，上下两个区块合并
                     * 区块四个顶点的经纬度排列如下：西南角顶点-1 东南角顶点-2 东北角顶点-3 西北角顶点-4
                     * 判断选中的两个区块是否是挨着的 如果选择的是左右两个区块 要分别判断两个区块的2 3顶点和1 4顶点是否相同 如果是上下两个区块 要分别判断1 2 顶点和 3 4顶点是否相同
                     * 具体实现代码如下：
                     */
                    if (_.isEqual(pointArr[0][0], pointArr[1][1]) && _.isEqual(pointArr[0][3], pointArr[1][2])) {
                        console.log('第一种')
                        _this.Polygon(pointArr[1][0], pointArr[0][2])
                    }
                    if (_.isEqual(pointArr[0][1], pointArr[1][0]) && _.isEqual(pointArr[0][2], pointArr[1][3])) {
                        console.log('第二种')
                        _this.Polygon(pointArr[0][0], pointArr[1][2])
                    }
                    if (_.isEqual(pointArr[0][2], pointArr[1][1]) && _.isEqual(pointArr[0][3], pointArr[1][0])) {
                        console.log('第三种')
                        _this.Polygon(pointArr[0][0], pointArr[1][2])
                    }
                    if (_.isEqual(pointArr[0][0], pointArr[1][3]) && _.isEqual(pointArr[0][1], pointArr[1][2])) {
                        console.log('第四种')
                        _this.Polygon(pointArr[1][0], pointArr[0][2])
                    }
                    // 操作完毕，将mergeList置空
                    _this.mergeList = []
                    console.log(_this.rectangleOverlay)
                }
            },
            {
                text: '分割',
                callback: function() {
                    console.log('分割')
                    // 分割只能选择一个矩形区块，所以此时mergeList只有一个覆盖物，拿到此覆盖物的坐标
                    let obj = _this.mergeList[0]
                    let arr = [] // 承接覆盖物集合
                    for (const key in obj) {
                        if (obj.hasOwnProperty(key)) {
                            arr = obj[key];
                            for (var i in _this.rectangleOverlay) {
                                if (_this.rectangleOverlay[i].selectId == key) {
                                    _this.map.removeOverlay(_this.rectangleOverlay[i]) // 删除选中的矩形覆盖物
                                    _this.rectangleOverlay.splice(i, 1) // 将此覆盖物从rectangleOverlay中删除
                                }
                            }
                        }
                    }
                    let spanX = 0.00899322 // 跨度
                    let spanY = 0.01033179
                    for (let j = arr[0][1]; j < arr[2][1]; j += spanY) {
                        if (j + spanY > arr[2][1]) {
                            for (let k = arr[0][0]; k < arr[2][0]; k = k + spanX) {
                                if (k + spanX > arr[2][0]) {
                                    _this.Polygon([k, j], [arr[2][0], arr[2][1]])
                                } else {
                                    _this.Polygon([k, j], [k + spanX, arr[2][1]])
                                }
                            }
                        } else {
                            for (let k = arr[0][0]; k < arr[2][0]; k = k + spanX) {
                                if (k + spanX > arr[2][0]) {
                                    _this.Polygon([k, j], [arr[2][0], j + spanY])
                                } else {
                                    _this.Polygon([k, j], [k + spanX, j + spanY])
                                }
                            }
                        }
                    }
                    // 操作完毕，将mergeList置空
                    _this.mergeList = []
                }
            },
            {
                text: '删除',
                callback: function () {
                    _this.mergeList.forEach(e => {
                        for (const key in e) {
                            if (e.hasOwnProperty(key)) {
                                for (var i in _this.rectangleOverlay) {
                                    if (_this.rectangleOverlay[i].selectId == key) {
                                        _this.map.removeOverlay(_this.rectangleOverlay[i]) // 删除选中的矩形覆盖物
                                        _this.rectangleOverlay.splice(i, 1) // 将此覆盖物从rectangleOverlay中删除
                                    }
                                }
                            }
                        }
                    })
                    // 操作完毕，将mergeList置空
                    _this.mergeList = []
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
    // 添加矩形覆盖物
    /**
     * 
     * @param {Array} start 西南角坐标
     * @param {Array} end 东北角坐标
     */
    Polygon(start, end) {
        let _this = this
        let pStart = new BMap.Point(start[0], start[1])
        let pEnd = new BMap.Point(end[0], end[1])
        let rectangle1 = new _this.BMap.Polygon([
            new BMap.Point(pStart.lng,pStart.lat),
            new BMap.Point(pEnd.lng,pStart.lat),
            new BMap.Point(pEnd.lng,pEnd.lat),
            new BMap.Point(pStart.lng,pEnd.lat)
        ], {strokeColor:"red", strokeWeight:2, strokeOpacity:1,fillOpacity: 0.1});  //创建矩形
        // 给矩形覆盖物添加事件
        rectangle1.addEventListener('click', function(e) {
            let target = e.target // 当前覆盖物实例
            if (!target.selectId && target.selectId !== 0) { // 判断点击的覆盖物是否被点击过，如果没有给其加id
                target.selectId = _this.selectId++
            }
            if (target.clicked) {
                target.clicked = false
                target.setFillColor('transparent')
                // 如果取消矩形块选中，则将其经纬度信息从mergeList剔除
                let arr = Object.assign(_this.mergeList)
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
        })
        _this.rectangleOverlay.push(rectangle1)
        console.log('画矩形区块')
        _this.map.addOverlay(rectangle1)
        _this.addItem(rectangle1) // 给覆盖物添加右键菜单
    },
    /**
     * 分割覆盖物
     * @param {Array} start 覆盖物西南角坐标
     * @param {Array} end 覆盖物东北角坐标
     */
    split(start, end) {

    }
}

export default ZMap