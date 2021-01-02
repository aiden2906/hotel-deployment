<template>
  <div>
    <div class="attribute-list">
      <h1>Danh Sách Thuộc Tính</h1>
      <el-card>
        <el-table
          :data="attributes"
          stripe
          style="width: 100%"
          :cell-class-name="cellStyle"
          :default-sort = "{prop: 'id', order: 'ascending'}">
          <el-table-column
            fixed
            prop="id"
            label="ID"
            width="80"
            sortable>
          </el-table-column>
          <el-table-column
            fixed
            prop="name"
            label="Tên"
            width="200">
          </el-table-column>
          <el-table-column label="Tạo Ngày">
            <!-- Must use the template scope to use the filter -->
            <template slot-scope="scope">{{scope.row.createdAt| formatDate}}</template>
          </el-table-column>
          <el-table-column label="Cập Nhật">
            <!-- Must use the template scope to use the filter -->
            <template slot-scope="scope">{{scope.row.updatedAt| formatDate}}</template>
          </el-table-column>
          <!-- View Details and Delete the Attribute -->
          <el-table-column
            label="Thao Tác"
            width="280">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.row.id)">Chi Tiết</el-button>
              <!-- Update Attribute -->
              <AdminUpdateAttribute :attributeId="scope.row.id"/>
              <!-- Delete Attribute -->
              <AdminDeleteAttribute :attributeId="scope.row.id"/>
            </template>
          </el-table-column>
        </el-table>
        <!-- Add Attribute -->
        <admin-add-attribute/>
      </el-card>
    </div>
    <div v-show="hasChosenAttribute" class="attribute-option">
      <h1>Danh Sách {{this.attribute.name}}</h1>
      <el-card>
        <el-table
          :data="attributeOptions"
          stripe
          style="width: 100%"
          :default-sort = "{prop: 'id', order: 'ascending'}"
          :cell-class-name="cellStyle">
          <el-table-column
            fixed
            prop="id"
            label="ID"
            width="80"
            sortable>
          </el-table-column>
          <el-table-column
            fixed
            prop="name"
            label="Tên"
            width="200">
          </el-table-column>
          <el-table-column label="Tạo Ngày">
            <!-- Must use the template scope to use the filter -->
            <template slot-scope="scope">{{scope.row.createdAt| formatDate}}</template>
          </el-table-column>
          <el-table-column label="Cập Nhật Ngày">
            <!-- Must use the template scope to use the filter -->
            <template slot-scope="scope">{{scope.row.updatedAt| formatDate}}</template>
          </el-table-column>
          <!-- View Details and Delete the Attribute -->
          <el-table-column
            label="Thao Tác"
            width="280">
            <template slot-scope="scope">
              <el-button
                size="mini"
                disabled>Chi Tiết</el-button>
              <!-- Update Attribute Option -->
              <admin-update-attribute-option :attributeId="attributeId" :attributeOptionId="scope.row.id"/>
              <!-- Delete Attribute Option -->
              <admin-delete-attribute-option :attributeId="attributeId" :attributeOptionId="scope.row.id"/>
            </template>
          </el-table-column>
        </el-table>
        <admin-add-attribute-option :attributeId="attributeId"/>
      </el-card>
    </div>
  </div>
</template>
<script>
import AdminAddAttributeOption from '@/components/Admin/AdminAddAttributeOption'
import AdminUpdateAttribute from '@/components/Admin/AdminUpdateAttribute'
import AdminAddAttribute from '@/components/Admin/AdminAddAttribute'
import AdminDeleteAttribute from '@/components/Admin/AdminDeleteAttribute'
import AdminUpdateAttributeOption from '@/components/Admin/AdminUpdateAttributeOption'
import AdminDeleteAttributeOption from '@/components/Admin/AdminDeleteAttributeOption'
export default {
  data() {
    return {
      hasChosenAttribute: false,
      attributeId: 0
    }
  },
  computed: {
    attributeOptions() {
      return Array.from(this.$store.state.attributeOptions);
    },
    attributes() {
      return Array.from(this.$store.state.attributes);
    },
    attribute() {
      return this.$store.state.attributeById;
    }
  },
  components: {
    AdminAddAttributeOption,
    AdminUpdateAttribute,
    AdminAddAttribute,
    AdminDeleteAttribute,
    AdminUpdateAttributeOption,
    AdminDeleteAttributeOption
  },
  methods: {
    async handleEdit(attributeId) {
      this.attributeId = attributeId;
      await this.$store.dispatch('fetchAttributeOptionById', attributeId);
      await this.$store.dispatch('fetchAttributeById', attributeId);
      this.hasChosenAttribute = true;
    },
    cellStyle({columnIndex}) {
      if (columnIndex == 4) {
        return "attribute__operation";
      }
    }
  },
  async mounted() {
    this.$store.dispatch('fetchAttributes');
  },
}
</script>
<style>
.attribute__operation .cell{
  display: flex;
  justify-content: space-between;
}
</style>
<style scoped>
.header__icon {
  padding: 10px;
  font-size: 25px;
  color: #1174a6;
}
.header__icon:hover {
  color: #0c5478;
}
.attribute__add {
  display: flex;
  align-items: center;
  padding-top: 15px;
  cursor: pointer;
  font-weight: 700;
  color: #1174a6;
}
.attribute__add:hover {
  color: #0c5478;
}
.table__operation {
  display: flex;
  justify-content: space-between;
}
</style>