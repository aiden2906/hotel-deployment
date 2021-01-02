<template>
    <div>
        <CusNavbar></CusNavbar>
        <el-container>
            <el-main>
                <el-row class="UpdateCustomer" style="display: flex">
                    <el-col class="UpdateCustomer_List" :span="6">
                        <div class="UpdateCustomer_Title">
                            <i class="el-icon-user"></i>
                            Ảnh đại diện
                        </div>
                        <div style="height: 100px" v-if="form.avatar" class="Avatar">
                            <img :src="form.avatar" alt="">
                        </div>
                        <div v-else class="Avatar">
                            <img :src="form.preview" alt="">
                        </div>

                        <div style="text-align: center;" >
                            <el-upload
                                class="avatar-uploader hidden-xs-only"
                                action="https://hotel.eyeteam.vn/api.upload/image"
                                name="image"
                                :show-file-list="false"
                                :on-success="handleAvatarSuccess"
                                ref="upload"
                                >CHỌN/ĐỔI HÌNH ĐẠI DIỆN
                            </el-upload>
                            <el-upload
                                class="avatar-uploader hidden-sm-and-up"
                                action="https://hotel.eyeteam.vn/api.upload/image"
                                name="image"
                                :show-file-list="false"
                                :on-success="handleAvatarSuccess"
                                ref="upload"
                                >CHỌN/ĐỔI HÌNH
                            </el-upload>
                        </div>
                    </el-col>
                    <el-col class="UpdateCustomer_Detail" :span="18">
                        <div style="font-size:24px; padding: 0 0 20px 0">Thông Tin Người Dùng</div>
                        <div class="customer-name-wrapper">
                            <div>
                                <div class="customer-title">Họ & Tên</div>
                                <div class="customer">{{form.lastname}}  {{form.firstname}}</div>
                            </div>
                            <el-button type="text" @click="dialogNameVisible = true">Chỉnh sửa</el-button>
                            <el-dialog title="Name" :visible.sync="dialogNameVisible">
                                <el-form :model="form">
                                    <el-form-item label="Họ" :label-width="formLabelWidth">
                                        <el-input @keyup.enter.native="dialogNameVisible = false" v-model="form.lastname" autocomplete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item label="Tên" :label-width="formLabelWidth">
                                        <el-input @keyup.enter.native="dialogNameVisible = false" v-model="form.firstname" autocomplete="off"></el-input>
                                    </el-form-item>
                                </el-form>
                            <span slot="footer" class="dialog-footer">
                                <el-button @click="dialogNameVisible = false">Cancel</el-button>
                                <el-button type="primary"  @click="dialogNameVisible = false">Confirm</el-button>
                            </span>
                            </el-dialog>
                        </div>
                        <div class="customer-wrapper">
                            <div>
                                <div class="customer-title">Email</div>
                                <div class="customer">{{form.email}}</div>
                            </div>
                            <el-button type="text" @click="dialogMailVisible = true">Chỉnh sửa</el-button>
                            <el-dialog title="Mail" :visible.sync="dialogMailVisible">
                                <el-form :model="form">
                                    
                                    <el-form-item label="Email" :label-width="formLabelWidth">
                                        <el-input @keyup.enter.native="dialogNameVisible = false" v-model="form.email" autocomplete="off"></el-input>
                                    </el-form-item>
                                </el-form>
                            <span slot="footer" class="dialog-footer">
                                <el-button @click="dialogMailVisible = false">Cancel</el-button>
                                <el-button type="primary" @click="dialogMailVisible = false">Confirm</el-button>
                            </span>
                            </el-dialog>
                        </div>
                        <div class="customer-wrapper">
                            <div>
                                <div class="customer-title">Số điện thoại</div>
                                <div class="customer">{{form.phone}}</div>
                            </div>
                            <el-button type="text" @click="dialogPhoneVisible = true">Chỉnh sửa</el-button>
                            <el-dialog title="Phone" :visible.sync="dialogPhoneVisible">
                                <el-form :model="form">
                                    
                                    <el-form-item label="Phone" :label-width="formLabelWidth">
                                        <el-input @keyup.enter.native="dialogNameVisible = false" v-model="form.phone" autocomplete="off"></el-input>
                                    </el-form-item>
                                </el-form>
                            <span slot="footer" class="dialog-footer">
                                <el-button @click="dialogPhoneVisible = false">Cancel</el-button>
                                <el-button type="primary" @click="dialogPhoneVisible = false">Confirm</el-button>
                            </span>
                            </el-dialog>
                        </div>
                        <div class="customer-wrapper">
                            <div>
                                <div class="customer-title">Address</div>
                                <div class="customer">{{form.address}}</div>
                            </div>
                            <el-button type="text" @click="dialogAddressVisible = true">Chỉnh sửa</el-button>
                            <el-dialog title="Address" :visible.sync="dialogAddressVisible">
                                <el-form :model="form">
                                    
                                    <el-form-item label="Address" :label-width="formLabelWidth">
                                        <el-input @keyup.enter.native="dialogNameVisible = false" v-model="form.address" autocomplete="off"></el-input>
                                    </el-form-item>
                                </el-form>
                            <span slot="footer" class="dialog-footer">
                                <el-button @click="dialogAddressVisible = false">Cancel</el-button>
                                <el-button type="primary" @click="dialogAddressVisible = false">Confirm</el-button>
                            </span>
                            </el-dialog>
                        </div>
                        <el-button style="padding: 12px 25px; font-weight: 600" type="primary" @click="updateCustomer">Lưu</el-button>
                        <el-button style="font-weight: 600" type="warning" @click="backToHomePage">Trở về trang chủ</el-button>
                        
                        
                    </el-col>
                </el-row>
            </el-main>
        </el-container>
        <Footer></Footer>
    </div>
</template>

<script>
import CusNavbar from '../../components/CusNavbar'
import Footer from '../../components/Footer'
export default {
    data() {
        return {
            dialogNameVisible: false,
            // dialogUserNameVisible: false,
            dialogMailVisible: false,
            dialogAddressVisible: false,
            dialogPhoneVisible: false,
            form: {
                id: this.$store.state.myCustomer.id,
                lastname: this.$store.state.myCustomer.lastname,
                firstname: this.$store.state.myCustomer.firstname,
                phone: this.$store.state.myCustomer.phone,
                username: this.$store.state.myCustomer.username,
                password: this.$store.state.myCustomer.password,
                address: this.$store.state.myCustomer.address,
                email: this.$store.state.myCustomer.email,
                dateOfBirth: this.$store.state.myCustomer.dateOfBirth,
                chatId: this.$store.state.myCustomer.chatId,
                preview:"https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
                avatar: this.$store.state.myCustomer.avatar
            },
            
            formLabelWidth: '80px',
            success:"",
        }
    },
    components: {
        CusNavbar,
        Footer
    },
    computed: {
        myCustomer() {
            return this.$store.state.myCustomer
        }
    },
    methods: {
        handleAvatarSuccess(res, file) {
            this.form.preview = URL.createObjectURL(file.raw);
            this.form.avatar = res.data[0];
        },
        async updateCustomer() {
            await this.$store.dispatch('updateCustomer', this.form)
            this.alertSuccess();
        },
        alertSuccess() {
            this.$message({
                showClose: true,
                message: 'Update dữ liệu thành công!',
                type: 'success'
            });
        },
        alertErr() {
            this.$message({
                showClose: true,
                message: 'Update dữ liệu thất bại!',
                type: 'error'
            });
        },
        backToHomePage() {
            this.$router.push('/')
        }
    }
}
</script>

<style scoped>
    .fix{
        font-weight: 600;
        cursor: pointer
    }
    .customer-title {
        font-weight: 600;
        padding: 5px 0;
    }
    .customer {
        padding: 5px 0;
    }
    .customer-name-wrapper {
        background-image: linear-gradient(90deg,#82b4ff,#b5d2ff);
        padding: 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 20px
    }
    .customer-wrapper {
        background-color: white;
        padding: 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 20px
    }
    
    .UpdateCustomer_Title {
        background-color: #5392f9;
        padding: 15px;
        color: white;
        font-size: 13px;
        width: 70%;
        margin: 0 auto;
        text-align: center;
        cursor: pointer;
        font-weight: 600;
    }
    .UpdateCustomer_Item:hover {
        background-color: #5392f9;
        color:white
    }
    .UpdateCustomer_Detail {
        padding: 20px 40px;
         background-color: rgba(189, 180, 180, 0.1);
    }
    .UpdateCustomer_List {
        padding: 20px;
        box-shadow: 9px 0px 6px 0px #e9ebee;
        background: linear-gradient(90deg,#f8f7f9,#fff);
    }
    .UpdateCustomer_Avatar {

    }
    .Avatar {
        display: flex;
        justify-content: center;
        padding: 15px;
        margin: 0 auto;
        width: 50%;
    }
    .Avatar img{
        width: 100px;
        border-radius: 50%;
        object-fit: cover;
    }
</style>

<style >
    .UpdateCustomer_Detail .el-dialog {
        width: 40%;
    }
    .UpdateCustomer_Detail .el-dialog__title {
        display: none;
    }
</style>