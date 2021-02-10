// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameMgr extends cc.Component {

    @property(cc.Graphics)
    graphics: cc.Graphics = null;



    onLoad(){
        this.graphics.node.on(cc.Node.EventType.TOUCH_MOVE,this.moveLine,this);
        this.node.on(cc.Node.EventType.TOUCH_END,this.resetLine,this);
    }

    moveLine(e){
        this.graphics.clear();
        let pos=e.getLocation();
        let n_pos=this.graphics.node.convertToNodeSpaceAR(pos);
        this.graphics.moveTo(-271,100);
        this.graphics.lineTo(n_pos.x,n_pos.y);
        this.graphics.lineTo(271,100);
        this.graphics.stroke();
    }
    resetLine(){
        this.graphics.clear();
        this.graphics.moveTo(-271,100);
        this.graphics.lineTo(0,100);
        this.graphics.lineTo(271,100);
        this.graphics.stroke();
    }

    start(){
        this.graphics.moveTo(-271,100);
        this.graphics.lineTo(0,100);
        this.graphics.lineTo(271,100);
        
        this.graphics.stroke();
    }
}
