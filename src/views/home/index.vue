<template>
  <div class="home chart">
    <el-row style="margin-bottom: 20px">
      <el-col :span="24">
        <el-menu
            :default-active="activeRouter"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
            active-text-color="#409eff"
            router
        >
          <el-menu-item index="/index/latest/1">
            <span slot="title">最新</span>
          </el-menu-item>
          <el-menu-item index="/index/hot/1">
            <span slot="title">热门</span>
          </el-menu-item>
          <el-menu-item index="/index/mon/1">
            <span slot="title">月榜</span>
          </el-menu-item>
          <el-menu-item index="/index/week/1">
            <span slot="title">周榜</span>
          </el-menu-item>
          <el-menu-item index="/index/day/1">
            <span slot="title">日榜</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-empty
            v-if="pageInfo.total === 0"
            description="这里空空如也"
        ></el-empty>
        <el-card style="margin-bottom: 15px" v-for="o in songList" shadow="hover">
          <el-row>
            <!--            <el-col :span="2">-->
            <router-link :to="{ path: '/song/' + o.id }">
              <el-avatar
                  shape="square"
                  :size="50"
                  :src="o.coverFile === null||undefined ? null : o.coverFile.url"
                  style="margin-right: 10px"
              ></el-avatar>
            </router-link>
            <!--            </el-col>-->
            <el-col :span="22">
              <el-row>
                <el-col :span="24">
                  <router-link
                      :to="{ path: '/song/' + o.id }"
                      class="song-title"
                  >
                    {{ o.name }} - {{ o.artist }}
                  </router-link>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-row>
                    <el-col :span="12">
                      <router-link
                          :to="{ path: '/song/' + o.id }"
                          style="
                                  color: black;
                                  padding: 0;
                                  font-size: 13px;
                                  text-decoration: none;
                                "
                      >
                        <el-link :icon="User" class="chart-song-user" :underline="false">
                          {{ o.publishUser === null || undefined ? null : o.publishUser.nickname }}
                        </el-link>
                      </router-link>
                    </el-col>
                    <el-col :span="12">
                      <el-row>
                        <el-col :span="4" :offset="4">
                          <IconText icon="Clock" :text="o.publishDate" class="time"></IconText>
                        </el-col>
                        <el-col :span="4">
                          <IconText icon="Comment" :text="o.starNum" class="time"></IconText>
                        </el-col>
                        <el-col :span="4">
                          <IconText icon="Star" :text="o.starNum" class="time"></IconText>
                        </el-col>
                        <el-col :span="4">
                          <IconText icon="Star" :text="o.likeNum" class="time"></IconText>
                        </el-col>
                        <el-col :span="4">
                          <IconText icon="VideoPlay" :text="o.viewNum" class="time"></IconText>
                        </el-col>
                      </el-row>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-card>

        <div class="block" style="margin-top: 30px">
          <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="pageInfo.current"
              :page-size="pageInfo.size"
              layout="total, prev, pager, next, jumper"
              :total="pageInfo.total"
              v-if="pageShow"
              hide-on-single-page
              background
          >
          </el-pagination>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup name="Home">
import IconText from "@/components/IconText"
import {Delete, Edit, Search, Share, Upload, User} from '@element-plus/icons-vue'
import {onMounted, ref} from "vue";
import {getSongChart} from "@/api/home";
import {useRouter} from 'vue-router';

const $router = useRouter();
const activeRouter = ref("/index/latest/1")
const songList = ref([])
const pageInfo = ref({
  current: 1,
  size: 10,
  total: 0,
})
const pageShow = ref(false)
const listType = ref('latest')
onMounted(() => {
  if ($router.currentRoute.value.params.menu === undefined) {
    listType.value = "latest";
  } else {
    listType.value = $router.currentRoute.value.params.menu;
  }
  // 分页处理
  if ($router.currentRoute.value.params.current === undefined) {
    pageInfo.value.current = 1;
  } else {
    pageInfo.value.current = parseInt($router.currentRoute.value.params.current);
  }
  getChart(); // 初始化歌曲列表
  pageShow.value = true; // 处理mounted下页码不更新问题
  // // 路由刷新失效处理
  // if (window.location.pathname === '/index') {
  //   activeRouter.value = '/index/latest/1';
  // } else {
  // activeRouter.value = window.location.pathname;
  activeRouter.value = '/index/' + listType.value + '/1';
  // }
});

function getChart() {
  const data = {
    current: pageInfo.value.current,
    size: pageInfo.value.size,
  }
  getSongChart(data, listType.value).then(res => {
    if (res.code === 200) {
      songList.value = res.data.records;
      pageInfo.value.total = res.data.total;
      pageInfo.value.current = res.data.current;
    } else {
      $message.error(res.message);
    }
  })
}

function handleSizeChange(val) {
  pageInfo.value.size = val;
  getChart();
}

function handleCurrentChange(val) {
  const path = "/index/" +
      ($router.currentRoute.value.params.menu === undefined
          ? "latest"
          : $router.currentRoute.value.params.menu) +
      "/" +
      val;
  $router
      .push({
        path: path
      })
      .catch((err) => {
        return err;
      });
  activeRouter.value = '/index/' + listType.value + '/1';
  pageInfo.value.current = val;
  getChart();
}

function handleSelect(key, keyPath) {
  listType.value = key.split('/')[2];
  getChart();
}
</script>

<style scoped lang="scss">
.home {
  blockquote {
    padding: 10px 20px;
    margin: 0 0 20px;
    font-size: 17.5px;
    border-left: 5px solid #eee;
  }

  hr {
    margin-top: 20px;
    margin-bottom: 20px;
    border: 0;
    border-top: 1px solid #eee;
  }

  .col-item {
    margin-bottom: 20px;
  }

  ul {
    padding: 0;
    margin: 0;
  }

  font-family: "open sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 13px;
  color: #676a6c;
  overflow-x: hidden;

  ul {
    list-style-type: none;
  }

  h4 {
    margin-top: 0px;
  }

  h2 {
    margin-top: 10px;
    font-size: 26px;
    font-weight: 100;
  }

  p {
    margin-top: 10px;

    b {
      font-weight: 700;
    }
  }

  .update-log {
    ol {
      display: block;
      list-style-type: decimal;
      margin-block-start: 1em;
      margin-block-end: 1em;
      margin-inline-start: 0;
      margin-inline-end: 0;
      padding-inline-start: 40px;
    }
  }
}

.chart {

  //.el-tabs {
  //  deep .el-tabs__nav-wrap::after {
  //    height: 1px !important;
  //  }
  //}

  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both;
  }

  .userTitle {
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    font-size: 14px;
    margin-right: 20px;
  }

  .song-view-info {
    line-height: 13px;
    font-size: 13px;
    margin-right: 25px;
    text-align: left;
  }

  .song-title {
    text-decoration: none;
    font-size: 15px;
    font-weight: bold;
    line-height: 30px;
    color: black;
    padding: 0;
  }

  .chart-song-user {
    text-underline: none;
  }

  .chart-song-user:hover {
    text-underline: none;
    color: black;
  }
}
</style>

