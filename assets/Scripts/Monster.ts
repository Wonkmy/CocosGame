// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import CameraCtrl from "./CameraCtrl";
import Player from "./Player";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Monster extends cc.Component {

    onLoad () {
        this.scheduleOnce(function(){ 
            this.node.destroy();
        },3);
        cc.tween(this.node)
            .by(0.7,{position:new cc.Vec3(0,450)})
            .call(()=>{
                cc.find("Canvas/Main Camera").getComponent(cc.Animation).play();
            })
            .delay(1)
            .by(0.8,{position:new cc.Vec3(0,-600)})
            .start();
    }

    moveOnPlayer(){
        
    }

    myrandom(lower:number, upper:number) {
        return Math.floor(Math.random() * (upper - lower)) + lower;
    }
    // 角度
    getAngle(start:cc.Vec2, end:cc.Vec2){
    //计算出朝向
    var dx = end.x - start.x;
    var dy = end.y - start.y;
    var dir = cc.v2(dx, dy);

    //根据朝向计算出夹角弧度
    var angle = dir.signAngle(cc.v2(1, 0));

    //将弧度转换为欧拉角
    var degree = angle / Math.PI * 180;

    return -degree
}

    update (dt) {
        //this.node.setPosition(new cc.Vec2(this.cameraCtrl.getPosition().x,this.cameraCtrl.getPosition().y-480) );
    }
}
