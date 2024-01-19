<template>
  <div class="card grid">
    <div class="col-12 xl:col-12 title">
      <h1>牧场数据上传系统</h1>
    </div>
    <div class="col-2 xl:col-2">
      <h5>请选择记录时间</h5>
    </div>
    <div class="col-10 xl:col-10">
      <Calendar id="calendar-24h" v-model="RecordTime" showTime hourFormat="24" />
    </div>
    <div class="col-6">
      <div class=" card" style="height: 50vh; display: flex; flex-direction: column;">
        <div class="grid">
          <TabView style="flex: 1;">
            <TabPanel header="I-重金属">
              <div class="col-12">
                <FileUpload name="demo[]" url="/api/upload" :customUpload="true" @uploader="HeavyMetal" accept=".xlsx"
                  :maxFileSize="1000000">
                  <template #empty>
                    <p>请上传重金属数据文件(.xlsx)</p>
                  </template>
                </FileUpload>
              </div>
              <div class="col-12 button-container" style="display: flex; justify-content: center; margin-top: 20px;">
                <Toast />
                <Button :label="lan === 'CN' ? '提交' : 'View Details'" severity="info" @click="submitData" />
              </div>
            </TabPanel>
            <TabPanel header="II-真菌">
              <div class="col-12">
                <FileUpload name="demo[]" url="/api/upload" :customUpload="true" @uploader="Toxins" accept=".xlsx"
                  :maxFileSize="1000000">
                  <template #empty>
                    <p>请上传饲料真菌残留数据文件(.xlsx)</p>
                  </template>
                </FileUpload>
              </div>
              <div class="col-12 button-container" style="display: flex; justify-content: center; margin-top: 20px;">
                <Toast />
                <Button :label="lan === 'CN' ? '提交' : 'View Details'" severity="info" @click="submitData" />
              </div>
            </TabPanel>
            <TabPanel header="III-饮用水">
              <div class="col-12">
                <FileUpload name="demo[]" url="/api/upload" :customUpload="true" @uploader="PastureWater" accept=".xlsx"
                  :maxFileSize="1000000">
                  <template #empty>
                    <p>请上传饮用水质数据文件(.xlsx)</p>
                  </template>
                </FileUpload>
              </div>
              <div class="col-12 button-container" style="display: flex; justify-content: center; margin-top: 20px;">
                <Toast />
                <Button :label="lan === 'CN' ? '提交' : 'View Details'" severity="info" @click="submitData" />
              </div>
            </TabPanel>
            <TabPanel header="IV-场区">
              <div class="col-12">
                <FileUpload name="demo[]" url="/api/upload" :customUpload="true" @uploader="PastureArea" accept=".xlsx"
                  :maxFileSize="1000000">
                  <template #empty>
                    <p>请上传场区数据文件(.xlsx)</p>
                  </template>
                </FileUpload>
              </div>
              <div class="col-12 button-container" style="display: flex; justify-content: center; margin-top: 20px;">
                <Toast />
                <Button :label="lan === 'CN' ? '提交' : 'View Details'" severity="info" @click="submitData" />
              </div>
            </TabPanel>
            <TabPanel header="V-缓冲区">
              <div class="col-12">
                <FileUpload name="demo[]" url="/api/upload" :customUpload="true" @uploader="PastureBuffer" accept=".xlsx"
                  :maxFileSize="1000000">
                  <template #empty>
                    <p>请上传缓冲区数据文件(.xlsx)</p>
                  </template>
                </FileUpload>
              </div>
              <div class="col-12 button-container" style="display: flex; justify-content: center; margin-top: 20px;">
                <Toast />
                <Button :label="lan === 'CN' ? '提交' : 'View Details'" severity="info" @click="submitData" />
              </div>
            </TabPanel>
            <TabPanel header="VI-牛舍">
              <div class="col-12">
                <FileUpload name="demo[]" url="/api/upload" :customUpload="true" @uploader="PastureCowhouse"
                  accept=".xlsx" :maxFileSize="1000000">
                  <template #empty>
                    <p>请上传牛舍数据文件(.xlsx)</p>
                  </template>
                </FileUpload>
              </div>
              <div class="col-12 button-container" style="display: flex; justify-content: center; margin-top: 20px;">
                <Toast />
                <Button :label="lan === 'CN' ? '提交' : 'View Details'" severity="info" @click="submitData" />
              </div>
            </TabPanel>
          </TabView>
        </div>
      </div>
    </div>
    <div class="col-6">
      <div class="card">
        <div>
          <TreeTable :value="treeTableData" :expandedRows="expandedRows" @toggle="onRowToggle" :key="id">
            <Column field="key" header="Key" :expander="true"></Column>
            <Column field="value" header="Value"></Column>
          </TreeTable>
        </div>
      </div>
    </div>
    <div class="col-3">
      <div class="card mb-0" style="height: 12vh">
        <Button icon="pi pi-upload" label="牧场基本环境数据" class="p-button-outlined" @click="upload_basic"></Button>
      </div>
    </div>
    <div class="col-3">
      <div class="card mb-0" style="height: 12vh">
        <Button icon="pi pi-upload" label="牧场废水指标" class="p-button-outlined" @click="upload_waste_water"></Button>
      </div>
    </div>
    <div class="col-3">
      <div class="card mb-0" style="height: 12vh">
        <Button icon="pi pi-upload" label="牧场垫料数据" class="p-button-outlined" @click="upload_padding_data"></Button>
      </div>
    </div>
    <div class="col-3">
      <div class="card mb-0" style="height: 12vh">
        <Button icon="pi pi-upload" label="牧场消毒记录" class="p-button-outlined" @click="upload_basic_distinct"></Button>
      </div>
    </div>
    <div class="col-4">
      <div class="card mb-0" style="height: 12vh">
        <Button icon="pi pi-upload" label="牧场当日废渣处理" class="p-button-outlined" @click="upload_residue"></Button>
      </div>
    </div>
    <div class="col-4">
      <div class="card mb-0" style="height: 12vh">
        <Button icon="pi pi-upload" label="牧场当日恶臭污染处理" class="p-button-outlined" @click="upload_odor"></Button>
      </div>
    </div>
    <div class="col-4">
      <div class="card mb-0" style="height: 12vh">
        <Button icon="pi pi-upload" label="牧场当日废水处理" class="p-button-outlined" @click="upload_water"></Button>
      </div>
    </div>
  </div>
</template>


<script>
import axios from "axios";
import * as XLSX from 'xlsx'
import EventBus from "@/AppEventBus";


export default {
  // components: {
  //   TreeTable,
  //   Column
  // },
  data() {
    return {
      lan: this.$store.state.language,
      flag: true,
      layout: "grid",
      jsonData: null,
      choice: 0,
      treeNodes: [],
      treeTableData: [],
      RecordTime: '',
      expandedRows: {}, //用于跟踪展开的行
    }
  },
  mounted() {
    this.languageChangeListener = () => {
      this.lan = this.$store.state.language;
      if (this.lan == 'CN') {
        this.flag = true
      } else {
        this.flag = false
      }
    };
    EventBus.on('language-change', this.languageChangeListener);
  },
  watch: {
    jsonData(newVal) {
      this.treeTableData = this.convertToTreeTableFormat(newVal)
    }
  },
  created() {
    this.treeTableData = this.convertToTreeTableFormat(this.jsonData);
    console.log("树表", this.treeTableData)
  },
  methods: {
    onRowToggle(event) {
      this.$set(this.expandedRows, event.data.id, event.expanded);
    },
    convertToTreeTableFormat(data, parentKey = '') {
      let result = [];
      let nodeId = 0;
      for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          let fullKey = parentKey ? `${parentKey}.${key}` : key;
          let node = { id: nodeId, data: { key: fullKey, value: '' } };
          nodeId++;
          // 检查值的类型
          if (typeof data[key] === 'object' && data[key] !== null && !Array.isArray(data[key])) {
            // 对于对象类型，递归调用转换函数
            node.children = this.convertToTreeTableFormat(data[key], fullKey);
          } else {
            // 对于非对象类型，直接设置值
            node.data.value = data[key];
          }
          result.push(node);
        }
      }
      return result;
    },
    submitData() {
      let endpoint = '';
      switch (this.choice) {
        case 1:
          endpoint = 'http://127.0.0.1:8000/fsims/pastureoperator/addfeedheavymetal';
          break;
        case 2:
          endpoint = 'http://127.0.0.1:8000/fsims/pastureoperator/addfeedmycotoxins';
          break;
        case 3:
          endpoint = 'http://127.0.0.1:8000/fsims/pastureoperator/addpasturewaterrecord';
          break;
        case 4:
          endpoint = 'http://127.0.0.1:8000/fsims/pastureoperator/addpasturearea';
          break;
        case 5:
          endpoint = 'http://127.0.0.1:8000/fsims/pastureoperator/addpasturebuffer';
          break;
        case 6:
          endpoint = 'http://127.0.0.1:8000/fsims/pastureoperator/addpasturecowhouse';
          break;
        default:
          endpoint = ''
      }
      //console.log("formData", JSON.stringify(this.jsonData));
      axios.post(endpoint, JSON.stringify(this.jsonData), {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => {
        if (res.data.statusCode == 200) {
          this.$toast.add({ severity: 'success', summary: 'Upload Successfully', detail: '数据上传成功', life: 3000 });
        } else {
          this.$toast.add({ severity: 'error', summary: '上传失败', detail: res.data.message, life: 3000 });
        }
      }).catch(error => {
        console.error('发送数据时出现错误', error);
      })
    },
    upload_basic() {
      this.$router.push({ name: 'upload_pasture_basic' });
    },
    upload_waste_water() {
      this.$router.push({ name: 'upload_pasture_waste_water' });
    },
    upload_padding_data() {
      this.$router.push({ name: 'upload_pasture_padding_data' });
    },
    upload_basic_distinct() {
      this.$router.push({ name: 'upload_pasture_distinct' });
    },

    HeavyMetal(event) {
      const file = event.files && event.files[0];
      this.choice = 1;
      if (file) {
        const fileReader = new FileReader();
        fileReader.onload = (e) => {
          const fileContent = e.target.result;
          const workbook = XLSX.read(fileContent, { type: 'binary' });
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 }); // 使用 header 参数
          const parseData = this.ConvertColumnToJson(jsonData); //把列数据转换为json
          this.jsonData = this.MetalDatareconstruct(parseData);
          console.log("格式化后的json: ", this.jsonData);
        };
        fileReader.readAsBinaryString(file);
        this.$toast.add({ severity: 'info', summary: 'Success', detail: '文件上传成功', life: 3000 });
      }
    },
    ConvertColumnToJson(rawData) {
      // 创建一个空对象来存储解析后的数据
      let parsedData = {};
      // 遍历原始数据中的每一行
      rawData.forEach(row => {
        // 获取行数组的第一个和第二个元素
        let key = row[Object.keys(row)[0]];
        let value = row[Object.keys(row)[1]];

        // 将这些元素添加到解析后的数据对象中
        parsedData[key] = value;
      });
      return parsedData;
    },


    MetalDatareconstruct(data) {
      console.log("house_number", localStorage.getItem('house_number'));
      console.log("timestamp",)
      var housenumber = localStorage.getItem('house_number');
      var timestamp = parseInt(this.RecordTime.getTime() / 1000)
      let reconstructed = {
        house_number: housenumber,
        record_at: timestamp,
        as: {},
        pb: {},
        cd: {},
        cr: {},
      };
      for (let key in data) {
        if (key.startsWith('as')) {
          reconstructed.as[key] = data[key];
        } else if (key.startsWith('pb')) {
          reconstructed.pb[key] = data[key];
        } else if (key.startsWith('cd')) {
          reconstructed.cd[key] = data[key];
        } else if (key.startsWith('cr')) {
          reconstructed.cr[key] = data[key];
        }
      }
      return reconstructed
    },

    Toxins(event) {
      const file = event.files && event.files[0];
      this.choice = 2;
      if (file) {
        const fileReader = new FileReader();
        fileReader.onload = (e) => {
          const fileContent = e.target.result;
          const workbook = XLSX.read(fileContent, { type: 'binary' });
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 }); // 使用 header 参数
          const parseData = this.ConvertColumnToJson(jsonData); //把列数据转换为json
          this.jsonData = this.ToxinsDatareconstruct(parseData);


          console.log("格式化后的json: ", this.jsonData);
        };
        fileReader.readAsBinaryString(file);
        this.$toast.add({ severity: 'info', summary: 'Success', detail: '文件上传成功', life: 3000 });
      }
    },

    PastureArea(event) {
      const file = event.files && event.files[0];
      this.choice = 4;
      if (file) {
        const fileReader = new FileReader();
        fileReader.onload = (e) => {
          const fileContent = e.target.result;
          const workbook = XLSX.read(fileContent, { type: 'binary' });
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 }); // 使用 header 参数
          const parseData = this.ConvertColumnToJson(jsonData); //把列数据转换为json
          this.jsonData = parseData
          this.jsonData["house_number"] = localStorage.getItem('house_number');
          this.jsonData["time_stamp"] = parseInt(this.RecordTime.getTime() / 1000);
          console.log("格式化后的json: ", this.jsonData);
        };
        fileReader.readAsBinaryString(file);
        this.$toast.add({ severity: 'info', summary: 'Success', detail: '文件上传成功', life: 3000 });
      }
    },
    PastureBuffer(event) {
      const file = event.files && event.files[0];
      this.choice = 5;
      if (file) {
        const fileReader = new FileReader();
        fileReader.onload = (e) => {
          const fileContent = e.target.result;
          const workbook = XLSX.read(fileContent, { type: 'binary' });
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 }); // 使用 header 参数
          const parseData = this.ConvertColumnToJson(jsonData); //把列数据转换为json
          this.jsonData = parseData
          this.jsonData["house_number"] = localStorage.getItem('house_number');
          this.jsonData["time_stamp"] = parseInt(this.RecordTime.getTime() / 1000);
          console.log("格式化后的json: ", this.jsonData);
        };
        fileReader.readAsBinaryString(file);
        this.$toast.add({ severity: 'info', summary: 'Success', detail: '文件上传成功', life: 3000 });
      }
    },
    PastureCowhouse(event) {
      const file = event.files && event.files[0];
      this.choice = 6;
      if (file) {
        const fileReader = new FileReader();
        fileReader.onload = (e) => {
          const fileContent = e.target.result;
          const workbook = XLSX.read(fileContent, { type: 'binary' });
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 }); // 使用 header 参数
          const parseData = this.ConvertColumnToJson(jsonData); //把列数据转换为json
          this.jsonData = parseData
          this.jsonData["house_number"] = localStorage.getItem('house_number');
          this.jsonData["time_stamp"] = parseInt(this.RecordTime.getTime() / 1000);
          console.log("格式化后的json: ", this.jsonData);
        };
        fileReader.readAsBinaryString(file);
        this.$toast.add({ severity: 'info', summary: 'Success', detail: '文件上传成功', life: 3000 });
      }
    },
    PastureWater(event) {
      const file = event.files && event.files[0];
      this.choice = 3;
      if (file) {
        const fileReader = new FileReader();
        fileReader.onload = (e) => {
          const fileContent = e.target.result;
          const workbook = XLSX.read(fileContent, { type: 'binary' });
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 }); // 使用 header 参数
          const parseData = this.ConvertColumnToJson(jsonData); //把列数据转换为json
          this.jsonData = this.PastureWaterReconstruct(parseData);
          console.log("格式化后的json: ", this.jsonData);
        };
        fileReader.readAsBinaryString(file);
        this.$toast.add({ severity: 'info', summary: 'Success', detail: '文件上传成功', life: 3000 });
      }
    },

    PastureWaterReconstruct(data) {
      const house_number = localStorage.getItem('house_number');
      const time_stamp = parseInt(this.RecordTime.getTime() / 1000);
      let reconstructed = {
        house_number: house_number,
        record_at: time_stamp,
        oap_gci: {},
        tox_index: {},
        micro_index: {},
      };
      for (let key in data) {
        if (key.startsWith('oap_gci')) {
          reconstructed.oap_gci[key] = data[key];
        } else if (key.startsWith('tox_index')) {
          reconstructed.tox_index[key] = data[key];
        } else if (key.startsWith('micro_index')) {
          reconstructed.micro_index[key] = data[key];
        }
      }
      return reconstructed
    },
    ToxinsDatareconstruct(data) {
      const house_number = localStorage.getItem('house_number');
      const time_stamp = parseInt(this.RecordTime.getTime() / 1000);
      let reconstructed = {
        house_number: house_number,
        record_at: time_stamp,
        afb_1: {},
        don: {},
        t_2_toxin: {},
        t_2_vom_zea: {},
      };
      for (let key in data) {
        if (key.startsWith('afb_1')) {
          reconstructed.afb_1[key] = data[key];
        } else if (key.startsWith('don')) {
          reconstructed.don[key] = data[key];
        } else if (key.startsWith('t_2_toxin')) {
          reconstructed.t_2_toxin[key] = data[key];
        } else if (key.startsWith('t_2_a_vom_zea')) {
          reconstructed.t_2_vom_zea[key] = data[key];
        }
      }
      return reconstructed
    },
    upload_residue() {
      this.$router.push({ name: 'upload_pasture_residue' });
    },
    upload_water() {
      this.$router.push({ name: 'upload_pasture_waste_water_perday' });
    },
    upload_odor() {
      this.$router.push({ name: 'upload_pasture_odor' });
    },
    transformDataToTreeFormat(data) {
      let treeData = [];
      // 遍历 JSON 数据的键，如 'as', 'pb', 'cd', 'cr'
      for (let key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key) && typeof data[key] === 'object') {
          let children = [];

          // 遍历子对象的键，如 'as_1', 'as_2', ...
          for (let subKey in data[key]) {
            if (Object.prototype.hasOwnProperty.call(data[key], subKey)) {
              children.push({ name: subKey, value: data[key][subKey] });
            }
          }

          treeData.push({ name: key, children: children });
        }
      }
      this.treeData = treeData;
    },
  },
}
</script>
<style>
.title {
  text-align: center;
  font-size: x-large;
  font-weight: bold;
}
</style>