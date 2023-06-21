<template>
  <el-row style="padding: 10px;border-bottom: 10px solid #f5f7fa">
    <div class="demo-basic--circle">
      <div class="block">
        <router-link :to="{ path: '/song/' + song.id }">
          <el-avatar :size="50" :src="song.publishUser.photoFile.url"></el-avatar>
        </router-link>
      </div>
    </div>
    <el-col :span="22" style="text-align: left; margin-left: 10px">
      <p style="font-size: 16px; line-height: 26px;margin: 0;">
        <router-link
            :to="{ path: '/song/' + song.id }"
            style="
                    text-decoration: none;
                    padding: 0;
                  "
        >
          {{ song.publishUser.nickname }}
        </router-link>
      </p>
      <p style="font-size: 12px; line-height: 26px;margin: 0;font-weight: lighter; color: rgb(147, 147, 147)">
        <el-row>
          <el-col :span="3">
            <span>
              <i class="iconfont icon-shijian"></i>
              {{
                time(song.createTime, 'YYYY-MM-DD HH:mm')
              }}
            </span>
          </el-col>
          <el-col :span="21">
            <span>
              <i class="iconfont icon-yanjing"></i>
              {{ song.viewNum }}
            </span>
          </el-col>
        </el-row>
      </p>
    </el-col>
  </el-row>
<!--  <div class="home">-->

    <!--      </el-row>-->
    <!--        歌曲模块-->
    <el-container style="background-color: white">
      <el-main>
        <el-row>
          <el-col :span="24">
            <div id="aplayer">
            </div>
          </el-col>
        </el-row>
        <el-row style="margin-top: 20px">
          <el-col>
            <div v-html="song.lrcStr" style="text-align: center"></div>
          </el-col>
        </el-row>
        <el-row style="text-align: center;margin-bottom: 50px;">
          <el-col>
            <el-button round @click="likeBlogOf(song.id)"
                       v-if="!song.like"><i class="iconfont icon-dianzan"/>&nbsp;喜欢 {{ song.likeNum }}
            </el-button>
            <el-button type="danger" round @click="likeBlogOf(song.id)"
                       v-if="song.like"><i class="iconfont icon-dianzan1"/>&nbsp;喜欢 {{ song.likeNum }}
            </el-button>
            <el-button type="danger" round @click="starBlogOf(song.id)"
                       v-if="song.star"><i class="iconfont icon-shoucang1"/> 收藏
              {{ song.starNum }}
            </el-button>
            <el-button round
                       @click="starBlogOf(song.id)" v-if="!song.star"><i class="iconfont icon-shoucang"/> {{
                song.starNum
              }}
              收藏
            </el-button>

            <el-button round @click="rewardDialogVisible = true"><i class="iconfont icon-lihe"/> 打赏</el-button>
            <!--          <el-button round @click="rewardDialogVisible = true"><i class="iconfont icon-yulebao"/> 打赏</el-button>-->
            <el-button round @click="downloadOpen"><i class="iconfont icon-shangchuan"/> 下载</el-button>
            <el-dialog
                title="下载"
                :visible.sync="downloadDialogVisible"
                width="30%"
                :before-close="handleClose">
              <el-col>
                  <span>网盘链接：<el-link target="_blank" type="primary" _blank href="https:www.baidu.com"
                                      :underline="false">https:www.baidu.com</el-link></span>
              </el-col>
              <el-col>
                <span>提取码：1234</span>
              </el-col>
            </el-dialog>
            <el-dialog
                title="请选择打赏金币个数"
                :visible.sync="rewardDialogVisible"
                width="20%"
                :before-close="handleClose">
              <el-input-number v-model="rewardAmount" :min="1" :max="10"
                               label="打赏金额" placeholder="打赏金额"></el-input-number>
              <span slot="footer" class="dialog-footer">
                  <el-button type="primary" @click="handleReward">确 定</el-button>
                </span>
            </el-dialog>
            <el-dialog
                :title="replyDialogVisibleTitle"
                :visible.sync="replyDialogVisible"
                width="30%"
                :before-close="handleClose">
              <el-input
                  maxlength="150"
                  show-word-limit
                  type="textarea"
                  :autosize="{ minRows: 2, maxRows: 10}"
                  placeholder="发布你的回复"
                  :before-close="replyDialogClose"
                  v-model="replyContent">
              </el-input>
              <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="handleReply">回 复</el-button>
              </span>
            </el-dialog>
          </el-col>
        </el-row>
        <el-divider>评论</el-divider>
        <el-row style="margin-bottom: 10px">
          <el-col style="margin: 0; text-align: left">
            <el-link :underline="false" :type="commentInfo.commentSort === 1 ? 'primary':''"
                     @click="handleSortChange(1)">
              热度
            </el-link>
            <el-divider direction="vertical"></el-divider>
            <el-link :underline="false" :type="commentInfo.commentSort === 2 ? 'primary':''"
                     @click="handleSortChange(2)">
              最新
            </el-link>
          </el-col>
          <el-col>
            <el-empty
                v-if="pageInfo.total === 0"
                description="还没有人评论过，快来发表第一条评论吧"
            ></el-empty>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-row style="text-align: left; padding: 10px;margin: 0" v-for="comment in commentInfo.commentList">
              <el-col :span="1" type="flex" justify="center" align="middle">
                <el-avatar style="margin-top: 5px"
                           :size="35"
                           :src="comment.fromUser.photoFile.url"
                ></el-avatar>
              </el-col>
              <el-col :span="23" style="font-size: 13px; line-height: 22px; padding-left: 5px">
                <el-row style="margin-bottom: 2px">
                  <el-col>
                    <span style="color: #eb7350">{{ comment.fromUser.nickname }}</span>：{{ comment.content }}
                  </el-col>
                </el-row>
                <el-row style="margin: 0">
                  <el-col :span="3" style="color: #939393;line-height: 23px">
                    <span>{{ time(comment.createTime, 'YYYY-MM-DD HH:mm') }}</span>
                  </el-col>
                  <el-col :offset="16" :span="5" style="text-align: right;padding-right: 20px">
                    <el-link :underline="false" style="margin-right: 25px;"
                             @click="openReplyDialogVisible(comment, 1, comment.replyList.records)">
                      <span class="iconfont icon-pinglun" style="font-size: 16px"></span>
                    </el-link>
                    <el-link :underline="false" style="line-height: 23px;" @click="likeCommentOf(comment)"
                             v-if="!comment.like">
                      <span class="iconfont icon-dianzan" style="font-size: 16px"></span>
                      <span style="font-size: 13px;">&nbsp;{{ comment.likeNum }}</span></el-link>
                    <el-link :underline="false" style="line-height: 23px; color: #F56C6C"
                             @click="likeCommentOf(comment)"
                             v-if="comment.like">
                      <span class="iconfont icon-dianzan1" style="font-size: 16px"></span>
                      <span style="font-size: 13px;">&nbsp;{{ comment.likeNum }}</span></el-link>
                  </el-col>
                </el-row>
                <el-row style="border-left: 2px solid #f2f2f2;margin: 0">
                  <el-col>
                    <div style="padding-left: 20px" v-for="reply in comment.replyList.records">
                      <el-row style="margin-bottom: 2px;">
                        <el-col>
                          <span style="color: #eb7350">{{ reply.fromUser.nickname }}</span><i
                            class="el-icon-caret-right"
                            v-if="reply.replyType === 'REPLY'"></i><span
                            style="color: #eb7350" v-if="reply.replyType === 'REPLY'">{{ reply.toUser.nickname }}</span>：{{
                            reply.content
                          }}
                        </el-col>
                      </el-row>
                      <el-row style="margin-bottom: 0">
                        <el-col :span="3" style="color: #939393;line-height: 23px">
                          <span>{{ time(reply.createTime, 'YYYY-MM-DD HH:mm') }}</span>
                        </el-col>
                        <el-col :offset="16" :span="5" style="text-align: right;">
                          <el-link :underline="false" style="margin-right: 25px;"
                                   @click="openReplyDialogVisible(reply, 2, comment.replyList.records)">
                            <span class="iconfont icon-pinglun" style="font-size: 16px"></span>
                          </el-link>
                          <el-link :underline="false" style="line-height: 23px;"
                                   @click="likeReplyOf(reply)" v-if="!reply.like">
                            <span class="iconfont icon-dianzan" style="font-size: 16px"></span>
                            <span style="font-size: 13px;">&nbsp;{{ reply.likeNum }}</span></el-link>
                          <el-link :underline="false" style="line-height: 23px; color: #F56C6C"
                                   @click="likeReplyOf(reply)" v-if="reply.like">
                            <span class="iconfont icon-dianzan1" style="font-size: 16px"></span>
                            <span style="font-size: 13px;">&nbsp;{{ reply.likeNum }}</span></el-link>
                        </el-col>
                      </el-row>
                    </div>
                  </el-col>
                  <p style="padding-left: 20px; margin: 0" v-if="comment.replyList.pages > comment.replyList.current">
                    <el-link type="info" :underline="false" @click="getReply(comment)">
                      共{{ comment.replyList.total }}条回复, 点击查看更多
                    </el-link>
                  </p>
                  <!--                    <p v-if="comment.replyList.pages > comment.replyList.current && replyListLoading">加载中...</p>-->
                </el-row>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8" :offset="8">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="pageInfo.current"
                :page-size="pageInfo.size"
                layout="total, prev, pager, next, jumper"
                :total="pageInfo.total"
                v-if="currPageInfo.pageShow"
                hide-on-single-page
                background
            >
            </el-pagination>
          </el-col>
        </el-row>
        <el-row v-if="user != null">
          <el-form ref="commentForm" :model="commentForm">
            <el-form-item>
              <el-input
                  maxlength="150"
                  show-word-limit
                  type="textarea"
                  :autosize="{ minRows: 2, maxRows: 10}"
                  placeholder="发表一下你的评论吧"
                  v-model="commentForm.content"
              >
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-col :offset="22" :span="2">
                <el-button type="primary" @click="commentOf" v-preventReClick="3000"
                           :disabled="commentForm.content === '' || commentForm.content === null">发 送
                </el-button>
              </el-col>
            </el-form-item>
          </el-form>
        </el-row>
        <el-row v-if="currPageInfo.user === null" style="text-align: center; margin-top: 20px">
          <el-col>
            <router-link
                :to="{path: '/login'}"
                style="
                  color: #606266;
                  font-size: 14px;
                  font-weight: 500;
                    text-decoration: none;
                    padding: 0;
                  "
            >
              请<span style="color: #66b1ff"> 登录 </span>后发表评论
            </router-link>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
<!--  </div>-->
</template>

<script setup name="Song">
import IconText from "@/components/IconText"
import APlayer from "APlayer"; // 引入音乐插件
import "APlayer/dist/APlayer.min.css"; // 引入音乐插件的样式
import moment from 'moment';
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";
import {
  getSong,
  getSongIsBuy,
  buySong,
  rewardBlog,
  blogComment,
  getBlogComment,
  getBlogCommentReply,
  blogCommentLike,
  blogCommentLikeReply,
  blogCommentReply,
  blogSongLike,
  blogSongStar
} from "@/api/song";

const $router = useRouter();
const pageInfo = ref({
  current: 1,
  size: 5,
  total: 0,
})
const commentForm = ref({
  content: null
})
const song = ref({
  id: null,
  lrcStr: null,
  like: false,
  star: false,
  likeNum: 0,
  starNum: 0,
  viewNum: 0,
  createTime: null,
  publishUser: {
    nickname: null,
    photoFile: {
      url: null,
    }
  }
})
const audio = ref([])
const info = ref({
  fixed: false, // 不开启吸底模式
  listFolded: true, // 折叠歌曲列表
  // autoplay: true, // 开启自动播放
  autoplay: false, // 开启自动播放
  preload: "auto", // 自动预加载歌曲
  loop: "one", // 播放循环模式、all全部循环 one单曲循环 none只播放一次
  order: "list", //  播放模式，list列表播放, random随机播放
  // mini: true, // 迷你模型
})
const commentInfo = ref({
  commentList: [], // 评论列表
  commentSort: 1, // 评论排序
})
const currPageInfo = ref({
  downloadDialogVisible: false,
  rewardDialogVisible: false,
  rewardAmount: 1, // 打赏金额
  songIsBuyFlag: 0, // 歌曲是否已经购买
  replyContent: null, // 回复内容
  replyDialogVisible: false,
  replyDialogVisibleTitle: null, // 回复评论对话框标题
  replyObj: null,
  replyListLoading: false, // 点击查看更多回复加载提示
  replyNewList: null, // 新添加的回复缓存
  user: null,
  pageShow: null,
})
onMounted(() => {
  getSongInfo();
  // 初始化播放器
  initAudio();
  getCommentList();
  currPageInfo.value.pageShow = true; // 处理mounted下页码不更新问题
  songIsBuy();
});

function time(value, formatStr) {
  return moment(value).format(formatStr);
}

function initAudio() {
  // 创建一个音乐播放器实例，并挂载到DOM上，同时进行相关配置
  const ap = new APlayer({
    container: document.getElementById("aplayer"),
    audio: audio.value, // 音乐信息
    ...info.value, // 其他配置信息
  });
}

/**
 * 获取音乐详情
 */
function getSongInfo() {
  getSong($router.currentRoute.value.params.id).then(res => {
    if (res.code === 200) {
      console.log(res)
      let resData = res.data;
      song.value = {
        name: resData.name, // 歌曲名字
        artist: resData.artist, // 歌曲演唱者
        url: resData.songFile === undefined || null ? null : resData.songFile.url,// 歌曲地址（这里用外链地址）
        cover: resData.coverFile === undefined || null ? null : resData.coverFile.url, // 歌曲头像
        lrc: '', // 歌词
        lrcStr: resData.lrc,
        theme: "rgb(127, 218, 180)", // 播放这首歌曲时的主题色
        id: resData.id,
        like: resData.like,
        star: resData.star,
        likeNum: resData.likeNum,
        starNum: resData.starNum,
        downloadPrice: resData.downloadPrice,
        // createUser: resData.createUser,
        publishUser: resData.publishUser,
        viewNum: resData.viewNum,
        createTime: resData.createTime,
      };
      audio.value.push(song.value);
      initAudio();
    } else {
      $message.error(res.message);
    }
  })
      .catch((error) => {
        console.error(error)
        // if (error.response.status !== 401) {
        //   console.log(error)
        //   // 请求失败处理
        //   $message.error('服务器开小差了');
        // }
      });
}

function handleClose(done) {
  done();
}

function downloadOpen() {
  if (songIsBuyFlag === 1) {
    handleBuySong();
  } else {
    $confirm('是否支付 ' + song.downloadPrice + ' 金币购买该歌曲的永久下载权?', '支付', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }).then(() => {
      handleBuySong();
    }).catch(() => {
      currPageInfo.value.downloadDialogVisible = false;
    });
  }
}

// 歌曲是否已经购买
function songIsBuy() {
  getSongIsBuy($router.currentRoute.value.params.id).then(res => {
    if (res.code === 200) {
      currPageInfo.value.songIsBuyFlag = res.data.is;
    } else {
      $message.error(res.message);
    }
  }).catch((error) => {
    if (error.response.status !== 401) {
      console.log(error)
      // 请求失败处理
      $message.error('服务器开小差了');
    }
  });
}

/**
 * 购买歌曲下载权
 * */
function handleBuySong() {
  buySong(song.value.id)
      .then(res => {
        if (res.code === 200) {
          currPageInfo.value.downloadDialogVisible = true;
          currPageInfo.value.songIsBuyFlag = 1;
        } else {
          $message.error(res.message);
        }
        loading.close();
      })
      .catch((error) => {
        loading.close();
        if (error.response.status !== 401) {
          console.log(error)
          // 请求失败处理
          $message.error('服务器开小差了');
        }
      });
}

/**
 * 打赏帖子
 * */
function handleReward() {
  const data = {
    blogId: song.id,
    amount: rewardAmount,
  }
  rewardBlog(data).then(res => {
    if (res.code === 200) {
      $message({
        message: "打赏成功，感谢您的支持",
        type: "success",
      });
      currPageInfo.value.rewardDialogVisible = false;
    } else {
      $message.error(res.message);
    }
  }).catch((error) => {
    if (error.response.status !== 401) {
      console.log(error)
      // 请求失败处理
      $message.error('服务器开小差了');
    }
  });
}

/**
 * 发表评论
 */
function commentOf() {
  blogComment({
    blogId: song.id,
    content: commentForm.content,
    blogType: 'SONG',
  }).then(res => {
    if (res.code === 200) {
      $message({
        message: "发布成功",
        type: "success",
      });
      commentForm.content = '';
      commentList.push(res.data);
    } else {
      $message.error(res.message);
    }
  })
      .catch((error) => {
        if (error.response.status !== 401) {
          console.log(error)
          // 请求失败处理
          $message.error('服务器开小差了');
        }
      });
}

/**
 * 获取评论列表
 */
function getCommentList() {
  getBlogComment({
    blogId: $router.currentRoute.value.params.id,
    sort: commentInfo.value.commentSort,
    blogType: 'SONG',
    current: pageInfo.current,
    size: pageInfo.size,
  }).then(res => {
    if (res.code === 200) {
      let resData = res.data;
      commentInfo.value.commentList = resData.records;
      pageInfo.value.total = resData.total;
      pageInfo.value.current = resData.current;
    } else {
      $message.error(res.message);
    }
  }).catch((error) => {
    console.error(error)
  });
}

// 查询回复
function getReply(comment) {
  getBlogCommentReply({
    commentId: comment.id,
    current: comment.replyList.current + 1,
    size: comment.replyList.size,
  })
      .then(res => {
        if (res.code === 200) {
          let resData = res.data;
          comment.replyList.current = resData.current;
          comment.replyList.pages = resData.pages;
          comment.replyList.size = resData.size;
          comment.replyList.total = resData.total;
          let idList = [];
          for (const record of comment.replyList.records) {
            idList.push(record.id);
          }
          for (const record of resData.records) {
            if (idList.includes(record.id)) {
              continue;
            }
            comment.replyList.records.push(record);
          }
        } else {
          $message.error(res.message);
        }
        loading.close();
      })
      .catch((error) => {
        loading.close();
        if (error.response.status !== 401) {
          console.log(error)
          // 请求失败处理
          $message.error('服务器开小差了');
        }
      });
}

/**
 * 点赞评论
 */
function likeCommentOf(comment) {
  blogCommentLike(comment.id)
      .then(res => {
        if (res.code === 200) {
          comment.like = res.data.status === 1;
          comment.likeNum = res.data.count;
        } else {
          $message.error(res.message);
        }
      })
      .catch((error) => {
        if (error.response.status !== 401) {
          console.log(error)
          // 请求失败处理
          $message.error(error);
        }
      });
}

/**
 * 点赞回复
 */
function likeReplyOf(reply) {
  blogCommentLikeReply(reply.id)
      .then(res => {
        if (res.code === 200) {
          reply.like = res.data.status === 1;
          reply.likeNum = res.data.count;
        } else {
          $message.error(res.message);
        }
      })
      .catch((error) => {
        if (error.response.status !== 401) {
          console.log(error)
          // 请求失败处理
          $message.error('服务器开小差了');
        }
      });
}

// 打开回复对话框
function openReplyDialogVisible(replyObj, type, replyList) {
  currPageInfo.value.replyDialogVisibleTitle = '回复@' + replyObj.fromUser.nickname + '：';
  currPageInfo.value.replyDialogVisible = true;
  replyObj = replyObj;
  replyObj.type = type;
  currPageInfo.value.replyNewList = replyList;
}

function replyDialogClose() {
  currPageInfo.value.replyObj = null;
  currPageInfo.value.replyNewList = null;
}

// 回复评论
function handleReply() {
  blogCommentReply({
    replyId: replyObj.id,
    content: replyContent,
    replyType: replyObj.type === 1 ? 'COMMENT' : 'REPLY',
  })
      .then(res => {
        if (res.code === 200) {
          currPageInfo.value.replyContent = null;
          currPageInfo.value.replyDialogVisible = false;
          replyNewList.push(res.data);
        } else {
          $message.error(res.message);
        }
      })
      .catch((error) => {
        if (error.response.status !== 401) {
          console.log(error)
          // 请求失败处理
          $message.error('服务器开小差了');
        }
      });
}

/**
 * 点赞帖子
 */
function likeBlogOf(blogId) {
  blogSongLike(blogId)
      .then(res => {
        if (res.code === 200) {
          song.like = res.data.status === 1;
          song.likeNum = res.data.count;
        } else {
          $message.error(res.message);
        }
      })
      .catch((error) => {
        if (error.response.status !== 401) {
          console.log(error)
          // 请求失败处理
          $message.error('服务器开小差了');
        }
      });
}

/**
 * 收藏帖子
 */
function starBlogOf(blogId) {
  blogSongStar(blogId)
      .then(res => {
        if (res.code === 200) {
          song.star = res.data.status === 1;
          song.starNum = res.data.count;
        } else {
          $message.error(res.message);
        }
      })
      .catch((error) => {
        if (error.response.status !== 401) {
          console.log(error)
          // 请求失败处理
          $message.error('服务器开小差了');
        }
      });
}

function handleSizeChange(val) {
  pageInfo.size = val;
}

function handleCurrentChange(val) {
  pageInfo.current = val;
  getCommentList();
}

function handleSortChange(val) {
  pageInfo.current = 1;
  commentInfo.value.commentSort = val;
  getCommentList();
}
</script>

<style scoped lang="scss">
//.home {
//  blockquote {
//    padding: 10px 20px;
//    margin: 0 0 20px;
//    font-size: 17.5px;
//    border-left: 5px solid #eee;
//  }
//
//  hr {
//    margin-top: 20px;
//    margin-bottom: 20px;
//    border: 0;
//    border-top: 1px solid #eee;
//  }
//
//  .col-item {
//    margin-bottom: 20px;
//  }
//
//  ul {
//    padding: 0;
//    margin: 0;
//  }
//
//  font-family: "open sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
//  font-size: 13px;
//  color: #676a6c;
//  overflow-x: hidden;
//
//  ul {
//    list-style-type: none;
//  }
//
//  h4 {
//    margin-top: 0px;
//  }
//
//  h2 {
//    margin-top: 10px;
//    font-size: 26px;
//    font-weight: 100;
//  }
//
//  p {
//    margin-top: 10px;
//
//    b {
//      font-weight: 700;
//    }
//  }
//
//  .update-log {
//    ol {
//      display: block;
//      list-style-type: decimal;
//      margin-block-start: 1em;
//      margin-block-end: 1em;
//      margin-inline-start: 0;
//      margin-inline-end: 0;
//      padding-inline-start: 40px;
//    }
//  }
//}

.el-card__body {
  padding: 20px 20px 20px 20px !important;
}
</style>