<template>
  <transition name="bounce">
  <div class="pos">
    <el-row>
      <el-col :span='7' class="pos-order" id="order-list">
        <el-tabs>
          <el-tab-pane label="点餐">
            <el-table :data="tableData"  border style="width: 100%">
              <el-table-column prop="goodsName" label="名称"></el-table-column>
              <el-table-column prop="count" label="量" width="60"></el-table-column>
              <el-table-column prop="price" label="金额" width="70"></el-table-column>
              <el-table-column  label="操作" width="136">
                <template scope="scope">
                  <el-button type="warning" size="small" @click="delSingleGoods(scope.row)">删除</el-button>
                  <el-button type="success" size="small" @click="addOrderList(scope.row)">增加</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="totaDiv">
              <small>数量: </small>{{totalCount}}
              <small>金额: </small>{{totalMoney}}
            </div>
            <div class="div-btn">
              <el-button type="warning">挂单</el-button>
              <el-button type="danger" @click="delSingleAllGoods()">删除</el-button>
              <el-button type="success" @click="checkout()">结账</el-button>
            </div>
          </el-tab-pane>
          <el-tab-pane label="挂单">
            挂单
          </el-tab-pane>
          <el-tab-pane label="外卖">
            外卖
          </el-tab-pane>
        </el-tabs>

      </el-col>
      <!--产品叶-->
      <el-col :span='17'>

        <div class="often-goods">
          <div class="title">常用商品</div>
          <div class="often-goods-list">
            <ul>
              <li v-for="goods in oftenGoods" @click="addOrderList(goods)">
                <span>{{goods.goodsName}}</span>
                <span class="often-price">¥{{goods.price}}元</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="goods-type">
          <el-tabs>
            <el-tab-pane label="汉堡">
              <div>
                <ul class='cookList'>
                  <li v-for="goods in type0Goods" @click="addOrderList(goods)">
                    <span class="foodImg"><img :src="goods.goodsImg" width="100%"></span>
                    <span class="foodName">{{goods.goodsName}}</span>
                    <span class="foodPrice">￥{{goods.price}}元</span>
                  </li>
                </ul>
              </div>

            </el-tab-pane>
            <el-tab-pane label="小食">
              <div>
                <ul class='cookList'>
                  <li v-for="goods in type1Goods" @click="addOrderList(goods)">
                    <span class="foodImg"><img :src="goods.goodsImg" width="100%"></span>
                    <span class="foodName">{{goods.goodsName}}</span>
                    <span class="foodPrice">￥{{goods.price}}元</span>
                  </li>
                </ul>
              </div>
            </el-tab-pane>
            <el-tab-pane label="饮料">
              <div>
                <ul class='cookList'>
                  <li v-for="goods in type2Goods" @click="addOrderList(goods)">
                    <span class="foodImg"><img :src="goods.goodsImg" width="100%"></span>
                    <span class="foodName">{{goods.goodsName}}</span>
                    <span class="foodPrice">￥{{goods.price}}元</span>
                  </li>
                </ul>
              </div>
            </el-tab-pane>
            <el-tab-pane label="套餐">
              <div>
                <ul class='cookList'>
                  <li v-for="goods in type3Goods" @click="addOrderList(goods)">
                    <span class="foodImg"><img :src="goods.goodsImg" width="100%"></span>
                    <span class="foodName">{{goods.goodsName}}</span>
                    <span class="foodPrice">￥{{goods.price}}元</span>
                  </li>
                </ul>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
    </el-row>
  </div>
  </transition>
</template>

<script>
  //  import ElTabs from "../../../node_modules/element-ui/packages/tabs/src/tabs";
  //  import ElTabPane from "../../../node_modules/element-ui/packages/tabs/src/tab-pane";
  //  import ElButton from "../../../node_modules/element-ui/packages/button/src/button";
  //  import ElButton from "../../../node_modules/element-ui/packages/button/src/button";
  //  import ElTable from "../../../node_modules/element-ui/packages/table/src/table";
  //  import ElRow from "element-ui/packages/row/src/row";
  //  import ElCol from "element-ui/packages/col/src/col";
  //  import ElTabs from "../../../node_modules/element-ui/packages/tabs/src/tabs";
  //  import ElTabPane from "../../../node_modules/element-ui/packages/tabs/src/tab-pane";
  import axios from 'axios'

  export default {
//    components: {
//      ElTabPane,
//      ElTabs,
//      ElCol,
//      ElRow},
//    components: {ElTable},
//    components: {ElButton},
//    components: {ElButton},
//    components: {
//      ElTabPane,
//      ElTabs},
    name: 'pos',
    data(){
      return{
        //选择商品
        tableData:[],
        //常用商品
        oftenGoods:[],
        //汉堡，小食，饮料，套餐
        type0Goods:[],
        type1Goods:[],
        type2Goods:[],
        type3Goods:[],
        totalMoney:0,
        totalCount:0
      }
    },
    created(){
      axios.get('http://jspang.com/DemoApi/oftenGoods.php')
        .then(response=>{
          this.oftenGoods=response.data;
        })
        .catch(error=>{
          alert(error);
        });

      axios.get('http://jspang.com/DemoApi/typeGoods.php')
        .then(response=>{
          console.log(response);
          //this.oftenGoods=response.data;
          this.type0Goods=response.data[0];
          this.type1Goods=response.data[1];
          this.type2Goods=response.data[2];
          this.type3Goods=response.data[3];
        })
        .catch(error=>{
          alert(error);
        })
    },
    mounted:function () {
      var orderHeight = document.body.clientHeight;
      document.getElementById('order-list').style.height = orderHeight+'px';
    },
    methods:{
      //添加订单列表的方法
      addOrderList(goods){
        this.totalCount=0; //汇总数量清0
        this.totalMoney=0;
        let isHave=false;
        //判断是否这个商品已经存在于订单列表
        for (let i=0; i<this.tableData.length;i++){
          console.log(this.tableData[i].goodsId);
          if(this.tableData[i].goodsId==goods.goodsId){
            isHave=true; //存在
          }
        }
        //根据isHave的值判断订单列表中是否已经有此商品
        if(isHave){
          //存在就进行数量添加
          let arr = this.tableData.filter(o =>o.goodsId == goods.goodsId);
          arr[0].count++;
          //console.log(arr);
        }else{
          //不存在就推入数组
          let newGoods={goodsId:goods.goodsId,goodsName:goods.goodsName,price:goods.price,count:1};
          this.tableData.push(newGoods);
        }
        //进行数量和价格的汇总计算
        this.getAllMoney();
      },
      delSingleGoods(goods){
        console.log(goods);
        this.tableData = this.tableData.filter(o => o.goodsId != goods.goodsId);
        this.getAllMoney();
      },
      //汇总数量和金额
      getAllMoney(){
        this.totalCount=0;
        this.totalMoney=0;
        if(this.tableData){
          this.tableData.forEach((element) => {
            this.totalCount+=element.count;
            this.totalMoney=this.totalMoney+(element.price*element.count);
          });
        }
      },
      delSingleAllGoods(){
        this.tableData = [];
        this.getAllMoney();
      },
      checkout() {
        if (this.totalCount!=0) {
          this.tableData = [];
          this.totalCount = 0;
          this.totalMoney = 0;
          this.$message({
            message: '结账成功，感谢你又为店里出了一份力!',
            type: 'success'
          });
        }else{
          this.$message.error('不能空结。老板了解你急切的心情！');
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .pos-order{
    background-color: #F9FAFC;
    border-right: 1px solid #C0CCDA;
  }
  .div-btn{
    margin-top: 10px;
    float: right;
    margin-right: 20px;
  }
  .title{
    height: 20px;
    border-bottom: 1px solid #D3dce6;
    background-color: #F9FAFC;
    padding: 10px;
    text-align: left;
  }
  .often-goods-list ul li{
    list-style: none;
    float: left;
    border: 1px solid #E5E9F2;
    padding: 10px;
    margin: 10px;
    background-color: #FFF;
    cursor: pointer;
  }
  .often-price{
    color: #58B7FF;
  }
  .goods-type{
    clear: both;
  }
  .cookList li{
    list-style: none;
    width:23%;
    border:1px solid #E5E9F2;
    height: auto;
    overflow: hidden;
    background-color:#fff;
    padding: 5px;
    float:left;
    margin: 2px;
  }
  .cookList li span{
    display: block;
    float:left;
    cursor: pointer;
  }
  .foodImg{
    width: 40%;
  }
  .foodName{
    font-size: 18px;
    padding-left: 10px;
    color:brown;
  }
  .foodPrice{
    font-size: 16px;
    padding-left: 10px;
    padding-top:10px;
  }
  .totaDiv{
    padding: 5px;
    text-align: center;
  }
  .bounce-enter-active {
    animation: bounce-in .5s;
  }
  .bounce-leave-active {
    animation: bounce-in .5s reverse;
  }
  @keyframes bounce-in {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.5);
    }
    100% {
      transform: scale(1);
    }
  }
</style>
