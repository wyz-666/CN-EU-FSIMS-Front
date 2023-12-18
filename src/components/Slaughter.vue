<template>
    <div class="grid">
        <div class="col-12">
            <div class="card md-0">
                <div class="grid">
                    <div class="col-12">
                        <div class="col-12 xl:col-12">
                            <p v-if="lan == 'CN'" style="font-size: xx-large;font-weight: bold;text-align: center;">环境监测</p>
                            <p v-else style="font-size: large;font-weight: bold;text-align: center;">Environmental monitoring</p>
                        </div>
                    </div>
                       <div class="col-12 xl:col-3">
                        <div class="card mb-0 ">
                            <div class="grid">
                                <div class="col-4">
                                    <div class="lable_title">
                                        <span v-if="lan == 'CN'">预冷间</span>
                                        <span v-else>Cooling room</span>
                                    </div>
                                </div>
                                <div class="col-4">
                                    <div class="lable_text">
                                        <span class="lable_text">10°</span>
                                    </div>
                                </div>
                                <div class="col-4">
                                    <div class="lable_status">
                                        <span v-if="lan == 'CN'" class="lable_status" style="">正常</span>
                                        <span v-else class="lable_status" style="">Normal</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                       </div>
                    <div class="col-12 xl:col-3">
                        <div class="card mb-0 ">
                            <div class="grid">
                                <div class="col-4">
                                    <div class="lable_title">
                                        <span v-if="lan == 'CN'">冷却间</span>
                                        <span v-else>Cooling room</span>
                                    </div>
                                </div>
                                <div class="col-4">
                                    <div class="lable_text">
                                        <span class="lable_text">2°</span>
                                    </div>
                                </div>
                                <div class="col-4">
                                    <div class="lable_status">
                                        <span v-if="lan == 'CN'" class="lable_status" style="">正常</span>
                                        <span v-else class="lable_status" style="">Normal</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-12 xl:col-3">
                        <div class="card mb-0 ">
                            <div class="grid">
                                <div class="col-4">
                                    <div class="lable_title">
                                        <span v-if="lan == 'CN'">冷藏库</span>
                                        <span v-else>Cold storage</span>
                                    </div>
                                </div>
                                <div class="col-4">
                                    <div class="lable_text">
                                        <span class="lable_text">-18°</span>
                                    </div>
                                </div>
                                <div class="col-4">
                                    <div class="lable_status">
                                        <span v-if="lan == 'CN'" class="lable_status" style="">正常</span>
                                        <span v-else class="lable_status" style="">Normal</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-12 xl:col-3">
                        <div class="card mb-0 ">
                            <div class="grid">
                                <div class="col-4">
                                    <div class="lable_title">
                                        <span v-if="lan == 'CN'">冷冻库</span>
                                        <span v-else>Freezer room</span>
                                    </div>
                                </div>
                                <div class="col-4">
                                    <div class="lable_text">
                                        <span class="lable_text">-28°</span>
                                    </div>
                                </div>
                                <div class="col-4">
                                    <div class="lable_status">
                                        <span v-if="lan == 'CN'" class="lable_status" style="">正常</span>
                                        <span v-else class="lable_status" style="">Normal</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-12 xl:col-12">
                        <div class="grid">
                            <div class="col-12">
                                <div class="card md-0">
                                    <div class="grid">
                                        <div class="col-1">
                                            <div style="height: 10vh;">
                                                <div class="lable_title" style="margin-top: 30%;">
                                                    <span v-if="lan == 'CN'">屠宰间</span>
                                                    <span v-else>slaughterhouse</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-11">
                                            <!-- <div class="card md-0" style="height: 15vh;"> -->
                                                <DataTable :value="slaughterhouse" scrollable>
                                                  <Column field="temperature" :header="lan === 'CN' ? '温度' : 'Temperature'" bodyStyle="font-weight: bold; font-size: x-large;"></Column>
                                                  <Column field="humidity" :header="lan === 'CN' ? '湿度' : 'Humidity'" bodyStyle="font-weight: bold; font-size: x-large;"></Column>
                                                  <Column field="oxygen" :header="lan === 'CN' ? '奥氧浓度' : 'Oxygen Concentration'" bodyStyle="font-weight: bold; font-size: x-large;"></Column>
                                                  <Column field="uv" :header="lan === 'CN' ? '紫外灭菌强度' : 'UV Sterilization Intensity'" bodyStyle="font-weight: bold; font-size: x-large;"></Column>
                                                  <Column field="brightness" :header="lan === 'CN' ? '亮度' : 'Brightness'" bodyStyle="font-weight: bold; font-size: x-large;"></Column>
                                                  <Column field="water" :header="lan === 'CN' ? '积水情况' : 'Water Logging'" bodyStyle="font-weight: bold; font-size: x-large; color: green;"></Column>
                                                  <Column field="use" :header="lan === 'CN' ? '使用情况' : 'Usage'" bodyStyle="font-weight: bold; font-size: x-large; color: green;"></Column>
                                                </DataTable>
                                            <!-- </div> -->

                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div class="col-12">
                        <div class="card mb-0">
                            <div class="grid">
                                <div class="col-12">
                                    <p v-if="lan == 'CN'" style="text-align: center;font-size: x-large;font-weight: bold;">屠宰用水质量监测</p>
                                    <p v-else style="text-align: center;font-size: x-large;font-weight: bold;">Slaughter water quality monitoring</p>
                                </div>

                                
                            
                                <div class="col">
                                    <div class="card md-0">
                                        <div>
                                            <p v-if="lan == 'CN'" style="font-weight: 800;font-size: large;text-align: center;">
                                                感官性状以及一般化学指标
                                            </p>
                                            <p v-else style="font-weight: 800;font-size: large;text-align: center;">
                                              Sensory properties and general chemical indicators
                                            </p>
                                            <div>
                                                <div style="position: relative;">
                                                    <div>
                                                        <div  style="display: inline-block; height: 10px;width: 10px;background-color: blue;border-radius: 3px; " > </div>
                                                        <p v-if="lan == 'CN'" style = "display: inline;margin: 10px;font-size: 20px;">色度</p>
                                                        <p v-else style = "display: inline;margin: 10px;font-size: 20px;">Chroma</p>
                                                        <p style = "display: inline; margin-left: 20px;font-size: 20px;">40</p>
                                                    </div>
                                                    <ProgressBar  :value="40" style=" position: absolute;top: 30%; right: 10px; width: 200px;"  > 40% </ProgressBar>
                                                </div>
                                                <div style="position: relative;">
                                                    <div>
                                                        <div  style="display: inline-block; height: 10px;width: 10px;background-color: blue;border-radius: 3px; " > </div>
                                                        <p v-if="lan == 'CN'" style = "display: inline;margin: 10px;font-size: 20px;">浑浊度</p>
                                                        <p v-else style = "display: inline;margin: 10px;font-size: 20px;">Turbidity</p>
                                                        <p style = "display: inline;font-size: 20px;">20</p>
                                                    </div>
                                                    <ProgressBar  :value="20" style=" position: absolute;top: 30%; right: 10px; width: 200px;"  > 20% </ProgressBar>
                                                </div>
                                                <div style="position: relative;">
                                                    <div>
                                                        <div  style="display: inline-block; height: 10px;width: 10px;background-color: blue;border-radius: 3px; " > </div>
                                                        <p v-if="lan == 'CN'" style = "display: inline;margin: 10px;font-size: 20px;">氯化物</p>
                                                        <p v-else style = "display: inline;margin: 10px;font-size: 20px;">chloride</p>
                                                        <p style = "display: inline; font-size: 20px;">10</p>
                                                    </div>
                                                    <ProgressBar  :value="10" style=" position: absolute;top: 30%; right: 10px; width: 200px;"  > 10% </ProgressBar>
                                                </div>
                                                <div style="position: relative;">
                                                    <div>
                                                        <div  style="display: inline-block; height: 10px;width: 10px;background-color: blue;border-radius: 3px; " > </div>
                                                        <p v-if="lan == 'CN'" style = "display: inline;margin: 10px;font-size: 20px;">铁</p>
                                                        <p v-else style = "display: inline;margin: 10px;font-size: 20px;">Iron</p>
                                                        <p style = "display: inline; margin-left: 40px;font-size: 20px;">60</p>
                                                    </div>
                                                    <ProgressBar  :value="60" style=" position: absolute;top: 30%; right: 10px; width: 200px;"  > 60% </ProgressBar>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="card md-0">
                                        <div>
                                            <p v-if="lan == 'CN'" style="font-weight: 800;font-size: large;text-align: center;">
                                                毒理学指标
                                            </p>
                                            <p v-else style="font-weight: 800;font-size: large;text-align: center;">
                                              Toxicological indicators
                                            </p>
                                            <!-- <p style="font-weight: 800;font-size: large;color: red;text-align: center;">
                                                氟化物超标
                                            </p> -->
                                            <div>
                                                <div style="position: relative;">
                                                    <div>
                                                        <div  style="display: inline-block; height: 10px;width: 10px;background-color: blue;border-radius: 3px; " > </div>
                                                        <p v-if="lan == 'CN'" style = "display: inline;margin: 10px;font-size: 20px;">砷</p>
                                                        <p v-else style = "display: inline;margin: 10px;font-size: 20px;">arsenic</p>
                                                        <p style = "display: inline; margin-left: 40px;font-size: 20px;">50</p>
                                                    </div>
                                                    <ProgressBar  :value="50" style=" position: absolute;top: 30%; right: 10px; width: 200px;"  > 50% </ProgressBar>
                                                </div>
                                                <div style="position: relative;">
                                                    <div>
                                                        <div  style="display: inline-block; height: 10px;width: 10px;background-color: blue;border-radius: 3px; " > </div>
                                                        <p v-if="lan == 'CN'" style = "display: inline;margin: 10px;font-size: 20px;">氰化物</p>
                                                        <p v-else style = "display: inline;margin: 10px;font-size: 20px;">cyanide</p>
                                                        <p style = "display: inline;font-size: 20px;">25</p>
                                                    </div>
                                                    <ProgressBar  :value="25" style=" position: absolute;top: 30%; right: 10px; width: 200px;"  > 25% </ProgressBar>
                                                </div>
                                                <div style="position: relative;">
                                                    <div>
                                                        <div  style="display: inline-block; height: 10px;width: 10px;background-color: blue;border-radius: 3px; " > </div>
                                                        <p v-if="lan == 'CN'" style = "display: inline;margin: 10px;font-size: 20px;">氯酸盐</p>
                                                        <p v-else style = "display: inline;margin: 10px;font-size: 20px;">Chlorate</p>
                                                        <p style = "display: inline; font-size: 20px;">40</p>
                                                    </div>
                                                    <ProgressBar  :value="40" style=" position: absolute;top: 30%; right: 10px; width: 200px;"  > 40% </ProgressBar>
                                                </div>
                                                <div style="position: relative;">
                                                    <div>
                                                        <div  style="display: inline-block; height: 10px;width: 10px;background-color: blue;border-radius: 3px; " > </div>
                                                        <p v-if="lan == 'CN'" style = "display: inline;margin: 10px;font-size: 20px;">硝酸钾</p>
                                                        <p v-else style = "display: inline;margin: 10px;font-size: 20px;">Potassium nitrate</p>
                                                        <p style = "display: inline; margin-left: 0px;font-size: 20px;">70</p>
                                                    </div>
                                                    <ProgressBar  :value="70" style=" position: absolute;top: 30%; right: 10px; width: 200px;"  > 70% </ProgressBar>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="card md-0">
                                        <div>
                                            <p v-if="lan == 'CN'" style="font-weight: 800;font-size: large;text-align: center;">
                                                微生物指标
                                            </p>
                                            <p v-else style="font-weight: 800;font-size: large;text-align: center;">
                                              microbial indicators
                                            </p>
                                            <div>
                                                <div style="position: relative;">
                                                    <div>
                                                        <div  style="display: inline-block; height: 10px;width: 10px;background-color: blue;border-radius: 3px; " > </div>
                                                        <p v-if="lan == 'CN'" style = "display: inline;margin: 10px;font-size: 20px;">菌落总数</p>
                                                        <p v-else style = "display: inline;margin: 10px;font-size: 20px;">Total number of colonies</p>
                                                        <p style = "display: inline; margin-left: 20px;font-size: 20px;">40</p>
                                                    </div>
                                                    <ProgressBar  :value="40" style=" position: absolute;top: 30%; right: 10px; width: 200px;"  > {{ value }}/100 </ProgressBar>
                                                </div>
                                                <div style="position: relative;">
                                                    <div>
                                                        <div  style="display: inline-block; height: 10px;width: 10px;background-color: blue;border-radius: 3px; " > </div>
                                                        <p v-if="lan == 'CN'" style = "display: inline;margin: 10px;font-size: 20px;">大肠杆菌数</p>
                                                        <p v-else style = "display: inline;margin: 10px;font-size: 20px;">coli count</p>
                                                        <p style = "display: inline;font-size: 20px;">5</p>
                                                    </div>
                                                    <ProgressBar  :value="20" style=" position: absolute;top: 30%; right: 10px; width: 200px;"  > 5/25 </ProgressBar>
                                                </div>
                                                <div style="position: relative;">
                                                    <div>
                                                        <div  style="display: inline-block; height: 10px;width: 10px;background-color: blue;border-radius: 3px; " > </div>
                                                        <p v-if="lan == 'CN'" style = "display: inline;margin: 10px;font-size: 20px;">大肠埃希氏菌</p>
                                                        <p v-else style = "display: inline;margin: 10px;font-size: 20px;">Escherichia coli</p>
                                                        <p v-if="lan == 'CN'" style = "display: inline;margin: 10px;font-size: 20px;">大肠杆菌数</p>
                                                        <p v-else style = "display: inline;margin: 10px;font-size: 20px;">coli count</p>
                                                        <p style = "display: inline; font-size: 20px;">40</p>
                                                    </div>
                                                    <ProgressBar  :value="40" style=" position: absolute;top: 30%; right: 10px; width: 200px;"  > {{ value }}/100 </ProgressBar>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>




        <div class="col-12">
            <div class="card md-0">
                <div class="grid">
                    <div class="col-12 xl:col-12">
                        <p v-if="lan == 'CN'" style="font-size: xx-large;font-weight: bold;text-align: center;">屠宰过程监测</p>
                        <p v-else style="font-size: xx-large;font-weight: bold;text-align: center;">Slaughter process monitoring</p>
                    </div>
                    <div class="col-4">
                        <div class="card mb-0 ">
                            <div style="font-weight: 800;font-size: large;text-align: center;margin-bottom: 2%;">
                                <span v-if="lan == 'CN'">工人总数</span>
                                <span v-else>total number of workers</span>
                            </div>
                            <div class="lable_text">
                                <span class="lable_text">37</span>
                            </div>
                        </div>
                    </div>
                    <div class="col-4">
                        <div class="card mb-0 ">
                            <div style="font-weight: 800;font-size: large;text-align: center;margin-bottom: 2%;">
                                <span v-if="lan == 'CN'">洁净区工人数</span>
                                <span v-else>Number of workers in clean area</span>
                            </div>
                            <div class="lable_text">
                                <span class="lable_text">16</span>
                            </div>
                        </div>
                    </div>
                    <div class="col-4">
                        <div class="card mb-0">
                            <div style="font-weight: 800;font-size: large;text-align: center;margin-bottom: 2%;">
                                <span v-if="lan == 'CN'">非洁净区工人数</span>
                                <span v-else>Number of workers in non-clean areas</span>
                            </div>
                            <div class="lable_text">
                                <span class="lable_text">21</span>
                            </div>
                        </div>
                    </div>

                    <div class="col-12">
                        <div class="card" style="height: 65vh">
                            <div class="flex mb-2 gap-2 justify-content-end">
                                <Button @click="active = 0" rounded label="1" class="w-2rem h-2rem p-0"
                                    :outlined="active !== 0" />
                                <Button @click="active = 0" rounded label="2" class="w-2rem h-2rem p-0"
                                    :outlined="active !== 1" />
                                <Button @click="active = 0" rounded label="3" class="w-2rem h-2rem p-0"
                                    :outlined="active !== 2" />
                                <Button @click="active = 0" rounded label="4" class="w-2rem h-2rem p-0"
                                    :outlined="active !== 0" />
                                <Button @click="active = 0" rounded label="5" class="w-2rem h-2rem p-0"
                                    :outlined="active !== 1" />
                                <Button @click="active = 0" rounded label="6" class="w-2rem h-2rem p-0"
                                    :outlined="active !== 2" />
                                <Button @click="active = 0" rounded label="7" class="w-2rem h-2rem p-0"
                                    :outlined="active !== 0" />
                                <Button @click="active = 0" rounded label="8" class="w-2rem h-2rem p-0"
                                    :outlined="active !== 1" />
                                <Button @click="active = 0" rounded label="9" class="w-2rem h-2rem p-0"
                                    :outlined="active !== 2" />
                                <Button @click="active = 0" rounded label="10" class="w-2rem h-2rem p-0"
                                    :outlined="active !== 0" />
                                <Button @click="active = 0" rounded label="11" class="w-2rem h-2rem p-0"
                                    :outlined="active !== 1" />
                            </div>

                            <TabView>
                              <TabPanel :header="lan === 'CN' ? '1. 击晕' : '1. Stunning'">
                                <DataTable :value="slaughterData" scrollable scrollHeight="50vh" tableStyle="min-width: 30rem">
                                  <Column field="batch_id" :header="lan === 'CN' ? '屠宰批次' : 'Slaughter Batch'"></Column>
                                  <Column field="type" :header="lan === 'CN' ? '动物种类' : 'Animal Type'"></Column>
                                  <Column field="number" :header="lan === 'CN' ? '数量' : 'Number'"></Column>
                                  <Column field="methoad" :header="lan === 'CN' ? '处理方式' : 'Method'"></Column>
                                  <Column field="woker_id" :header="lan === 'CN' ? '工人编号' : 'Worker ID'"></Column>
                                  <Column field="house_id" :header="lan === 'CN' ? '屠宰间编号' : 'Slaughterhouse Number'"></Column>
                                  <Column field="date" :header="lan === 'CN' ? '时间' : 'Date'"></Column>
                                  <Column :header="lan === 'CN' ? '监测状态' : 'Monitoring Status'" headerStyle="width: 10rem">
                                    <template #body>
                                      <div class="flex flex-wrap gap-2">
                                        <Tag class="mr-2" severity="success" value="lan === 'CN' ? '正常' : 'Normal'"></Tag>
                                      </div>
                                    </template>
                                  </Column>
                                </DataTable>
                              </TabPanel>
                                <TabPanel :header="lan === 'CN' ? '2. 放血' : '2. Bleeding'">
                                  <DataTable :value="slaughterData" scrollable scrollHeight="400px" tableStyle="min-width: 30rem">
                                    <Column field="id" :header="lan === 'CN' ? '产品批次' : 'Product Batch'"></Column>
                                    <Column field="type" :header="lan === 'CN' ? '包装方式' : 'Packing Method'"></Column>
                                    <Column field="date" :header="lan === 'CN' ? '包装时间' : 'Packing Time'"></Column>
                                    <Column :header="lan === 'CN' ? '监测状态' : 'Monitoring Status'" headerStyle="width: 10rem">
                                      <template #body>
                                        <div class="flex flex-wrap gap-2">
                                          <Tag class="mr-2" severity="success" :value="lan === 'CN' ? '正常' : 'Normal'"></Tag>
                                        </div>
                                      </template>
                                    </Column>
                                    <Column :exportable="false" style="min-width:8rem">
                                      <template #body="slotProps">
                                        <Button :label="lan === 'CN' ? '查看详情' : 'View Details'" severity="info" text
                                                @click="editProduct(slotProps.data)" />
                                      </template>
                                    </Column>
                                  </DataTable>
                                </TabPanel>
                              <TabPanel :header="lan === 'CN' ? '3. 沥血' : '3. Blood Draining'">
                                <DataTable :value="slaughterData" scrollable scrollHeight="400px" tableStyle="min-width: 30rem">
                                  <Column field="id" :header="lan === 'CN' ? '产品批次' : 'Product Batch'"></Column>
                                  <Column field="type" :header="lan === 'CN' ? '包装方式' : 'Packing Method'"></Column>
                                  <Column field="date" :header="lan === 'CN' ? '包装时间' : 'Packing Time'"></Column>
                                  <Column :header="lan === 'CN' ? '监测状态' : 'Monitoring Status'" headerStyle="width: 10rem">
                                    <template #body>
                                      <div class="flex flex-wrap gap-2">
                                        <Tag class="mr-2" severity="success" :value="lan === 'CN' ? '正常' : 'Normal'"></Tag>
                                      </div>
                                    </template>
                                  </Column>
                                  <Column :exportable="false" style="min-width:8rem">
                                    <template #body="slotProps">
                                      <Button :label="lan === 'CN' ? '查看详情' : 'View Details'" severity="info" text
                                              @click="editProduct(slotProps.data)" />
                                    </template>
                                  </Column>
                                </DataTable>
                              </TabPanel>
                              <TabPanel :header="lan === 'CN' ? '4. 电刺激' : '4. Electrical Stimulation'">
                                <DataTable :value="slaughterData" scrollable scrollHeight="400px" tableStyle="min-width: 30rem">
                                  <Column field="id" :header="lan === 'CN' ? '产品批次' : 'Product Batch'"></Column>
                                  <Column field="type" :header="lan === 'CN' ? '包装方式' : 'Packing Method'"></Column>
                                  <Column field="date" :header="lan === 'CN' ? '包装时间' : 'Packing Time'"></Column>
                                  <Column :header="lan === 'CN' ? '监测状态' : 'Monitoring Status'" headerStyle="width: 10rem">
                                    <template #body>
                                      <div class="flex flex-wrap gap-2">
                                        <Tag class="mr-2" severity="success" :value="lan === 'CN' ? '正常' : 'Normal'"></Tag>
                                      </div>
                                    </template>
                                  </Column>
                                  <Column :exportable="false" style="min-width:8rem">
                                    <template #body="slotProps">
                                      <Button :label="lan === 'CN' ? '查看详情' : 'View Details'" severity="info" text
                                              @click="editProduct(slotProps.data)" />
                                    </template>
                                  </Column>
                                </DataTable>
                              </TabPanel>
                              <TabPanel :header="lan === 'CN' ? '5. 胴体处理' : '5. Carcass Processing'">
                                <DataTable :value="slaughterData" scrollable scrollHeight="400px" tableStyle="min-width: 30rem">
                                  <Column field="id" :header="lan === 'CN' ? '产品批次' : 'Product Batch'"></Column>
                                  <Column field="type" :header="lan === 'CN' ? '包装方式' : 'Packing Method'"></Column>
                                  <Column field="date" :header="lan === 'CN' ? '包装时间' : 'Packing Time'"></Column>
                                  <Column :header="lan === 'CN' ? '监测状态' : 'Monitoring Status'" headerStyle="width: 10rem">
                                    <template #body>
                                      <div class="flex flex-wrap gap-2">
                                        <Tag class="mr-2" severity="success" :value="lan === 'CN' ? '正常' : 'Normal'"></Tag>
                                      </div>
                                    </template>
                                  </Column>
                                  <Column :exportable="false" style="min-width:8rem">
                                    <template #body="slotProps">
                                      <Button :label="lan === 'CN' ? '查看详情' : 'View Details'" severity="info" text
                                              @click="editProduct(slotProps.data)" />
                                    </template>
                                  </Column>
                                </DataTable>
                              </TabPanel>
                              <TabPanel :header="lan === 'CN' ? '6. 屠幸检疫' : '6. Slaughter Quarantine'">
                                <DataTable :value="slaughterData" scrollable scrollHeight="400px" tableStyle="min-width: 30rem">
                                  <Column field="id" :header="lan === 'CN' ? '产品批次' : 'Product Batch'"></Column>
                                  <Column field="type" :header="lan === 'CN' ? '包装方式' : 'Packing Method'"></Column>
                                  <Column field="date" :header="lan === 'CN' ? '包装时间' : 'Packing Time'"></Column>
                                  <Column :header="lan === 'CN' ? '监测状态' : 'Monitoring Status'" headerStyle="width: 10rem">
                                    <template #body>
                                      <div class="flex flex-wrap gap-2">
                                        <Tag class="mr-2" severity="success" :value="lan === 'CN' ? '正常' : 'Normal'"></Tag>
                                      </div>
                                    </template>
                                  </Column>
                                  <Column :exportable="false" style="min-width:8rem">
                                    <template #body="slotProps">
                                      <Button :label="lan === 'CN' ? '查看详情' : 'View Details'" severity="info" text
                                              @click="editProduct(slotProps.data)" />
                                    </template>
                                  </Column>
                                </DataTable>
                              </TabPanel>

                              <TabPanel :header="lan === 'CN' ? '7. 胴体喷淋' : '7. Carcass Spraying'">
                                <DataTable :value="slaughterData" scrollable scrollHeight="400px" tableStyle="min-width: 30rem">
                                  <Column field="id" :header="lan === 'CN' ? '产品批次' : 'Product Batch'"></Column>
                                  <Column field="type" :header="lan === 'CN' ? '包装方式' : 'Packing Method'"></Column>
                                  <Column field="date" :header="lan === 'CN' ? '包装时间' : 'Packing Time'"></Column>
                                  <Column :header="lan === 'CN' ? '监测状态' : 'Monitoring Status'" headerStyle="width: 10rem">
                                    <template #body>
                                      <div class="flex flex-wrap gap-2">
                                        <Tag class="mr-2" severity="success" :value="lan === 'CN' ? '正常' : 'Normal'"></Tag>
                                      </div>
                                    </template>
                                  </Column>
                                  <Column :exportable="false" style="min-width:8rem">
                                    <template #body="slotProps">
                                      <Button :label="lan === 'CN' ? '查看详情' : 'View Details'" severity="info" text
                                              @click="editProduct(slotProps.data)" />
                                    </template>
                                  </Column>
                                </DataTable>
                              </TabPanel>
                              <TabPanel :header="lan === 'CN' ? '8. 胴体预冷' : '8. Carcass Pre-Cooling'">
                                <DataTable :value="slaughterData" scrollable scrollHeight="400px" tableStyle="min-width: 30rem">
                                  <Column field="id" :header="lan === 'CN' ? '产品批次' : 'Product Batch'"></Column>
                                  <Column field="type" :header="lan === 'CN' ? '包装方式' : 'Packing Method'"></Column>
                                  <Column field="date" :header="lan === 'CN' ? '包装时间' : 'Packing Time'"></Column>
                                  <Column :header="lan === 'CN' ? '监测状态' : 'Monitoring Status'" headerStyle="width: 10rem">
                                    <template #body>
                                      <div class="flex flex-wrap gap-2">
                                        <Tag class="mr-2" severity="success" :value="lan === 'CN' ? '正常' : 'Normal'"></Tag>
                                      </div>
                                    </template>
                                  </Column>
                                  <Column :exportable="false" style="min-width:8rem">
                                    <template #body="slotProps">
                                      <Button :label="lan === 'CN' ? '查看详情' : 'View Details'" severity="info" text
                                              @click="editProduct(slotProps.data)" />
                                    </template>
                                  </Column>
                                </DataTable>
                              </TabPanel>
                              <TabPanel :header="lan === 'CN' ? '9. 胴体冷却' : '9. Carcass Cooling'">
                                <DataTable :value="slaughterData" scrollable scrollHeight="400px" tableStyle="min-width: 30rem">
                                  <Column field="id" :header="lan === 'CN' ? '产品批次' : 'Product Batch'"></Column>
                                  <Column field="type" :header="lan === 'CN' ? '包装方式' : 'Packing Method'"></Column>
                                  <Column field="date" :header="lan === 'CN' ? '包装时间' : 'Packing Time'"></Column>
                                  <Column :header="lan === 'CN' ? '监测状态' : 'Monitoring Status'" headerStyle="width: 10rem">
                                    <template #body>
                                      <div class="flex flex-wrap gap-2">
                                        <Tag class="mr-2" severity="success" :value="lan === 'CN' ? '正常' : 'Normal'"></Tag>
                                      </div>
                                    </template>
                                  </Column>
                                  <Column :exportable="false" style="min-width:8rem">
                                    <template #body="slotProps">
                                      <Button :label="lan === 'CN' ? '查看详情' : 'View Details'" severity="info" text
                                              @click="editProduct(slotProps.data)" />
                                    </template>
                                  </Column>
                                </DataTable>
                              </TabPanel>
                              <TabPanel :header="lan === 'CN' ? '10. 冷藏入库' : '10. Cold Storage Entry'">
                                <DataTable :value="slaughterData" scrollable scrollHeight="400px" tableStyle="min-width: 30rem">
                                  <Column field="id" :header="lan === 'CN' ? '产品批次' : 'Product Batch'"></Column>
                                  <Column field="type" :header="lan === 'CN' ? '包装方式' : 'Packing Method'"></Column>
                                  <Column field="date" :header="lan === 'CN' ? '包装时间' : 'Packing Time'"></Column>
                                  <Column :header="lan === 'CN' ? '监测状态' : 'Monitoring Status'" headerStyle="width: 10rem">
                                    <template #body>
                                      <div class="flex flex-wrap gap-2">
                                        <Tag class="mr-2" severity="success" :value="lan === 'CN' ? '正常' : 'Normal'"></Tag>
                                      </div>
                                    </template>
                                  </Column>
                                  <Column :exportable="false" style="min-width:8rem">
                                    <template #body="slotProps">
                                      <Button :label="lan === 'CN' ? '查看详情' : 'View Details'" severity="info" text
                                              @click="editProduct(slotProps.data)" />
                                    </template>
                                  </Column>
                                </DataTable>
                              </TabPanel>
                              <TabPanel :header="lan === 'CN' ? '11. 胴体分割' : '11. Carcass Splitting'">
                                <DataTable :value="slaughterData" scrollable scrollHeight="400px" tableStyle="min-width: 30rem">
                                  <Column field="id" :header="lan === 'CN' ? '产品批次' : 'Product Batch'"></Column>
                                  <Column field="type" :header="lan === 'CN' ? '包装方式' : 'Packing Method'"></Column>
                                  <Column field="date" :header="lan === 'CN' ? '包装时间' : 'Packing Time'"></Column>
                                  <Column :header="lan === 'CN' ? '监测状态' : 'Monitoring Status'" headerStyle="width: 10rem">
                                    <template #body>
                                      <div class="flex flex-wrap gap-2">
                                        <Tag class="mr-2" severity="success" :value="lan === 'CN' ? '正常' : 'Normal'"></Tag>
                                      </div>
                                    </template>
                                  </Column>
                                  <Column :exportable="false" style="min-width:8rem">
                                    <template #body="slotProps">
                                      <Button :label="lan === 'CN' ? '查看详情' : 'View Details'" severity="info" text @click="editProduct(slotProps.data)" />
                                    </template>
                                  </Column>
                                </DataTable>
                              </TabPanel>
                            </TabView>
                        </div>
                    </div>

                    <div class="col-12">
                        <div class="card">
                            <h5 v-if="lan == 'CN'" style="font-size: large;font-weight: bold;">消毒记录</h5>
                            <h5 v-else style="font-size: large;font-weight: bold;">Disinfection records</h5>
                            <!-- <ToggleButton v-model="idFrozen" onIcon="pi pi-lock" offIcon="pi pi-lock-open" onLabel="Unfreeze Id" offLabel="Freeze Id" style="width: 10rem" /> -->

                            <DataTable :value="cloth" :scrollable="true" scrollHeight="400px" :loading="loading2"
                                scrollDirection="both" class="mt-3">
                              <Column field="date" :header="lan === 'CN' ? '时间' : 'Date'" :style="{ width: '200px' }"></Column>
                              <Column field="methoad" :header="lan === 'CN' ? '方法' : 'Method'" :style="{ width: '150px' }" frozen></Column>
                              <Column field="concentration" :header="lan === 'CN' ? '浓度' : 'Concentration'" :style="{ width: '100px' }" :frozen="idFrozen"></Column>
                              <!-- <Column field="duration" header="持续时间" :style="{ width: '200px' }"></Column> -->

                            </DataTable>
                        </div>
                    </div>
                </div>

            </div>
        </div>


        <div class="col-12">
            <div class="grid">

            </div>

        </div>






    </div>
</template>
    
<script>
import MonitorService from '../service/MonitorService';
import EventBus from '../AppEventBus';
export default {
    data() {
        return {
            lan:this.$store.state.language,
            flag: true,
            value:40,
            monitorService: null,
            slaughterhouseCn: [
                {
                    "temperature": "10°",
                    "humidity": "85%",
                    "oxygen": 35,
                    "uv": 22,
                    "brightness": 600,
                    "water": "无积水",
                    "use": "正在使用"
                }
            ],
            slaughterhouseEn: [
              {
                "temperature": "10°",
                "humidity": "85%",
                "oxygen": 35,
                "uv": 22,
                "brightness": 600,
                "water": "无积水",
                "use": "正在使用"
              }
            ],
            cloth: null,

            // data: [
            //     {
            //         "屠宰批次"，
            //         "动物种类",
            //         数量，
            //         处理方式，
            //         "工人编号"，
            //         屠宰间编号
            //         状态
            //         时间，
            //     }
            // ]
            slaughterData: [
                {
                    "batch_id": "SLAUGHTER-1111",
                    "type": "牛",
                    "number": "2",
                    "methoad": "方式一",
                    "woker_id": "1111",
                    "house_id": "123",
                    "status": "正常",
                    "date": "2013-05-10 13:10:50"
                },
                {
                    "batch_id": "SLAUGHTER-1111",
                    "type": "牛",
                    "number": "2",
                    "methoad": "方式一",
                    "woker_id": "1111",
                    "house_id": "123",
                    "status": "正常",
                    "date": "2013-05-10 13:10:50"
                },
                {
                    "batch_id": "SLAUGHTER-1111",
                    "type": "牛",
                    "number": "2",
                    "methoad": "方式一",
                    "woker_id": "1111",
                    "house_id": "123",
                    "status": "正常",
                    "date": "2013-05-10 13:10:50"
                },
                {
                    "batch_id": "SLAUGHTER-1111",
                    "type": "牛",
                    "number": "2",
                    "methoad": "方式一",
                    "woker_id": "1111",
                    "house_id": "123",
                    "status": "正常",
                    "date": "2013-05-10 13:10:50"
                },
                {
                    "batch_id": "SLAUGHTER-1111",
                    "type": "牛",
                    "number": "2",
                    "methoad": "方式一",
                    "woker_id": "1111",
                    "house_id": "123",
                    "status": "正常",
                    "date": "2013-05-10 13:10:50"
                },
                {
                    "batch_id": "SLAUGHTER-1111",
                    "type": "牛",
                    "number": "2",
                    "methoad": "方式一",
                    "woker_id": "1111",
                    "house_id": "123",
                    "status": "正常",
                    "date": "2013-05-10 13:10:50"
                },
                {
                    "batch_id": "SLAUGHTER-1111",
                    "type": "牛",
                    "number": "2",
                    "methoad": "方式一",
                    "woker_id": "1111",
                    "house_id": "123",
                    "status": "正常",
                    "date": "2013-05-10 13:10:50"
                },
                {
                    "batch_id": "SLAUGHTER-1111",
                    "type": "牛",
                    "number": "2",
                    "methoad": "方式一",
                    "woker_id": "1111",
                    "house_id": "123",
                    "status": "正常",
                    "date": "2013-05-10 13:10:50"
                },
            ]
        }
    },
    mounted() {
      this.languageChangeListener = () => {
        this.lan = this.$store.state.language;
        if(this.lan == 'CN') {
          this.flag = true
        }else {
          this.flag = false
        }
      };
      EventBus.on('language-change', this.languageChangeListener);
        this.monitorService.getUuniformDisinfectionRecord().then(data => this.cloth = data);
    },
    computed: {
      slaughterhouse() {
        return this.lan === 'CN' ? this.slaughterhouseCN : this.slaughterhouseEN;
      }
    },
    created() {
        this.monitorService = new MonitorService();
    }
}
</script>
    
<style lang="scss" scoped>
.title {
    text-align: center;
    font-size: x-large;
    font-weight: bold;
}

.lable_title {
    font-weight: bold;
    text-align: center;
    font-size: x-large;
}

.lable_text {
    font-weight: bold;
    text-align: center;
    font-size: x-large;
}

.lable_status {
    color: darkseagreen;
    font-weight: 500;
    text-align: center;
    font-size: x-large;
}

.env_title {
    font-weight: bold;
    text-align: center;
    font-size: large;
}

.env_text {
    font-weight: bold;
    text-align: center;
    font-size: large;
}
</style>
<!-- <script setup>
import { ref } from "vue";

const value = ref(40);
</script> -->