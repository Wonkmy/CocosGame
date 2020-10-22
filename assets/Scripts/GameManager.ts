// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Player from "./Player";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameManager extends cc.Component {

    @property(Player)
    player: Player = null;

    @property(cc.Prefab)
    pointPre: cc.Prefab = null;

    @property(cc.Prefab)
    monsterPre: cc.Prefab = null;

    @property(cc.Node)
    p1: cc.Node = null;
    @property(cc.Node)
    p2: cc.Node = null;

    private pointList=[];

    private offsetX=1;
    private offsetY=1;

    private posX=0;
    private posY=0;

    public static lastNumX=0;
    public static lastNumY=0;


    onLoad () {
        cc.director.getCollisionManager().enabled=true;
        cc.director.getPhysicsManager().enabled = true;
        //cc.director.getCollisionManager().enabledDebugDraw = true;
        this.node.on(cc.Node.EventType.TOUCH_START,this.climb ,this);

        this.schedule(function () {
            let newPoint = cc.instantiate(this.monsterPre);
            newPoint.setParent(cc.find("Canvas"));
            newPoint.setSiblingIndex(3);
            newPoint.setPosition(new cc.Vec2(this.player.getSelfPosition().x, this.player.getSelfPosition().y-480));
            this.scheduleOnce(function(){ 
                newPoint.getComponent(dragonBones.ArmatureDisplay).playAnimation('attack',1);
            },0.7);
        }, 5);
    }


    start(){ 
        let X=this.myrandom(0,100);
        let Y=this.myrandom(0,100);
        if(X<50){
            this.posX=this.node.getPosition().x+150;
        }else{
            this.posX=this.node.getPosition().x-150;
        }
        if(Y<50){
            this.posY=this.node.getPosition().y+150;
        }else{
            this.posY=this.node.getPosition().y-150;
        }

        let newPoint= cc.instantiate(this.pointPre);
            newPoint.setParent(cc.find("Canvas"));
            newPoint.setSiblingIndex(2);
            newPoint.setPosition(new cc.Vec2(this.posX,this.posY));

        // for(let i=0;i<15;i++){
        //     let newPoint= cc.instantiate(this.pointPre);
        //     newPoint.setParent(cc.find("Canvas"));
        //     newPoint.setSiblingIndex(2);
        //     newPoint.setPosition(new cc.Vec2(i*150,i*150));
        //     }
        // let pos1=this.p1.getPosition();
        // let pos2=this.p2.getPosition();
        // let pos3=pos1.sub(pos2);
        // console.log(Math.abs(pos3.mag()));
    }
    myrandom(lower:number, upper:number) {
     return Math.floor(Math.random() * (upper - lower)) + lower;
    }
    /**玩家攀爬逻辑 */
    climb () {
        this.player.climb();
    }

    // update (dt) {}
}
