// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import GameManager from "./GameManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class DrawMgr extends cc.Component {

    // @property(cc.Graphics)
    // draw: cc.Graphics = null;

    @property(cc.Node)
    nodeList: cc.Node[] = [];
    Blue = 0;
    Red = 0;
    Green=0;
    yellow=0;
    onLoad () {
        // 设置线条宽度
        //this.draw.lineWidth = 5;
    }

    start() {
        // 手指触摸开始,移动起点到触摸点
        // this.node.on('touchstart', function (touch) {
        //     var t_pos = touch.getLocation();
        //     var pos = this.node.convertToNodeSpaceAR(t_pos);
        //     this.draw.moveTo(pos.x, pos.y);
        // }, this);
        // // 手指移动，不断绘图
        // this.node.on('touchmove', function (touch) {
        //     var t_pos = touch.getLocation();
        //     var pos = this.node.convertToNodeSpaceAR(t_pos);
        //     this.draw.lineTo(pos.x, pos.y);
        //     this.draw.stroke();
        // }, this);
        
        // this.node.on(cc.Node.EventType.TOUCH_END,function(touch){
        //     this.draw.node.active=false;
        //     this.scheduleOnce(function(){ 
        //         this.draw.node.active=true;
        //         },2);
        // },this);
        GameManager.gailvList.push(10);
        GameManager.gailvList.push(40);
        GameManager.gailvList.push(20);
        GameManager.gailvList.push(30);
        console.log(GameManager.gailvList);
        this.test();
    }
    /**
 * 根据概率表产生一个概率下标
 * @param arg_ProbabilityTable  - 概率表--单位为%
 * @return
 *  概率表下标
 */
    makeProbabilityValues(arg_ProbabilityTable) {
        let i=0;
        let randomValue = this.myrandom(0, 101);
        for (i = 0; i < arg_ProbabilityTable.length; i++) {
            if (randomValue <= arg_ProbabilityTable[i]) {
                return i;
            }
            randomValue -= arg_ProbabilityTable[i];
        }
        return arg_ProbabilityTable.length;
    }

    myrandom(lower:number, upper:number) {
        return Math.floor(Math.random() * (upper - lower)) + lower;
    }

    test(){
        for (let i = 0; i < 10000; i++){
            var index=this.makeProbabilityValues(GameManager.gailvList);
            //console.log(index);
            let name= this.nodeList[index].name;
            switch(name)
            {
                case "Blue":
                    this.Blue++;
                    break;
                case "Red":
                    this.Red++;
                    break;
                case "Green":
                    this.Green++;
                    break;
                case "yellow":
                    this.yellow++;
                    break;
            }
        }
       
       console.log("Blue:" + this.Blue + "Red:" + this.Red+"Green:"+this.Green+"yellow"+this.yellow);
    }
    
}
