<template>
  <div>
    <el-form-item>
      <h4 class="form__description-title">Địa Chỉ</h4>
      <el-card shadow="hover">
        <el-input v-model="hotel.address" maxlength="100" show-word-limit></el-input>
      </el-card>
    </el-form-item>
    <el-row :gutter="24">
      <el-col :span="8">
        <el-form-item>
          <h4 class="form__description-title">Thành Phố</h4>
          <el-card shadow="hover">
            <el-select
              class="add-hotel__select-info"
              v-model="hotel.provinceId"
              clearable
              @change="handleSelectProvince"
              placeholder="Vui Lòng Chọn Tỉnh Thành"
              filterable 
            >
              <el-option
                v-for="province in provinces"
                :key="province.id"
                :label="province.name"
                :value="province.id"
              ></el-option>
            </el-select>
          </el-card>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item>
          <h4 class="form__description-title">Quận/Huyện</h4>
          <el-card shadow="hover">
            <el-select
              class="add-hotel__select-info"
              v-model="hotel.districtId"
              clearable
              @change="handleSelectDistrict"
              placeholder="Vui Lòng Chọn Quận Huyện"
              filterable 
            >
              <el-option
                v-for="district in districts"
                :key="district.id"
                :label="district.name"
                :value="district.id"
              ></el-option>
            </el-select>
          </el-card>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item>
          <h4 class="form__description-title">Phường/Xã</h4>
          <el-card shadow="hover">
            <el-select
              class="add-hotel__select-info"
              v-model="hotel.wardId"
              clearable
              placeholder="Vui Lòng Chọn Phường Xã"
              filterable 
            >
              <el-option
                v-for="ward in wards"
                :key="ward.id"
                :label="ward.name"
                :value="ward.id"
              ></el-option>
            </el-select>
          </el-card>
        </el-form-item>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  props: ['hotel'],
  computed: {
    provinces() {
      return this.$store.state.provinces;
    },
    districts() {
      return this.$store.state.districts;
    },
    wards() {
      return this.$store.state.wards;
    },
  },
  methods: {
    handleSelectProvince(provinceId) {
      if (provinceId == undefined) return;
      this.$store.dispatch('fetchDistrict', provinceId);
    },
    handleSelectDistrict(districtId) {
      this.$store.dispatch('fetchWards', districtId);
    },
  },
  async created() {
    this.$store.dispatch('fetchProvince');
    this.$store.dispatch('fetchDistrict', this.hotel.provinceId);
    this.$store.dispatch('fetchWards', this.hotel.districtId);
  },
}
</script>
<style scoped>
.form__description-title {
  font-size: 20px;
  margin-top: 20px;
  margin-bottom: 10px;
  font-family: inherit;
  font-weight: 700;
  line-height: 1.1;
}
.add-hotel__select-info {
  width: 100%;
}
</style>