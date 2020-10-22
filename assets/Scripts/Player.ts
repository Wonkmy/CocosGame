// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import CameraCtrl from "./CameraCtrl";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Player extends cc.Component {
    public grabing=false;

    private startClimb=false;

    private tempCol=null;

    public static playerCurPos;

    @property(cc.Node)
    particla: cc.Node = null;
    @property(cc.Node)
    particla1: cc.Node = null;
 

    /**玩家攀爬 */
    public climb() {
        if (this.grabing) {
            this.startClimb = true;
        } else {
            console.log("你失败了");
            this.node.addComponent(cc.RigidBody);
            this.node.getComponent(cc.RigidBody).gravityScale=5;
            this.scheduleOnce(function () {
                cc.director.loadScene('main');
            }, 1);
        }
    }

    getSelfPosition(){
        return this.node.getPosition();
    }

    update(dt) {
        if(this.grabing&&this.startClimb){
            if(this.tempCol!=null)
            {
                if(this.tempCol.getComponent('Point'))
                {
                    this.tempCol.getComponent('Point').CreatOnePoint(this.tempCol);
                }
            }
            let camMoveTo=cc.moveTo(0.5,this.tempCol.getPosition());
            if (this.node.anchorX == 0.15) {
                this.node.anchorX = 0.85;
                this.node.getComponent(cc.BoxCollider).offset = new cc.Vec2(-177, 0);
                this.node.getComponent(cc.BoxCollider).size=new cc.Size(160,19.5);
                if (this.tempCol != null) {
                    
                    this.node.setPosition(this.tempCol.getPosition());
                    cc.find("Canvas/Main Camera").runAction(camMoveTo);
                }
            } else if (this.node.anchorX == 0.85) {
                this.node.anchorX = 0.15;
                this.node.getComponent(cc.BoxCollider).offset = new cc.Vec2(177, 0);//160
                this.node.getComponent(cc.BoxCollider).size=new cc.Size(160,19.5);
                if (this.tempCol != null) {
                    this.node.setPosition(this.tempCol.getPosition());
                    this.getSelfPosition();
                    cc.find("Canvas/Main Camera").runAction(camMoveTo);
                }
            }
            this.grabing=false;
            this.startClimb=false;
        }

        if(this.node.anchorX == 0.15)
        {
            this.node.angle += 3;
        }
        if(this.node.anchorX == 0.85)
        {
            this.node.angle -= 3;
        }
    }
    onCollisionEnter(other, self) {
         if (other.node.name == "climbGrab") {
             this.grabing=true;//可以攀爬
             this.tempCol=other.node;
         }
    }
    onCollisionExit(other, self) {
        if (other.node.name == "climbGrab") {
            this.grabing=false;//可以攀爬
            this.tempCol=null;
        }
    }
}
