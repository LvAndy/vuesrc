<template>
  <div>
    <div class="change-view">
      <a-radio-group default-value="b" button-style="solid">
        <a-radio-button value="a" @click="showListView()">
          <a-icon type="unordered-list" />
          列表视图
        </a-radio-button>
        <a-radio-button value="b" @click="showCardView()">
          卡片视图
          <a-icon type="appstore" />
        </a-radio-button>
      </a-radio-group>
      <div class="search-and-create">
        <div class="search-box">
          <a-input-search placeholder="输入要查找的项目" enter-button @search="onSearch" />
        </div>
        <a-button type="primary" @click="() => (createProjForm = true)">
          创建新项目
          <a-icon type="folder-add" />
        </a-button>
      </div>
    </div>
    <a-modal
      v-model="createProjForm"
      title="创建新项目"
      centered
      @ok="() => (createProjForm = false)"
    >
      <!-- 项目创建表单 -->
      <a-form
        :form="form"
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 16 }"
        @submit="handleSubmit"
      >
        <a-form-item label="项目名称">
          <a-input
            v-decorator="['projName', { rules: [{ required: true, message: '请输入项目名称!' }] }]"
          />
        </a-form-item>
        <a-form-item label="项目权限">
          <a-select
            v-decorator="[
              'projAuthority',
              { rules: [{ required: true, message: '请选择项目权限!' }] },
            ]"
            placeholder="公有/私有"
          >
            <a-select-option value="public">
              公开
            </a-select-option>
            <a-select-option value="private">
              私密
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="项目封面">
          <a-upload
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            list-type="picture-card"
            :file-list="fileList"
            @preview="handlePreview"
            @change="handleChange"
          >
            <div v-if="fileList.length < 1">
              <a-icon type="plus" />
              <div class="ant-upload-text">
                Upload
              </div>
            </div>
          </a-upload>
          <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
            <img alt="example" style="width: 100%;" :src="previewImage" />
          </a-modal>
        </a-form-item>
      </a-form>
    </a-modal>
    <div v-if="listVisible" class="list-view">
      <a-list item-layout="horizontal" :data-source="data">
        <a-list-item slot="renderItem" slot-scope="item">
          <img slot="extra" width="100" alt="logo" :src="item.imgUrl" />
          <a-list-item-meta>
            <div slot="title">{{ item.projectName }}</div>
            <div slot="description">{{ item.projectAdmin }}</div>
            <a slot="description">进入项目</a>
          </a-list-item-meta>
        </a-list-item>
      </a-list>
    </div>
    <div v-if="!listVisible">
      <div>
        <a-list type="flex" :grid="{ gutter: 24, column: 5 }" :data-source="data" class="card-row">
          <a-list-item slot="renderItem" slot-scope="item" class="list-item">
            <a-card hoverable style="width: 250px; overflow: hidden;">
              <img slot="cover" alt="example" :src="item.imgUrl" class="card-img" />

              <template slot="actions" class="ant-card-actions">
                <a-icon key="setting" type="setting" />
                <a-icon key="edit" type="edit" />
                <a-icon key="ellipsis" type="ellipsis" />
              </template>
              <a-card-meta>
                <div slot="title" class="card-text">{{ item.projectName }}</div>
                <div slot="description" class="card-text">{{ item.projectAdmin }}</div>
              </a-card-meta>
            </a-card>
          </a-list-item>
        </a-list>
      </div>
    </div>
  </div>
</template>

<script>
import store from '../../store'

const data = [
  {
    title: 'Ant Design Title 1',
    manager: '周杰伦',
  },
  {
    title: 'Ant Design Title 2',
    manager: '蔡徐坤',
  },
  {
    title: 'Ant Design Title 3',
    manager: '郭麒麟',
  },
  {
    title: 'Ant Design Title 4',
    manager: '吴亦凡',
  },
]
//图片转 base64
function getBase64(img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}
export default {
  name: 'Project',
  methods: {
    showListView() {
      console.log('显示列表')
      this.listVisible = true
    },
    showCardView() {
      console.log('显示卡片')
      this.listVisible = false
    },
    handleCancel() {
      this.previewVisible = false
    },
    async handlePreview(file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj)
      }
      this.previewImage = file.url || file.preview
      this.previewVisible = true
    },
    handleChange({ fileList }) {
      this.fileList = fileList
    },
  },
  data() {
    return {
      listVisible: false, //是否显示列表 true显示列表 false显示卡片
      data,
      createProjForm: false, //显示创建项目的表单
      previewVisible: false,
      previewImage: '',
      fileList: [],
    }
  },
  beforeMount: function () {
    let defaultTeamName = store.getters.teamName
    store.dispatch({
      type: 'GetTeamInfo',
      teamName: defaultTeamName,
    })
    this.data = store.getters.projects
  },
}
</script>

<style scoped>
.change-view {
  width: 100%;
  display: flex;
  right: 20px;
  justify-content: space-between;
}
.card-row {
  height: 500px;
  margin-top: 20px;
}
.card-img {
  width: 250px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.card-text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.search-and-create {
  display: flex;
  justify-content: space-between;
}
.search-box {
  margin-right: 10px;
}
</style>
