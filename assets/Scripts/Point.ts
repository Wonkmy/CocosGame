// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import GameManager from "./GameManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Point extends cc.Component {
    @property(GameManager)
    gameManager: GameManager = null;

    private posX=0;
    private posY=0;


    start(){
        this.scheduleOnce(function(){ 
            this.node.destroy();
        },10);
    }

    CreatOnePoint (point) {
        let X=this.myrandom(0,5);
        let Y=this.myrandom(0,5);
        GameManager.lastNumX=X;
        GameManager.lastNumY=Y;

        if(GameManager.lastNumX<=2){
            let X=this.myrandom(0,5);
            if(X>=3){
                this.posX=point.getPosition().x+150;
            }else{
                this.posX=point.getPosition().x-150;
            }
        }else{
            let X=this.myrandom(0,10);
            if(X>=6){
                this.posX=point.getPosition().x-150;
            }else{
                this.posX=point.getPosition().x+150;
            }
        }
        this.posY=point.getPosition().y+150;
        this.gameManager=cc.find("Canvas/Main Camera/touchArea").getComponent('GameManager');

        // var posNode= this.node.getChildByName("pos");
        // posNode.getComponent(cc.Label).string="POS:"+"X:"+this.node.getPosition().x+"Y:"+this.node.getPosition().y;
        
        let newPoint = cc.instantiate(this.gameManager.pointPre);
        
        newPoint.setParent(cc.find("Canvas"));
        newPoint.setSiblingIndex(2);
        newPoint.setPosition(new cc.Vec2(this.posX, this.posY));
        //console.log("生成了,位置是:\n"+newPoint.getPosition());
    }

    myrandom(lower:number, upper:number) {
     return Math.floor(Math.random() * (upper - lower)) + lower;
    }
    update (dt) {
        // this.scheduleOnce(function(){ 
        //      this.CreatOnePoint();
        // },2);
    }
    // onCollisionStay(other, self) {
    //     if(other.node.name=="climbGrab")
    //     {
    //          self.node.destroy();
    //     }
    // }
}
