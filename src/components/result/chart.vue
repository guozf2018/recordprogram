<template>
    <div class="wiki-collection-chart">
        <div class="wiki-collection-chart-form">
            <a-form            
                :form="form" 
                @submit="handleSubmit"
            >
                <a-row >
                    <a-col :span="12">
                        <!-- member -->
                        <a-form-item 
                        label="Member"
                        :label-col="formItemLayout.labelCol"
                        :wrapper-col="formItemLayout.wrapperCol"                
                        >
                            <a-select
                                allowClear
                                v-decorator="[
                                'member',
                                { rules: [{ required: true, message: '请选择成员'}] },
                                ]"
                                placeholder="请选择Member"
                                @change="handleSelectChange"
                            >
                                <a-select-option v-for="(item,index) in memberList"
                                v-bind:key="index"
                                :value="item">
                                    {{item}}
                                </a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item :wrapper-col="{ span: 12, offset: 0 }">
                            <a-button type="primary" html-type="submit">
                                查询
                            </a-button>
                        </a-form-item>             
                    </a-col>
                </a-row>
                <a-row >
                    <a-col>
                        <a-list item-layout="horizontal" :data-source="listData">
                            <a-list-item slot="renderItem" slot-scope="item">
                                <a-list-item-meta
                                  description=""
                                >
                                    <a slot="title" href="https://www.antdv.com/">{{ item.title }}</a>
                                </a-list-item-meta>
                            </a-list-item>
                        </a-list>
                    </a-col>
                </a-row>
            </a-form>
        </div>

        <div class="wiki-collection-chart-echart">
            <div class="chart-comm-title">对不同boss造成的总伤害</div>
            <div class="chart-comm-echart" id="myChart1"></div>
        </div>

        <div class="wiki-collection-chart-echart">
            <div class="chart-comm-title">每日伤害统计</div>
            <div class="chart-comm-echart" id="myChart2"></div>
        </div>  

        <div class="wiki-collection-chart-echart">
            <div class="chart-comm-title">不同boss的出刀次数</div>
            <div class="chart-comm-echart" id="myChart3"></div>
        </div>
    </div>
</template>
<script>
const color = ['#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'];

//const memberList = [ "王五","李四","张三","刘六" ];
// const bossList = [ "一王","二王","三王","四王","五王" ];
// const dateList = [ "2020-08-27","2020-08-28","2020-08-29"];
//import record from '../../mock/data/record';
const record = {
    record:[{"name":"智糖","monstor":"一王","bossNo":"A1","damage":"500","date":"2020/8/25","attackTime":"1"},{"name":"智糖","monstor":"二王","bossNo":"A2","damage":"600","date":"2020/8/25","attackTime":"1"},{"name":"智糖","monstor":"三王","bossNo":"A3","damage":"400","date":"2020/8/26","attackTime":"1"},{"name":"智糖","monstor":"三王","bossNo":"A3","damage":"300","date":"2020/8/26","attackTime":"1"},{"name":"智糖","monstor":"四王","bossNo":"A4","damage":"800","date":"2020/8/27","attackTime":"1"},{"name":"智糖","monstor":"五王","bossNo":"A5","damage":"900","date":"2020/8/28","attackTime":"1"},{"name":"智糖","monstor":"五王","bossNo":"B5","damage":"950","date":"2020/8/28","attackTime":"1"},{"name":"智糖","monstor":"五王","bossNo":"C5","damage":"1000","date":"2020/8/29","attackTime":"1"},{"name":"Akane","monstor":"一王","bossNo":"A1","damage":"200","date":"2020/8/25","attackTime":"1"},{"name":"Akane","monstor":"二王","bossNo":"A2","damage":"400","date":"2020/8/26","attackTime":"1"}]
};

export default {
    name: "Chart",
    data(){
        const memberList = this.getfieldByArray("name",record.record);
        const bossList = this.getfieldByArray("monstor",record.record);
        const dateList = this.getfieldByArray("date",record.record);
        const listData = [];
        return{
            formLayout: 'inline',
            formItemLayout: {
                labelCol: { span: 6 },
                wrapperCol: { span: 16 },
            },
            form: this.$form.createForm(this, { name: 'queryForm',
            mapPropsToFields: () => {
                const member = memberList.length>0 ? memberList[0] : ""
                return {
                    member: this.$form.createFormField({
                        value: member,
                    }),
                };
            }, }),
            data: record.record,
            memberList,bossList,dateList,listData
        };
    },
    methods:{
        handleSubmit(e) {
            e.preventDefault();
            this.form.validateFields((err, values) => {
                if (!err) {
                console.log('Received values of form: ', values);
                }
            });
            const formData = this.form.getFieldsValue();
            const { member } = formData;
            let params = {};
            if(member!=null && member!=undefined){
                params.member = member;
            }
            this.doQuery(params);
        },
        getfieldByArray(field,array){
            let returnArray = [];
            if(array != undefined || array.length>0){
                for (const key in array){
                    const item = array[key];
                    const obj = item[field];
                    if(returnArray.indexOf(obj) === -1){
                        returnArray.push(obj);
                    }
                }
            } 
            return returnArray;
        },
        getListData(params){
            const array = this.$data.data;
            let returnArray = [];
            if(array != undefined || array.length>0){
                let maxDamage = 0;
                let minDamage = 99999999;
                let totalDamage = 0;
                let totalAttackTime = 0;
                for (const key in array){
                    const item = array[key];
                    const damage = item.damage;
                    if(params == null || params.member != item.name){
                        continue;
                    }
                    //求最大值
                    if(parseInt(damage)>maxDamage){
                        maxDamage = parseInt(damage);
                    }
                    //求最小值
                    if(parseInt(damage)<minDamage){
                        minDamage = parseInt(damage);
                    }
                    totalDamage += parseInt(item.damage);
                    totalAttackTime += parseInt(item.attackTime);
                }
                returnArray.push({
                    title:'最大伤害刀：'+ maxDamage
                });
                returnArray.push({
                    title:'最小伤害刀：'+ minDamage
                });
                returnArray.push({
                    title:'总出刀次数：'+ totalAttackTime
                });
                returnArray.push({
                    title:'总伤害：'+ totalDamage
                });
            } 
            return returnArray;
        },
        doQuery(param){
            this.drawChart1(param);
            this.drawChart2(param);
            this.drawChart3(param);
            const listData = this.getListData(param);
            this.$set(this,"listData",listData);
        },
        handleSelectChange(value) {
            console.log(value);
        },
        /**
         * 初始化图表
         */
        initEchart(id,option){
            let myChart = this.$echarts.init(document.getElementById(id));
            myChart.setOption(option);
        },
        /**
         * 不同boss的总伤害
         */
        drawChart1(params){
            //整理数据
            const { member } =  params;
            const bossList = this.$data.bossList;
            const data = this.$data.data;
            const damageList = [];
            for (let i = 0; i < bossList.length; i++) {
                const boss = bossList[i];
                let damage = 0;
                for (let j = 0; j < data.length; j++) {
                    const dataItem = data[j];
                    if(dataItem.monstor === boss && dataItem.name === member){
                        damage += parseInt(dataItem.damage);
                    }
                }
                damageList.push(damage);
            }
            //配置内容
            const id = "myChart1";
            const option = {
                tooltip: {},
                xAxis: {
                    data: bossList
                },
                color:color,
                yAxis: {},
                series: [{
                    name: '伤害',
                    type: 'bar',
                    data: damageList
                }]
            };
            this.initEchart(id,option);
        },
        /**
         * 折线图
         */
        drawChart2(params){
            //整理数据
            const { member } =  params;
            const dateList = this.$data.dateList;
            const data = this.$data.data;
            const damageList = [];
            for (let i = 0; i < dateList.length; i++) {
                const date = dateList[i];
                let damage = 0;
                for (let j = 0; j < data.length; j++) {
                    const dataItem = data[j];
                    if(dataItem.date === date && dataItem.name === member){
                        damage += parseInt(dataItem.damage);
                    }
                }
                damageList.push(damage);
            }
            //配置内容
            const id = "myChart2";
            const option = {
                tooltip: {},
                xAxis: {
                    data: dateList
                },
                color:color,
                yAxis: {},
                series: [{
                    name: '日期',
                    type: 'line',
                    data: damageList
                }]
            };
            this.initEchart(id,option);
        },
        /**
         * 打boss比例
         */
        drawChart3(params){
            //整理数据
            const { member } =  params;
            const bossList = this.$data.bossList;
            const data = this.$data.data;
            const attackTimeList = [];
            for (let i = 0; i < bossList.length; i++) {
                const boss = bossList[i];
                let attackTime = 0;
                for (let j = 0; j < data.length; j++) {
                    const dataItem = data[j];
                    if(dataItem.monstor === boss && dataItem.name === member){
                        attackTime += parseInt(dataItem.attackTime);
                    }
                }
                attackTimeList.push({name:boss,value:attackTime});
            }
            //配置内容
            const id = "myChart3";
            const option = {
                tooltip: {
                    trigger: 'item',
                    formatter: '{b}<br/>{c} ({d}%)'
                },
                legend: {
                    orient: 'vertical',
                    left: 10,
                    data: bossList
                },
                color:color,
                series:[{
                    type:"pie",
                    label: {  
                        position: 'outer',
                        alignTo: 'labelLine',
                        formatter: '{b} {c} ({d}%)',
                    },
                    data: attackTimeList
                }]
            };
            this.initEchart(id,option);
        }
    },
}
</script>
<style>

.wiki-collection-chart{
    display: flex;
    justify-content: space-around;
    flex-wrap:wrap;
}

.wiki-collection-chart-form{
    padding-top: 20px;
}

.wiki-collection-chart-form,.wiki-collection-chart-echart{
    width:44%;
    /* background: rgb(200, 200, 202); */
    margin-bottom: 10px;
}

.wiki-collection-chart-echart{

    height: 500px;
}

.chart-comm-title{
    font-weight: 600;
    font-size: 20px;
}

.chart-comm-echart{
    width: 100%;
    height: 400px;
}


</style>