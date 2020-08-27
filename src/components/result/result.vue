<template>
    <div class="wiki-collection-center">
        <div class="wiki-collection-anchor">
            <a-anchor>
                <!-- 日期 -->
                <a-anchor-link 
                v-bind:href="jing + recordItem.href"
                :title="recordItem.date" 
                v-for="(recordItem,i) in record" 
                :key="i">
                    <!-- boss组 -->
                    <a-anchor-link 
                    v-for="(monstorGroupItem,j) in recordItem.monstorGroup"
                    :key="j"
                    v-bind:href="jing + monstorGroupItem.href" 
                    :title="monstorGroupItem.monstorName" >
                        <a-anchor-link 
                            v-for="(memberGroupItem,k) in monstorGroupItem.memberGroup"
                            :key="k"
                            v-bind:href="jing + memberGroupItem.href" 
                            :title="memberGroupItem.memberName+space+memberGroupItem.damage" />
                    </a-anchor-link>
                </a-anchor-link>
            </a-anchor>
        </div>


        <!-- <div class="wiki-collection-content" >
            <div v-for="item in data" :key="item.date + item.monstor">
              
                <div v-bind:href="item.href" class="wiki-collection-title">{{item.date + space + item.monstor}}</div>
                <a-list item-layout="horizontal"  :data-source="item.memberData">
                    <a-list-item slot="renderItem" slot-scope="memberDataItem">
                        <a-list-item-meta
                            :description="memberDataItem.damage"
                        >
                            <a slot="title" href="">{{ memberDataItem.name }}</a>
                            <a-avatar
                            slot="avatar"
                            :src="memberDataItem.pic"
                            />
                        </a-list-item-meta>
                    </a-list-item>
                </a-list>
            </div>
        </div>  
        -->
    </div>
</template>
<script>
// const data = [
//     {
//         href:"#onefeilong",
//         date:"一期一王",
//         monstor:"飞龙",
//         memberData:[{
//             name: '清歌若水',
//             damage: '151515',
//             pic:require("@/assets/image/qingeruoshui.png")
//         },
//         {
//             name: '智糖',
//             damage: '4747',
//             pic:require("@/assets/image/zhisugar.png")
//         },
//         {
//             name: '雪乃',
//             damage: '8245217',
//             pic:require("@/assets/image/kongbai.png")
//         },
//         {
//             name: 'Akane',
//             damage: '82452179897',
//             pic:require("@/assets/image/Akane.png")
//         }]
//     }
  
// ];
//import member from '../../mock/data/member.js';
const member = {
    "2522009278":{
        memberId: "2522009278",
        memberName: "清歌若水"
    },
    "529597521":{
        memberId: "651995978",
        memberName: "智糖"
    },
    "651995978":{
        memberId: "651995978",
        memberName: "雪乃"
    },
    "1363884511":{
        memberId: "1363884511",
        memberName: "Akane"
    },
};
export default {
    name: "Result",
    data(){
    },
    methods:{
        handleRecordData(record){
            const oneMonthData = record.data;
            let returnArray = [];
            for (let i = 0; i < oneMonthData.length; i++) {
                //每个月份的数据
                const oneMonthDataItem = oneMonthData[i];
                let returnArrayItem = Object.assign({}, oneMonthDataItem);
                returnArrayItem.href = returnArrayItem.date;
                let guildRecord = returnArrayItem.record;

                let monstorId = "";//id
                let monstorGroup = [];//对应组的王
                let monstorGroupItem = {};
                
                let memberGroup = [];

                for (let j = 0; j < guildRecord.length; j++) {
                    const guildRecordItem = guildRecord[j];
                    //第一次循环
                    if(j === 0){
                        //换boss id
                        monstorId = guildRecordItem.monstorId;
                        //初始化boss 组
                        monstorGroup = [];
                        //初始化item
                        monstorGroupItem = {
                            schedule: guildRecordItem.schedule,
                            href:guildRecordItem.id
                        };
                        //初始化成员组
                        memberGroup = [];
                    }

                    //新的bossId
                    if(monstorId!=""&&guildRecordItem.monstorId!=monstorId){
                        //先保存前一个节点的数据
                        monstorGroupItem.memberGroup = memberGroup;
                        monstorGroup.push(monstorGroupItem);

                        //换boss id
                        monstorId = guildRecordItem.monstorId;
                        //初始化boss 组
                        monstorGroup = [];
                        //初始化item
                        monstorGroupItem = {
                            schedule: guildRecordItem.schedule
                        };
                        //初始化成员组
                        memberGroup = [];
                    }

                    //加入成员组
                    let memberItem = {
                        ...member[guildRecordItem.memberId],
                        date: guildRecordItem.date,
                        damage: guildRecordItem.damage,
                        href: guildRecordItem.date + guildRecordItem.memberId
                    }
                    memberGroup.push(memberItem);
                }

                //结束循环之后也要保存
                monstorGroupItem.memberGroup = memberGroup;
                monstorGroup.push(monstorGroupItem);

                returnArrayItem.monstorGroup =  monstorGroup;
                returnArray.push(returnArrayItem);
            }   
            return returnArray;
        },
    },
}
</script>
<style>
.wiki-collection-center{
    display: flex;
    justify-content: space-around;
}

.wiki-collection-anchor{
    width: 20%;
    height: 80%;
    text-align: left;
    margin: 50px;
}
.wiki-collection-content{
    width: 80%;
    height: 80%;
    text-align: left;
}

.wiki-collection-title{
    font-size: 30px;
    font-weight: 600;
}

</style>