const ZMap = function ({BMap, map}) {
    this.initCenter = new BMap.Point(116.404, 39.915); //初始化的中心点，同时为了定义网格的中心点
    // this.id = id; //div的id
    // this.level = level ? level : 12; //地图级别
    // this.center = center ? center : this.initCenter; //中心点
    this.BMap = BMap; // 类
    this.map = map; //百度地图实例
}
ZMap.prototype = {
    init () {
        // this.map = new BMap.Map(this.id, { enableMapClick: false });
        // this.map.centerAndZoom(this.center.point, this.level);
        this.map.centerAndZoom('海淀区', this.level);
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
    }
}

export default ZMap