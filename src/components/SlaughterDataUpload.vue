<template>
  <div class="card grid">
    <div class="col-12 xl:col-12 title">
      <h1>屠宰场数据上传系统</h1>
    </div>
    <div class="col-12">
      <div class=" card" style="height: 50vh; display: flex; flex-direction: column;">
        <div class="grid">
          <TabView style="flex: 1;">
            <TabPanel header="1.水质监控">
              <div class="col-12">
                <FileUpload name="demo[]" url="/api/upload" :customUpload="true"
                            @uploader="Water" accept=".xlsx" :maxFileSize="1000000">
                  <template #empty>
                    <p>请上传水质监控数据文件(.xlsx)</p>
                  </template>
                </FileUpload>
              </div>
              <div class="col-12 button-container" style="display: flex; justify-content: center; margin-top: 20px;">
                <Button :label="lan === 'CN' ? '提交' : 'View Details'" severity="info" @click="submitData" />
              </div>
            </TabPanel>
            <TabPanel header="2.工作服">
              <div class="col-12">
                <FileUpload name="demo[]" url="/api/upload" :customUpload="true"
                            @uploader="Uniform" accept=".xlsx" :maxFileSize="1000000">
                  <template #empty>
                    <p>请上传工作服消毒数据文件(.xlsx)</p>
                  </template>
                </FileUpload>
              </div>
              <div class="col-12 button-container" style="display: flex; justify-content: center; margin-top: 20px;">
                <Toast />
                <Button :label="lan === 'CN' ? '提交' : 'View Details'" severity="info" @click="submitData" />
              </div>
            </TabPanel>
            <TabPanel header="3.屠宰间">
              <div class="col-12">
                <FileUpload name="demo[]" url="/api/upload" :customUpload="true"
                            @uploader="SlaShop" accept=".xlsx" :maxFileSize="1000000">
                  <template #empty>
                    <p>请上屠宰间消毒数据文件(.xlsx)</p>
                  </template>
                </FileUpload>
              </div>
              <div class="col-12 button-container" style="display: flex; justify-content: center; margin-top: 20px;">
                <Button :label="lan === 'CN' ? '提交' : 'View Details'" severity="info" @click="submitData" />
              </div>
            </TabPanel>
            <TabPanel header="4.分割间">
              <div class="col-12">
                <FileUpload name="demo[]" url="/api/upload" :customUpload="true"
                            @uploader="DivShop" accept=".xlsx" :maxFileSize="1000000">
                  <template #empty>
                    <p>请上传分割间消毒数据文件(.xlsx)</p>
                  </template>
                </FileUpload>
              </div>
              <div class="col-12 button-container" style="display: flex; justify-content: center; margin-top: 20px;">
                <Button :label="lan === 'CN' ? '提交' : 'View Details'" severity="info" @click="submitData" />
              </div>
            </TabPanel>
            <TabPanel header="5.排酸间">
              <div class="col-12">
                <FileUpload name="demo[]" url="/api/upload" :customUpload="true"
                            @uploader="AcidShop" accept=".xlsx" :maxFileSize="1000000">
                  <template #empty>
                    <p>请上传排酸间消毒数据文件(.xlsx)</p>
                  </template>
                </FileUpload>
              </div>
              <div class="col-12 button-container" style="display: flex; justify-content: center; margin-top: 20px;">
                <Toast />
                <Button :label="lan === 'CN' ? '提交' : 'View Details'" severity="info" @click="submitData" />
              </div>
            </TabPanel>
            <TabPanel header="6.冷冻间">
              <div class="col-12">
                <FileUpload name="demo[]" url="/api/upload" :customUpload="true"
                            @uploader="FrozenShop" accept=".xlsx" :maxFileSize="1000000">
                  <template #empty>
                    <p>请上传冷冻间消毒数据文件(.xlsx)</p>
                  </template>
                </FileUpload>
              </div>
              <div class="col-12 button-container" style="display: flex; justify-content: center; margin-top: 20px;">
                <Button :label="lan === 'CN' ? '提交' : 'View Details'" severity="info" @click="submitData" />
              </div>
            </TabPanel>
            <TabPanel header="7.预冷间">
              <div class="col-12">
                <FileUpload name="demo[]" url="/api/upload" :customUpload="true"
                            @uploader="PreCool" accept=".xlsx" :maxFileSize="1000000">
                  <template #empty>
                    <p>请上传预冷间消毒数据文件(.xlsx)</p>
                  </template>
                </FileUpload>
              </div>
              <div class="col-12 button-container" style="display: flex; justify-content: center; margin-top: 20px;">
                <Button :label="lan === 'CN' ? '提交' : 'View Details'" severity="info" @click="submitData" />
              </div>
            </TabPanel>
            <TabPanel header="8.光照时间记录">
              <div class="col-12">
                <FileUpload name="demo[]" url="/api/upload" :customUpload="true"
                            @uploader="LightRecord" accept=".xlsx" :maxFileSize="1000000">
                  <template #empty>
                    <p>请上传光照时间数据文件(.xlsx)</p>
                  </template>
                </FileUpload>
              </div>
              <div class="col-12 button-container" style="display: flex; justify-content: center; margin-top: 20px;">
                <Button :label="lan === 'CN' ? '提交' : 'View Details'" severity="info" @click="submitData" />
              </div>
            </TabPanel>
          </TabView>
        </div>
      </div>
    </div>
    <div class="col-12">
      <div class="card">
        <div>
          <TreeTable :value="treeTableData" :expandedRows="expandedRows" @toggle="onRowToggle" :key="id">
            <Column field="key" header="Key" :expander="true"></Column>
            <Column field="value" header="Value"></Column>
          </TreeTable>
        </div>
      </div>
    </div>
    <div class="col-4">
      <div class="card mb-0" style="height: 12vh">
        <Button icon="pi pi-upload" label="屠宰场当日废渣处理" class="p-button-outlined" @click="upload_residue"></Button>
      </div>
    </div>
    <div class="col-4">
      <div class="card mb-0" style="height: 12vh">
        <Button icon="pi pi-upload" label="屠宰场当日恶臭污染处理" class="p-button-outlined" @click="upload_odor"></Button>
      </div>
    </div>
    <div class="col-4">
      <div class="card mb-0" style="height: 12vh">
        <Button icon="pi pi-upload" label="屠宰场当日废水处理" class="p-button-outlined" @click="upload_water"></Button>
      </div>
    </div>
  </div>
</template>


<script>
import axios from "axios";
import * as XLSX from 'xlsx'
import EventBus from "@/AppEventBus";


export default {
  data() {
    return {
      lan: this.$store.state.language,
      flag: true,
      layout: "grid",
      jsonData: null,
      choice: 0,
      treeNodes:[],
      treeTableData:[],
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
  watch:{
    jsonData(newVal){
      this.treeTableData = this.convertToTreeTableFormat(newVal)
      console.log("树表", this.treeTableData)
    }
  },

  methods: {
    onRowToggle(event){
      this.$set(this.expandedRows, event.data.id, event.expanded);
    },

    reconstructData(data){
      let reconstructed = {
        house_number:data.house_number,
        timestamp_record_at:data.timestamp_record_at,
        slaughter_water_micro_index:{},
        oap_gci_sla:{},
        slaughter_toxin_index: {
          slaughter_water_toxin_index: {},
        }
      };
      for(let key in data){
        if(key.startsWith('oap_gci_sla')){
          reconstructed.oap_gci_sla[key] = data[key];
        }else if(key.startsWith('toxin_index_sla')){
          reconstructed.slaughter_toxin_index[key] = data[key];
        }else if(key.startsWith('slaughter_water_micro_index')){
          reconstructed.slaughter_water_micro_index[key] = data[key];
        }else if(key.startsWith('slaughter_water_toxin_index')){
          reconstructed.slaughter_toxin_index.slaughter_water_toxin_index[key] = data[key];
        }
      }
      return reconstructed
    },
    //将一个嵌套json转换成TreeTable可使用的结构
    convertToTreeTableFormat(data, parentKey=''){
      let result = [];
      let nodeId = 0;
      for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          let fullKey = parentKey ? `${parentKey}.${key}` : key;
          let node = {id:nodeId, data: { key: fullKey, value: '' } };
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
      switch (this.choice){
        case 1:
          endpoint = 'http://127.0.0.1:8000/fsims/slaughteroperator/upload/sensor/waterquality';
          break;
        case 2:
          endpoint = 'http://127.0.0.1:8000/fsims/slaughteroperator/upload/staffuniform';
          console.log("此时choice为2")
          break;
        case 3:
          endpoint = 'http://127.0.0.1:8000/fsims/slaughteroperator/upload/sensor/slashop';
          break;
        case 4:
          endpoint = 'http://127.0.0.1:8000/fsims/slaughteroperator/upload/sensor/divshop';
          break;
        case 5:
          endpoint = 'http://127.0.0.1:8000/fsims/slaughteroperator/upload/sensor/acidshop';
          break;
        case 6:
          endpoint = 'http://127.0.0.1:8000/fsims/slaughteroperator/upload/sensor/frozenshop';
          break;
        case 7:
          endpoint = 'http://127.0.0.1:8000/fsims/slaughteroperator/upload/sensor/precoolshop';
          break;
        case 8:
          endpoint = 'http://127.0.0.1:8000/fsims/slaughteroperator/upload/light'
          break;
        default:
          endpoint = ''
      }
      console.log("endpoint", endpoint)
      console.log("formData", JSON.stringify(this.jsonData));
      axios.post(endpoint, JSON.stringify(this.jsonData), {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => {

        if (res.data.statusCode === 200) {
          this.$toast.add({severity: 'success', summary: 'Upload Successfully', detail: '数据上传成功', life: 3000});
        } else {
          this.$toast.add({severity: 'error', summary: '上传失败', detail: res.data.message, life: 3000});
        }
      }).catch(error => {
        console.error('发送数据时出现错误', error);
      })
    },
    upload_residue() {
      this.$router.push({name: 'upload_slaughter_residue'});
    },
    upload_water() {
      this.$router.push({name: 'upload_slaughter_water'});
    },
    upload_odor() {
      this.$router.push({name: 'upload_slaughter_odor'});
    },


    parseExcelToJsonWater(rawData){
      return rawData.map(row => ({
        house_number: row.HouseNumber,
        timestamp_record_at: row.TimestampRecordAt,
        oap_gci_sla: this.parseElementInfoToxin(row, 'OapGciSla'),
        slaughter_toxin_index: this.parseElementInfoToxin(row, 'ToxIndex'),
        slaughter_water_micro_index: this.parseElementInfoToxin(row, 'SlaughterWaterToxinIndex'),
      }));
    },

    ConvertColumnToJson(rawData){
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
    PreCool(event){
      const file = event.files && event.files[0];
      this.choice = 7;
      if(file){
        const fileReader = new FileReader();
        fileReader.onload = (e) => {
          const fileContent = e.target.result;
          const workbook = XLSX.read(fileContent, {type: 'binary'});
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(sheet, {header: 1}); // 使用 header 参数
          const parseData = this.ConvertColumnToJson(jsonData); //把列数据转换为json
          this.jsonData = parseData
          console.log("格式化后的json: ", this.jsonData);
        };
        fileReader.readAsBinaryString(file);
        this.$toast.add({severity: 'info', summary: 'Success', detail: '文件上传成功', life: 3000});
      }
    },

    AcidShop(event){
      const file = event.files && event.files[0];
      this.choice = 5;
      if(file){
        const fileReader = new FileReader();
        fileReader.onload = (e) => {
          const fileContent = e.target.result;
          const workbook = XLSX.read(fileContent, {type: 'binary'});
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(sheet, {header: 1}); // 使用 header 参数
          const parseData = this.ConvertColumnToJson(jsonData); //把列数据转换为json
          this.jsonData = parseData
          console.log("格式化后的json: ", this.jsonData);
        };
        fileReader.readAsBinaryString(file);
        this.$toast.add({severity: 'info', summary: 'Success', detail: '文件上传成功', life: 3000});
      }
    },

    FrozenShop(event){
      const file = event.files && event.files[0];
      this.choice = 6;
      if(file){
        const fileReader = new FileReader();
        fileReader.onload = (e) => {
          const fileContent = e.target.result;
          const workbook = XLSX.read(fileContent, {type: 'binary'});
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(sheet, {header: 1}); // 使用 header 参数
          const parseData = this.ConvertColumnToJson(jsonData); //把列数据转换为json
          this.jsonData = parseData
          console.log("格式化后的json: ", this.jsonData);
        };
        fileReader.readAsBinaryString(file);
        this.$toast.add({severity: 'info', summary: 'Success', detail: '文件上传成功', life: 3000});
      }
    },

    DivShop(event){
      const file = event.files && event.files[0];
      this.choice = 4;
      if(file){
        const fileReader = new FileReader();
        fileReader.onload = (e) => {
          const fileContent = e.target.result;
          const workbook = XLSX.read(fileContent, {type: 'binary'});
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(sheet, {header: 1}); // 使用 header 参数
          const parseData = this.ConvertColumnToJson(jsonData); //把列数据转换为json
          this.jsonData = parseData
          console.log("格式化后的json: ", this.jsonData);
        };
        fileReader.readAsBinaryString(file);
        this.$toast.add({severity: 'info', summary: 'Success', detail: '文件上传成功', life: 3000});
      }
    },

    LightRecord(event){
      const file = event.files && event.files[0];
      this.choice = 8;
      if(file){
        const fileReader = new FileReader();
        fileReader.onload = (e) => {
          const fileContent = e.target.result;
          const workbook = XLSX.read(fileContent, {type: 'binary'});
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(sheet, {header: 1}); // 使用 header 参数
          const parseData = this.ConvertColumnToJson(jsonData); //把列数据转换为json
          this.jsonData = parseData
          console.log("格式化后的json: ", this.jsonData);
        };
        fileReader.readAsBinaryString(file);
        this.$toast.add({severity: 'info', summary: 'Success', detail: '文件上传成功', life: 3000});
      }
    },
    SlaShop(event){
      const file = event.files && event.files[0];
      this.choice = 3;
      if(file){
        const fileReader = new FileReader();
        fileReader.onload = (e) => {
          const fileContent = e.target.result;
          const workbook = XLSX.read(fileContent, {type: 'binary'});
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(sheet, {header: 1}); // 使用 header 参数
          const parseData = this.ConvertColumnToJson(jsonData); //把列数据转换为json
          this.jsonData = parseData
          console.log("格式化后的json: ", this.jsonData);
        };
        fileReader.readAsBinaryString(file);
        this.$toast.add({severity: 'info', summary: 'Success', detail: '文件上传成功', life: 3000});
      }
    },

    Uniform(event){
      const file = event.files && event.files[0];
      this.choice = 2;
      if(file){
        const fileReader = new FileReader();
        fileReader.onload = (e) => {
          const fileContent = e.target.result;
          const workbook = XLSX.read(fileContent, {type: 'binary'});
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(sheet, {header: 1}); // 使用 header 参数
          const parseData = this.ConvertColumnToJson(jsonData); //把列数据转换为json
          this.jsonData = parseData
          console.log("格式化后的json: ", this.jsonData);
        };
        fileReader.readAsBinaryString(file);
        this.$toast.add({severity: 'info', summary: 'Success', detail: '文件上传成功', life: 3000});
      }
    },
    // 水质监控数据上传
    // WaterMonitorUpload(event){
    //   const file = event.files && event.files[0];
    //   this.choice = 1;
    //   if (file) {
    //     const fileReader = new FileReader();
    //     fileReader.onload = (e) => {
    //       const fileContent = e.target.result;
    //       const workbook = XLSX.read(fileContent, {type: 'binary'});
    //       const sheetName = workbook.SheetNames[0];
    //       const sheet = workbook.Sheets[sheetName];
    //
    //       const jsonData = XLSX.utils.sheet_to_json(sheet, {header: 1}); // 使用 header 参数
    //       console.log("XLSX.utils.sheet_to_json(sheet, {header: 1})", jsonData)
    //       const parseData = this.parseExcelToJsonTestByRow(jsonData);
    //       console.log("this.parseExcelToJsonTestByRow(jsonData)", parseData)
    //
    //       this.jsonData = this.parseExcelToJsonByRowTest(parseData);
    //       console.log("解析成树表", this.jsonData);
    //     };
    //     fileReader.readAsBinaryString(file);
    //     this.$toast.add({severity: 'info', summary: 'Success', detail: '文件上传成功', life: 3000});
    //   }
    // },
    Water(event){
      const file = event.files && event.files[0];
      this.choice = 1;
      if(file){
        const fileReader = new FileReader();
        fileReader.onload = (e) => {
          const fileContent = e.target.result;
          const workbook = XLSX.read(fileContent, {type: 'binary'});
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(sheet, {header: 1}); // 使用 header 参数
          const parseData = this.ConvertColumnToJson(jsonData); //把列数据转换为json
          this.jsonData = this.reconstructData(parseData)
          console.log("格式化后的json: ", this.jsonData.slaughter_toxin_index.slaughter_water_toxin_index);
        };
        fileReader.readAsBinaryString(file);
        this.$toast.add({severity: 'info', summary: 'Success', detail: '文件上传成功', life: 3000});
      }
    },
    BigToSmall(row, element){
      let elementInfo = {};
      for (let key in row) {
        console.log("键名为：", key)
        if (key.match(new RegExp(`^${element}\\d+$`, 'i'))) {
          // 将键名转换为小写，并在除开头字母外的所有大写字母和数字前添加下划线
          let subField = key
              .replace(/[A-Z\d]+/g, (match, offset) =>
                  offset > 0 ? `_${match.toLowerCase()}` : match.toLowerCase());
          elementInfo[subField] = row[key];
          console.log("解析之后的键:", subField)
        }
      }
      return elementInfo;
    },

    KeyNameFormatting(rawData){
      return {
        house_number: rawData.HouseNumber,
        record_at: rawData.RecordAt,
        slaughter_water_micro_index: this.parseElementInfoToxin(rawData, 'SlaughterWaterMicroIndex'),
        oap_gci_sla: this.parseElementInfoToxin(rawData, 'OapGciSla'),
        slaughter_toxin_index: this.parseElementInfoToxin(rawData, 'ToxinIndexSla'),
      };
    },


    parseElementInfo(row, element) {
      let elementInfo = {}
      for (let key in row) {
        if (key.match(new RegExp(`^${element}\\d+$`, 'i'))) {
          // 将键名转换为小写，然后用下划线替换数字前的部分
          let subField = key.toLowerCase().replace(new RegExp(`^${element}(\\d+)$`, 'i'), (match, p1) => `${element.toLowerCase()}_${p1}`);
          elementInfo[subField] = row[key];
        }
      }
      return elementInfo
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