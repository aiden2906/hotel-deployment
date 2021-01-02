<template>
    <div>
        <CusNavbar></CusNavbar>
        <el-container>
            <el-main style="background-color: antiquewhite; height:100vh">
                <el-row class="hotel-add-to-cart">
                    <div class="hotel-name">Khách Sạn Golf Valley (Golf Valley Hotel)</div>
                </el-row>
                <el-row class="room-add-to-cart">
                    <el-col class="RoomWrap" :span="24">
                            <div class="MasterRoom_Header">
                                <h3>Giường Đôi (Double)</h3>
                                
                            </div>
                            <div>
                                 <el-col :span="5" class="MasterRoom-info">
                                 <div class="MasterRoom-infoHeader">Loại phòng</div>
                                 <div class="MasterRoom-infoPhoto">
                                      <img src="../assets/e6.jpg" alt="">
                                 </div>
                             </el-col>
                            <el-col :span="19" class="MasterRoom-roomList">
                                <el-row class="roomList_wrapper">
                                    <el-col :span="4" class="ChildRoom-dateFrom">
                                        <div class="dateFrom-header">Ngày nhận phòng</div>
                                    </el-col>
                                     <el-col :span="4" class="ChildRoom-dateTo">
                                        <div class="dateFrom-header">Ngày trả phòng</div>
                                    </el-col>
                                    <el-col :span="3" class="ChildRoom-capacity">
                                        <div class="capacity-header">Sức chứa</div>
                                    </el-col>
                                    <el-col :span="5" class="ChildRoom-price">
                                        <div class="price-header">Giá phòng/ đêm</div>
                                    </el-col>
                                    <el-col :span="5" class="ChildRoom-saleprice">
                                        <div class="book-header">Giá sale</div>
                                    </el-col>
                                    <el-col :span="3" class="ChildRoom-room">
                                        <div class="room-header">SL</div>
                                    </el-col>
                                    
                                </el-row>
                                <el-row class="ChildRoomsList-room-contents">
                                    <el-col :span="4" class="ChildRoom-dateFrom-content">
                                        
                                        <div class="dateFrom-content-bucket">
                                            <div style="font-weight: 600; padding: 10px 0; font-size:16px; text-align:center">{{dateFrom}}</div>
                                            
                                        </div>
                                    </el-col>
                                    <el-col :span="4" class="ChildRoom-dateTo-content">
                                        
                                        <div class="dateTo-content-bucket">
                                            <div style="font-weight: 600; padding: 10px 0; font-size:16px; text-align:center">{{dateTo}}</div>
                                        </div>
                                    </el-col>
                                    <el-col :span="3" class="ChildRoom-capacity-content">
                                        <div style="padding: 20px 10px; text-align:center"> <i class="el-icon-user-solid"></i>
                                        <i class="el-icon-user-solid"></i></div>
                                       
                                    </el-col>
                                    <el-col :span="5" class="ChildRoom-price-content">
                                        <div class="regularPrice">
                                            {{regularPrice}} $
                                        </div>
                                    </el-col>
                                     <el-col :span="5" class="ChildRoom-saleprice-content">
                                        <div class="finalPrice">
                                            {{salePrice}} $
                                        </div>
                                    </el-col>
                                    <el-col :span="3" class="ChildRoom-room-content">
                                        <el-select v-model="quantity" placeholder="SL">
                                            <el-option
                                            v-for="item in options"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </el-col>
                                   
                                </el-row>
                            </el-col>
                            </div>
                            
                        </el-col>
                </el-row>
                <el-row class="subtotal">
                    <div class="subtotal-head">Payment Subtotal</div>
                    <div class="subtotal-add-to-cart">
                        <div style="font-size: 16px; font-weight:600; padding: 20px 0">{{subTotal}} VND</div>
                    <el-button type='primary'>Thanh toán</el-button>
                    </div>
                </el-row>
            </el-main>
        </el-container>
    </div>
</template>

<script>
import CusNavbar from '../components/CusNavbar'
export default {
    
    components: {
        CusNavbar
    },
    data() {
        return {
            dateFrom: '28/10/2020',
            dateTo: '1/11/2020',
            regularPrice: 50,
            salePrice: 40,
            options: [{
            value: '1',
            label: '1'
            }, {
            value: '2',
            label: '2'
            }, {
            value: '3',
            label: '3'
            }, 
            ],
            quantity: ''
            }
    },
    computed: {
        subTotal() {
            return 1000000
        }
    }
}
</script>

<style scoped>
    .subtotal {
        margin: 0 auto;
        width: 80%;
        padding: 10px;
    }
    .subtotal-add-to-cart {
        background-color: #f7f7f7;
        padding: 10px;
        border: 1px solid rgb(221,223,226);
        border-top: none;
    }
    .subtotal-head{
        background-color: #f7f7f7;
        padding: 10px;
        border: 1px solid rgb(221,223,226);
        font-weight: 600;
    }
    .ChildRoom-room-content .el-select {
        padding: 25px 20px;
    }
    .hotel-name {
        font-size: 26px;
        font-weight: 600
    }
    .hotel-add-to-cart {
        width: 80%;
        margin: 0 auto;
        padding: 10px;
    }
    .ChildRoomsList-room-contents {
        display: flex;
        line-height : 3
    }
    .ChildRoom-dateFrom-content {
        border-right: 1px solid rgb(221,223,226)
    }
     .ChildRoom-dateTo-content {
        border-right: 1px solid rgb(221,223,226)
    }
    .ChildRoom-capacity-content {
        border-right: 1px solid rgb(221,223,226)
    }
    .ChildRoom-price-content {
        border-right: 1px solid rgb(221,223,226)
    }
    .ChildRoom-saleprice-content {
        border-right: 1px solid rgb(221,223,226)
    }
    .reverseNow {
       width: 70%;
       margin: 10px 0;
    }
    .ChildRoom-saleprice-content {
        text-align: center
    }
    .room-dropdown {
        padding: 10px;
        text-align: center;
    }
    .finalPrice {
        padding: 10px;
        text-align: center;
        color: #ed5c59;
        font-size: 24px;
    }
      .regularPrice {
        padding: 10px;
        text-align: center;
        font-size: 24px;
    }
    
    .dateFrom-content-bucket {
        font-size: 12px;
        font-weight: 500;
        padding: 10px;
    }
    .dateTo-content-bucket {
        font-size: 12px;
        font-weight: 500;
        padding: 10px;
    }
    .ChildRoomsList-room-contents{
        border: 1px solid #f79911;
        background-color: white;
    }
    .MasterRoom-infoPhoto {
        position: relative;
        cursor: pointer
    }
    .MasterRoom-infoHeader {
        margin-bottom: 10px;
    }
    .MasterRoom-infoPhoto img{
        width: 100%
    }
    .roomList_wrapper {
        margin-bottom: 10px
    }
    .MasterRoom_Header {
        display:flex;
        justify-content: space-between;
        align-items: center;
        background-color: white;
        padding: 10px;
    }
    .Room_review {
       font-weight: 600;
       color: blueviolet
    }
    .MasterRoom_Header h3  {
        font-weight: 600;
        font-size: 16px;
    }
    .RoomWrap {
        border: 1px solid rgb(221,223,226);
        background-color: #f7f7f7;
    }
    .Room .Room-row {
        width: 80%;
        margin: 0 auto;
    }
    .room-add-to-cart {
        width: 80%;
        margin: 0 auto;
        padding: 10px
    }
    .Room-title {
        display : flex;
        align-items: center;
        padding: 10px;
        justify-content: space-between;
    }
    .MasterRoom-info {
        padding: 10px 0 10px 10px;
        font-size: 14px;
        font-weight: 600;
    }
    .MasterRoom-roomList {
        padding: 10px;
        font-size: 14px;
        font-weight: 600;
    }
</style>