<template>
  <div>
    <!-- Add Attributes -->
    <el-form-item>
      <h4 class="form__description-title">Các Tiện Nghi của Phòng</h4>
      <el-row :gutter="24" v-if="!loading">
        <el-col :span="12" v-for="(attribute, index) in attributes" :key="index">
          <h4 class="form__description-content" @click="handleSelectAttribute(attribute.id)">
            {{ attribute.name }}
          </h4>
          <el-select
            class="attribute-select__selector"
            v-model="room.attributes[index].attributeOptionId"
            clearable
            placeholder="Vui Lòng Chọn Tùy Chọn"
            filterable 
          >
            <el-option
              v-for="option in filterAttributeOption(attribute.id)"
              :key="option.id"
              :label="option.name"
              :value="option.id"
            ></el-option>
          </el-select>
        </el-col>
      </el-row>
    </el-form-item>
  </div>
</template>
<script>
export default {
  props: ['room'],
  data() {
    return {
      loading: true
    }
  },
  computed: {
    allAttributeOptions() {
      return this.$store.state.allAttributeOptions;
    },
    attributes: {
      get() {
        return this.$store.state.attributes;
      },
      set(newValue) {
        this.room.attributes = newValue.map(a => ({attributeId: a.id, attributeOptionId: a.attributeOptionId}));
      }
    }
  },
  methods: {
    filterAttributeOption(id) {
      return this.$store.state.allAttributeOptions.filter((o) => o.attributeId === id);
    },
    async handleSelectAttribute(index) {
      this.attributeOptions = await this.$store.dispatch('fetchAttributeOptionById', index);
    },
  },
  async mounted() {
    await this.$store.dispatch('fetchAttributes');
    this.attributes = this.$store.state.attributes.map((a) => ({ ...a, attributeOptionId: '' }));
    await this.$store.dispatch('fetchAllAttributeOptions');
    this.loading = false;
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
.form__description-content {
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
}
.attribute-select__selector {
  width: 70%;
}
</style>